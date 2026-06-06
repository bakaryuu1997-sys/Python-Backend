import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const AUTH_SECURITY_PATTERNS: Pattern[] = [
  pattern({
      id: 'jwt-auth-api', title: 'JWT Authentication with Refresh Token', vietnameseTitle: 'Đăng nhập JWT + refresh token', shortDescription: 'Register/login, hash password, access token, refresh token và dependency bảo vệ API.', category: 'auth-security', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['FastAPI', 'PyJWT', 'bcrypt', 'SQLAlchemy'],
      whyUse: ['SPA/mobile app cần token auth.', 'Cần protected API.', 'Cần refresh token để không bắt user login liên tục.'], whyNotUse: ['Web truyền thống dùng server session/cookie.', 'Không có user account.'], installCommand: 'pip install pyjwt bcrypt passlib[bcrypt] python-multipart', folderStructure: `app/core/security.py\napp/routers/auth_router.py\napp/services/auth_service.py`,
      codeTemplates: [{ filename: 'app/core/security.py', language: 'python', description: 'Hash password và tạo JWT.', code: `from datetime import datetime, timedelta, timezone\nimport jwt\nimport bcrypt\n\ndef hash_password(password: str) -> str:\n    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()\n\ndef verify_password(password: str, hashed: str) -> bool:\n    return bcrypt.checkpw(password.encode(), hashed.encode())\n\ndef create_token(subject: str, secret: str, minutes: int = 30) -> str:\n    exp = datetime.now(timezone.utc) + timedelta(minutes=minutes)\n    return jwt.encode({"sub": subject, "exp": exp}, secret, algorithm="HS256")` }], relatedPatterns: ['rbac-permission', 'rate-limit-login']
    }),
  pattern({ id: 'rbac-permission', title: 'Role-Based Access Control Dependency', vietnameseTitle: 'Phân quyền role admin/user', shortDescription: 'Dependency kiểm tra role/permission trước khi cho gọi endpoint nhạy cảm.', category: 'auth-security', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['FastAPI', 'Enum', 'SQLAlchemy'], whyUse: ['Cần admin/user/staff role.', 'Endpoint cần chặn theo quyền.', 'Cần rule tái sử dụng ở nhiều route.'], whyNotUse: ['App public không phân quyền.', 'Permission cực phức tạp nên dùng policy engine như Casbin.'], installCommand: 'pip install fastapi', folderStructure: `app/core/permissions.py`, codeTemplates: [{ filename: 'app/core/permissions.py', language: 'python', description: 'Dependency require_role.', code: `from fastapi import Depends, HTTPException, status\nfrom app.core.auth import get_current_user\n\ndef require_role(*allowed_roles: str):\n    def checker(user = Depends(get_current_user)):\n        if user.role not in allowed_roles:\n            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")\n        return user\n    return checker` }], relatedPatterns: ['jwt-auth-api'] }),
  pattern({
    "id": "cors-production-config",
    "title": "CORS Production Config",
    "vietnameseTitle": "Cấu hình CORS production",
    "shortDescription": "Cấu hình CORS an toàn thay vì allow_origins=* trong production.",
    "category": "auth-security",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "CORS"
    ],
    "whyUse": [
      "Frontend khác domain gọi API.",
      "Deploy production cần whitelist origin.",
      "Cần tránh browser chặn request hợp lệ."
    ],
    "whyNotUse": [
      "App không có browser client.",
      "Chỉ chạy cùng domain và không cần CORS."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/core/cors.py",
    "codeTemplates": [
      {
        "filename": "app/main.py",
        "language": "python",
        "description": "CORS middleware với whitelist origin.",
        "code": "from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\n\nALLOWED_ORIGINS = [\"https://app.example.com\", \"https://admin.example.com\"]\n\napp = FastAPI()\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=ALLOWED_ORIGINS,\n    allow_credentials=True,\n    allow_methods=[\"GET\", \"POST\", \"PUT\", \"PATCH\", \"DELETE\"],\n    allow_headers=[\"Authorization\", \"Content-Type\"],\n)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_cors.py",
        "language": "python",
        "description": "Kiểm tra origin không whitelist không được cấp header.",
        "code": "def test_cors_disallows_unknown_origin(client):\n    res = client.options(\"/api/v1/users\", headers={\"Origin\": \"https://evil.example\"})\n    assert res.headers.get(\"access-control-allow-origin\") != \"https://evil.example\"",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "settings-management"
    ],
    "searchKeywords": [
      "cors",
      "origin",
      "browser security"
    ]
  }),
  pattern({
    "id": "security-headers-middleware",
    "title": "Security Headers Middleware",
    "vietnameseTitle": "Middleware security headers",
    "shortDescription": "Thêm headers bảo mật cơ bản cho API/web app khi trả response qua reverse proxy hoặc trực tiếp.",
    "category": "auth-security",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "whyUse": [
      "Cần harden HTTP response.",
      "App có browser client.",
      "Muốn giảm rủi ro clickjacking/mime sniffing."
    ],
    "whyNotUse": [
      "API sau gateway đã set headers đầy đủ.",
      "Prototype local."
    ],
    "installCommand": "pip install fastapi",
    "folderStructure": "app/middleware/security_headers.py",
    "codeTemplates": [
      {
        "filename": "app/middleware/security_headers.py",
        "language": "python",
        "description": "Middleware thêm header bảo mật.",
        "code": "from starlette.middleware.base import BaseHTTPMiddleware\n\nclass SecurityHeadersMiddleware(BaseHTTPMiddleware):\n    async def dispatch(self, request, call_next):\n        response = await call_next(request)\n        response.headers[\"X-Content-Type-Options\"] = \"nosniff\"\n        response.headers[\"X-Frame-Options\"] = \"DENY\"\n        response.headers[\"Referrer-Policy\"] = \"no-referrer\"\n        response.headers[\"Permissions-Policy\"] = \"camera=(), microphone=(), geolocation=()\"\n        return response",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_security_headers.py",
        "language": "python",
        "description": "Test headers có mặt.",
        "code": "def test_security_headers(client):\n    res = client.get(\"/health\")\n    assert res.headers[\"X-Content-Type-Options\"] == \"nosniff\"",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "cors-production-config"
    ],
    "searchKeywords": [
      "headers",
      "hardening",
      "clickjacking"
    ]
  }),
  pattern({
    "id": "api-key-auth",
    "title": "API Key Authentication",
    "vietnameseTitle": "Xác thực bằng API key",
    "shortDescription": "Bảo vệ endpoint machine-to-machine bằng API key có hash, prefix và scope.",
    "category": "auth-security",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "whyUse": [
      "Service bên thứ ba gọi API.",
      "Cần machine-to-machine auth đơn giản.",
      "Không muốn dùng OAuth cho integration nhỏ."
    ],
    "whyNotUse": [
      "User login thông thường nên dùng session/JWT/OIDC.",
      "API public không cần auth."
    ],
    "installCommand": "pip install fastapi sqlalchemy",
    "folderStructure": "app/dependencies/api_key.py",
    "codeTemplates": [
      {
        "filename": "app/dependencies/api_key.py",
        "language": "python",
        "description": "Dependency đọc X-API-Key và kiểm tra hash.",
        "code": "from fastapi import Header, HTTPException, status\nimport hmac\n\ndef verify_api_key(x_api_key: str | None = Header(default=None)) -> str:\n    if not x_api_key:\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Missing API key\")\n    expected = \"prefix_live_abc\"\n    if not hmac.compare_digest(x_api_key, expected):\n        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=\"Invalid API key\")\n    return \"integration_id\"",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_api_key_auth.py",
        "language": "python",
        "description": "Test missing key trả 401.",
        "code": "def test_api_key_required(client):\n    res = client.get(\"/api/v1/integrations/data\")\n    assert res.status_code == 401",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "api key",
      "integration",
      "machine to machine"
    ]
  }),
  pattern({
    "id": "password-reset-flow",
    "title": "Password Reset Flow",
    "vietnameseTitle": "Luồng quên mật khẩu",
    "shortDescription": "Tạo reset token ngắn hạn, gửi email, reset password an toàn và không leak user tồn tại hay không.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Email"
    ],
    "whyUse": [
      "App có user account.",
      "Cần quên mật khẩu an toàn.",
      "Cần token expire và one-time use."
    ],
    "whyNotUse": [
      "App dùng SSO/OIDC không quản lý password.",
      "Không có email service."
    ],
    "installCommand": "pip install fastapi sqlalchemy itsdangerous",
    "folderStructure": "app/routers/password_router.py\napp/services/password_reset_service.py",
    "codeTemplates": [
      {
        "filename": "app/services/password_reset_service.py",
        "language": "python",
        "description": "Service tạo token reset một lần.",
        "code": "from datetime import datetime, timedelta, timezone\nfrom secrets import token_urlsafe\n\nRESET_TTL_MINUTES = 30\n\ndef create_reset_token() -> tuple[str, datetime]:\n    token = token_urlsafe(32)\n    expires_at = datetime.now(timezone.utc) + timedelta(minutes=RESET_TTL_MINUTES)\n    return token, expires_at\n\ndef reset_password(user, token_record, new_password_hash: str) -> None:\n    if token_record.used_at is not None or token_record.expires_at < datetime.now(timezone.utc):\n        raise ValueError(\"Invalid reset token\")\n    user.password_hash = new_password_hash\n    token_record.used_at = datetime.now(timezone.utc)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_password_reset.py",
        "language": "python",
        "description": "Token đã dùng không được dùng lại.",
        "code": "def test_reset_token_one_time_use(password_reset_service, used_token):\n    with pytest.raises(ValueError):\n        password_reset_service.reset_password(user, used_token, \"hash\")",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "email-sending",
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "forgot password",
      "reset password",
      "token one time"
    ]
  }),
  pattern({
    "id": "refresh-token-rotation",
    "title": "Refresh Token Rotation",
    "vietnameseTitle": "Refresh token rotation",
    "shortDescription": "Refresh token có rotation, revoke và reuse detection để giảm rủi ro token bị đánh cắp.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "JWT"
    ],
    "whyUse": [
      "Cần session lâu dài trên mobile/web.",
      "Cần logout/revoke token.",
      "Cần phát hiện refresh token bị reuse."
    ],
    "whyNotUse": [
      "App chỉ dùng short-lived access token.",
      "Không quản lý user session."
    ],
    "installCommand": "pip install pyjwt sqlalchemy",
    "folderStructure": "app/services/token_service.py",
    "codeTemplates": [
      {
        "filename": "app/services/token_service.py",
        "language": "python",
        "description": "Rotation refresh token.",
        "code": "from secrets import token_urlsafe\n\ndef rotate_refresh_token(session, old_token_hash: str) -> str:\n    token_record = session.get_by_hash(old_token_hash)\n    if token_record is None or token_record.revoked_at is not None:\n        raise ValueError(\"Refresh token reuse detected\")\n    token_record.revoked_at = session.now()\n    new_token = token_urlsafe(48)\n    session.create_refresh_token(parent_id=token_record.id, raw_token=new_token)\n    return new_token",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_refresh_rotation.py",
        "language": "python",
        "description": "Reuse token cũ phải bị chặn.",
        "code": "def test_refresh_token_reuse_detected(token_service, old_token_hash):\n    token_service.rotate_refresh_token(old_token_hash)\n    with pytest.raises(ValueError):\n        token_service.rotate_refresh_token(old_token_hash)",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "refresh token",
      "rotation",
      "revoke"
    ]
  }),
  pattern({
    "id": "tenant-aware-query",
    "title": "Tenant-Aware Query Filter",
    "vietnameseTitle": "Query theo tenant/workspace",
    "shortDescription": "Bắt buộc filter tenant_id/workspace_id ở repository để tránh leak dữ liệu giữa tổ chức.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "whyUse": [
      "App SaaS nhiều workspace.",
      "Dữ liệu mỗi organization phải tách biệt.",
      "Cần permission filter nhất quán."
    ],
    "whyNotUse": [
      "Single-tenant app.",
      "Không có organization/workspace."
    ],
    "installCommand": "pip install sqlalchemy",
    "folderStructure": "app/repositories/base_repository.py",
    "codeTemplates": [
      {
        "filename": "app/repositories/base_repository.py",
        "language": "python",
        "description": "Base query bắt buộc tenant_id.",
        "code": "class TenantRepository:\n    def __init__(self, session, tenant_id: str):\n        self.session = session\n        self.tenant_id = tenant_id\n\n    def scope(self, query, model):\n        return query.where(model.tenant_id == self.tenant_id)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_tenant_scope.py",
        "language": "python",
        "description": "Query luôn có tenant filter.",
        "code": "def test_tenant_scope_filters_query(session):\n    repo = TenantRepository(session, tenant_id=\"t1\")\n    query = repo.scope(select(Document), Document)\n    assert \"tenant_id\" in str(query)",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "rbac-permission",
      "rag-query-backend"
    ],
    "searchKeywords": [
      "multi tenant",
      "tenant isolation",
      "workspace"
    ]
  }),
  pattern({
    "id": "audit-log-pattern",
    "title": "Audit Log Pattern",
    "vietnameseTitle": "Audit log hành động quan trọng",
    "shortDescription": "Ghi lại ai làm gì, lúc nào, trên resource nào cho admin/security/debug.",
    "category": "auth-security",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "FastAPI"
    ],
    "whyUse": [
      "Admin action cần truy vết.",
      "Payment/security/user data thay đổi.",
      "Cần điều tra sự cố."
    ],
    "whyNotUse": [
      "Prototype không có user thật.",
      "Log thường đã đủ và không cần audit."
    ],
    "installCommand": "pip install sqlalchemy",
    "folderStructure": "app/services/audit_service.py",
    "codeTemplates": [
      {
        "filename": "app/services/audit_service.py",
        "language": "python",
        "description": "Audit service.",
        "code": "def write_audit_log(db, actor_id: str, action: str, resource_type: str, resource_id: str, metadata: dict | None = None):\n    db.add({\n        \"actor_id\": actor_id,\n        \"action\": action,\n        \"resource_type\": resource_type,\n        \"resource_id\": resource_id,\n        \"metadata\": metadata or {},\n    })",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_audit_log.py",
        "language": "python",
        "description": "Audit được ghi khi update permission.",
        "code": "def test_audit_log_written(db):\n    write_audit_log(db, \"u1\", \"permission.update\", \"user\", \"u2\")\n    assert db.query(AuditLog).count() == 1",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "tenant-aware-query",
      "rbac-permission"
    ],
    "searchKeywords": [
      "audit",
      "admin log",
      "governance"
    ]
  }),
  pattern({
      id: 'resource-ownership-check',
      title: 'Resource Ownership Check',
      vietnameseTitle: 'Kiểm tra quyền sở hữu tài nguyên',
      shortDescription: 'Đảm bảo user chỉ thao tác resource thuộc tenant/workspace của họ trước khi read/update/delete.',
      category: 'auth-security',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['FastAPI', 'SQLAlchemy'],
      whyUse: ['Endpoint nhận resource_id từ path.', 'Cần chống user đoán ID resource tenant khác.', 'Update/delete cần kiểm tra ownership.'],
      whyNotUse: ['Resource public thật sự.', 'Đã dùng RLS và vẫn có service-level check đầy đủ.'],
      installCommand: 'pip install fastapi sqlalchemy',
      folderStructure: `app/services/resource_guard.py`,
      codeTemplates: [
        { filename: 'app/services/resource_guard.py', language: 'python', variant: 'production', description: 'Guard lấy resource theo id và tenant cùng lúc.', code: `def get_project_or_404(db, project_id: int, tenant):\n    project = (\n        db.query(Project)\n        .filter(Project.id == project_id)\n        .filter(Project.organization_id == tenant.organization_id)\n        .first()\n    )\n    if project is None:\n        raise HTTPException(status_code=404, detail=\"Project not found\")\n    return project` },
        { filename: 'tests/test_resource_ownership.py', language: 'python', variant: 'test', description: 'ID tồn tại ở tenant khác vẫn trả 404/403.', code: `def test_other_tenant_resource_is_hidden(client, token_org_a, project_org_b):\n    res = client.get(f\"/projects/{project_org_b.id}\", headers={\"Authorization\": f\"Bearer {token_org_a}\"})\n    assert res.status_code in (403, 404)` }
      ],
      commonErrors: errors(['Fetch resource bằng id trước rồi mới check tenant', 'Trả 403 làm lộ resource tồn tại', 'Không test cross-tenant ID']),
      productionChecklist: checklist(['Luôn query id + tenant trong cùng câu query', 'Không trả dữ liệu resource trước khi check ownership', 'Test read/update/delete cross-tenant', 'Log access denied nếu có yêu cầu audit']),
      relatedPatterns: ['tenant-aware-query-filter', 'advanced-rbac-tenant-roles'],
      searchKeywords: ['ownership check', 'resource ownership', 'id guessing', 'tenant access']
    }),
  pattern({
      id: 'pii-redaction-logging',
      title: 'PII Redaction in Logs',
      vietnameseTitle: 'Ẩn dữ liệu cá nhân trong log',
      shortDescription: 'Redact email, phone, token, password, API key và dữ liệu nhạy cảm trước khi ghi log/audit/LLM trace.',
      category: 'auth-security',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['structlog', 'logging'],
      whyUse: ['Log có request body hoặc metadata user.', 'App xử lý dữ liệu cá nhân, tài liệu, OCR hoặc auth.', 'Cần giảm rủi ro lộ PII trong log vendor.'],
      whyNotUse: ['Log chỉ chứa event kỹ thuật không có payload.', 'App local demo.'],
      installCommand: 'pip install structlog',
      folderStructure: `app/core/redaction.py\napp/core/logging.py`,
      codeTemplates: [
        { filename: 'app/core/redaction.py', language: 'python', variant: 'production', description: 'Redaction recursive cho dict/list.', code: `SENSITIVE_KEYS = {\"password\", \"token\", \"secret\", \"api_key\", \"authorization\", \"email\", \"phone\"}\n\ndef redact_value(key: str, value):\n    if key.lower() in SENSITIVE_KEYS:\n        return \"[REDACTED]\"\n    return value\n\ndef redact(obj):\n    if isinstance(obj, dict):\n        return {k: redact(redact_value(k, v)) for k, v in obj.items()}\n    if isinstance(obj, list):\n        return [redact(item) for item in obj]\n    return obj` },
        { filename: 'tests/test_redaction.py', language: 'python', variant: 'test', description: 'Không để token/email trong output log.', code: `def test_redact_nested_sensitive_data():\n    data = {\"user\": {\"email\": \"a@example.com\"}, \"token\": \"secret\"}\n    redacted = redact(data)\n    assert redacted[\"user\"][\"email\"] == \"[REDACTED]\"\n    assert redacted[\"token\"] == \"[REDACTED]\"` }
      ],
      commonErrors: errors(['Log full request body khi debug production', 'Chỉ redact key top-level', 'Không redact authorization header']),
      productionChecklist: checklist(['Redact request/response metadata', 'Không log OCR text nhạy cảm', 'Không log Authorization/Cookie', 'Test redaction utility']),
      relatedPatterns: ['structured-json-logging', 'audit-log-enterprise'],
      searchKeywords: ['pii redaction', 'log redaction', 'sensitive data', 'privacy']
    }),
  pattern({
      id: 'field-level-encryption',
      title: 'Field-level Encryption',
      vietnameseTitle: 'Mã hóa cấp trường cho dữ liệu nhạy cảm',
      shortDescription: 'Mã hóa một số field như tax_id, secret, credential hoặc document metadata trước khi lưu database.',
      category: 'auth-security',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['cryptography'],
      whyUse: ['Database chứa field nhạy cảm.', 'Cần giảm rủi ro khi DB snapshot bị lộ.', 'Cần tách key management khỏi data storage.'],
      whyNotUse: ['Chỉ cần hash một chiều như password/API key.', 'Không có key rotation plan.'],
      installCommand: 'pip install cryptography',
      folderStructure: `app/core/encryption.py\napp/models/secure_field.py`,
      codeTemplates: [
        { filename: 'app/core/encryption.py', language: 'python', variant: 'production', description: 'Fernet encryption wrapper tối thiểu.', code: `from cryptography.fernet import Fernet\n\nclass FieldEncryptor:\n    def __init__(self, key: str):\n        self.fernet = Fernet(key.encode())\n\n    def encrypt(self, value: str) -> str:\n        return self.fernet.encrypt(value.encode()).decode()\n\n    def decrypt(self, token: str) -> str:\n        return self.fernet.decrypt(token.encode()).decode()` },
        { filename: 'tests/test_field_encryption.py', language: 'python', variant: 'test', description: 'Ciphertext không chứa plaintext và decrypt được.', code: `def test_encrypt_decrypt_roundtrip(encryptor):\n    token = encryptor.encrypt(\"sensitive-value\")\n    assert \"sensitive-value\" not in token\n    assert encryptor.decrypt(token) == \"sensitive-value\"` }
      ],
      commonErrors: errors(['Dùng encryption thay cho password hashing', 'Lưu encryption key cùng database', 'Không có key rotation strategy']),
      productionChecklist: checklist(['Key lấy từ secret manager/env, không commit', 'Không log plaintext sau decrypt', 'Có key rotation runbook', 'Chỉ decrypt ở service cần thiết']),
      relatedPatterns: ['secret-rotation-runbook', 'pii-redaction-logging'],
      searchKeywords: ['field encryption', 'fernet', 'encrypt sensitive data']
    })
];
