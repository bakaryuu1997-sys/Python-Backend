import { Pattern } from '../../types';
import { pattern, fastapiCrudCode } from '../patternUtils';

export const FASTAPI_PATTERNS: Pattern[] = [
  pattern({
      id: 'fastapi-project-structure', title: 'FastAPI Production Project Structure', vietnameseTitle: 'Cấu trúc dự án FastAPI production',
      shortDescription: 'Cấu trúc folder rõ layer router, schema, service, repository, model, core config và tests để dự án dễ mở rộng.', category: 'fastapi', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Pytest'],
      whyUse: ['Bắt đầu dự án FastAPI mới cần cấu trúc sạch.', 'Muốn tách router/service/repository để tránh logic nằm trong route.', 'Dự án sẽ có auth, database, upload, job hoặc nhiều module.'],
      whyNotUse: ['Prototype 1 file cực nhỏ chỉ test ý tưởng.', 'Team chưa cần tách domain và chưa có database.'],
      installCommand: 'pip install fastapi uvicorn pydantic-settings sqlalchemy alembic pytest httpx',
      folderStructure: `app/\n├── main.py\n├── core/config.py\n├── db/session.py\n├── models/\n├── schemas/\n├── repositories/\n├── services/\n├── routers/\n└── tests/`,
      codeTemplates: [{ filename: 'app/main.py', language: 'python', description: 'App entrypoint production-friendly.', code: `from fastapi import FastAPI\nfrom app.routers import health_router, user_router\n\napp = FastAPI(title="Backend API", version="1.0.0")\napp.include_router(health_router.router, prefix="/api/v1")\napp.include_router(user_router.router, prefix="/api/v1")` }],
      relatedPatterns: ['fastapi-crud-api', 'settings-management', 'healthcheck-endpoint'], searchKeywords: ['folder structure', 'clean architecture', 'layered']
    }),
  pattern({
      id: 'fastapi-crud-api', title: 'FastAPI CRUD API with Service Layer', vietnameseTitle: 'CRUD API FastAPI chuẩn service layer',
      shortDescription: 'Template CRUD API có router, schema, service, repository và xử lý lỗi 404 rõ ràng.', category: 'fastapi', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Pytest'],
      whyUse: ['Cần API thêm/sửa/xóa/xem dữ liệu.', 'Muốn code dễ test và không query DB trực tiếp trong router.', 'Frontend cần response schema ổn định.'],
      whyNotUse: ['Tác vụ chỉ đọc 1 endpoint đơn giản không cần DB.', 'Dự án dùng Django/DRF thì nên dùng ViewSet/Serializer.'],
      installCommand: 'pip install fastapi uvicorn sqlalchemy pydantic pytest httpx', folderStructure: `app/\n├── routers/user_router.py\n├── schemas/user_schema.py\n├── services/user_service.py\n├── repositories/user_repository.py\n└── models/user.py`,
      codeTemplates: [{ filename: 'app/routers/user_router.py', language: 'python', description: 'Router CRUD tối giản nhưng production-aware.', code: fastapiCrudCode }], relatedPatterns: ['pydantic-schema-validation', 'sqlalchemy-session-pattern']
    })
];
