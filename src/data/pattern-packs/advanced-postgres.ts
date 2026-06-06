import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const ADVANCED_POSTGRES_PATTERNS: Pattern[] = [
  pattern({
    id: 'postgres-transaction-isolation',
    title: 'PostgreSQL Transaction Isolation',
    vietnameseTitle: 'Isolation level trong PostgreSQL',
    shortDescription: 'Chọn isolation level đúng để tránh dirty/non-repeatable/phantom read khi xử lý tiền, tồn kho hoặc booking.',
    category: 'advanced-postgres',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "SQLAlchemy"],
    whyUse: ["Luồng có nhiều giao dịch ghi đồng thời", "Cần consistency cao hơn READ COMMITTED", "Có xử lý tiền, quota, tồn kho hoặc reservation"],
    whyNotUse: ["CRUD đơn giản không tranh chấp", "Không hiểu rõ lock và retry strategy"],
    installCommand: 'pip install sqlalchemy psycopg',
    folderStructure: `app/db/transaction.py`,
    codeTemplates: [
      { filename: 'app/db/transaction.py', language: 'python', variant: 'production', description: 'Chọn isolation level đúng để tránh dirty/non-repeatable/phantom read khi xử lý tiền, tồn kho hoặc booking.', code: `def run_serializable(session_factory, fn):\n    for attempt in range(3):\n        try:\n            with session_factory() as session:\n                session.execute(text('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE'))\n                result = fn(session)\n                session.commit()\n                return result\n        except SerializationFailure:\n            if attempt == 2:\n                raise` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["retry-backoff-policy"],
    searchKeywords: ["transaction isolation", "serializable", "postgres"]
  }),
  pattern({
    id: 'postgres-deadlock-handling',
    title: 'PostgreSQL Deadlock Handling',
    vietnameseTitle: 'Xử lý deadlock PostgreSQL',
    shortDescription: 'Thiết kế thứ tự lock, retry và logging để giảm lỗi deadlock trong production.',
    category: 'advanced-postgres',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "SQLAlchemy"],
    whyUse: ["Có nhiều transaction update nhiều bảng", "Log có deadlock detected", "Cần retry an toàn cho transaction idempotent"],
    whyNotUse: ["Một transaction chỉ đọc dữ liệu", "Không có cạnh tranh ghi"],
    installCommand: 'pip install sqlalchemy psycopg',
    folderStructure: `app/db/deadlock_retry.py`,
    codeTemplates: [
      { filename: 'app/db/deadlock_retry.py', language: 'python', variant: 'production', description: 'Thiết kế thứ tự lock, retry và logging để giảm lỗi deadlock trong production.', code: `def retry_on_deadlock(fn):\n    for attempt in range(3):\n        try:\n            return fn()\n        except OperationalError as exc:\n            if 'deadlock detected' not in str(exc).lower() or attempt == 2:\n                raise\n            time.sleep(0.1 * (2 ** attempt))` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["postgres-transaction-isolation"],
    searchKeywords: ["deadlock", "retry", "lock order"]
  }),
  pattern({
    id: 'postgres-advisory-locks',
    title: 'PostgreSQL Advisory Locks',
    vietnameseTitle: 'Advisory lock PostgreSQL',
    shortDescription: 'Dùng advisory lock để bảo vệ tác vụ theo key như billing cycle, import job hoặc scheduled task.',
    category: 'advanced-postgres',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "SQLAlchemy"],
    whyUse: ["Cần chỉ một process xử lý một key", "Cron/job có thể chạy trùng", "Muốn lock nhẹ không cần row cụ thể"],
    whyNotUse: ["Cần lock row data chuẩn", "Không có PostgreSQL"],
    installCommand: 'pip install sqlalchemy',
    folderStructure: `app/db/advisory_lock.py`,
    codeTemplates: [
      { filename: 'app/db/advisory_lock.py', language: 'python', variant: 'production', description: 'Dùng advisory lock để bảo vệ tác vụ theo key như billing cycle, import job hoặc scheduled task.', code: `def try_advisory_lock(session, key: int) -> bool:\n    return bool(session.execute(text('SELECT pg_try_advisory_lock(:key)'), {'key': key}).scalar())\n\ndef release_advisory_lock(session, key: int) -> None:\n    session.execute(text('SELECT pg_advisory_unlock(:key)'), {'key': key})` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["distributed-lock-redis"],
    searchKeywords: ["advisory lock", "pg_try_advisory_lock"]
  }),
  pattern({
    id: 'postgres-partial-indexes',
    title: 'PostgreSQL Partial Indexes',
    vietnameseTitle: 'Partial index PostgreSQL',
    shortDescription: 'Tạo index có điều kiện để tăng tốc query phổ biến mà không phình index toàn bảng.',
    category: 'advanced-postgres',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "Alembic"],
    whyUse: ["Query thường filter status/deleted_at/tenant", "Bảng lớn nhưng chỉ một phần row active", "Muốn giảm index size"],
    whyNotUse: ["Bảng nhỏ", "Điều kiện query thay đổi liên tục"],
    installCommand: 'pip install alembic',
    folderStructure: `migrations/add_partial_index.py`,
    codeTemplates: [
      { filename: 'migrations/add_partial_index.py', language: 'python', variant: 'production', description: 'Tạo index có điều kiện để tăng tốc query phổ biến mà không phình index toàn bảng.', code: `def upgrade():\n    op.execute('CREATE INDEX CONCURRENTLY IF NOT EXISTS ix_orders_active_tenant ON orders (tenant_id, created_at DESC) WHERE deleted_at IS NULL')\n\ndef downgrade():\n    op.execute('DROP INDEX CONCURRENTLY IF EXISTS ix_orders_active_tenant')` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["soft-delete-restore-pattern"],
    searchKeywords: ["partial index", "concurrent index"]
  }),
  pattern({
    id: 'postgres-materialized-views',
    title: 'PostgreSQL Materialized Views',
    vietnameseTitle: 'Materialized view cho báo cáo',
    shortDescription: 'Dùng materialized view cho dashboard/report nặng, refresh theo lịch để tránh query trực tiếp quá chậm.',
    category: 'advanced-postgres',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "SQLAlchemy"],
    whyUse: ["Dashboard aggregate chậm", "Report đọc nhiều ghi ít", "Có thể chấp nhận dữ liệu trễ"],
    whyNotUse: ["Cần real-time tuyệt đối", "Dữ liệu nhỏ query trực tiếp được"],
    installCommand: 'pip install sqlalchemy',
    folderStructure: `app/reports/materialized_view.py`,
    codeTemplates: [
      { filename: 'app/reports/materialized_view.py', language: 'python', variant: 'production', description: 'Dùng materialized view cho dashboard/report nặng, refresh theo lịch để tránh query trực tiếp quá chậm.', code: `def refresh_report_view(session):\n    session.execute(text('REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_revenue'))\n    session.commit()` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["scheduled-cleanup-job"],
    searchKeywords: ["materialized view", "reporting"]
  }),
  pattern({
    id: 'postgres-partitioning',
    title: 'PostgreSQL Partitioning Strategy',
    vietnameseTitle: 'Partitioning PostgreSQL',
    shortDescription: 'Partition bảng lớn theo thời gian/tenant để quản lý dữ liệu, retention và query performance.',
    category: 'advanced-postgres',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL"],
    whyUse: ["Bảng log/event rất lớn", "Cần retention theo tháng", "Query chủ yếu theo time range"],
    whyNotUse: ["Bảng vừa nhỏ", "Team chưa vận hành partition"],
    installCommand: 'no install required',
    folderStructure: `docs/database/partitioning.md`,
    codeTemplates: [
      { filename: 'docs/database/partitioning.md', language: 'python', variant: 'production', description: 'Partition bảng lớn theo thời gian/tenant để quản lý dữ liệu, retention và query performance.', code: `# Partitioning Strategy\n\n- Partition by created_at for append-only logs/events.\n- Keep indexes per partition small.\n- Automate partition creation.\n- Test retention/drop old partitions safely.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["data-retention-policy"],
    searchKeywords: ["partitioning", "large table"]
  }),
  pattern({
    id: 'postgres-read-replicas',
    title: 'Read Replica Routing',
    vietnameseTitle: 'Routing đọc sang read replica',
    shortDescription: 'Tách read/write database routing để giảm tải primary nhưng vẫn tránh stale read trong luồng nhạy cảm.',
    category: 'advanced-postgres',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "SQLAlchemy"],
    whyUse: ["Read-heavy API", "Có read replica", "Cần giảm tải primary"],
    whyNotUse: ["Cần read-after-write consistency tuyệt đối", "Chưa có replica monitoring"],
    installCommand: 'pip install sqlalchemy',
    folderStructure: `app/db/routing.py`,
    codeTemplates: [
      { filename: 'app/db/routing.py', language: 'python', variant: 'production', description: 'Tách read/write database routing để giảm tải primary nhưng vẫn tránh stale read trong luồng nhạy cảm.', code: `def get_read_session():\n    return ReadSessionLocal()\n\ndef get_write_session():\n    return WriteSessionLocal()\n\ndef should_use_primary(request):\n    return request.headers.get('X-Require-Fresh') == '1'` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["redis-cache-aside"],
    searchKeywords: ["read replica", "routing", "stale read"]
  }),
  pattern({
    id: 'postgres-pool-tuning',
    title: 'PostgreSQL Connection Pool Tuning',
    vietnameseTitle: 'Tuning connection pool PostgreSQL',
    shortDescription: 'Cấu hình pool size, overflow, timeout để tránh hết connection hoặc queue request quá lâu.',
    category: 'advanced-postgres',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["SQLAlchemy", "PostgreSQL"],
    whyUse: ["API bị timeout do pool exhausted", "Có nhiều worker/process", "Database giới hạn max_connections"],
    whyNotUse: ["Traffic thấp", "Dùng serverless DB với pooling riêng chưa hiểu rõ"],
    installCommand: 'pip install sqlalchemy',
    folderStructure: `app/db/engine.py`,
    codeTemplates: [
      { filename: 'app/db/engine.py', language: 'python', variant: 'production', description: 'Cấu hình pool size, overflow, timeout để tránh hết connection hoặc queue request quá lâu.', code: `engine = create_engine(\n    settings.database_url,\n    pool_size=10,\n    max_overflow=20,\n    pool_timeout=5,\n    pool_pre_ping=True,\n)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["structured-json-logging"],
    searchKeywords: ["connection pool", "pool_size", "max_connections"]
  }),
  pattern({
    id: 'postgres-query-plan-playbook',
    title: 'Query Plan Playbook',
    vietnameseTitle: 'Playbook đọc EXPLAIN ANALYZE',
    shortDescription: 'Quy trình đọc EXPLAIN ANALYZE để tìm seq scan, bad join, missing index và row estimate sai.',
    category: 'advanced-postgres',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL"],
    whyUse: ["Query chậm không rõ lý do", "Cần quyết định thêm index hay rewrite query", "Muốn debug production safely"],
    whyNotUse: ["Không có query chậm", "Bảng nhỏ"],
    installCommand: 'no install required',
    folderStructure: `docs/database/query-plan.md`,
    codeTemplates: [
      { filename: 'docs/database/query-plan.md', language: 'python', variant: 'production', description: 'Quy trình đọc EXPLAIN ANALYZE để tìm seq scan, bad join, missing index và row estimate sai.', code: `# Query Plan Playbook\n\n1. Run EXPLAIN (ANALYZE, BUFFERS).\n2. Check actual vs estimated rows.\n3. Look for Seq Scan on large table.\n4. Check Sort/Hash memory usage.\n5. Add targeted index, then re-measure.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["database-index-query-plan"],
    searchKeywords: ["explain analyze", "query plan"]
  }),
  pattern({
    id: 'postgres-jsonb-patterns',
    title: 'PostgreSQL JSONB Patterns',
    vietnameseTitle: 'Pattern dùng JSONB an toàn',
    shortDescription: 'Dùng JSONB cho metadata linh hoạt nhưng vẫn kiểm soát index, validation và migration khi schema ổn định.',
    category: 'advanced-postgres',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "Pydantic"],
    whyUse: ["Metadata thay đổi theo provider", "Cần lưu payload webhook/raw event", "Một số field chưa ổn định schema"],
    whyNotUse: ["Dữ liệu quan hệ rõ nên dùng column", "Cần query phức tạp trên mọi key"],
    installCommand: 'pip install pydantic',
    folderStructure: `app/schemas/metadata.py`,
    codeTemplates: [
      { filename: 'app/schemas/metadata.py', language: 'python', variant: 'production', description: 'Dùng JSONB cho metadata linh hoạt nhưng vẫn kiểm soát index, validation và migration khi schema ổn định.', code: `class WebhookMetadata(BaseModel):\n    provider_event_id: str\n    raw_type: str\n    extra: dict[str, Any] = Field(default_factory=dict)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["webhook-signature-verification"],
    searchKeywords: ["jsonb", "metadata", "gin index"]
  })
];
