import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DATA_ENGINEERING_PATTERNS: Pattern[] = [
  pattern({
    id: 'etl-job-structure',
    title: 'ETL Job Structure',
    vietnameseTitle: 'Cấu trúc ETL job Python',
    shortDescription: 'Tổ chức extract-transform-load thành các bước test được, idempotent và có checkpoint.',
    category: 'data-engineering',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Python", "Celery"],
    whyUse: ["Import dữ liệu định kỳ", "Pipeline nhiều bước", "Cần retry/checkpoint"],
    whyNotUse: ["Import nhỏ một lần", "Không lưu dữ liệu"],
    installCommand: 'pip install pydantic',
    folderStructure: `app/etl/job.py`,
    codeTemplates: [
      { filename: 'app/etl/job.py', language: 'python', variant: 'production', description: 'Tổ chức extract-transform-load thành các bước test được, idempotent và có checkpoint.', code: `def run_etl(job_id):\n    raw = extract(job_id)\n    rows = transform(raw)\n    load(rows)\n    mark_done(job_id)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["csv-import-validation"],
    searchKeywords: ["etl", "pipeline"]
  }),
  pattern({
    id: 'data-validation-pipeline',
    title: 'Data Validation Pipeline',
    vietnameseTitle: 'Pipeline validate dữ liệu',
    shortDescription: 'Validate schema, required fields, ranges và business rules trước khi import vào DB.',
    category: 'data-engineering',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["Pydantic", "Great Expectations"],
    whyUse: ["Import CSV/Excel/API data", "Dữ liệu bẩn gây lỗi production", "Cần report dòng lỗi"],
    whyNotUse: ["Dữ liệu đã kiểm soát 100%", "Import thủ công nhỏ"],
    installCommand: 'pip install pydantic great_expectations',
    folderStructure: `app/data/validation.py`,
    codeTemplates: [
      { filename: 'app/data/validation.py', language: 'python', variant: 'production', description: 'Validate schema, required fields, ranges và business rules trước khi import vào DB.', code: `class ImportRow(BaseModel):\n    email: EmailStr\n    amount: Decimal\n    created_at: date` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["csv-import-validation"],
    searchKeywords: ["data validation"]
  }),
  pattern({
    id: 'big-csv-import',
    title: 'Big CSV Import Pattern',
    vietnameseTitle: 'Import CSV lớn',
    shortDescription: 'Import file CSV lớn theo chunk, validate từng dòng và ghi batch để tránh hết RAM.',
    category: 'data-engineering',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["pandas", "SQLAlchemy"],
    whyUse: ["CSV hàng trăm MB/GB", "Cần progress/error report", "Không thể load toàn bộ vào RAM"],
    whyNotUse: ["File nhỏ vài nghìn dòng", "Dữ liệu real-time"],
    installCommand: 'pip install pandas',
    folderStructure: `app/imports/big_csv.py`,
    codeTemplates: [
      { filename: 'app/imports/big_csv.py', language: 'python', variant: 'production', description: 'Import file CSV lớn theo chunk, validate từng dòng và ghi batch để tránh hết RAM.', code: `for chunk in pd.read_csv(path, chunksize=5000):\n    valid_rows = validate_chunk(chunk)\n    bulk_insert(valid_rows)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["large-file-chunked-upload"],
    searchKeywords: ["big csv", "chunk import"]
  }),
  pattern({
    id: 'data-reconciliation-job',
    title: 'Data Reconciliation Job',
    vietnameseTitle: 'Job đối soát dữ liệu',
    shortDescription: 'So sánh dữ liệu giữa hệ thống, phát hiện lệch và tạo report/action để sửa.',
    category: 'data-engineering',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["SQLAlchemy", "pandas"],
    whyUse: ["Payment/order/report cần khớp nhau", "Có sync external provider", "Cần phát hiện thiếu/thừa record"],
    whyNotUse: ["Không có external data", "Dữ liệu nhỏ kiểm thủ công"],
    installCommand: 'pip install pandas',
    folderStructure: `app/reconciliation/job.py`,
    codeTemplates: [
      { filename: 'app/reconciliation/job.py', language: 'python', variant: 'production', description: 'So sánh dữ liệu giữa hệ thống, phát hiện lệch và tạo report/action để sửa.', code: `def reconcile(local_rows, provider_rows):\n    local_ids = {r.id for r in local_rows}\n    provider_ids = {r.id for r in provider_rows}\n    return {'missing_local': provider_ids - local_ids, 'missing_provider': local_ids - provider_ids}` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["payment-webhook-handler"],
    searchKeywords: ["reconciliation", "data mismatch"]
  }),
  pattern({
    id: 'event-driven-projections',
    title: 'Event-driven Projections',
    vietnameseTitle: 'Projection từ event',
    shortDescription: 'Build read model/analytics table từ event stream để query nhanh và tách write/read concern.',
    category: 'data-engineering',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL", "Celery"],
    whyUse: ["Cần dashboard/read model nhanh", "Có event/outbox", "Query trực tiếp từ domain tables quá chậm"],
    whyNotUse: ["App CRUD nhỏ", "Không có event history"],
    installCommand: 'pip install sqlalchemy',
    folderStructure: `app/projections/projector.py`,
    codeTemplates: [
      { filename: 'app/projections/projector.py', language: 'python', variant: 'production', description: 'Build read model/analytics table từ event stream để query nhanh và tách write/read concern.', code: `def handle_order_paid(event):\n    projection.upsert_daily_revenue(date=event.paid_at.date(), amount=event.amount)` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["read-model-projection"],
    searchKeywords: ["projection", "event driven"]
  }),
  pattern({
    id: 'analytics-tables-design',
    title: 'Analytics Tables Design',
    vietnameseTitle: 'Thiết kế bảng analytics',
    shortDescription: 'Thiết kế bảng tổng hợp theo ngày/tenant/status để dashboard nhanh và predictable.',
    category: 'data-engineering',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["PostgreSQL"],
    whyUse: ["Dashboard aggregate chậm", "Cần số liệu theo tenant/time", "Có batch job update"],
    whyNotUse: ["Data ít query trực tiếp OK", "Cần realtime từng giây"],
    installCommand: 'no install required',
    folderStructure: `docs/data/analytics-tables.md`,
    codeTemplates: [
      { filename: 'docs/data/analytics-tables.md', language: 'python', variant: 'production', description: 'Thiết kế bảng tổng hợp theo ngày/tenant/status để dashboard nhanh và predictable.', code: `# Analytics Tables\n\nUse grain: tenant_id + day + metric.\nAvoid querying raw events for every dashboard request.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["postgres-materialized-views"],
    searchKeywords: ["analytics table"]
  }),
  pattern({
    id: 'data-backfill-playbook',
    title: 'Data Backfill Playbook',
    vietnameseTitle: 'Playbook backfill dữ liệu',
    shortDescription: 'Quy trình backfill field/table mới bằng batch, dry-run, checkpoint và monitoring.',
    category: 'data-engineering',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Django", "SQLAlchemy"],
    whyUse: ["Thêm field cần tính lại", "Migration data lớn", "Cần tránh lock/timeouts"],
    whyNotUse: ["Dữ liệu nhỏ vài record", "Có thể migrate đồng bộ nhanh"],
    installCommand: 'no install required',
    folderStructure: `docs/data/backfill.md`,
    codeTemplates: [
      { filename: 'docs/data/backfill.md', language: 'python', variant: 'production', description: 'Quy trình backfill field/table mới bằng batch, dry-run, checkpoint và monitoring.', code: `# Backfill\n\n- Add nullable column.\n- Deploy code.\n- Backfill in batches.\n- Verify counts.\n- Enforce not null later.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["django-management-command"],
    searchKeywords: ["backfill", "data migration"]
  }),
  pattern({
    id: 'data-lineage-metadata',
    title: 'Data Lineage Metadata',
    vietnameseTitle: 'Metadata lineage dữ liệu',
    shortDescription: 'Ghi nguồn, version, job_id và transformed_at để biết dữ liệu đến từ đâu và có thể debug.',
    category: 'data-engineering',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["Pydantic", "SQLAlchemy"],
    whyUse: ["ETL nhiều nguồn", "Cần debug số liệu sai", "Cần audit pipeline"],
    whyNotUse: ["Không có pipeline", "Dữ liệu nhập thủ công nhỏ"],
    installCommand: 'pip install pydantic',
    folderStructure: `app/data/lineage.py`,
    codeTemplates: [
      { filename: 'app/data/lineage.py', language: 'python', variant: 'production', description: 'Ghi nguồn, version, job_id và transformed_at để biết dữ liệu đến từ đâu và có thể debug.', code: `class Lineage(BaseModel):\n    source: str\n    source_version: str\n    job_id: str\n    transformed_at: datetime` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["etl-job-structure"],
    searchKeywords: ["lineage", "metadata"]
  })
];
