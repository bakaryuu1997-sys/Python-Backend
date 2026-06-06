import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const TESTING_PATTERNS: Pattern[] = [
  pattern({ id: 'request-logging', title: 'Request Logging with Correlation ID', vietnameseTitle: 'Logging request + correlation ID', shortDescription: 'Middleware gắn request id, log method/path/status/time và hỗ trợ debug production.', category: 'testing', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['FastAPI', 'logging'], whyUse: ['Cần trace lỗi production.', 'Cần correlation id giữa frontend/backend.', 'Cần log thời gian xử lý request.'], whyNotUse: ['App CLI không có HTTP request.', 'Đã có observability gateway xử lý.'], installCommand: 'pip install fastapi', folderStructure: `app/middleware/request_logging.py`, codeTemplates: [{ filename: 'app/middleware/request_logging.py', language: 'python', description: 'Middleware logging.', code: `import time, uuid, logging\nfrom starlette.middleware.base import BaseHTTPMiddleware\n\nlogger = logging.getLogger("api")\n\nclass RequestLoggingMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request, call_next):\n        request_id = request.headers.get("x-request-id", str(uuid.uuid4()))\n        start = time.perf_counter()\n        response = await call_next(request)\n        duration = round((time.perf_counter() - start) * 1000, 2)\n        response.headers["x-request-id"] = request_id\n        logger.info("request", extra={"request_id": request_id, "path": request.url.path, "status": response.status_code, "ms": duration})\n        return response` }], relatedPatterns: ['global-error-handling'] }),
  pattern({ id: 'pytest-api-tests', title: 'Pytest API Tests with httpx', vietnameseTitle: 'Test API bằng pytest/httpx', shortDescription: 'Test endpoint FastAPI, fixture test client, assert status code và response schema.', category: 'testing', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['pytest', 'httpx', 'FastAPI'], whyUse: ['Cần kiểm tra API trước deploy.', 'Cần test auth/upload/webhook.', 'Cần CI chạy tự động.'], whyNotUse: ['Prototype throwaway.', 'Chỉ test unit service không cần HTTP client.'], installCommand: 'pip install pytest httpx pytest-asyncio', folderStructure: `tests/test_users_api.py`, codeTemplates: [{ filename: 'tests/test_health.py', language: 'python', description: 'Test health endpoint.', code: `from fastapi.testclient import TestClient\nfrom app.main import app\n\nclient = TestClient(app)\n\ndef test_healthcheck():\n    res = client.get("/health")\n    assert res.status_code == 200\n    assert res.json()["status"] == "ok"` }], relatedPatterns: ['healthcheck-endpoint'] }),
  pattern({
    "id": "mock-external-api",
    "title": "Mock External API in Tests",
    "vietnameseTitle": "Mock API bên ngoài trong test",
    "shortDescription": "Mock payment/OCR/LLM/email provider để test nhanh, ổn định và không tốn tiền.",
    "category": "testing",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "respx",
      "httpx"
    ],
    "whyUse": [
      "Service gọi API ngoài.",
      "Test CI không được phụ thuộc network.",
      "Cần kiểm tra retry/error handling."
    ],
    "whyNotUse": [
      "Không gọi external API.",
      "Chỉ test bằng contract sandbox riêng."
    ],
    "installCommand": "pip install pytest respx httpx",
    "folderStructure": "tests/test_external_api.py",
    "codeTemplates": [
      {
        "filename": "tests/test_external_api.py",
        "language": "python",
        "description": "Mock HTTP bằng respx.",
        "code": "import httpx\nimport respx\n\n@respx.mock\ndef test_provider_call():\n    route = respx.post(\"https://api.provider.test/send\").mock(return_value=httpx.Response(200, json={\"ok\": True}))\n    res = httpx.post(\"https://api.provider.test/send\", json={\"message\": \"hello\"})\n    assert res.json()[\"ok\"] is True\n    assert route.called",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "mock",
      "external api",
      "respx"
    ]
  }),
  pattern({
    "id": "test-database-fixture",
    "title": "Test Database Fixture",
    "vietnameseTitle": "Test database fixture",
    "shortDescription": "Tạo database/session riêng cho test, rollback sau mỗi test để kết quả ổn định.",
    "category": "testing",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "SQLAlchemy"
    ],
    "whyUse": [
      "API dùng database.",
      "Cần test repository/service thật.",
      "CI cần dữ liệu sạch mỗi test."
    ],
    "whyNotUse": [
      "Không dùng DB.",
      "Chỉ unit test pure function."
    ],
    "installCommand": "pip install pytest sqlalchemy",
    "folderStructure": "tests/conftest.py",
    "codeTemplates": [
      {
        "filename": "tests/conftest.py",
        "language": "python",
        "description": "Session rollback fixture.",
        "code": "import pytest\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\n\n@pytest.fixture\ndef db_session():\n    engine = create_engine(\"sqlite:///:memory:\")\n    TestingSession = sessionmaker(bind=engine)\n    session = TestingSession()\n    try:\n        yield session\n    finally:\n        session.rollback()\n        session.close()",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_repository.py",
        "language": "python",
        "description": "Repository dùng fixture.",
        "code": "def test_repository_creates_user(db_session, user_repository):\n    user = user_repository.create(db_session, email=\"a@example.com\")\n    assert user.email == \"a@example.com\"",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern",
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "test db",
      "fixture",
      "rollback"
    ]
  }),
  pattern({
    "id": "locust-load-test",
    "title": "Load Testing with Locust",
    "vietnameseTitle": "Load test API bằng Locust",
    "shortDescription": "Kiểm tra endpoint chịu tải, latency p95 và lỗi trước khi production.",
    "category": "testing",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "Locust"
    ],
    "whyUse": [
      "API quan trọng cần kiểm tra tải.",
      "Muốn phát hiện bottleneck DB/cache.",
      "Trước release lớn."
    ],
    "whyNotUse": [
      "App nhỏ chưa có traffic.",
      "Chưa có môi trường staging."
    ],
    "installCommand": "pip install locust",
    "folderStructure": "locustfile.py",
    "codeTemplates": [
      {
        "filename": "locustfile.py",
        "language": "python",
        "description": "Locust smoke load test.",
        "code": "from locust import HttpUser, task, between\n\nclass ApiUser(HttpUser):\n    wait_time = between(1, 3)\n\n    @task\n    def health(self):\n        self.client.get(\"/health\")\n\n    @task\n    def list_users(self):\n        self.client.get(\"/api/v1/users?limit=20\")",
        "variant": "minimal"
      },
      {
        "filename": "commands.sh",
        "language": "bash",
        "description": "Chạy load test.",
        "code": "locust -f locustfile.py --host=http://localhost:8000",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "prometheus-metrics"
    ],
    "searchKeywords": [
      "load test",
      "performance",
      "locust"
    ]
  })
];
