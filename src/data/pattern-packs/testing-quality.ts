import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const TESTING_QUALITY_PATTERNS: Pattern[] = [
  pattern({
    id: 'property-based-testing-hypothesis',
    title: 'Property-based Testing with Hypothesis',
    vietnameseTitle: 'Test theo thuộc tính bằng Hypothesis',
    shortDescription: 'Sinh nhiều input edge cases để test validation, parser, calculator, pricing và business rules.',
    category: 'testing-quality',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Hypothesis", "pytest"],
    whyUse: ["Logic có nhiều input edge cases", "Validation dễ bỏ sót case", "Muốn tăng chất lượng test"],
    whyNotUse: ["Endpoint đơn giản ít logic", "Team chưa quen property tests"],
    installCommand: 'pip install hypothesis',
    folderStructure: `tests/test_property.py`,
    codeTemplates: [
      { filename: 'tests/test_property.py', language: 'python', variant: 'production', description: 'Sinh nhiều input edge cases để test validation, parser, calculator, pricing và business rules.', code: `@given(st.text(min_size=1, max_size=100))\ndef test_slugify_never_empty(value):\n    assert slugify(value)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pytest-api-tests"],
    searchKeywords: ["hypothesis", "property test"]
  }),
  pattern({
    id: 'mutation-testing-python',
    title: 'Mutation Testing Python',
    vietnameseTitle: 'Mutation testing Python',
    shortDescription: 'Đo test suite có thực sự bắt lỗi không bằng cách mutate code và xem test có fail.',
    category: 'testing-quality',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["mutmut", "pytest"],
    whyUse: ["Test coverage cao nhưng vẫn lo thiếu assert", "Logic critical như billing/permissions", "Muốn cải thiện test quality"],
    whyNotUse: ["Test suite còn rất nhỏ/chậm", "Prototype"],
    installCommand: 'pip install mutmut',
    folderStructure: `docs/testing/mutation-testing.md`,
    codeTemplates: [
      { filename: 'docs/testing/mutation-testing.md', language: 'python', variant: 'production', description: 'Đo test suite có thực sự bắt lỗi không bằng cách mutate code và xem test có fail.', code: `mutmut run\nmutmut results\nmutmut show <mutation_id>` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pytest-api-tests"],
    searchKeywords: ["mutation testing"]
  }),
  pattern({
    id: 'api-e2e-flow-testing',
    title: 'API E2E Flow Testing',
    vietnameseTitle: 'Test luồng API end-to-end',
    shortDescription: 'Test luồng nhiều bước như register→login→create→update→delete để bắt lỗi tích hợp.',
    category: 'testing-quality',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["pytest", "HTTPX"],
    whyUse: ["Nhiều endpoint liên quan nhau", "Muốn test user journey thật", "Cần confidence trước deploy"],
    whyNotUse: ["Chỉ unit test service nhỏ", "API chưa ổn định"],
    installCommand: 'pip install pytest httpx',
    folderStructure: `tests/test_e2e_flow.py`,
    codeTemplates: [
      { filename: 'tests/test_e2e_flow.py', language: 'python', variant: 'production', description: 'Test luồng nhiều bước như register→login→create→update→delete để bắt lỗi tích hợp.', code: `def test_user_project_flow(client):\n    token = register_and_login(client)\n    project_id = create_project(client, token)\n    assert get_project(client, token, project_id).status_code == 200` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pytest-api-tests"],
    searchKeywords: ["e2e api test"]
  }),
  pattern({
    id: 'consumer-driven-contract-testing',
    title: 'Consumer-driven Contract Testing',
    vietnameseTitle: 'Contract test theo consumer',
    shortDescription: 'Đảm bảo backend không phá contract mà frontend/mobile/third-party đang dùng.',
    category: 'testing-quality',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Pact", "pytest"],
    whyUse: ["Nhiều consumer gọi API", "Release backend/frontend lệch nhau", "Cần phát hiện breaking change"],
    whyNotUse: ["Một app fullstack deploy cùng lúc", "Không có external client"],
    installCommand: 'pip install pact-python',
    folderStructure: `docs/testing/consumer-contract.md`,
    codeTemplates: [
      { filename: 'docs/testing/consumer-contract.md', language: 'python', variant: 'production', description: 'Đảm bảo backend không phá contract mà frontend/mobile/third-party đang dùng.', code: `# Consumer Contract\n\n- Consumer defines expected request/response.\n- Provider verifies contract in CI.\n- Breaking changes require new version.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-contract-testing"],
    searchKeywords: ["consumer contract", "pact"]
  }),
  pattern({
    id: 'load-test-scenarios',
    title: 'Load Test Scenarios by Endpoint',
    vietnameseTitle: 'Kịch bản load test theo endpoint',
    shortDescription: 'Tạo kịch bản load test riêng cho read-heavy, write-heavy, upload, RAG và auth endpoints.',
    category: 'testing-quality',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Locust"],
    whyUse: ["Chuẩn bị production traffic", "Cần biết endpoint nào nghẽn", "Muốn đo p95/p99"],
    whyNotUse: ["Prototype chưa có traffic", "Không có môi trường test"],
    installCommand: 'pip install locust',
    folderStructure: `locustfile.py`,
    codeTemplates: [
      { filename: 'locustfile.py', language: 'python', variant: 'production', description: 'Tạo kịch bản load test riêng cho read-heavy, write-heavy, upload, RAG và auth endpoints.', code: `class ApiUser(HttpUser):\n    wait_time = between(1, 3)\n    @task\n    def list_projects(self):\n        self.client.get('/api/projects')` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["locust-load-test"],
    searchKeywords: ["load test", "locust"]
  }),
  pattern({
    id: 'test-data-factory-pattern',
    title: 'Test Data Factory Pattern',
    vietnameseTitle: 'Factory tạo dữ liệu test',
    shortDescription: 'Dùng factory để tạo user/org/project nhất quán, tránh fixture rối và test phụ thuộc nhau.',
    category: 'testing-quality',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["factory_boy", "pytest"],
    whyUse: ["Test nhiều model liên quan", "Fixture bị trùng lặp", "Cần tạo data nhanh"],
    whyNotUse: ["Test rất ít", "Không dùng ORM"],
    installCommand: 'pip install factory_boy',
    folderStructure: `tests/factories.py`,
    codeTemplates: [
      { filename: 'tests/factories.py', language: 'python', variant: 'production', description: 'Dùng factory để tạo user/org/project nhất quán, tránh fixture rối và test phụ thuộc nhau.', code: `class UserFactory(factory.alchemy.SQLAlchemyModelFactory):\n    class Meta:\n        model = User\n    email = factory.Sequence(lambda n: f'user{n}@example.com')` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["django-testing-fixtures"],
    searchKeywords: ["factory_boy", "test data"]
  }),
  pattern({
    id: 'snapshot-openapi-testing',
    title: 'OpenAPI Snapshot Testing',
    vietnameseTitle: 'Snapshot test OpenAPI schema',
    shortDescription: 'Lưu snapshot schema để phát hiện thay đổi API ngoài ý muốn.',
    category: 'testing-quality',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["pytest", "OpenAPI"],
    whyUse: ["API contract quan trọng", "Muốn biết schema đổi khi nào", "Có SDK/generated client"],
    whyNotUse: ["Schema thay đổi liên tục có chủ đích", "API internal nhỏ"],
    installCommand: 'pip install pytest',
    folderStructure: `tests/test_openapi_snapshot.py`,
    codeTemplates: [
      { filename: 'tests/test_openapi_snapshot.py', language: 'python', variant: 'production', description: 'Lưu snapshot schema để phát hiện thay đổi API ngoài ý muốn.', code: `def test_openapi_snapshot(client, snapshot):\n    schema = client.get('/openapi.json').json()\n    snapshot.assert_match(schema)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["api-sdk-generation"],
    searchKeywords: ["openapi snapshot"]
  }),
  pattern({
    id: 'testcontainers-integration',
    title: 'Testcontainers Integration Tests',
    vietnameseTitle: 'Integration test bằng Testcontainers',
    shortDescription: 'Chạy PostgreSQL/Redis thật trong test để bắt lỗi khác biệt với mock/in-memory.',
    category: 'testing-quality',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["testcontainers", "pytest"],
    whyUse: ["Cần test DB/Redis behavior thật", "Mock không đủ tin cậy", "CI có Docker"],
    whyNotUse: ["CI không chạy Docker", "Unit test đủ cho logic nhỏ"],
    installCommand: 'pip install testcontainers',
    folderStructure: `tests/test_postgres_container.py`,
    codeTemplates: [
      { filename: 'tests/test_postgres_container.py', language: 'python', variant: 'production', description: 'Chạy PostgreSQL/Redis thật trong test để bắt lỗi khác biệt với mock/in-memory.', code: `def test_with_postgres_container():\n    with PostgresContainer('postgres:16') as pg:\n        assert pg.get_connection_url()` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["pytest-api-tests"],
    searchKeywords: ["testcontainers", "integration test"]
  })
];
