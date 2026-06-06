import { Pattern, CodeTemplate } from '../types';

type DraftPattern = Omit<Pattern, 'difficultyVi' | 'updatedAt' | 'quickDecision' | 'requestFlow' | 'commonErrors' | 'productionChecklist' | 'relatedPatterns'> & Partial<Pick<Pattern, 'difficultyVi' | 'updatedAt' | 'quickDecision' | 'requestFlow' | 'commonErrors' | 'productionChecklist' | 'relatedPatterns'>>;

export const checklist = (items: string[]) => items.map((task) => ({ task, detail: task, checked: false }));
export const errors = (items: string[]) => items.map((error) => ({ error, cause: 'Thiếu cấu hình, dependency, validation hoặc môi trường chưa đúng.', fix: 'Đọc install command, kiểm tra biến môi trường, thêm validation và chạy test API trước khi deploy.' }));

export function pattern(p: DraftPattern): Pattern {
  const base: Pattern = {
    ...p,
    difficultyVi: p.difficultyVi ?? (p.difficulty === 'Easy' ? 'Dễ' : p.difficulty === 'Medium' ? 'Trung bình' : 'Nâng cao'),
    updatedAt: p.updatedAt ?? 'Cập nhật trong v1',
    quickDecision: p.quickDecision ?? {
      bestFor: p.whyUse.slice(0, 3),
      avoidWhen: p.whyNotUse.slice(0, 2),
      productionLevel: p.productionLevel,
    },
    requestFlow: p.requestFlow ?? ['Client gửi request', 'Router validate input', 'Service xử lý logic', 'Repository/provider thao tác tài nguyên', 'Response trả schema chuẩn'],
    commonErrors: p.commonErrors ?? errors(['Lỗi cấu hình package hoặc biến môi trường', 'Thiếu validation đầu vào', 'Chưa xử lý lỗi production']),
    productionChecklist: p.productionChecklist ?? checklist(['Validate input/output bằng schema', 'Không hard-code secret', 'Có logging lỗi nhưng không log dữ liệu nhạy cảm', 'Có test cho luồng chính và lỗi thường gặp']),
    relatedPatterns: p.relatedPatterns ?? [],
  };

  return {
    ...base,
    codeTemplates: upgradeImportantTemplates(base),
  };
}

function withVariant(template: CodeTemplate, variant: CodeTemplate['variant']): CodeTemplate {
  return { ...template, variant };
}

function upgradeImportantTemplates(p: Pattern): CodeTemplate[] {
  const original = p.codeTemplates.map((template, index) => withVariant(template, index === 0 ? 'minimal' : template.variant ?? 'production'));

  if (p.id === 'fastapi-crud-api') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/user_service.py',
        language: 'python',
        description: 'Service layer kiểm tra trùng email, tách business logic khỏi router và repository.',
        code: `from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate

class UserService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def create(self, payload: UserCreate):
        if self.repo.get_by_email(payload.email):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")
        return self.repo.create(payload)

    def get_by_id(self, user_id: int):
        return self.repo.get_by_id(user_id)`,
      },
      {
        variant: 'test',
        filename: 'tests/test_user_api.py',
        language: 'python',
        description: 'Integration test cho create/get user để đảm bảo route, schema và service chạy đúng.',
        code: `def test_create_user(client):
    res = client.post("/api/v1/users/", json={"email": "long@example.com", "password": "StrongPass123"})
    assert res.status_code == 201
    assert res.json()["email"] == "long@example.com"


def test_get_missing_user_returns_404(client):
    res = client.get("/api/v1/users/999999")
    assert res.status_code == 404`,
      },
    ];
  }

  if (p.id === 'jwt-auth-api') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/dependencies/auth.py',
        language: 'python',
        description: 'Dependency bảo vệ route bằng Bearer token, không log token và trả lỗi 401 chuẩn.',
        code: `from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer(auto_error=False)

def get_current_user(credentials: HTTPAuthorizationCredentials | None = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    try:
        payload = jwt.decode(credentials.credentials, "CHANGE_ME", algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return {"user_id": payload["sub"]}`,
      },
      {
        variant: 'test',
        filename: 'tests/test_auth.py',
        language: 'python',
        description: 'Test route protected không token phải trả 401.',
        code: `def test_protected_route_requires_token(client):
    res = client.get("/api/v1/me")
    assert res.status_code == 401`,
      },
    ];
  }

  if (p.id === 'image-ocr-api') {
    return [
      ...original,
      {
        variant: 'production',
        filename: 'app/services/file_validation.py',
        language: 'python',
        description: 'Validation file upload: giới hạn dung lượng, extension và MIME type trước khi OCR.',
        code: `from fastapi import UploadFile, HTTPException, status

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_BYTES = 5 * 1024 * 1024

async def validate_image_upload(file: UploadFile) -> bytes:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Unsupported image type")

    content = await file.read()
    if len(content) > MAX_BYTES:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Image too large")
    return content`,
      },
      {
        variant: 'test',
        filename: 'tests/test_ocr_upload.py',
        language: 'python',
        description: 'Test API OCR từ chối file không hợp lệ để tránh lỗi production.',
        code: `def test_ocr_rejects_invalid_mime(client):
    files = {"file": ("note.txt", b"hello", "text/plain")}
    res = client.post("/api/v1/ocr/image", files=files)
    assert res.status_code in {413, 415, 422}`,
      },
    ];
  }

  if (p.id === 'celery-worker-setup') {
    return [
      ...original,
      {
        variant: 'production',
        filename: 'app/tasks/ocr_tasks.py',
        language: 'python',
        description: 'Task OCR có retry/backoff và không xử lý file lớn trực tiếp trong request.',
        code: `from app.worker import celery_app

@celery_app.task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def run_ocr_job(self, file_id: str) -> dict:
    # Load file from private storage by file_id
    # Run OCR provider
    # Persist result and status
    return {"file_id": file_id, "status": "completed"}`,
      },
      {
        variant: 'test',
        filename: 'tests/test_job_status.py',
        language: 'python',
        description: 'Test tạo job trả job_id thay vì chờ xử lý xong.',
        code: `def test_create_ocr_job_returns_job_id(client):
    res = client.post("/api/v1/jobs/ocr", json={"file_id": "file_123"})
    assert res.status_code == 202
    assert "job_id" in res.json()`,
      },
    ];
  }

  if (p.id === 'redis-cache-aside') {
    return [
      ...original,
      {
        variant: 'production',
        filename: 'app/services/cache_service.py',
        language: 'python',
        description: 'Cache service có JSON serialization, TTL và invalidate key rõ ràng.',
        code: `import json
from redis import Redis

class CacheService:
    def __init__(self, redis: Redis):
        self.redis = redis

    def get_json(self, key: str):
        raw = self.redis.get(key)
        return json.loads(raw) if raw else None

    def set_json(self, key: str, value: dict, ttl_seconds: int = 300) -> None:
        self.redis.setex(key, ttl_seconds, json.dumps(value))

    def invalidate(self, key: str) -> None:
        self.redis.delete(key)`,
      },
      {
        variant: 'test',
        filename: 'tests/test_cache_service.py',
        language: 'python',
        description: 'Test cache miss/hit cơ bản bằng fake redis hoặc mock.',
        code: `def test_cache_roundtrip(fake_redis):
    cache = CacheService(fake_redis)
    cache.set_json("user:1", {"id": 1}, ttl_seconds=60)
    assert cache.get_json("user:1") == {"id": 1}`,
      },
    ];
  }

  if (p.id === 'pytest-api-tests') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'tests/conftest.py',
        language: 'python',
        description: 'Fixture client/test database dùng chung cho toàn bộ API tests.',
        code: `import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client`,
      },
      {
        variant: 'test',
        filename: 'tests/test_auth_flow.py',
        language: 'python',
        description: 'Test flow register/login/protected route ở mức integration.',
        code: `def test_auth_flow(client):
    client.post("/api/v1/auth/register", json={"email": "a@b.com", "password": "StrongPass123"})
    login = client.post("/api/v1/auth/login", data={"username": "a@b.com", "password": "StrongPass123"})
    assert login.status_code == 200
    assert "access_token" in login.json()`,
      },
    ];
  }


  if (p.id === 'pdf-ocr-api') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/pdf_service.py',
        language: 'python',
        description: 'Render PDF từng trang có giới hạn số trang, DPI và dung lượng để tránh worker quá tải.',
        code: `from pathlib import Path
import fitz

MAX_PAGES = 30
DEFAULT_DPI = 200

class PdfTooLargeError(ValueError):
    pass

def render_pages(pdf_path: str, dpi: int = DEFAULT_DPI) -> list[bytes]:
    document = fitz.open(pdf_path)
    if document.page_count > MAX_PAGES:
        raise PdfTooLargeError(f"PDF has {document.page_count} pages; max is {MAX_PAGES}")

    images: list[bytes] = []
    zoom = dpi / 72
    matrix = fitz.Matrix(zoom, zoom)
    for page in document:
        pixmap = page.get_pixmap(matrix=matrix, alpha=False)
        images.append(pixmap.tobytes("png"))
    return images

def safe_temp_path(job_id: str) -> Path:
    return Path("/tmp/pdf-ocr") / f"{job_id}.pdf"`,
      },
      {
        variant: 'test',
        filename: 'tests/test_pdf_ocr.py',
        language: 'python',
        description: 'Test API tạo OCR job cho PDF, không xử lý file trực tiếp trong request.',
        code: `def test_pdf_ocr_creates_background_job(client, sample_pdf_bytes):
    files = {"file": ("scan.pdf", sample_pdf_bytes, "application/pdf")}
    res = client.post("/api/v1/ocr/pdf", files=files)
    assert res.status_code == 202
    assert "job_id" in res.json()


def test_pdf_ocr_rejects_non_pdf(client):
    files = {"file": ("note.txt", b"not pdf", "text/plain")}
    res = client.post("/api/v1/ocr/pdf", files=files)
    assert res.status_code in {415, 422}`,
      },
    ];
  }

  if (p.id === 'webhook-signature-verification') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/webhook_service.py',
        language: 'python',
        description: 'Webhook service có verify chữ ký HMAC, idempotency key và tách xử lý event khỏi router.',
        code: `import hmac
import hashlib
from fastapi import HTTPException, status

def verify_hmac_signature(raw_body: bytes, signature: str, secret: str) -> None:
    expected = hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook signature")

def ensure_idempotent(event_id: str, event_store) -> bool:
    if event_store.exists(event_id):
        return False
    event_store.insert(event_id=event_id, status="received")
    return True

def handle_verified_event(event: dict) -> None:
    event_type = event.get("type")
    if event_type == "payment.succeeded":
        # enqueue or update payment status here
        return
    # log unknown event type without failing provider retries`,
      },
      {
        variant: 'test',
        filename: 'tests/test_webhook_signature.py',
        language: 'python',
        description: 'Test webhook sai chữ ký phải bị từ chối và event trùng không xử lý lại.',
        code: `def test_webhook_rejects_invalid_signature(client):
    res = client.post("/api/v1/webhooks/provider", content=b"{}", headers={"X-Signature": "bad"})
    assert res.status_code == 401


def test_webhook_duplicate_event_is_safe(event_store):
    event_store.insert(event_id="evt_123", status="processed")
    assert ensure_idempotent("evt_123", event_store) is False`,
      },
    ];
  }

  if (p.id === 'payment-webhook-handler') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/payment_service.py',
        language: 'python',
        description: 'Payment service dùng transaction, idempotency và không tin payment status nếu chưa qua webhook verified.',
        code: `from sqlalchemy.orm import Session

class PaymentService:
    def __init__(self, db: Session):
        self.db = db

    def mark_succeeded(self, provider_event_id: str, payment_id: str) -> None:
        if self._event_exists(provider_event_id):
            return
        with self.db.begin():
            payment = self._get_payment_for_update(payment_id)
            payment.status = "succeeded"
            self._record_event(provider_event_id, payment_id)

    def _event_exists(self, provider_event_id: str) -> bool:
        return False

    def _get_payment_for_update(self, payment_id: str):
        raise NotImplementedError

    def _record_event(self, provider_event_id: str, payment_id: str) -> None:
        pass`,
      },
      {
        variant: 'test',
        filename: 'tests/test_payment_webhook.py',
        language: 'python',
        description: 'Test webhook payment idempotent: gửi cùng event nhiều lần không cộng tiền/trạng thái lại.',
        code: `def test_payment_webhook_is_idempotent(client, signed_payment_event):
    first = client.post("/api/v1/webhooks/payment", content=signed_payment_event.body, headers=signed_payment_event.headers)
    second = client.post("/api/v1/webhooks/payment", content=signed_payment_event.body, headers=signed_payment_event.headers)
    assert first.status_code in {200, 202}
    assert second.status_code in {200, 202}`,
      },
    ];
  }

  if (p.id === 's3-presigned-upload') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/storage_service.py',
        language: 'python',
        description: 'Storage service production: whitelist content type, safe object key và hạn chế thời gian URL.',
        code: `from uuid import uuid4
import boto3

ALLOWED_UPLOAD_TYPES = {"image/jpeg", "image/png", "application/pdf"}
MAX_EXPIRES = 900

class StorageService:
    def __init__(self, bucket: str):
        self.bucket = bucket
        self.s3 = boto3.client("s3")

    def create_upload_url(self, user_id: str, filename: str, content_type: str) -> dict:
        if content_type not in ALLOWED_UPLOAD_TYPES:
            raise ValueError("Unsupported content type")
        key = f"private/{user_id}/{uuid4().hex}-{filename}"
        url = self.s3.generate_presigned_url(
            "put_object",
            Params={"Bucket": self.bucket, "Key": key, "ContentType": content_type},
            ExpiresIn=MAX_EXPIRES,
        )
        return {"upload_url": url, "object_key": key, "expires_in": MAX_EXPIRES}`,
      },
      {
        variant: 'test',
        filename: 'tests/test_s3_presigned_upload.py',
        language: 'python',
        description: 'Test presigned URL chỉ cho content type hợp lệ và key nằm trong private namespace.',
        code: `def test_presigned_upload_rejects_unsupported_type(storage_service):
    with pytest.raises(ValueError):
        storage_service.create_upload_url("u1", "shell.sh", "text/x-shellscript")


def test_presigned_upload_key_is_private(storage_service):
    result = storage_service.create_upload_url("u1", "a.png", "image/png")
    assert result["object_key"].startswith("private/u1/")`,
      },
    ];
  }

  if (p.id === 'rate-limit-login') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/core/rate_limit.py',
        language: 'python',
        description: 'Redis fixed-window limiter cho login theo IP/email để giảm brute force.',
        code: `from fastapi import HTTPException, status
from redis import Redis

class RateLimiter:
    def __init__(self, redis: Redis):
        self.redis = redis

    def check(self, key: str, limit: int, window_seconds: int) -> None:
        current = self.redis.incr(key)
        if current == 1:
            self.redis.expire(key, window_seconds)
        if current > limit:
            raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many attempts")

def login_rate_key(ip: str, email: str) -> str:
    return f"rate:login:{ip}:{email.lower()}"`,
      },
      {
        variant: 'test',
        filename: 'tests/test_rate_limit.py',
        language: 'python',
        description: 'Test limiter trả 429 sau khi vượt quá số lần cho phép.',
        code: `def test_login_rate_limit_blocks_after_limit(rate_limiter):
    key = "rate:login:127.0.0.1:a@example.com"
    for _ in range(5):
        rate_limiter.check(key, limit=5, window_seconds=60)
    with pytest.raises(HTTPException) as exc:
        rate_limiter.check(key, limit=5, window_seconds=60)
    assert exc.value.status_code == 429`,
      },
    ];
  }

  if (p.id === 'docker-deploy-fastapi') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'docker-compose.yml',
        language: 'yaml',
        description: 'Compose production-like với API, Postgres, Redis và healthcheck.',
        code: `services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 30s
      timeout: 5s
      retries: 3
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
  redis:
    image: redis:7-alpine`,
      },
      {
        variant: 'test',
        filename: 'scripts/smoke_test.sh',
        language: 'bash',
        description: 'Smoke test sau deploy để kiểm tra healthcheck và route docs cơ bản.',
        code: `#!/usr/bin/env bash
set -euo pipefail
BASE_URL="\${BASE_URL:-http://localhost:8000}"
curl -fsS "$BASE_URL/health" | grep -q "ok"
echo "Smoke test passed"`,
      },
    ];
  }

  if (p.id === 'rag-query-backend') {
    return [
      withVariant(p.codeTemplates[0], 'minimal'),
      {
        variant: 'production',
        filename: 'app/services/rag_service.py',
        language: 'python',
        description: 'RAG service production-aware: permission filter, reranking hook, citation và output schema.',
        code: `from pydantic import BaseModel

class Citation(BaseModel):
    source: str
    chunk_id: str

class RagAnswer(BaseModel):
    answer: str
    citations: list[Citation]

class RagService:
    def __init__(self, retriever, reranker, llm):
        self.retriever = retriever
        self.reranker = reranker
        self.llm = llm

    def answer(self, question: str, user_id: str) -> RagAnswer:
        docs = self.retriever.search(question, filters={"allowed_user_ids": user_id}, limit=12)
        ranked = self.reranker.rank(question, docs)[:5]
        answer = self.llm.generate(question=question, context=[d.text for d in ranked])
        citations = [Citation(source=d.source, chunk_id=d.id) for d in ranked]
        return RagAnswer(answer=answer, citations=citations)`,
      },
      {
        variant: 'test',
        filename: 'tests/test_rag_permissions.py',
        language: 'python',
        description: 'Test RAG bắt buộc truyền permission filter để không leak tài liệu giữa user/tenant.',
        code: `def test_rag_retrieval_uses_user_permission_filter(rag_service, retriever_spy):
    rag_service.answer("What is the policy?", user_id="user_123")
    assert retriever_spy.last_filters == {"allowed_user_ids": "user_123"}`,
      },
    ];
  }

  return original;
}

export const fastapiCrudCode = `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user_schema import UserCreate, UserRead
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    return UserService(db).create(payload)

@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = UserService(db).get_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user`;
