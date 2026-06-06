import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const BACKGROUND_JOBS_PATTERNS: Pattern[] = [
  pattern({ id: 'email-sending', title: 'Email Sending Service', vietnameseTitle: 'Gửi email xác thực/reset password', shortDescription: 'Service gửi email qua SMTP với Jinja2 template và background task.', category: 'background-jobs', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['aiosmtplib', 'Jinja2', 'FastAPI'], whyUse: ['Cần verify email/reset password.', 'Cần email template tái sử dụng.', 'Gửi email không nên block response.'], whyNotUse: ['Không gửi email.', 'Cần marketing email lớn nên dùng provider chuyên dụng.'], installCommand: 'pip install aiosmtplib jinja2', folderStructure: `app/services/email_service.py`, codeTemplates: [{ filename: 'app/services/email_service.py', language: 'python', description: 'Email service async.', code: `import aiosmtplib\nfrom email.message import EmailMessage\n\nasync def send_email(to: str, subject: str, html: str):\n    message = EmailMessage()\n    message["From"] = "noreply@example.com"\n    message["To"] = to\n    message["Subject"] = subject\n    message.set_content(html, subtype="html")\n    await aiosmtplib.send(message, hostname="smtp.example.com", port=587, start_tls=True)` }], relatedPatterns: ['celery-worker-setup'] }),
  pattern({ id: 'fastapi-backgroundtasks', title: 'FastAPI BackgroundTasks for Lightweight Work', vietnameseTitle: 'BackgroundTasks cho tác vụ nhẹ', shortDescription: 'Chạy tác vụ nhẹ sau response như ghi log, gửi email đơn giản hoặc cleanup file tạm.', category: 'background-jobs', difficulty: 'Easy', productionLevel: 'Basic production', libraries: ['FastAPI'], whyUse: ['Task nhẹ, không cần retry phức tạp.', 'Muốn response trả nhanh hơn.', 'Không muốn dựng Redis/Celery.'], whyNotUse: ['Task nặng, lâu, cần retry/job status.', 'Cần worker độc lập.'], installCommand: 'pip install fastapi', folderStructure: `app/routers/task_router.py`, codeTemplates: [{ filename: 'app/routers/task_router.py', language: 'python', description: 'BackgroundTasks example.', code: `from fastapi import APIRouter, BackgroundTasks\n\nrouter = APIRouter()\n\ndef write_audit_log(message: str):\n    with open("audit.log", "a", encoding="utf-8") as f:\n        f.write(message + "\\n")\n\n@router.post("/submit")\ndef submit(background_tasks: BackgroundTasks):\n    background_tasks.add_task(write_audit_log, "submitted")\n    return {"status": "accepted"}` }], relatedPatterns: ['celery-worker-setup'] }),
  pattern({ id: 'celery-worker-setup', title: 'Celery Worker with Redis Broker', vietnameseTitle: 'Celery worker xử lý nền', shortDescription: 'Queue production cho OCR, email, import/export, retry và task status.', category: 'background-jobs', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['Celery', 'Redis', 'FastAPI'], whyUse: ['Task lâu cần chạy ngoài request.', 'Cần retry/backoff.', 'Cần worker scale độc lập.'], whyNotUse: ['Task chỉ mất vài ms.', 'Không muốn thêm Redis/broker.'], installCommand: 'pip install celery redis', folderStructure: `app/worker.py\napp/tasks/jobs.py`, codeTemplates: [{ filename: 'app/worker.py', language: 'python', description: 'Celery app config.', code: `from celery import Celery\n\ncelery_app = Celery(\n    "backend_worker",\n    broker="redis://localhost:6379/0",\n    backend="redis://localhost:6379/1",\n)\ncelery_app.conf.task_track_started = True\ncelery_app.conf.task_time_limit = 300` }], relatedPatterns: ['pdf-ocr-api', 'email-sending'] }),
  pattern({ id: 'export-excel-pdf', title: 'Export Excel / PDF Report', vietnameseTitle: 'Xuất Excel/PDF report', shortDescription: 'Sinh file báo cáo Excel hoặc PDF, trả download response hoặc chạy background job.', category: 'background-jobs', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['openpyxl', 'pandas', 'Jinja2', 'WeasyPrint'], whyUse: ['Cần xuất báo cáo cho admin.', 'Cần template file rõ.', 'Report lớn nên chạy nền.'], whyNotUse: ['Chỉ cần JSON API.', 'PDF phức tạp cần service report riêng.'], installCommand: 'pip install pandas openpyxl jinja2 weasyprint', folderStructure: `app/services/export_service.py`, codeTemplates: [{ filename: 'app/services/export_service.py', language: 'python', description: 'Export Excel từ rows.', code: `import pandas as pd\n\ndef export_orders_excel(rows: list[dict], output_path: str) -> str:\n    df = pd.DataFrame(rows)\n    df.to_excel(output_path, index=False)\n    return output_path` }], relatedPatterns: ['celery-worker-setup'] }),
  pattern({
    "id": "job-status-api",
    "title": "Job Status API",
    "vietnameseTitle": "API trạng thái job",
    "shortDescription": "Tạo job_id, lưu trạng thái queued/running/completed/failed và cho frontend polling.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Celery",
      "Redis",
      "SQLAlchemy"
    ],
    "whyUse": [
      "Task chạy lâu như OCR/import/export.",
      "Frontend cần biết tiến độ.",
      "Cần retry và báo lỗi rõ."
    ],
    "whyNotUse": [
      "Task dưới 1 giây trả ngay được.",
      "Không có worker nền."
    ],
    "installCommand": "pip install fastapi celery redis",
    "folderStructure": "app/routers/jobs_router.py",
    "codeTemplates": [
      {
        "filename": "app/routers/jobs_router.py",
        "language": "python",
        "description": "Endpoint tạo và đọc trạng thái job.",
        "code": "from fastapi import APIRouter, status\nfrom pydantic import BaseModel\n\nrouter = APIRouter(prefix=\"/jobs\")\n\nclass JobStatus(BaseModel):\n    job_id: str\n    status: str\n    progress: int = 0\n\n@router.post(\"/ocr\", status_code=status.HTTP_202_ACCEPTED)\ndef create_ocr_job(file_id: str):\n    job_id = \"job_123\"\n    # enqueue worker task and persist queued status\n    return {\"job_id\": job_id, \"status\": \"queued\"}\n\n@router.get(\"/{job_id}\", response_model=JobStatus)\ndef get_job(job_id: str):\n    return JobStatus(job_id=job_id, status=\"running\", progress=40)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_job_status_api.py",
        "language": "python",
        "description": "Create job trả 202.",
        "code": "def test_create_job_returns_202(client):\n    res = client.post(\"/jobs/ocr\", params={\"file_id\": \"f1\"})\n    assert res.status_code == 202\n    assert \"job_id\" in res.json()",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "celery-worker-setup",
      "pdf-ocr-api"
    ],
    "searchKeywords": [
      "job status",
      "polling",
      "background task"
    ]
  }),
  pattern({
    "id": "scheduled-cleanup-job",
    "title": "Scheduled Cleanup Job",
    "vietnameseTitle": "Job dọn file tạm định kỳ",
    "shortDescription": "Dọn file tạm, export hết hạn, token hết hạn bằng scheduler/cron an toàn.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "APScheduler",
      "Celery"
    ],
    "whyUse": [
      "Có file tạm, export, token hết hạn.",
      "Cần giảm storage rác.",
      "Cần chạy định kỳ theo lịch."
    ],
    "whyNotUse": [
      "Không lưu dữ liệu tạm.",
      "Đã có managed lifecycle policy."
    ],
    "installCommand": "pip install apscheduler",
    "folderStructure": "app/jobs/cleanup.py",
    "codeTemplates": [
      {
        "filename": "app/jobs/cleanup.py",
        "language": "python",
        "description": "Cleanup files older than TTL.",
        "code": "from pathlib import Path\nfrom datetime import datetime, timedelta\n\ndef cleanup_old_files(directory: str, ttl_hours: int = 24) -> int:\n    cutoff = datetime.now().timestamp() - ttl_hours * 3600\n    removed = 0\n    for path in Path(directory).glob(\"*\"):\n        if path.is_file() and path.stat().st_mtime < cutoff:\n            path.unlink()\n            removed += 1\n    return removed",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_cleanup_job.py",
        "language": "python",
        "description": "Không xóa file mới.",
        "code": "def test_cleanup_keeps_recent_file(tmp_path):\n    file = tmp_path / \"new.txt\"\n    file.write_text(\"x\")\n    assert cleanup_old_files(str(tmp_path), ttl_hours=24) == 0",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "job-status-api"
    ],
    "searchKeywords": [
      "scheduler",
      "cleanup",
      "cron"
    ]
  }),
  pattern({
    "id": "email-template-jinja",
    "title": "Email Template with Jinja2",
    "vietnameseTitle": "Template email bằng Jinja2",
    "shortDescription": "Render email verify/reset password bằng template, tách nội dung khỏi service gửi email.",
    "category": "background-jobs",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "Jinja2",
      "aiosmtplib"
    ],
    "whyUse": [
      "Cần email verify/reset password.",
      "Muốn nội dung email dễ sửa.",
      "Cần gửi email nền."
    ],
    "whyNotUse": [
      "Không gửi email.",
      "Dùng provider template hosted hoàn toàn."
    ],
    "installCommand": "pip install jinja2 aiosmtplib",
    "folderStructure": "app/services/email_template.py",
    "codeTemplates": [
      {
        "filename": "app/services/email_template.py",
        "language": "python",
        "description": "Render email HTML.",
        "code": "from jinja2 import Environment, FileSystemLoader, select_autoescape\n\nenv = Environment(loader=FileSystemLoader(\"templates/email\"), autoescape=select_autoescape([\"html\"]))\n\ndef render_email(template_name: str, **context) -> str:\n    template = env.get_template(template_name)\n    return template.render(**context)",
        "variant": "minimal"
      },
      {
        "filename": "templates/email/reset_password.html",
        "language": "html",
        "description": "Reset password email.",
        "code": "<p>Xin chào,</p>\n<p>Nhấn vào liên kết này để đặt lại mật khẩu:</p>\n<a href=\"{{ reset_url }}\">Đặt lại mật khẩu</a>",
        "variant": "minimal"
      }
    ],
    "relatedPatterns": [
      "password-reset-flow",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "email",
      "jinja2",
      "reset password"
    ]
  }),
  pattern({
    "id": "excel-export-background",
    "title": "Excel Export Background Job",
    "vietnameseTitle": "Export Excel chạy nền",
    "shortDescription": "Tạo báo cáo Excel qua worker, lưu file riêng tư và cho frontend tải khi hoàn thành.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "openpyxl",
      "Celery",
      "FastAPI"
    ],
    "whyUse": [
      "Báo cáo lớn dễ timeout.",
      "Cần export Excel/PDF.",
      "Frontend cần polling job status."
    ],
    "whyNotUse": [
      "Report nhỏ trả ngay được.",
      "Không có worker/storage."
    ],
    "installCommand": "pip install openpyxl celery",
    "folderStructure": "app/tasks/export_tasks.py",
    "codeTemplates": [
      {
        "filename": "app/tasks/export_tasks.py",
        "language": "python",
        "description": "Generate Excel file.",
        "code": "from openpyxl import Workbook\n\ndef generate_users_excel(rows: list[dict], output_path: str) -> str:\n    wb = Workbook()\n    ws = wb.active\n    ws.append([\"ID\", \"Email\", \"Created At\"])\n    for row in rows:\n        ws.append([row[\"id\"], row[\"email\"], row[\"created_at\"]])\n    wb.save(output_path)\n    return output_path",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_excel_export.py",
        "language": "python",
        "description": "File Excel được tạo.",
        "code": "def test_generate_excel(tmp_path):\n    output = tmp_path / \"users.xlsx\"\n    generate_users_excel([{\"id\": 1, \"email\": \"a@b.com\", \"created_at\": \"today\"}], str(output))\n    assert output.exists()",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "job-status-api",
      "scheduled-cleanup-job"
    ],
    "searchKeywords": [
      "excel export",
      "report",
      "openpyxl"
    ]
  })
];
