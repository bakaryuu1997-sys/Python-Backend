import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const API_BASICS_PATTERNS: Pattern[] = [
  pattern({
      id: 'pydantic-schema-validation', title: 'Pydantic Request and Response Schema', vietnameseTitle: 'Validate request/response bằng Pydantic', shortDescription: 'Chuẩn hóa input/output API, tránh trả thừa field nhạy cảm và giảm lỗi dữ liệu.', category: 'api-basics', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['Pydantic', 'FastAPI'],
      whyUse: ['Cần validate request body.', 'Cần response_model không trả password_hash.', 'Cần document OpenAPI rõ cho frontend.'], whyNotUse: ['Script nội bộ không nhận input bên ngoài.', 'Luồng dữ liệu đã được validate bởi framework khác.'], installCommand: 'pip install pydantic email-validator', folderStructure: `app/schemas/user_schema.py`,
      codeTemplates: [{ filename: 'app/schemas/user_schema.py', language: 'python', description: 'Schema tách create/read/update.', code: `from pydantic import BaseModel, EmailStr, Field\n\nclass UserCreate(BaseModel):\n    email: EmailStr\n    password: str = Field(min_length=8, max_length=128)\n\nclass UserRead(BaseModel):\n    id: int\n    email: EmailStr\n    is_active: bool\n\n    model_config = {"from_attributes": True}` }], relatedPatterns: ['fastapi-crud-api', 'jwt-auth-api']
    }),
  pattern({ id: 'pagination-filtering-sorting', title: 'Pagination Filtering Sorting API', vietnameseTitle: 'Phân trang, lọc, sắp xếp API', shortDescription: 'Template query list API với limit/offset, filter whitelist và sort whitelist.', category: 'api-basics', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI', 'SQLAlchemy', 'Pydantic'], whyUse: ['API trả danh sách nhiều bản ghi.', 'Frontend cần search/filter/sort.', 'Cần tránh sort field không cho phép.'], whyNotUse: ['Endpoint trả vài item cố định.', 'Dữ liệu realtime cần cursor riêng.'], installCommand: 'pip install fastapi sqlalchemy', folderStructure: `app/routers/items_router.py`, codeTemplates: [{ filename: 'app/routers/items_router.py', language: 'python', description: 'Pagination query params.', code: `from fastapi import Query\n\ndef list_items(limit: int = Query(20, le=100), offset: int = Query(0, ge=0), sort: str = "created_at"):\n    allowed_sort = {"created_at", "name", "price"}\n    if sort not in allowed_sort:\n        sort = "created_at"\n    return {"limit": limit, "offset": offset, "sort": sort}` }], relatedPatterns: ['fastapi-crud-api'] }),
  pattern({ id: 'global-error-handling', title: 'Global Error Handling', vietnameseTitle: 'Xử lý lỗi API toàn cục', shortDescription: 'Chuẩn hóa error response, custom exception và validation error để frontend dễ xử lý.', category: 'api-basics', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI', 'Pydantic'], whyUse: ['Muốn error format thống nhất.', 'Không muốn lộ stack trace.', 'Frontend cần code/message/details rõ.'], whyNotUse: ['Script nội bộ không có API.', 'Framework đã có handler riêng đủ dùng.'], installCommand: 'pip install fastapi', folderStructure: `app/core/errors.py`, codeTemplates: [{ filename: 'app/core/errors.py', language: 'python', description: 'Custom error handler.', code: `from fastapi import Request\nfrom fastapi.responses import JSONResponse\n\nclass AppError(Exception):\n    def __init__(self, code: str, message: str, status_code: int = 400):\n        self.code = code\n        self.message = message\n        self.status_code = status_code\n\nasync def app_error_handler(request: Request, exc: AppError):\n    return JSONResponse(status_code=exc.status_code, content={"error": {"code": exc.code, "message": exc.message}})` }], relatedPatterns: ['request-logging'] }),
  pattern({ id: 'settings-management', title: 'Settings Management with pydantic-settings', vietnameseTitle: 'Quản lý cấu hình .env', shortDescription: 'Đọc cấu hình từ environment, tách dev/staging/prod và tránh hard-code secret.', category: 'api-basics', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['pydantic-settings'], whyUse: ['Cần DATABASE_URL/JWT_SECRET.', 'Deploy nhiều môi trường.', 'Không muốn hard-code config.'], whyNotUse: ['Script nhỏ không có config.', 'App frontend static không có secret backend.'], installCommand: 'pip install pydantic-settings', folderStructure: `app/core/config.py`, codeTemplates: [{ filename: 'app/core/config.py', language: 'python', description: 'Settings typed.', code: `from pydantic_settings import BaseSettings, SettingsConfigDict\n\nclass Settings(BaseSettings):\n    DATABASE_URL: str\n    JWT_SECRET: str\n    model_config = SettingsConfigDict(env_file=".env", extra="ignore")\n\nsettings = Settings()` }], relatedPatterns: ['jwt-auth-api', 'sqlalchemy-session-pattern'] }),
  pattern({
    "id": "api-versioning-router",
    "title": "API Versioning Router",
    "vietnameseTitle": "Version API v1/v2 bằng router prefix",
    "shortDescription": "Tổ chức API theo version để frontend/mobile không vỡ khi backend thay đổi contract.",
    "category": "api-basics",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "whyUse": [
      "Có nhiều client dùng API cùng lúc.",
      "Cần thay đổi response/request mà không phá app cũ.",
      "Cần deprecate endpoint có kế hoạch."
    ],
    "whyNotUse": [
      "Prototype nội bộ chỉ có một client.",
      "API chưa public và chưa có contract ổn định."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/api/v1/router.py\napp/api/v2/router.py",
    "codeTemplates": [
      {
        "filename": "app/main.py",
        "language": "python",
        "description": "Mount router theo version rõ ràng.",
        "code": "from fastapi import FastAPI\nfrom app.api.v1.router import router as v1_router\nfrom app.api.v2.router import router as v2_router\n\napp = FastAPI(title=\"Backend API\")\napp.include_router(v1_router, prefix=\"/api/v1\")\napp.include_router(v2_router, prefix=\"/api/v2\")",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_api_versioning.py",
        "language": "python",
        "description": "Test v1/v2 cùng tồn tại.",
        "code": "def test_v1_health(client):\n    assert client.get(\"/api/v1/health\").status_code == 200\n\ndef test_v2_health(client):\n    assert client.get(\"/api/v2/health\").status_code == 200",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "fastapi-project-structure"
    ],
    "searchKeywords": [
      "versioning",
      "api contract",
      "deprecate"
    ]
  }),
  pattern({
    "id": "flask-blueprint-api",
    "title": "Flask Blueprint API",
    "vietnameseTitle": "API Flask bằng Blueprint",
    "shortDescription": "Cấu trúc Flask nhỏ gọn với Blueprint, config và error handler cho API đơn giản.",
    "category": "api-basics",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "Flask"
    ],
    "whyUse": [
      "App API nhỏ, cần kiểm soát tối giản.",
      "Không cần FastAPI/OpenAPI mạnh.",
      "Team quen Flask."
    ],
    "whyNotUse": [
      "Cần type validation/OpenAPI tự động.",
      "Dự án lớn cần nhiều convention."
    ],
    "installCommand": "pip install flask",
    "folderStructure": "app/__init__.py\napp/users/routes.py",
    "codeTemplates": [
      {
        "filename": "app/users/routes.py",
        "language": "python",
        "description": "Blueprint endpoint.",
        "code": "from flask import Blueprint, jsonify, request\n\nbp = Blueprint(\"users\", __name__, url_prefix=\"/users\")\n\n@bp.post(\"\")\ndef create_user():\n    payload = request.get_json() or {}\n    if \"email\" not in payload:\n        return jsonify({\"error\": \"email is required\"}), 422\n    return jsonify({\"email\": payload[\"email\"]}), 201",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_flask_users.py",
        "language": "python",
        "description": "Test validation.",
        "code": "def test_create_user_requires_email(client):\n    res = client.post(\"/users\", json={})\n    assert res.status_code == 422",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "fastapi-crud-api"
    ],
    "searchKeywords": [
      "flask",
      "blueprint",
      "minimal api"
    ]
  }),
  pattern({
    "id": "websocket-connection-manager",
    "title": "WebSocket Connection Manager",
    "vietnameseTitle": "Quản lý kết nối WebSocket",
    "shortDescription": "Connection manager cho realtime notification/status, broadcast và disconnect an toàn.",
    "category": "api-basics",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "WebSocket"
    ],
    "whyUse": [
      "Cần realtime status/progress.",
      "Chat hoặc notification live.",
      "Polling không đủ tốt."
    ],
    "whyNotUse": [
      "Chỉ cần stream một chiều thì dùng SSE.",
      "Không cần realtime."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/realtime/connection_manager.py",
    "codeTemplates": [
      {
        "filename": "app/realtime/connection_manager.py",
        "language": "python",
        "description": "Connection manager.",
        "code": "from fastapi import WebSocket\n\nclass ConnectionManager:\n    def __init__(self):\n        self.active: dict[str, WebSocket] = {}\n\n    async def connect(self, user_id: str, websocket: WebSocket):\n        await websocket.accept()\n        self.active[user_id] = websocket\n\n    def disconnect(self, user_id: str):\n        self.active.pop(user_id, None)\n\n    async def send_to_user(self, user_id: str, message: dict):\n        websocket = self.active.get(user_id)\n        if websocket:\n            await websocket.send_json(message)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_connection_manager.py",
        "language": "python",
        "description": "Disconnect xóa connection.",
        "code": "def test_disconnect_removes_user():\n    manager = ConnectionManager()\n    manager.active[\"u1\"] = object()\n    manager.disconnect(\"u1\")\n    assert \"u1\" not in manager.active",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "job-status-api",
      "llm-streaming-sse"
    ],
    "searchKeywords": [
      "websocket",
      "realtime",
      "notification"
    ]
  }),
  pattern({
    "id": "sse-job-progress",
    "title": "Server-Sent Events Job Progress",
    "vietnameseTitle": "SSE stream tiến độ job",
    "shortDescription": "Stream tiến độ OCR/export/import bằng SSE khi không cần WebSocket hai chiều.",
    "category": "api-basics",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "StreamingResponse"
    ],
    "whyUse": [
      "Frontend cần xem job progress realtime.",
      "Chỉ cần server gửi client một chiều.",
      "Muốn đơn giản hơn WebSocket."
    ],
    "whyNotUse": [
      "Cần client gửi message realtime ngược lại.",
      "Proxy không hỗ trợ SSE."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/routers/events_router.py",
    "codeTemplates": [
      {
        "filename": "app/routers/events_router.py",
        "language": "python",
        "description": "SSE progress stream.",
        "code": "import asyncio\nfrom fastapi import APIRouter\nfrom fastapi.responses import StreamingResponse\n\nrouter = APIRouter(prefix=\"/events\")\n\nasync def progress_stream(job_id: str):\n    for progress in [10, 30, 60, 100]:\n        yield f\"event: progress\\ndata: {progress}\\n\\n\"\n        await asyncio.sleep(0.2)\n\n@router.get(\"/jobs/{job_id}\")\ndef stream_job(job_id: str):\n    return StreamingResponse(progress_stream(job_id), media_type=\"text/event-stream\")",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_sse_job.py",
        "language": "python",
        "description": "Endpoint SSE trả đúng content-type.",
        "code": "def test_sse_content_type(client):\n    res = client.get(\"/events/jobs/job_1\")\n    assert \"text/event-stream\" in res.headers[\"content-type\"]",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "job-status-api",
      "llm-streaming-sse"
    ],
    "searchKeywords": [
      "sse",
      "progress",
      "eventsource"
    ]
  }),
  pattern({
    "id": "openapi-customization",
    "title": "OpenAPI Documentation Customization",
    "vietnameseTitle": "Tùy chỉnh OpenAPI docs",
    "shortDescription": "Thêm tags, security scheme, response examples để frontend và QA dùng API dễ hơn.",
    "category": "api-basics",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "whyUse": [
      "Cần chia API docs theo module.",
      "Frontend cần example request/response.",
      "Cần mô tả auth trong Swagger."
    ],
    "whyNotUse": [
      "API private không cần docs.",
      "Dự án dùng framework khác."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/main.py",
    "codeTemplates": [
      {
        "filename": "app/main.py",
        "language": "python",
        "description": "OpenAPI metadata và tags.",
        "code": "from fastapi import FastAPI\n\ntags_metadata = [\n    {\"name\": \"Auth\", \"description\": \"Login, refresh token, current user\"},\n    {\"name\": \"OCR\", \"description\": \"Image/PDF OCR processing\"},\n]\n\napp = FastAPI(\n    title=\"Backend API\",\n    version=\"1.0.0\",\n    openapi_tags=tags_metadata,\n)",
        "variant": "minimal"
      }
    ],
    "relatedPatterns": [
      "fastapi-project-structure"
    ],
    "searchKeywords": [
      "openapi",
      "swagger",
      "docs"
    ]
  })
];
