import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const API_GOVERNANCE_PATTERNS: Pattern[] = [
  pattern({
    id: 'api-error-taxonomy',
    title: 'API Error Code Taxonomy',
    vietnameseTitle: 'Phân loại mã lỗi API',
    shortDescription: 'Chuẩn hóa error code/status/message để frontend và client SDK xử lý ổn định.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["OpenAPI", "FastAPI"],
    whyUse: ["Frontend cần xử lý lỗi theo code", "API public cần contract ổn định", "Muốn giảm lỗi message parsing"],
    whyNotUse: ["Prototype nội bộ nhỏ", "Không có client phụ thuộc"],
    installCommand: 'no install required',
    folderStructure: `docs/api/error-taxonomy.md`,
    codeTemplates: [
      { filename: 'docs/api/error-taxonomy.md', language: 'python', variant: 'production', description: 'Chuẩn hóa error code/status/message để frontend và client SDK xử lý ổn định.', code: `# API Error Taxonomy\n\n- auth.invalid_token -> 401\n- permission.denied -> 403\n- resource.not_found -> 404\n- validation.invalid_input -> 422\n- rate_limit.exceeded -> 429` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-exception-hierarchy"],
    searchKeywords: ["error taxonomy", "api errors"]
  }),
  pattern({
    id: 'api-idempotency-contract',
    title: 'API Idempotency Contract',
    vietnameseTitle: 'Contract idempotency API',
    shortDescription: 'Định nghĩa endpoint nào cần Idempotency-Key và cách lưu response để retry an toàn.',
    category: 'api-governance',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Redis"],
    whyUse: ["Payment/order/create job có thể retry", "Client/mobile có network retry", "Muốn tránh tạo duplicate resource"],
    whyNotUse: ["GET/read endpoint", "Action không gây side effect"],
    installCommand: 'pip install redis',
    folderStructure: `app/api/idempotency.py`,
    codeTemplates: [
      { filename: 'app/api/idempotency.py', language: 'python', variant: 'production', description: 'Định nghĩa endpoint nào cần Idempotency-Key và cách lưu response để retry an toàn.', code: `def require_idempotency_key(request: Request):\n    key = request.headers.get('Idempotency-Key')\n    if not key:\n        raise HTTPException(400, 'Missing Idempotency-Key')\n    return key` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["payment-webhook-handler"],
    searchKeywords: ["idempotency", "retry contract"]
  }),
  pattern({
    id: 'api-pagination-contract',
    title: 'API Pagination Contract',
    vietnameseTitle: 'Contract phân trang API',
    shortDescription: 'Chuẩn hóa cursor/limit pagination để tránh response lớn và kết quả không ổn định.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Pydantic"],
    whyUse: ["List endpoint có nhiều dữ liệu", "Client cần next cursor", "Offset pagination bắt đầu chậm"],
    whyNotUse: ["Dữ liệu rất nhỏ", "Admin internal page đơn giản"],
    installCommand: 'pip install pydantic',
    folderStructure: `app/schemas/pagination.py`,
    codeTemplates: [
      { filename: 'app/schemas/pagination.py', language: 'python', variant: 'production', description: 'Chuẩn hóa cursor/limit pagination để tránh response lớn và kết quả không ổn định.', code: `class Page(BaseModel):\n    items: list[Any]\n    next_cursor: str | None = None\n    limit: int` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pagination-filtering-sorting"],
    searchKeywords: ["cursor pagination"]
  }),
  pattern({
    id: 'api-deprecation-policy',
    title: 'API Deprecation Policy',
    vietnameseTitle: 'Chính sách deprecated API',
    shortDescription: 'Thông báo, header và timeline khi endpoint/field sắp bị bỏ để client có thời gian migrate.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["OpenAPI"],
    whyUse: ["API có client bên ngoài", "Cần thay field/endpoint cũ", "Muốn tránh breaking change đột ngột"],
    whyNotUse: ["API internal có thể đổi đồng bộ", "Chưa có client phụ thuộc"],
    installCommand: 'no install required',
    folderStructure: `docs/api/deprecation-policy.md`,
    codeTemplates: [
      { filename: 'docs/api/deprecation-policy.md', language: 'python', variant: 'production', description: 'Thông báo, header và timeline khi endpoint/field sắp bị bỏ để client có thời gian migrate.', code: `# API Deprecation Policy\n\n- Add Deprecation header.\n- Publish sunset date.\n- Provide replacement endpoint.\n- Keep minimum 90 days for public API.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-api-compatibility-policy"],
    searchKeywords: ["deprecation", "sunset"]
  }),
  pattern({
    id: 'api-sdk-generation',
    title: 'API SDK Generation',
    vietnameseTitle: 'Sinh SDK từ OpenAPI',
    shortDescription: 'Dùng OpenAPI để generate client SDK TypeScript/Python, giảm lỗi contract giữa frontend/backend.',
    category: 'api-governance',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["OpenAPI"],
    whyUse: ["Frontend/client SDK gọi nhiều endpoint", "API public cần DX tốt", "Muốn type-safe client"],
    whyNotUse: ["API nhỏ vài endpoint", "OpenAPI chưa ổn định"],
    installCommand: 'npx openapi-typescript schema.json -o api.ts',
    folderStructure: `docs/api/sdk-generation.md`,
    codeTemplates: [
      { filename: 'docs/api/sdk-generation.md', language: 'python', variant: 'production', description: 'Dùng OpenAPI để generate client SDK TypeScript/Python, giảm lỗi contract giữa frontend/backend.', code: `# SDK Generation\n\n1. Export OpenAPI schema.\n2. Generate TypeScript client.\n3. Commit generated client or publish package.\n4. Run contract tests.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-openapi-customization"],
    searchKeywords: ["sdk", "openapi client"]
  }),
  pattern({
    id: 'api-webhook-retry-contract',
    title: 'Webhook Retry Contract',
    vietnameseTitle: 'Contract retry webhook',
    shortDescription: 'Định nghĩa retry, timeout, signature, idempotency và event ordering cho webhook provider/consumer.',
    category: 'api-governance',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI"],
    whyUse: ["Bạn gửi webhook cho khách hàng", "Cần retry khi endpoint khách hàng lỗi", "Cần event delivery log"],
    whyNotUse: ["Không phát webhook ra ngoài", "Chỉ nhận webhook"],
    installCommand: 'no install required',
    folderStructure: `docs/api/webhook-retry-contract.md`,
    codeTemplates: [
      { filename: 'docs/api/webhook-retry-contract.md', language: 'python', variant: 'production', description: 'Định nghĩa retry, timeout, signature, idempotency và event ordering cho webhook provider/consumer.', code: `# Webhook Retry Contract\n\n- Sign every event.\n- Timeout after 10s.\n- Retry with exponential backoff.\n- Include event_id.\n- Consumer must be idempotent.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["webhook-signature-verification"],
    searchKeywords: ["webhook retry", "event delivery"]
  }),
  pattern({
    id: 'api-contract-testing',
    title: 'API Contract Testing',
    vietnameseTitle: 'Contract testing API',
    shortDescription: 'Kiểm tra response/request khớp OpenAPI để tránh breaking changes không phát hiện.',
    category: 'api-governance',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Schemathesis", "pytest"],
    whyUse: ["API public hoặc frontend phụ thuộc schema", "Muốn phát hiện breaking change sớm", "Có OpenAPI schema"],
    whyNotUse: ["API nhỏ không có schema", "Chưa ổn định contract"],
    installCommand: 'pip install schemathesis',
    folderStructure: `tests/test_contract.py`,
    codeTemplates: [
      { filename: 'tests/test_contract.py', language: 'python', variant: 'production', description: 'Kiểm tra response/request khớp OpenAPI để tránh breaking changes không phát hiện.', code: `import schemathesis\n\nschema = schemathesis.from_uri('http://localhost:8000/openapi.json')\n\n@schema.parametrize()\ndef test_api_contract(case):\n    response = case.call()\n    case.validate_response(response)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-sdk-generation"],
    searchKeywords: ["contract testing", "schemathesis"]
  }),
  pattern({
    id: 'api-backward-compatible-changes',
    title: 'Backward-compatible API Changes',
    vietnameseTitle: 'Thay đổi API tương thích ngược',
    shortDescription: 'Checklist thay đổi API không làm hỏng client cũ: field additive, optional, versioned behavior.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["OpenAPI"],
    whyUse: ["API có nhiều client", "Cần release thường xuyên", "Muốn giảm incident do breaking change"],
    whyNotUse: ["Client và backend deploy cùng lúc luôn", "API private thử nghiệm"],
    installCommand: 'no install required',
    folderStructure: `docs/api/backward-compatible.md`,
    codeTemplates: [
      { filename: 'docs/api/backward-compatible.md', language: 'python', variant: 'production', description: 'Checklist thay đổi API không làm hỏng client cũ: field additive, optional, versioned behavior.', code: `# Compatible Changes\n\nSafe: add optional response field, add endpoint, add enum only if clients tolerate.\nRisky: rename/remove field, change type, change error code, add required request field.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-api-compatibility-policy"],
    searchKeywords: ["backward compatible"]
  }),
  pattern({
    id: 'api-rate-limit-contract',
    title: 'API Rate Limit Contract',
    vietnameseTitle: 'Contract rate limit API',
    shortDescription: 'Thiết kế header limit/remaining/reset và error 429 rõ ràng cho client retry hợp lý.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Redis"],
    whyUse: ["Public API cần giới hạn request", "Client cần biết retry khi nào", "Muốn tránh abuse"],
    whyNotUse: ["Internal API sau gateway đã limit", "Traffic thấp"],
    installCommand: 'pip install redis',
    folderStructure: `docs/api/rate-limit-contract.md`,
    codeTemplates: [
      { filename: 'docs/api/rate-limit-contract.md', language: 'python', variant: 'production', description: 'Thiết kế header limit/remaining/reset và error 429 rõ ràng cho client retry hợp lý.', code: `# Rate Limit Contract\n\nReturn headers:\n- X-RateLimit-Limit\n- X-RateLimit-Remaining\n- X-RateLimit-Reset\n\n429 body includes retry_after_seconds.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["rate-limit-login"],
    searchKeywords: ["rate limit contract"]
  }),
  pattern({
    id: 'api-version-routing-strategy',
    title: 'API Version Routing Strategy',
    vietnameseTitle: 'Chiến lược route version API',
    shortDescription: 'Chọn path/header/media type versioning và rule duy trì version cũ.',
    category: 'api-governance',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["FastAPI", "Django REST Framework"],
    whyUse: ["API public cần version lâu dài", "Có breaking change sắp tới", "Client upgrade chậm"],
    whyNotUse: ["API nội bộ deploy đồng bộ", "Không có breaking change"],
    installCommand: 'no install required',
    folderStructure: `docs/api/versioning-strategy.md`,
    codeTemplates: [
      { filename: 'docs/api/versioning-strategy.md', language: 'python', variant: 'production', description: 'Chọn path/header/media type versioning và rule duy trì version cũ.', code: `# Versioning Strategy\n\nPrefer path versioning for public APIs: /api/v1.\nKeep old version during migration.\nDocument sunset date for deprecated versions.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["fastapi-router-versioning-governance"],
    searchKeywords: ["api versioning"]
  })
];
