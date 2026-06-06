import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const ARCHITECTURE_PATTERNS: Pattern[] = [
  pattern({
      id: 'layered-architecture-fastapi',
      title: 'Layered Architecture for FastAPI',
      vietnameseTitle: 'Kiến trúc nhiều lớp cho FastAPI',
      shortDescription: 'Tách router, schema, service, repository, model để code backend dễ đọc, dễ test và dễ mở rộng.',
      category: 'architecture',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI', 'Pydantic', 'SQLAlchemy'],
      whyUse: ['App đã vượt khỏi CRUD một file.', 'Cần tách business logic khỏi router.', 'Team cần cấu trúc folder dễ hiểu.'],
      whyNotUse: ['Prototype rất nhỏ chỉ vài endpoint.', 'Team chưa cần tách layer vì domain quá đơn giản.'],
      installCommand: 'pip install fastapi pydantic sqlalchemy',
      folderStructure: `app/routers/\napp/schemas/\napp/services/\napp/repositories/\napp/models/`,
      codeTemplates: [
        { filename: 'app/services/user_service.py', language: 'python', variant: 'minimal', description: 'Service layer nhận repository và chứa business rule.', code: `from app.repositories.user_repository import UserRepository\nfrom app.schemas.user_schema import UserCreate\n\nclass UserService:\n    def __init__(self, repo: UserRepository):\n        self.repo = repo\n\n    def create_user(self, payload: UserCreate):\n        if self.repo.exists_by_email(payload.email):\n            raise ValueError("Email already exists")\n        return self.repo.create(payload)` },
        { filename: 'tests/test_user_service.py', language: 'python', variant: 'test', description: 'Test service bằng fake repository để không phụ thuộc database.', code: `class FakeUserRepo:\n    def exists_by_email(self, email: str) -> bool:\n        return False\n\n    def create(self, payload):\n        return {"id": 1, "email": payload.email}\n\ndef test_create_user(fake_payload):\n    service = UserService(FakeUserRepo())\n    user = service.create_user(fake_payload)\n    assert user["email"] == fake_payload.email` }
      ],
      relatedPatterns: ['fastapi-crud-api', 'service-repository-pattern'],
      searchKeywords: ['layered architecture', 'service repository', 'clean folder']
    }),
  pattern({
      id: 'service-repository-pattern',
      title: 'Service / Repository Pattern',
      vietnameseTitle: 'Pattern Service và Repository',
      shortDescription: 'Tách logic nghiệp vụ và truy vấn database để router mỏng, code dễ test và giảm lặp query.',
      category: 'architecture',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI', 'SQLAlchemy', 'pytest'],
      whyUse: ['Router đang chứa quá nhiều logic.', 'Cần unit test business rule mà không cần HTTP.', 'Cần thay đổi database query mà không ảnh hưởng API.'],
      whyNotUse: ['Endpoint demo quá nhỏ.', 'Thêm layer nhưng không có logic thật sẽ làm code rối.'],
      installCommand: 'pip install sqlalchemy pytest',
      folderStructure: `app/services/order_service.py\napp/repositories/order_repository.py`,
      codeTemplates: [
        { filename: 'app/repositories/order_repository.py', language: 'python', variant: 'minimal', description: 'Repository chỉ chịu trách nhiệm database query.', code: `class OrderRepository:\n    def __init__(self, db):\n        self.db = db\n\n    def get_by_id(self, order_id: int):\n        return self.db.get(Order, order_id)\n\n    def save(self, order):\n        self.db.add(order)\n        self.db.flush()\n        return order` },
        { filename: 'app/services/order_service.py', language: 'python', variant: 'production', description: 'Service giữ business rule và transaction boundary.', code: `class OrderService:\n    def __init__(self, repo: OrderRepository):\n        self.repo = repo\n\n    def cancel_order(self, order_id: int):\n        order = self.repo.get_by_id(order_id)\n        if order is None:\n            raise OrderNotFoundError(order_id)\n        if order.status == "shipped":\n            raise OrderCannotBeCancelledError(order_id)\n        order.status = "cancelled"\n        return self.repo.save(order)` }
      ],
      relatedPatterns: ['layered-architecture-fastapi', 'transaction-unit-of-work'],
      searchKeywords: ['service layer', 'repository', 'thin router']
    }),
  pattern({
      id: 'clean-architecture-light',
      title: 'Clean Architecture Light',
      vietnameseTitle: 'Clean Architecture phiên bản nhẹ',
      shortDescription: 'Tách domain, application use case, infrastructure và interface mà không làm project quá nặng.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI', 'Pydantic', 'SQLAlchemy'],
      whyUse: ['Domain có nhiều rule.', 'Cần thay provider database/OCR/payment dễ dàng.', 'Muốn use case test độc lập framework.'],
      whyNotUse: ['MVP nhỏ chưa có domain phức tạp.', 'Team mới học backend chưa quen architecture nhiều lớp.'],
      installCommand: 'pip install fastapi pydantic sqlalchemy',
      folderStructure: `app/domain/\napp/application/\napp/infrastructure/\napp/interfaces/http/`,
      codeTemplates: [
        { filename: 'app/application/create_invoice.py', language: 'python', variant: 'minimal', description: 'Use case không phụ thuộc FastAPI router.', code: `class CreateInvoiceUseCase:\n    def __init__(self, invoice_repo, payment_gateway):\n        self.invoice_repo = invoice_repo\n        self.payment_gateway = payment_gateway\n\n    def execute(self, command):\n        invoice = Invoice.create(customer_id=command.customer_id, amount=command.amount)\n        self.invoice_repo.save(invoice)\n        self.payment_gateway.create_payment(invoice)\n        return invoice` },
        { filename: 'tests/test_create_invoice_usecase.py', language: 'python', variant: 'test', description: 'Test use case bằng fake repository/provider.', code: `def test_create_invoice_usecase():\n    repo = FakeInvoiceRepository()\n    gateway = FakePaymentGateway()\n    usecase = CreateInvoiceUseCase(repo, gateway)\n\n    invoice = usecase.execute(CreateInvoiceCommand(customer_id=1, amount=100))\n\n    assert invoice.amount == 100\n    assert repo.saved\n    assert gateway.called` }
      ],
      relatedPatterns: ['provider-adapter-pattern', 'domain-model-vs-orm-model'],
      searchKeywords: ['clean architecture', 'use case', 'domain application infrastructure']
    }),
  pattern({
      id: 'hexagonal-architecture-adapters',
      title: 'Hexagonal Architecture Adapters',
      vietnameseTitle: 'Hexagonal Architecture với ports/adapters',
      shortDescription: 'Định nghĩa port trong application layer và adapter cho database, OCR, payment, storage hoặc LLM provider.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Production-ready',
      libraries: ['Python Protocol', 'FastAPI', 'pytest'],
      whyUse: ['Cần đổi provider mà không sửa use case.', 'Cần test bằng fake adapter.', 'Có nhiều external service như OCR/payment/storage.'],
      whyNotUse: ['App nhỏ chỉ dùng một provider cố định.', 'Team chưa cần abstraction.'],
      installCommand: 'no install required',
      folderStructure: `app/application/ports.py\napp/infrastructure/adapters/`,
      codeTemplates: [
        { filename: 'app/application/ports.py', language: 'python', variant: 'minimal', description: 'Port định nghĩa contract cho storage provider.', code: `from typing import Protocol\n\nclass FileStoragePort(Protocol):\n    def upload(self, key: str, content: bytes, content_type: str) -> str:\n        ...` },
        { filename: 'app/infrastructure/adapters/s3_storage.py', language: 'python', variant: 'production', description: 'Adapter triển khai port bằng S3-compatible storage.', code: `class S3StorageAdapter:\n    def __init__(self, client, bucket: str):\n        self.client = client\n        self.bucket = bucket\n\n    def upload(self, key: str, content: bytes, content_type: str) -> str:\n        self.client.put_object(Bucket=self.bucket, Key=key, Body=content, ContentType=content_type)\n        return f"s3://{self.bucket}/{key}"` }
      ],
      relatedPatterns: ['provider-adapter-pattern', 's3-presigned-upload'],
      searchKeywords: ['hexagonal', 'port adapter', 'ports and adapters']
    }),
  pattern({
      id: 'domain-driven-design-basics',
      title: 'Domain-Driven Design Basics',
      vietnameseTitle: 'DDD cơ bản cho backend Python',
      shortDescription: 'Tổ chức code quanh domain, aggregate, entity, value object và domain service thay vì chỉ quanh database table.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['Python dataclasses', 'Pydantic'],
      whyUse: ['Business rule phức tạp.', 'Domain cần ngôn ngữ chung với team.', 'Nhiều use case thao tác cùng aggregate.'],
      whyNotUse: ['CRUD đơn giản không có rule.', 'Team chưa hiểu domain model.'],
      installCommand: 'no install required',
      folderStructure: `app/domain/orders/entities.py\napp/domain/orders/value_objects.py`,
      codeTemplates: [
        { filename: 'app/domain/orders/entities.py', language: 'python', variant: 'minimal', description: 'Aggregate root giữ invariant của Order.', code: `from dataclasses import dataclass, field\n\n@dataclass\nclass Order:\n    id: int | None\n    status: str = "draft"\n    items: list[OrderItem] = field(default_factory=list)\n\n    def submit(self) -> None:\n        if not self.items:\n            raise ValueError("Cannot submit empty order")\n        self.status = "submitted"` },
        { filename: 'app/domain/orders/value_objects.py', language: 'python', variant: 'production', description: 'Value object cho Money để tránh truyền số tiền tùy tiện.', code: `from dataclasses import dataclass\nfrom decimal import Decimal\n\n@dataclass(frozen=True)\nclass Money:\n    amount: Decimal\n    currency: str\n\n    def __post_init__(self):\n        if self.amount < 0:\n            raise ValueError("Money cannot be negative")` }
      ],
      relatedPatterns: ['domain-model-vs-orm-model', 'clean-architecture-light'],
      searchKeywords: ['ddd', 'domain model', 'aggregate', 'value object']
    }),
  pattern({
      id: 'domain-model-vs-orm-model',
      title: 'Domain Model vs ORM Model',
      vietnameseTitle: 'Domain model khác ORM model thế nào',
      shortDescription: 'Khi domain phức tạp, không nên để SQLAlchemy model chứa toàn bộ business rule hoặc dùng thẳng làm domain entity.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['SQLAlchemy', 'dataclasses'],
      whyUse: ['Business rule cần test độc lập database.', 'ORM model đang phình to.', 'Cần mapping rõ giữa persistence và domain.'],
      whyNotUse: ['CRUD nhỏ, không có domain rule.', 'Tách quá sớm làm code verbose.'],
      installCommand: 'pip install sqlalchemy',
      folderStructure: `app/domain/user.py\napp/models/user_model.py\napp/mappers/user_mapper.py`,
      codeTemplates: [
        { filename: 'app/mappers/user_mapper.py', language: 'python', variant: 'minimal', description: 'Mapper chuyển ORM model sang domain entity.', code: `def to_domain(model: UserModel) -> User:\n    return User(id=model.id, email=model.email, status=model.status)\n\ndef to_model(entity: User) -> UserModel:\n    return UserModel(id=entity.id, email=entity.email, status=entity.status)` }
      ],
      relatedPatterns: ['domain-driven-design-basics', 'sqlalchemy-session-pattern'],
      searchKeywords: ['domain vs orm', 'mapper', 'persistence model']
    }),
  pattern({
      id: 'provider-adapter-pattern',
      title: 'Provider / Adapter Pattern',
      vietnameseTitle: 'Pattern Provider/Adapter cho OCR, payment, storage, LLM',
      shortDescription: 'Dùng interface chung để thay Tesseract/PaddleOCR, Stripe/Momo, S3/local storage hoặc OpenAI/Gemini mà không sửa use case.',
      category: 'architecture',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Python Protocol', 'Pydantic'],
      whyUse: ['Có nhiều provider cùng chức năng.', 'Cần fallback provider.', 'Cần test bằng fake provider.'],
      whyNotUse: ['Chỉ dùng một provider cố định mãi mãi.', 'Abstraction làm code khó hiểu hơn giá trị nhận được.'],
      installCommand: 'no install required',
      folderStructure: `app/providers/ocr/base.py\napp/providers/ocr/paddle.py\napp/providers/ocr/tesseract.py`,
      codeTemplates: [
        { filename: 'app/providers/ocr/base.py', language: 'python', variant: 'minimal', description: 'Base provider contract cho OCR.', code: `from typing import Protocol\n\nclass OCRProvider(Protocol):\n    def extract_text(self, image_bytes: bytes) -> str:\n        ...` },
        { filename: 'app/services/ocr_service.py', language: 'python', variant: 'production', description: 'Service nhận provider qua dependency injection.', code: `class OCRService:\n    def __init__(self, provider: OCRProvider):\n        self.provider = provider\n\n    def run(self, image_bytes: bytes) -> str:\n        text = self.provider.extract_text(image_bytes)\n        return text.strip()` }
      ],
      relatedPatterns: ['image-ocr-api', 'llm-provider-fallback'],
      searchKeywords: ['provider', 'adapter', 'strategy', 'ocr provider']
    }),
  pattern({
      id: 'modular-monolith-structure',
      title: 'Modular Monolith Structure',
      vietnameseTitle: 'Cấu trúc modular monolith',
      shortDescription: 'Giữ một deployable app nhưng tách module theo domain như users, orders, billing để tránh microservice quá sớm.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI', 'SQLAlchemy'],
      whyUse: ['Team muốn boundary rõ nhưng chưa cần microservice.', 'Deploy đơn giản hơn distributed system.', 'Domain lớn dần theo module.'],
      whyNotUse: ['App rất nhỏ.', 'Cần scale độc lập từng service ngay từ đầu.'],
      installCommand: 'pip install fastapi sqlalchemy',
      folderStructure: `app/modules/users/\napp/modules/orders/\napp/modules/billing/\napp/shared/`,
      codeTemplates: [
        { filename: 'app/modules/orders/router.py', language: 'python', variant: 'minimal', description: 'Mỗi module tự có router/service/schema.', code: `from fastapi import APIRouter\n\nrouter = APIRouter(prefix="/orders", tags=["Orders"])\n\n@router.get("/{order_id}")\ndef get_order(order_id: int):\n    return {"id": order_id}` },
        { filename: 'app/main.py', language: 'python', variant: 'production', description: 'App root chỉ compose các module routers.', code: `from fastapi import FastAPI\nfrom app.modules.orders.router import router as orders_router\nfrom app.modules.users.router import router as users_router\n\napp = FastAPI(title="Modular Monolith")\napp.include_router(users_router, prefix="/api/v1")\napp.include_router(orders_router, prefix="/api/v1")` }
      ],
      relatedPatterns: ['microservice-boundary-decision', 'clean-architecture-light'],
      searchKeywords: ['modular monolith', 'module boundary', 'monolith']
    }),
  pattern({
      id: 'microservice-boundary-decision',
      title: 'Microservice Boundary Decision',
      vietnameseTitle: 'Khi nào mới tách microservice',
      shortDescription: 'Decision guide giúp tránh tách microservice quá sớm và xác định boundary theo domain, data ownership, scale và team ownership.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['FastAPI', 'Message Queue', 'OpenTelemetry'],
      whyUse: ['Module cần scale/deploy độc lập.', 'Team ownership tách rõ.', 'Data ownership và SLA khác nhau.'],
      whyNotUse: ['Chưa có monitoring/retry/tracing.', 'Team nhỏ và domain chưa ổn định.', 'Chỉ muốn code trông hiện đại.'],
      installCommand: 'no install required',
      folderStructure: `services/user-service/\nservices/billing-service/\nshared/contracts/`,
      codeTemplates: [
        { filename: 'docs/microservice-boundary-checklist.md', language: 'markdown', variant: 'minimal', description: 'Checklist trước khi tách service.', code: `# Microservice Boundary Checklist\n\n- Does this domain own its data?\n- Can it deploy independently?\n- Does it need separate scaling?\n- Is there a clear API/event contract?\n- Do we have tracing, retry, idempotency and alerts?\n\nIf most answers are no, keep it a modular monolith.` }
      ],
      relatedPatterns: ['modular-monolith-structure', 'outbox-pattern'],
      searchKeywords: ['microservice', 'boundary', 'modular monolith']
    }),
  pattern({
      id: 'cqrs-basic-pattern',
      title: 'CQRS Basic Pattern',
      vietnameseTitle: 'CQRS cơ bản: tách command và query',
      shortDescription: 'Tách luồng ghi dữ liệu và đọc dữ liệu khi read model khác write model hoặc query quá phức tạp.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['FastAPI', 'SQLAlchemy', 'Pydantic'],
      whyUse: ['Query đọc phức tạp hơn command ghi.', 'Cần read model tối ưu cho dashboard/report.', 'Muốn tách command handler và query handler.'],
      whyNotUse: ['CRUD đơn giản.', 'Không có nhu cầu read/write model khác nhau.'],
      installCommand: 'pip install fastapi sqlalchemy pydantic',
      folderStructure: `app/application/commands/\napp/application/queries/`,
      codeTemplates: [
        { filename: 'app/application/commands/create_order.py', language: 'python', variant: 'minimal', description: 'Command handler xử lý ghi.', code: `class CreateOrderHandler:\n    def __init__(self, repo):\n        self.repo = repo\n\n    def handle(self, command):\n        order = Order.create(customer_id=command.customer_id, items=command.items)\n        return self.repo.save(order)` },
        { filename: 'app/application/queries/get_order_summary.py', language: 'python', variant: 'production', description: 'Query handler đọc projection/dashboard data.', code: `class GetOrderSummaryQuery:\n    def __init__(self, db):\n        self.db = db\n\n    def execute(self, customer_id: int):\n        return self.db.execute("""\n            select status, count(*) as total\n            from orders where customer_id = :customer_id\n            group by status\n        """, {"customer_id": customer_id}).mappings().all()` }
      ],
      relatedPatterns: ['read-model-projection', 'modular-monolith-structure'],
      searchKeywords: ['cqrs', 'command query', 'read model']
    }),
  pattern({
      id: 'read-model-projection',
      title: 'Read Model Projection',
      vietnameseTitle: 'Projection cho read model',
      shortDescription: 'Tạo bảng/view dữ liệu đọc nhanh cho dashboard, search, report thay vì query phức tạp trực tiếp từ transactional tables.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['SQLAlchemy', 'Celery', 'PostgreSQL'],
      whyUse: ['Dashboard query chậm.', 'Read data cần format khác write data.', 'Cần rebuild projection khi logic thay đổi.'],
      whyNotUse: ['Data ít và query đơn giản.', 'Chưa có event/job pipeline.'],
      installCommand: 'pip install sqlalchemy celery',
      folderStructure: `app/projections/order_summary.py\napp/tasks/rebuild_projection.py`,
      codeTemplates: [
        { filename: 'app/projections/order_summary.py', language: 'python', variant: 'minimal', description: 'Rebuild projection từ bảng orders.', code: `def rebuild_order_summary(db):\n    db.execute("delete from order_summary")\n    db.execute("""\n        insert into order_summary(customer_id, total_orders)\n        select customer_id, count(*) from orders group by customer_id\n    """)` }
      ],
      relatedPatterns: ['cqrs-basic-pattern', 'celery-worker-setup'],
      searchKeywords: ['projection', 'read model', 'dashboard']
    }),
  pattern({
      id: 'outbox-pattern',
      title: 'Transactional Outbox Pattern',
      vietnameseTitle: 'Outbox pattern chống mất event',
      shortDescription: 'Ghi business data và event vào cùng transaction, worker đọc outbox để publish event an toàn.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['SQLAlchemy', 'Celery', 'PostgreSQL'],
      whyUse: ['Cần không mất event sau khi commit DB.', 'Webhook/payment/order cần publish event chắc chắn.', 'Muốn retry publish độc lập.'],
      whyNotUse: ['App không có event async.', 'Không có worker xử lý outbox.'],
      installCommand: 'pip install sqlalchemy celery',
      folderStructure: `app/models/outbox_event.py\napp/tasks/publish_outbox.py`,
      codeTemplates: [
        { filename: 'app/models/outbox_event.py', language: 'python', variant: 'minimal', description: 'Outbox table lưu event trong cùng transaction.', code: `class OutboxEvent(Base):\n    __tablename__ = "outbox_events"\n\n    id = mapped_column(UUID, primary_key=True)\n    event_type = mapped_column(String, nullable=False)\n    payload = mapped_column(JSON, nullable=False)\n    status = mapped_column(String, default="pending")\n    created_at = mapped_column(DateTime, server_default=func.now())` },
        { filename: 'app/tasks/publish_outbox.py', language: 'python', variant: 'production', description: 'Worker publish event pending và mark sent.', code: `def publish_pending_outbox(db, publisher):\n    events = db.query(OutboxEvent).filter_by(status="pending").limit(100).all()\n    for event in events:\n        publisher.publish(event.event_type, event.payload)\n        event.status = "sent"\n    db.commit()` },
        { filename: 'tests/test_outbox.py', language: 'python', variant: 'test', description: 'Đảm bảo tạo order cũng tạo outbox event trong cùng transaction.', code: `def test_create_order_writes_outbox_event(db):\n    order = create_order(db, customer_id=1)\n    events = db.query(OutboxEvent).all()\n    assert order.id is not None\n    assert events[0].event_type == "order.created"` }
      ],
      relatedPatterns: ['idempotent-consumer-pattern', 'retry-backoff-policy'],
      searchKeywords: ['outbox', 'transactional outbox', 'event publish']
    }),
  pattern({
      id: 'inbox-pattern',
      title: 'Inbox Pattern for Message Deduplication',
      vietnameseTitle: 'Inbox pattern chống xử lý message trùng',
      shortDescription: 'Lưu message id đã xử lý để consumer/webhook không chạy lại business logic khi nhận event trùng.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['SQLAlchemy', 'Redis'],
      whyUse: ['Message broker hoặc webhook có thể gửi lại event.', 'Payment/order update phải idempotent.', 'Consumer cần retry an toàn.'],
      whyNotUse: ['Event không quan trọng hoặc xử lý trùng không sao.', 'Không có event/message pipeline.'],
      installCommand: 'pip install sqlalchemy redis',
      folderStructure: `app/models/inbox_message.py\napp/services/message_consumer.py`,
      codeTemplates: [
        { filename: 'app/services/message_consumer.py', language: 'python', variant: 'minimal', description: 'Check message id trước khi xử lý.', code: `def handle_message(message, db):\n    if db.query(InboxMessage).filter_by(message_id=message.id).first():\n        return "duplicate"\n\n    process_business_event(message.payload)\n    db.add(InboxMessage(message_id=message.id, status="processed"))\n    db.commit()\n    return "processed"` }
      ],
      relatedPatterns: ['outbox-pattern', 'webhook-signature-verification'],
      searchKeywords: ['inbox', 'deduplication', 'duplicate message']
    }),
  pattern({
      id: 'api-gateway-bff-pattern',
      title: 'API Gateway / BFF Pattern',
      vietnameseTitle: 'API Gateway / Backend-for-Frontend',
      shortDescription: 'Dùng gateway/BFF để gom API theo nhu cầu frontend, che giấu service nội bộ và chuẩn hóa auth/rate limit.',
      category: 'architecture',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['FastAPI', 'httpx'],
      whyUse: ['Frontend cần response riêng theo màn hình.', 'Có nhiều service nội bộ.', 'Cần auth/rate limit/logging ở một lớp.'],
      whyNotUse: ['Monolith đơn giản là đủ.', 'Gateway chỉ proxy mù không thêm giá trị.'],
      installCommand: 'pip install fastapi httpx',
      folderStructure: `app/bff/dashboard_router.py`,
      codeTemplates: [
        { filename: 'app/bff/dashboard_router.py', language: 'python', variant: 'minimal', description: 'BFF endpoint gom nhiều nguồn dữ liệu cho dashboard.', code: `@router.get("/dashboard")\ndef dashboard(current_user = Depends(get_current_user)):\n    profile = user_client.get_profile(current_user.id)\n    orders = order_client.get_recent_orders(current_user.id)\n    notifications = notification_client.list_unread(current_user.id)\n    return {"profile": profile, "orders": orders, "notifications": notifications}` }
      ],
      relatedPatterns: ['microservice-boundary-decision', 'timeout-strategy'],
      searchKeywords: ['bff', 'api gateway', 'backend for frontend']
    }),
  pattern({
      id: 'feature-module-boundary',
      title: 'Feature Module Boundary',
      vietnameseTitle: 'Ranh giới module theo feature/domain',
      shortDescription: 'Cách quyết định file nào thuộc module nào để tránh shared folder trở thành nơi chứa mọi thứ.',
      category: 'architecture',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI'],
      whyUse: ['Project nhiều module domain.', 'Shared folder đang phình to.', 'Team cần ownership rõ.'],
      whyNotUse: ['App vài file nhỏ.', 'Domain chưa rõ.'],
      installCommand: 'no install required',
      folderStructure: `app/modules/billing/\napp/modules/users/\napp/shared/`,
      codeTemplates: [
        { filename: 'docs/module-boundary.md', language: 'markdown', variant: 'minimal', description: 'Checklist quyết định module boundary.', code: `# Module Boundary Rules\n\nPut code inside a feature module if:\n- It uses domain vocabulary of that feature\n- It changes when that feature changes\n- It should be owned by the feature team\n\nPut code in shared only if:\n- It is truly generic\n- It has no domain vocabulary\n- Multiple modules use it without business coupling` }
      ],
      relatedPatterns: ['modular-monolith-structure'],
      searchKeywords: ['module boundary', 'feature module', 'shared folder']
    })
];
