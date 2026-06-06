import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const FASTAPI_INTERNALS_PATTERNS: Pattern[] = [
  pattern({
    id: 'fastapi-lifespan-resources',
    title: 'FastAPI Lifespan Resources',
    vietnameseTitle: 'Quản lý resource bằng lifespan',
    shortDescription: 'Dùng lifespan để tạo/đóng client, pool, model hoặc cache resource thay vì global khởi tạo lộn xộn.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI"],
    whyUse: ["Cần quản lý HTTP client/DB/vector client", "Resource phải close khi app shutdown", "Muốn test app sạch hơn"],
    whyNotUse: ["Script nhỏ không có resource dài hạn", "Chạy serverless rất ngắn hạn"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/main.py`,
    codeTemplates: [
      { filename: 'app/main.py', language: 'python', variant: 'production', description: 'Dùng lifespan để tạo/đóng client, pool, model hoặc cache resource thay vì global khởi tạo lộn xộn.', code: `@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    app.state.http = httpx.AsyncClient(timeout=10)\n    yield\n    await app.state.http.aclose()\n\napp = FastAPI(lifespan=lifespan)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-project-structure"],
    searchKeywords: ["lifespan", "startup", "shutdown"]
  }),
  pattern({
    id: 'fastapi-dependency-injection-advanced',
    title: 'FastAPI Dependency Injection Advanced',
    vietnameseTitle: 'Dependency injection nâng cao',
    shortDescription: 'Tổ chức dependency theo auth, tenant, service và repository để tránh router quá dày.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI"],
    whyUse: ["Router đang chứa nhiều setup service", "Cần inject tenant/service/db", "Muốn override dependency trong test"],
    whyNotUse: ["App nhỏ vài endpoint", "Dependency chain quá phức tạp không cần thiết"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/dependencies/services.py`,
    codeTemplates: [
      { filename: 'app/dependencies/services.py', language: 'python', variant: 'production', description: 'Tổ chức dependency theo auth, tenant, service và repository để tránh router quá dày.', code: `def get_project_service(db=Depends(get_db), tenant=Depends(get_tenant_context)):\n    repo = ProjectRepository(db, tenant)\n    return ProjectService(repo=repo, tenant=tenant)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["tenant-aware-query-filter"],
    searchKeywords: ["depends", "dependency injection"]
  }),
  pattern({
    id: 'fastapi-middleware-ordering',
    title: 'FastAPI Middleware Ordering',
    vietnameseTitle: 'Thứ tự middleware FastAPI',
    shortDescription: 'Quản lý thứ tự CORS, correlation ID, logging, auth-like middleware và error handling để tránh bug khó tìm.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Starlette"],
    whyUse: ["Có nhiều middleware", "Log thiếu request id", "CORS/error handling hoạt động lạ"],
    whyNotUse: ["Chỉ có một middleware đơn giản", "Không cần cross-cutting concerns"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/main.py`,
    codeTemplates: [
      { filename: 'app/main.py', language: 'python', variant: 'production', description: 'Quản lý thứ tự CORS, correlation ID, logging, auth-like middleware và error handling để tránh bug khó tìm.', code: `app.add_middleware(CORSMiddleware, allow_origins=settings.allowed_origins)\napp.add_middleware(CorrelationIdMiddleware)\napp.add_middleware(AccessLogMiddleware)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["correlation-id-middleware"],
    searchKeywords: ["middleware order", "cors", "logging"]
  }),
  pattern({
    id: 'fastapi-openapi-customization',
    title: 'FastAPI OpenAPI Customization',
    vietnameseTitle: 'Tùy biến OpenAPI FastAPI',
    shortDescription: 'Tùy biến schema, tags, security scheme và metadata để docs/API contract chuyên nghiệp hơn.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "OpenAPI"],
    whyUse: ["API public hoặc team frontend phụ thuộc docs", "Cần security scheme JWT/API key rõ", "Cần tag/summary nhất quán"],
    whyNotUse: ["API nội bộ nhỏ", "Không dùng generated docs"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/openapi.py`,
    codeTemplates: [
      { filename: 'app/openapi.py', language: 'python', variant: 'production', description: 'Tùy biến schema, tags, security scheme và metadata để docs/API contract chuyên nghiệp hơn.', code: `def custom_openapi():\n    schema = get_openapi(title='Backend API', version='1.0.0', routes=app.routes)\n    schema['components']['securitySchemes'] = {'BearerAuth': {'type': 'http', 'scheme': 'bearer'}}\n    return schema\napp.openapi = custom_openapi` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["openapi-customization"],
    searchKeywords: ["openapi", "swagger", "schema"]
  }),
  pattern({
    id: 'fastapi-async-testing-anyio',
    title: 'FastAPI Async Testing with AnyIO',
    vietnameseTitle: 'Test async FastAPI bằng AnyIO',
    shortDescription: 'Test async endpoints/services với httpx AsyncClient và anyio để tránh lỗi event loop.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "AnyIO", "HTTPX", "pytest"],
    whyUse: ["Endpoint async thật", "Service dùng async DB/client", "TestClient sync không đủ"],
    whyNotUse: ["Toàn bộ app sync", "Không dùng async dependencies"],
    installCommand: 'pip install pytest anyio httpx',
    folderStructure: `tests/test_async_api.py`,
    codeTemplates: [
      { filename: 'tests/test_async_api.py', language: 'python', variant: 'production', description: 'Test async endpoints/services với httpx AsyncClient và anyio để tránh lỗi event loop.', code: `@pytest.mark.anyio\nasync def test_health_async(app):\n    async with AsyncClient(app=app, base_url='http://test') as client:\n        res = await client.get('/health')\n    assert res.status_code == 200` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pytest-api-tests"],
    searchKeywords: ["anyio", "async test", "httpx"]
  }),
  pattern({
    id: 'fastapi-exception-hierarchy',
    title: 'FastAPI Exception Hierarchy',
    vietnameseTitle: 'Hệ thống exception chuẩn',
    shortDescription: 'Tạo domain exception và handler thống nhất để API error nhất quán, dễ test và không lộ stack trace.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Pydantic"],
    whyUse: ["Nhiều service raise lỗi khác nhau", "Frontend cần error code ổn định", "Muốn log lỗi production rõ"],
    whyNotUse: ["API nhỏ chưa nhiều lỗi", "Chỉ prototype"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/core/exceptions.py`,
    codeTemplates: [
      { filename: 'app/core/exceptions.py', language: 'python', variant: 'production', description: 'Tạo domain exception và handler thống nhất để API error nhất quán, dễ test và không lộ stack trace.', code: `class AppError(Exception):\n    code = 'app_error'\n    status_code = 400\n\nclass ResourceNotFound(AppError):\n    code = 'not_found'\n    status_code = 404` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-error-taxonomy"],
    searchKeywords: ["exception", "error handler"]
  }),
  pattern({
    id: 'fastapi-api-compatibility-policy',
    title: 'FastAPI Compatibility Policy',
    vietnameseTitle: 'Chính sách tương thích API',
    shortDescription: 'Đặt rule không phá vỡ client: additive changes, deprecation window, versioning và contract tests.',
    category: 'fastapi-internals',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "OpenAPI"],
    whyUse: ["Có client/mobile/third-party dùng API", "Cần tránh breaking change", "API sống lâu"],
    whyNotUse: ["API nội bộ đổi tùy ý", "Chưa có external client"],
    installCommand: 'no install required',
    folderStructure: `docs/api/compatibility-policy.md`,
    codeTemplates: [
      { filename: 'docs/api/compatibility-policy.md', language: 'python', variant: 'production', description: 'Đặt rule không phá vỡ client: additive changes, deprecation window, versioning và contract tests.', code: `# API Compatibility Policy\n\n- Add fields, do not rename/remove without deprecation.\n- New required request fields require new version.\n- Error code changes are breaking.\n- Deprecation window: 90 days minimum.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-deprecation-policy"],
    searchKeywords: ["compatibility", "breaking change"]
  }),
  pattern({
    id: 'fastapi-background-lifespan-queue',
    title: 'FastAPI In-process Queue Boundary',
    vietnameseTitle: 'Ranh giới queue trong FastAPI',
    shortDescription: 'Biết khi nào dùng BackgroundTasks/in-process queue và khi nào bắt buộc chuyển sang Celery/worker.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Celery"],
    whyUse: ["Task nhỏ vài giây", "Cần gửi email/log nhẹ", "Muốn tránh timeout"],
    whyNotUse: ["Task dài, cần retry, cần scale worker", "OCR/import/export nặng"],
    installCommand: 'pip install fastapi celery',
    folderStructure: `docs/fastapi/background-boundary.md`,
    codeTemplates: [
      { filename: 'docs/fastapi/background-boundary.md', language: 'python', variant: 'production', description: 'Biết khi nào dùng BackgroundTasks/in-process queue và khi nào bắt buộc chuyển sang Celery/worker.', code: `# Boundary\n\nUse BackgroundTasks for small non-critical side effects.\nUse Celery/RQ for long, retryable, expensive, or user-visible jobs.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["celery-worker-setup"],
    searchKeywords: ["backgroundtasks", "queue boundary"]
  }),
  pattern({
    id: 'fastapi-router-versioning-governance',
    title: 'FastAPI Router Versioning Governance',
    vietnameseTitle: 'Quản trị version router FastAPI',
    shortDescription: 'Tổ chức /v1, /v2 và deprecation để API versioning không loạn.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI"],
    whyUse: ["API có nhiều client", "Cần giữ v1 trong khi phát triển v2", "Muốn governance rõ"],
    whyNotUse: ["Internal API nhỏ", "Không cần versioning"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/api/v1/router.py`,
    codeTemplates: [
      { filename: 'app/api/v1/router.py', language: 'python', variant: 'production', description: 'Tổ chức /v1, /v2 và deprecation để API versioning không loạn.', code: `api_v1 = APIRouter(prefix='/v1')\napi_v1.include_router(users_router, prefix='/users', tags=['Users'])\napp.include_router(api_v1, prefix='/api')` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-versioning-router"],
    searchKeywords: ["versioning", "router governance"]
  }),
  pattern({
    id: 'fastapi-security-dependencies',
    title: 'FastAPI Security Dependencies',
    vietnameseTitle: 'Security dependency chuẩn',
    shortDescription: 'Tách require_user, require_scope, require_tenant để endpoint đọc rõ quyền cần thiết.',
    category: 'fastapi-internals',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI"],
    whyUse: ["Nhiều endpoint có quyền khác nhau", "Cần scope/tenant/role", "Muốn tránh copy paste auth logic"],
    whyNotUse: ["API public", "Chỉ một quyền global"],
    installCommand: 'pip install fastapi',
    folderStructure: `app/dependencies/security.py`,
    codeTemplates: [
      { filename: 'app/dependencies/security.py', language: 'python', variant: 'production', description: 'Tách require_user, require_scope, require_tenant để endpoint đọc rõ quyền cần thiết.', code: `def require_scope(scope: str):\n    def dep(user=Depends(get_current_user)):\n        if scope not in user.scopes:\n            raise HTTPException(status_code=403, detail='Missing scope')\n        return user\n    return dep` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["advanced-rbac-tenant-roles"],
    searchKeywords: ["security dependencies", "scope"]
  })
];
