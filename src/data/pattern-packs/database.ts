import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DATABASE_PATTERNS: Pattern[] = [
  pattern({
      id: 'sqlalchemy-session-pattern', title: 'SQLAlchemy Session and Repository Pattern', vietnameseTitle: 'SQLAlchemy session + repository', shortDescription: 'Thiết lập engine/session dependency và repository để query DB an toàn, dễ test.', category: 'database', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['SQLAlchemy', 'PostgreSQL', 'FastAPI'],
      whyUse: ['Dự án FastAPI cần SQL database.', 'Muốn tách query DB khỏi router.', 'Cần transaction rõ ràng.'], whyNotUse: ['Dự án Django đã dùng Django ORM.', 'Prototype không có database.'], installCommand: 'pip install sqlalchemy psycopg[binary]', folderStructure: `app/db/session.py\napp/repositories/user_repository.py`,
      codeTemplates: [{ filename: 'app/db/session.py', language: 'python', description: 'Session dependency cho FastAPI.', code: `from sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\nfrom app.core.config import settings\n\nengine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)\nSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()` }], relatedPatterns: ['alembic-migration', 'transaction-unit-of-work']
    }),
  pattern({
      id: 'alembic-migration', title: 'Alembic Database Migration', vietnameseTitle: 'Migration database bằng Alembic', shortDescription: 'Quản lý thay đổi schema database bằng migration có thể upgrade/downgrade.', category: 'database', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['Alembic', 'SQLAlchemy'],
      whyUse: ['Schema DB thay đổi theo thời gian.', 'Cần deploy có kiểm soát.', 'Cần rollback khi migration lỗi.'], whyNotUse: ['Không dùng SQL database.', 'Prototype throwaway không deploy.'], installCommand: 'pip install alembic && alembic init alembic', folderStructure: `alembic/env.py\nalembic/versions/`,
      codeTemplates: [{ filename: 'commands.sh', language: 'bash', description: 'Lệnh migration thường dùng.', code: `alembic revision --autogenerate -m "create users table"\nalembic upgrade head\nalembic downgrade -1` }], relatedPatterns: ['sqlalchemy-session-pattern']
    }),
  pattern({ id: 'async-sqlalchemy-engine', title: 'Async SQLAlchemy Engine', vietnameseTitle: 'SQLAlchemy async engine', shortDescription: 'Thiết lập AsyncSession cho FastAPI khi cần xử lý nhiều IO database không blocking.', category: 'database', difficulty: 'Advanced', productionLevel: 'Production-ready', libraries: ['SQLAlchemy', 'asyncpg', 'FastAPI'], whyUse: ['Endpoint nhiều IO DB và app async.', 'Muốn dùng asyncpg PostgreSQL.', 'Cần tránh blocking event loop.'], whyNotUse: ['Team chưa quen async transaction.', 'App sync đơn giản chạy ổn với Session thường.'], installCommand: 'pip install sqlalchemy asyncpg', folderStructure: `app/db/async_session.py`, codeTemplates: [{ filename: 'app/db/async_session.py', language: 'python', description: 'Async session dependency.', code: `from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker\n\nengine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db", pool_pre_ping=True)\nAsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)\n\nasync def get_async_db():\n    async with AsyncSessionLocal() as session:\n        yield session` }], relatedPatterns: ['sqlalchemy-session-pattern'] }),
  pattern({
    "id": "transaction-unit-of-work",
    "title": "Transaction Unit of Work",
    "vietnameseTitle": "Transaction + Unit of Work",
    "shortDescription": "Gói nhiều thao tác DB trong một transaction để đảm bảo atomicity cho payment/order/import.",
    "category": "database",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy"
    ],
    "whyUse": [
      "Một request cập nhật nhiều bảng.",
      "Cần commit/rollback rõ ràng.",
      "Webhook/payment/order cần atomic."
    ],
    "whyNotUse": [
      "Chỉ đọc dữ liệu.",
      "Một thao tác đơn giản auto-commit đủ."
    ],
    "installCommand": "pip install sqlalchemy",
    "folderStructure": "app/db/uow.py",
    "codeTemplates": [
      {
        "filename": "app/db/uow.py",
        "language": "python",
        "description": "Unit of Work context manager.",
        "code": "class UnitOfWork:\n    def __init__(self, session_factory):\n        self.session_factory = session_factory\n\n    def __enter__(self):\n        self.session = self.session_factory()\n        return self.session\n\n    def __exit__(self, exc_type, exc, tb):\n        if exc_type:\n            self.session.rollback()\n        else:\n            self.session.commit()\n        self.session.close()",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_uow.py",
        "language": "python",
        "description": "Rollback khi exception.",
        "code": "def test_uow_rolls_back_on_error(uow, repo):\n    with pytest.raises(RuntimeError):\n        with uow as session:\n            repo.create(session, name=\"A\")\n            raise RuntimeError()\n    assert repo.count() == 0",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern",
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "transaction",
      "rollback",
      "unit of work"
    ]
  }),
  pattern({
    "id": "database-index-query-plan",
    "title": "Database Index and Query Plan",
    "vietnameseTitle": "Index và query plan",
    "shortDescription": "Tạo index đúng chỗ và kiểm tra EXPLAIN để tránh API chậm khi dữ liệu lớn.",
    "category": "database",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "whyUse": [
      "Query filter/sort thường xuyên.",
      "Bảng lớn và API list chậm.",
      "Cần tối ưu trước production."
    ],
    "whyNotUse": [
      "Bảng rất nhỏ.",
      "Chưa có query pattern rõ."
    ],
    "installCommand": "pip install sqlalchemy",
    "folderStructure": "sql/indexes.sql",
    "codeTemplates": [
      {
        "filename": "sql/indexes.sql",
        "language": "bash",
        "description": "Index thường dùng.",
        "code": "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users (email);\nCREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_created ON orders (user_id, created_at DESC);\nEXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC LIMIT 20;",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_query_uses_index.py",
        "language": "python",
        "description": "Test logic cấp app: endpoint trả nhanh với pagination.",
        "code": "def test_orders_list_is_paginated(client):\n    res = client.get(\"/api/v1/orders?limit=20\")\n    assert res.status_code == 200\n    assert len(res.json()[\"items\"]) <= 20",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "pagination-filtering-sorting"
    ],
    "searchKeywords": [
      "index",
      "query plan",
      "explain",
      "performance"
    ]
  }),
  pattern({
    "id": "n-plus-one-avoidance",
    "title": "Avoid N+1 Queries",
    "vietnameseTitle": "Tránh N+1 query",
    "shortDescription": "Dùng eager loading/selectinload để tránh query trong vòng lặp khi trả dữ liệu quan hệ.",
    "category": "database",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy"
    ],
    "whyUse": [
      "API trả list kèm quan hệ.",
      "Log DB có quá nhiều query lặp.",
      "Cần tối ưu response list."
    ],
    "whyNotUse": [
      "Không có relationship.",
      "Chỉ lấy một record đơn giản."
    ],
    "installCommand": "pip install sqlalchemy",
    "folderStructure": "app/repositories/order_repository.py",
    "codeTemplates": [
      {
        "filename": "app/repositories/order_repository.py",
        "language": "python",
        "description": "selectinload tránh N+1.",
        "code": "from sqlalchemy import select\nfrom sqlalchemy.orm import selectinload\nfrom app.models import Order\n\ndef list_orders_with_items(session, user_id: int):\n    stmt = (\n        select(Order)\n        .where(Order.user_id == user_id)\n        .options(selectinload(Order.items))\n        .order_by(Order.created_at.desc())\n    )\n    return session.scalars(stmt).all()",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_orders_repository.py",
        "language": "python",
        "description": "Smoke test repository trả items đã load.",
        "code": "def test_list_orders_with_items(session, order_factory):\n    order_factory(with_items=2)\n    orders = list_orders_with_items(session, user_id=1)\n    assert len(orders[0].items) == 2",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "database-index-query-plan"
    ],
    "searchKeywords": [
      "n+1",
      "eager loading",
      "selectinload"
    ]
  })
];
