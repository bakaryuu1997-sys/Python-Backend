import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DEPLOYMENT_PATTERNS: Pattern[] = [
  pattern({ id: 'healthcheck-endpoint', title: 'Healthcheck Endpoint', vietnameseTitle: 'Endpoint kiểm tra trạng thái app', shortDescription: 'Endpoint /health trả trạng thái app, version và dependency readiness cơ bản.', category: 'deployment', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI'], whyUse: ['Cần monitor uptime.', 'Vercel/Docker/K8s cần healthcheck.', 'CI/CD kiểm tra deploy.'], whyNotUse: ['App static frontend không có backend.', 'Script CLI không chạy HTTP.'], installCommand: 'pip install fastapi', folderStructure: `app/routers/health_router.py`, codeTemplates: [{ filename: 'app/routers/health_router.py', language: 'python', description: 'Healthcheck endpoint.', code: `from fastapi import APIRouter\n\nrouter = APIRouter(tags=["Health"])\n\n@router.get("/health")\ndef healthcheck():\n    return {"status": "ok", "service": "backend-api", "version": "1.0.0"}` }], relatedPatterns: ['docker-deploy-fastapi'] }),
  pattern({ id: 'docker-deploy-fastapi', title: 'Docker Deploy FastAPI', vietnameseTitle: 'Docker deploy FastAPI', shortDescription: 'Dockerfile production cho FastAPI với Uvicorn, non-root user và healthcheck.', category: 'deployment', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['Docker', 'Uvicorn', 'FastAPI'], whyUse: ['Deploy API ổn định nhiều môi trường.', 'Cần chạy production giống local.', 'Cần container cho CI/CD.'], whyNotUse: ['App frontend static deploy Vercel không cần Docker.', 'Prototype chạy local.'], installCommand: 'docker build -t backend-api .', folderStructure: `Dockerfile\n.dockerignore`, codeTemplates: [{ filename: 'Dockerfile', language: 'bash', description: 'Dockerfile FastAPI production.', code: `FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY app ./app\nRUN useradd -m appuser\nUSER appuser\nCMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]` }], relatedPatterns: ['healthcheck-endpoint'] }),
  pattern({ id: 'github-actions-ci', title: 'GitHub Actions CI for Python Backend', vietnameseTitle: 'CI GitHub Actions cho backend Python', shortDescription: 'Workflow chạy ruff, typecheck, pytest và build Docker trước khi merge.', category: 'deployment', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['GitHub Actions', 'pytest', 'ruff'], whyUse: ['Cần kiểm tra tự động khi push/PR.', 'Muốn tránh deploy code lỗi.', 'Cần quality gate.'], whyNotUse: ['Repo cá nhân chưa cần CI.', 'Không dùng GitHub.'], installCommand: 'pip install pytest ruff mypy', folderStructure: `.github/workflows/ci.yml`, codeTemplates: [{ filename: '.github/workflows/ci.yml', language: 'bash', description: 'CI workflow.', code: `name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: '3.12'\n      - run: pip install -r requirements.txt\n      - run: pytest` }], relatedPatterns: ['pytest-api-tests'] }),
  pattern({
    "id": "structured-json-logging",
    "title": "Structured JSON Logging",
    "vietnameseTitle": "Logging JSON có correlation id",
    "shortDescription": "Log dạng JSON để dễ search, gắn request_id và không log dữ liệu nhạy cảm.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "structlog",
      "FastAPI"
    ],
    "whyUse": [
      "Cần debug production.",
      "Log được gửi về ELK/Cloud Logging.",
      "Cần trace request qua nhiều service."
    ],
    "whyNotUse": [
      "Prototype local đơn giản.",
      "Không có observability pipeline."
    ],
    "installCommand": "pip install structlog",
    "folderStructure": "app/core/logging.py",
    "codeTemplates": [
      {
        "filename": "app/core/logging.py",
        "language": "python",
        "description": "Structlog config.",
        "code": "import logging\nimport structlog\n\ndef configure_logging():\n    logging.basicConfig(level=logging.INFO, format=\"%(message)s\")\n    structlog.configure(\n        processors=[\n            structlog.processors.TimeStamper(fmt=\"iso\"),\n            structlog.processors.add_log_level,\n            structlog.processors.JSONRenderer(),\n        ]\n    )\n\nlogger = structlog.get_logger()",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_logging_redaction.py",
        "language": "python",
        "description": "Không log password/token.",
        "code": "def test_log_does_not_include_password(caplog):\n    logger.info(\"login_failed\", email=\"a@example.com\")\n    assert \"password\" not in caplog.text.lower()",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "request-logging",
      "sentry-error-tracking"
    ],
    "searchKeywords": [
      "json log",
      "structured logging",
      "request id"
    ]
  }),
  pattern({
    "id": "correlation-id-middleware",
    "title": "Correlation ID Middleware",
    "vietnameseTitle": "Middleware request id",
    "shortDescription": "Sinh/nhận X-Request-ID để trace log qua nhiều request/service.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "whyUse": [
      "Cần debug request production.",
      "Có nhiều service/worker.",
      "Muốn response trả request id cho support."
    ],
    "whyNotUse": [
      "App nhỏ local không cần trace.",
      "Gateway đã quản lý correlation id."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/middleware/correlation_id.py",
    "codeTemplates": [
      {
        "filename": "app/middleware/correlation_id.py",
        "language": "python",
        "description": "Middleware X-Request-ID.",
        "code": "from uuid import uuid4\nfrom starlette.middleware.base import BaseHTTPMiddleware\n\nclass CorrelationIdMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request, call_next):\n        request_id = request.headers.get(\"X-Request-ID\", uuid4().hex)\n        request.state.request_id = request_id\n        response = await call_next(request)\n        response.headers[\"X-Request-ID\"] = request_id\n        return response",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_correlation_id.py",
        "language": "python",
        "description": "Header được giữ lại.",
        "code": "def test_request_id_echoed(client):\n    res = client.get(\"/health\", headers={\"X-Request-ID\": \"req-1\"})\n    assert res.headers[\"X-Request-ID\"] == \"req-1\"",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "request id",
      "correlation id",
      "trace"
    ]
  }),
  pattern({
    "id": "sentry-error-tracking",
    "title": "Sentry Error Tracking",
    "vietnameseTitle": "Theo dõi lỗi bằng Sentry",
    "shortDescription": "Tích hợp Sentry để bắt exception production, kèm environment và release version.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "sentry-sdk",
      "FastAPI"
    ],
    "whyUse": [
      "Cần biết lỗi production ngay.",
      "Cần stack trace và release tracking.",
      "App đã có user thật."
    ],
    "whyNotUse": [
      "Prototype local.",
      "Không được gửi dữ liệu nhạy cảm ra bên ngoài."
    ],
    "installCommand": "pip install sentry-sdk[fastapi]",
    "folderStructure": "app/core/sentry.py",
    "codeTemplates": [
      {
        "filename": "app/core/sentry.py",
        "language": "python",
        "description": "Init Sentry.",
        "code": "import sentry_sdk\n\ndef init_sentry(dsn: str, environment: str, release: str):\n    if not dsn:\n        return\n    sentry_sdk.init(\n        dsn=dsn,\n        environment=environment,\n        release=release,\n        traces_sample_rate=0.05,\n        send_default_pii=False,\n    )",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_sentry_config.py",
        "language": "python",
        "description": "DSN rỗng không crash app.",
        "code": "def test_empty_sentry_dsn_is_safe():\n    init_sentry(\"\", \"test\", \"local\")",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "sentry",
      "error tracking"
    ]
  }),
  pattern({
    "id": "opentelemetry-tracing",
    "title": "OpenTelemetry Tracing",
    "vietnameseTitle": "Tracing bằng OpenTelemetry",
    "shortDescription": "Instrument API để đo latency, trace external calls và correlate log/metrics.",
    "category": "deployment",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenTelemetry",
      "FastAPI"
    ],
    "whyUse": [
      "Cần quan sát service production.",
      "API gọi nhiều external services.",
      "Cần trace chậm ở DB/HTTP."
    ],
    "whyNotUse": [
      "App nhỏ chưa cần tracing.",
      "Không có collector/backend nhận trace."
    ],
    "installCommand": "pip install opentelemetry-sdk opentelemetry-instrumentation-fastapi",
    "folderStructure": "app/core/telemetry.py",
    "codeTemplates": [
      {
        "filename": "app/core/telemetry.py",
        "language": "python",
        "description": "Instrument FastAPI.",
        "code": "from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor\n\ndef setup_tracing(app):\n    FastAPIInstrumentor.instrument_app(app, excluded_urls=\"/health\")",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_telemetry_setup.py",
        "language": "python",
        "description": "Setup tracing không phá app.",
        "code": "def test_setup_tracing(app):\n    setup_tracing(app)\n    assert app is not None",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "correlation-id-middleware",
      "structured-json-logging"
    ],
    "searchKeywords": [
      "otel",
      "tracing",
      "observability"
    ]
  }),
  pattern({
    "id": "prometheus-metrics",
    "title": "Prometheus Metrics Endpoint",
    "vietnameseTitle": "Metrics Prometheus",
    "shortDescription": "Expose /metrics để đo request count, latency và custom business metrics.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "prometheus-client",
      "FastAPI"
    ],
    "whyUse": [
      "Cần dashboard latency/error rate.",
      "Deploy với Prometheus/Grafana.",
      "Muốn alert theo metrics."
    ],
    "whyNotUse": [
      "Không có monitoring stack.",
      "App static frontend."
    ],
    "installCommand": "pip install prometheus-client",
    "folderStructure": "app/routers/metrics_router.py",
    "codeTemplates": [
      {
        "filename": "app/routers/metrics_router.py",
        "language": "python",
        "description": "Metrics endpoint.",
        "code": "from fastapi import APIRouter, Response\nfrom prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST\n\nrouter = APIRouter()\napi_requests = Counter(\"api_requests_total\", \"Total API requests\")\n\n@router.get(\"/metrics\")\ndef metrics():\n    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_metrics.py",
        "language": "python",
        "description": "Metrics trả text prometheus.",
        "code": "def test_metrics_endpoint(client):\n    res = client.get(\"/metrics\")\n    assert res.status_code == 200\n    assert \"api_requests_total\" in res.text",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "opentelemetry-tracing"
    ],
    "searchKeywords": [
      "metrics",
      "prometheus",
      "grafana"
    ]
  }),
  pattern({
    "id": "feature-flag-pattern",
    "title": "Feature Flag Pattern",
    "vietnameseTitle": "Feature flag backend",
    "shortDescription": "Bật/tắt tính năng theo user/tenant/environment để release an toàn.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "whyUse": [
      "Cần rollout từ từ.",
      "Muốn tắt nhanh feature lỗi.",
      "Cần A/B hoặc tenant-specific feature."
    ],
    "whyNotUse": [
      "App nhỏ không có release risk.",
      "Feature không ảnh hưởng production."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/core/feature_flags.py",
    "codeTemplates": [
      {
        "filename": "app/core/feature_flags.py",
        "language": "python",
        "description": "Feature flag service.",
        "code": "FEATURE_FLAGS = {\"new_ocr_pipeline\": {\"enabled\": True, \"tenants\": {\"t1\"}}}\n\ndef is_enabled(flag: str, tenant_id: str | None = None) -> bool:\n    config = FEATURE_FLAGS.get(flag, {})\n    if not config.get(\"enabled\", False):\n        return False\n    tenants = config.get(\"tenants\")\n    return tenant_id in tenants if tenants else True",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_feature_flags.py",
        "language": "python",
        "description": "Tenant flag.",
        "code": "def test_feature_flag_for_tenant():\n    assert is_enabled(\"new_ocr_pipeline\", tenant_id=\"t1\") is True\n    assert is_enabled(\"new_ocr_pipeline\", tenant_id=\"t2\") is False",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "vercel-deployment-checklist"
    ],
    "searchKeywords": [
      "feature flag",
      "rollout",
      "release"
    ]
  }),
  pattern({
    "id": "backup-restore-postgres",
    "title": "PostgreSQL Backup and Restore Runbook",
    "vietnameseTitle": "Runbook backup/restore Postgres",
    "shortDescription": "Checklist và lệnh backup/restore database trước migration hoặc release nguy hiểm.",
    "category": "deployment",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "pg_dump"
    ],
    "whyUse": [
      "Có database production.",
      "Trước migration lớn.",
      "Cần disaster recovery."
    ],
    "whyNotUse": [
      "Không dùng database.",
      "Managed provider đã có backup nhưng vẫn cần restore test."
    ],
    "installCommand": "pg_dump \"$DATABASE_URL\" > backup.sql",
    "folderStructure": "runbooks/postgres-backup-restore.md",
    "codeTemplates": [
      {
        "filename": "runbooks/postgres-backup-restore.md",
        "language": "markdown",
        "description": "Runbook backup/restore.",
        "code": "# PostgreSQL Backup/Restore\n\n## Backup\n```bash\npg_dump \"$DATABASE_URL\" > backup-$(date +%F).sql\n```\n\n## Restore to staging first\n```bash\npsql \"$STAGING_DATABASE_URL\" < backup-2026-01-01.sql\n```\n\n## Checklist\n- Verify backup file size\n- Restore to staging\n- Run smoke tests\n- Document operator and timestamp",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_backup_runbook_exists.py",
        "language": "python",
        "description": "Runbook tồn tại trong repo.",
        "code": "def test_backup_runbook_exists():\n    assert Path(\"runbooks/postgres-backup-restore.md\").exists()",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "alembic-migration"
    ],
    "searchKeywords": [
      "backup",
      "restore",
      "postgres",
      "runbook"
    ]
  }),
  pattern({
    "id": "incident-runbook-template",
    "title": "Production Incident Runbook",
    "vietnameseTitle": "Runbook xử lý incident",
    "shortDescription": "Mẫu quy trình xử lý sự cố production: detect, mitigate, communicate, postmortem.",
    "category": "deployment",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "Runbook"
    ],
    "whyUse": [
      "App đã có người dùng thật.",
      "Cần xử lý outage/lỗi bảo mật/lỗi deploy.",
      "Team cần quy trình rõ."
    ],
    "whyNotUse": [
      "Prototype cá nhân chưa production.",
      "Không có vận hành production."
    ],
    "installCommand": "no install required",
    "folderStructure": "runbooks/incident.md",
    "codeTemplates": [
      {
        "filename": "runbooks/incident.md",
        "language": "markdown",
        "description": "Incident runbook.",
        "code": "# Incident Runbook\n\n## 1. Detect\n- What alert fired?\n- Which service is affected?\n\n## 2. Mitigate\n- Roll back if deploy-related\n- Disable feature flag if feature-specific\n- Scale worker if queue backlog\n\n## 3. Communicate\n- Owner\n- User impact\n- Next update time\n\n## 4. Postmortem\n- Root cause\n- Timeline\n- Action items",
        "variant": "minimal"
      }
    ],
    "relatedPatterns": [
      "feature-flag-pattern",
      "sentry-error-tracking"
    ],
    "searchKeywords": [
      "incident",
      "runbook",
      "ops"
    ]
  }),
  pattern({
    "id": "static-vercel-library-architecture",
    "title": "Static Vercel Library Architecture",
    "vietnameseTitle": "Kiến trúc thư viện static trên Vercel",
    "shortDescription": "Cấu trúc app documentation/template library không backend, content-driven, search client-side và deploy Vercel.",
    "category": "deployment",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "Vite",
      "React",
      "Vercel"
    ],
    "whyUse": [
      "App chỉ đọc nội dung/template.",
      "Không cần user login/database.",
      "Muốn deploy rẻ và ổn định."
    ],
    "whyNotUse": [
      "Cần admin editor online.",
      "Cần AI generator gọi API key server-side."
    ],
    "installCommand": "npm install && npm run build",
    "folderStructure": "src/data/\nsrc/lib/search.ts\ndist/",
    "codeTemplates": [
      {
        "filename": "README.md",
        "language": "markdown",
        "description": "Mô tả kiến trúc static.",
        "code": "# Static Vercel Library\n\n- Content lives in `src/data`\n- Search runs in browser\n- No backend secrets\n- Build output is `dist`\n- Deploy with Vercel static hosting",
        "variant": "minimal"
      },
      {
        "filename": "vercel.json",
        "language": "json",
        "description": "Optional Vercel static routing.",
        "code": "{\n  \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/index.html\" }]\n}",
        "variant": "config"
      }
    ],
    "relatedPatterns": [
      "vercel-deployment-checklist",
      "feature-flag-pattern"
    ],
    "searchKeywords": [
      "vercel",
      "static",
      "no backend",
      "vite"
    ]
  }),
  pattern({
      id: 'configuration-layering',
      title: 'Configuration Layering',
      vietnameseTitle: 'Phân lớp cấu hình dev/staging/prod',
      shortDescription: 'Tổ chức settings theo môi trường để không hard-code config và giảm lỗi deploy.',
      category: 'deployment',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['pydantic-settings'],
      whyUse: ['Có nhiều môi trường dev/staging/prod.', 'Cần bật/tắt feature hoặc provider theo env.', 'Muốn validate config khi app start.'],
      whyNotUse: ['Static frontend không có secret runtime.', 'App nhỏ không có môi trường staging.'],
      installCommand: 'pip install pydantic-settings',
      folderStructure: `app/core/settings.py`,
      codeTemplates: [
        { filename: 'app/core/settings.py', language: 'python', variant: 'production', description: 'Settings typed và validate bằng Pydantic.', code: `from pydantic_settings import BaseSettings\n\nclass Settings(BaseSettings):\n    app_env: str = "dev"\n    database_url: str\n    redis_url: str | None = None\n    sentry_dsn: str | None = None\n\n    class Config:\n        env_file = ".env"\n\nsettings = Settings()` }
      ],
      relatedPatterns: ['settings-management', 'docker-deploy-fastapi'],
      searchKeywords: ['settings', 'configuration', 'environment']
    })
];
