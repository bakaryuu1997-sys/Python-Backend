import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DJANGO_PATTERNS: Pattern[] = [
  pattern({
    "id": "django-drf-viewset",
    "title": "Django REST Framework ViewSet",
    "vietnameseTitle": "DRF ViewSet CRUD",
    "shortDescription": "CRUD API nhanh trong Django bằng ModelSerializer, ViewSet và permission class.",
    "category": "django",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "Django REST Framework"
    ],
    "whyUse": [
      "Dự án đã dùng Django.",
      "Cần admin/ORM/auth có sẵn.",
      "CRUD nhiều model."
    ],
    "whyNotUse": [
      "Microservice API nhẹ không cần Django ecosystem.",
      "Không cần admin hoặc ORM Django."
    ],
    "installCommand": "pip install django djangorestframework",
    "folderStructure": "users/serializers.py\nusers/views.py\nurls.py",
    "codeTemplates": [
      {
        "filename": "users/views.py",
        "language": "python",
        "description": "ViewSet CRUD với permission.",
        "code": "from rest_framework import viewsets, permissions\nfrom .models import UserProfile\nfrom .serializers import UserProfileSerializer\n\nclass UserProfileViewSet(viewsets.ModelViewSet):\n    queryset = UserProfile.objects.all()\n    serializer_class = UserProfileSerializer\n    permission_classes = [permissions.IsAuthenticated]",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_userprofile_api.py",
        "language": "python",
        "description": "Test unauthenticated bị chặn.",
        "code": "def test_profile_requires_auth(api_client):\n    res = api_client.get(\"/api/profiles/\")\n    assert res.status_code == 401",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "django-admin-model",
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "django",
      "drf",
      "viewset",
      "serializer"
    ]
  }),
  pattern({
    "id": "django-admin-model",
    "title": "Django Admin Model Setup",
    "vietnameseTitle": "Django Admin cho model",
    "shortDescription": "Đăng ký model vào Django Admin để quản trị dữ liệu nội bộ nhanh và an toàn.",
    "category": "django",
    "difficulty": "Easy",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django"
    ],
    "whyUse": [
      "Cần admin nội bộ nhanh.",
      "Cần xem/sửa dữ liệu bằng UI có sẵn.",
      "Dự án Django có model nhiều."
    ],
    "whyNotUse": [
      "Không dùng Django.",
      "Admin public không có kiểm soát quyền."
    ],
    "installCommand": "pip install django",
    "folderStructure": "users/admin.py",
    "codeTemplates": [
      {
        "filename": "users/admin.py",
        "language": "python",
        "description": "Admin class có search/list_filter.",
        "code": "from django.contrib import admin\nfrom .models import UserProfile\n\n@admin.register(UserProfile)\nclass UserProfileAdmin(admin.ModelAdmin):\n    list_display = (\"id\", \"user\", \"created_at\")\n    search_fields = (\"user__email\",)\n    list_filter = (\"created_at\",)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_admin_registration.py",
        "language": "python",
        "description": "Smoke test admin site load.",
        "code": "def test_admin_requires_login(client):\n    res = client.get(\"/admin/\")\n    assert res.status_code in {200, 302}",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "django-drf-viewset"
    ],
    "searchKeywords": [
      "django admin",
      "modeladmin"
    ]
  }),
  pattern({
      id: 'django-settings-split',
      title: 'Django Settings Split',
      vietnameseTitle: 'Tách settings Django theo môi trường',
      shortDescription: 'Tách base/dev/staging/production settings để tránh hard-code secret, debug mode và cấu hình sai khi deploy.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django', 'django-environ'],
      whyUse: ['Dự án Django có dev/staging/prod.', 'Cần tách DEBUG, ALLOWED_HOSTS, database, cache, storage.', 'Muốn tránh commit secret vào repo.'],
      whyNotUse: ['Prototype một file local.', 'Dự án chưa deploy production.'],
      installCommand: 'pip install django-environ',
      folderStructure: `config/settings/base.py\nconfig/settings/dev.py\nconfig/settings/production.py\nconfig/settings/test.py`,
      codeTemplates: [
        { filename: 'config/settings/base.py', language: 'python', variant: 'production', description: 'Base settings dùng chung.', code: `from pathlib import Path\nimport environ\n\nBASE_DIR = Path(__file__).resolve().parent.parent.parent\nenv = environ.Env(DEBUG=(bool, False))\nenviron.Env.read_env(BASE_DIR / \".env\")\n\nSECRET_KEY = env(\"SECRET_KEY\")\nDEBUG = env(\"DEBUG\")\nALLOWED_HOSTS = env.list(\"ALLOWED_HOSTS\", default=[])\n\nINSTALLED_APPS = [\n    \"django.contrib.admin\",\n    \"django.contrib.auth\",\n    \"django.contrib.contenttypes\",\n    \"django.contrib.sessions\",\n    \"django.contrib.messages\",\n    \"django.contrib.staticfiles\",\n    \"rest_framework\",\n]\n\nDATABASES = {\n    \"default\": env.db(\"DATABASE_URL\")\n}` },
        { filename: 'config/settings/production.py', language: 'python', variant: 'production', description: 'Production override bắt buộc an toàn.', code: `from .base import *\n\nDEBUG = False\nSECURE_SSL_REDIRECT = True\nSESSION_COOKIE_SECURE = True\nCSRF_COOKIE_SECURE = True\nSECURE_HSTS_SECONDS = 31536000\nSECURE_HSTS_INCLUDE_SUBDOMAINS = True\nSECURE_HSTS_PRELOAD = True\n\nREST_FRAMEWORK = {\n    \"DEFAULT_AUTHENTICATION_CLASSES\": [\n        \"rest_framework_simplejwt.authentication.JWTAuthentication\",\n    ],\n}` },
        { filename: 'tests/test_settings.py', language: 'python', variant: 'test', description: 'Production không được bật DEBUG.', code: `def test_production_debug_is_false(settings):\n    assert settings.DEBUG is False` }
      ],
      commonErrors: errors(['Commit SECRET_KEY vào repo', 'Production vẫn DEBUG=True', 'ALLOWED_HOSTS quá rộng']),
      productionChecklist: checklist(['SECRET_KEY lấy từ env', 'Production DEBUG=False', 'Cookie secure bật khi dùng HTTPS', 'Có settings riêng cho test']),
      relatedPatterns: ['django-deployment-checklist', 'secret-rotation-runbook'],
      searchKeywords: ['django settings split', 'production settings', 'django environ']
    }),
  pattern({
      id: 'django-custom-user-model',
      title: 'Django Custom User Model',
      vietnameseTitle: 'Custom User Model cho Django',
      shortDescription: 'Tạo custom user model ngay từ đầu để tránh kẹt schema khi cần email login, organization hoặc profile mở rộng.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django'],
      whyUse: ['Muốn login bằng email thay username.', 'Cần mở rộng user cho SaaS/enterprise.', 'Dự án mới chưa migrate production.'],
      whyNotUse: ['Dự án cũ đã production với default User và không cần đổi.', 'Chỉ prototype rất nhỏ.'],
      installCommand: 'pip install django',
      folderStructure: `accounts/models.py\naccounts/managers.py\nconfig/settings/base.py`,
      codeTemplates: [
        { filename: 'accounts/models.py', language: 'python', variant: 'production', description: 'Custom user dùng email làm username field.', code: `from django.contrib.auth.models import AbstractUser\nfrom django.db import models\n\nclass User(AbstractUser):\n    username = None\n    email = models.EmailField(unique=True)\n    full_name = models.CharField(max_length=160, blank=True)\n\n    USERNAME_FIELD = \"email\"\n    REQUIRED_FIELDS = []\n\n    def __str__(self) -> str:\n        return self.email` },
        { filename: 'config/settings/base.py', language: 'python', variant: 'config', description: 'Khai báo AUTH_USER_MODEL trước migration đầu tiên.', code: `AUTH_USER_MODEL = \"accounts.User\"` },
        { filename: 'tests/test_user_model.py', language: 'python', variant: 'test', description: 'User email unique và username disabled.', code: `def test_custom_user_uses_email(db, django_user_model):\n    user = django_user_model.objects.create_user(email=\"a@example.com\", password=\"secret\")\n    assert user.username is None\n    assert str(user) == \"a@example.com\"` }
      ],
      commonErrors: errors(['Tạo custom user sau khi đã migrate nhiều app', 'Quên AUTH_USER_MODEL trước migration đầu', 'Không normalize email']),
      productionChecklist: checklist(['Tạo custom user ngay từ đầu project', 'Email unique và normalize', 'Admin form hỗ trợ custom user', 'Test create_user/create_superuser']),
      relatedPatterns: ['django-admin-hardening', 'drf-simplejwt-auth'],
      searchKeywords: ['django custom user', 'email login', 'AUTH_USER_MODEL']
    }),
  pattern({
      id: 'django-admin-hardening',
      title: 'Django Admin Hardening',
      vietnameseTitle: 'Gia cố bảo mật Django Admin',
      shortDescription: 'Cấu hình admin production an toàn hơn: quyền truy cập, audit, readonly field, search/filter và hạn chế dữ liệu nhạy cảm.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django'],
      whyUse: ['Django Admin dùng trong production/internal ops.', 'Có dữ liệu user/payment/file nhạy cảm.', 'Cần giảm rủi ro admin thao tác nhầm.'],
      whyNotUse: ['Admin chỉ chạy local.', 'Bạn xây admin riêng hoàn toàn.'],
      installCommand: 'pip install django',
      folderStructure: `accounts/admin.py\ncore/admin_site.py`,
      codeTemplates: [
        { filename: 'accounts/admin.py', language: 'python', variant: 'production', description: 'Admin hiển thị an toàn và readonly field nhạy cảm.', code: `from django.contrib import admin\nfrom django.contrib.auth import get_user_model\n\nUser = get_user_model()\n\n@admin.register(User)\nclass UserAdmin(admin.ModelAdmin):\n    list_display = (\"id\", \"email\", \"is_active\", \"is_staff\", \"date_joined\")\n    list_filter = (\"is_active\", \"is_staff\")\n    search_fields = (\"email\", \"full_name\")\n    readonly_fields = (\"date_joined\", \"last_login\")\n\n    def has_delete_permission(self, request, obj=None):\n        return request.user.is_superuser` },
        { filename: 'config/settings/production.py', language: 'python', variant: 'config', description: 'Cookie/security settings cho admin.', code: `SESSION_COOKIE_SECURE = True\nCSRF_COOKIE_SECURE = True\nSECURE_SSL_REDIRECT = True\nX_FRAME_OPTIONS = \"DENY\"` }
      ],
      commonErrors: errors(['Cho staff quá nhiều quyền', 'Hiển thị token/secret/password hash không cần thiết', 'Không log admin action quan trọng']),
      productionChecklist: checklist(['Staff permission tối thiểu', 'Readonly field cho dữ liệu hệ thống', 'Không hiển thị secret/token', 'Admin route chỉ cho HTTPS/VPN/IP allowlist nếu cần']),
      relatedPatterns: ['audit-log-enterprise', 'django-custom-user-model'],
      searchKeywords: ['django admin', 'admin hardening', 'staff permissions']
    }),
  pattern({
      id: 'drf-serializer-advanced',
      title: 'DRF Serializer Advanced',
      vietnameseTitle: 'DRF Serializer nâng cao',
      shortDescription: 'Dùng serializer cho nested input, validation theo context, read/write fields và response shape ổn định.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework'],
      whyUse: ['API Django cần validate request rõ.', 'Cần tách input/output serializer.', 'Cần context user/tenant trong validation.'],
      whyNotUse: ['API cực nhỏ dùng function view đơn giản.', 'Không dùng DRF.'],
      installCommand: 'pip install djangorestframework',
      folderStructure: `apps/projects/serializers.py`,
      codeTemplates: [
        { filename: 'apps/projects/serializers.py', language: 'python', variant: 'production', description: 'Tách create serializer và response serializer.', code: `from rest_framework import serializers\nfrom .models import Project\n\nclass ProjectCreateSerializer(serializers.Serializer):\n    name = serializers.CharField(max_length=160)\n    slug = serializers.SlugField(max_length=120)\n\n    def validate_slug(self, value):\n        organization = self.context[\"organization\"]\n        if Project.objects.filter(organization=organization, slug=value).exists():\n            raise serializers.ValidationError(\"Slug already exists in this organization\")\n        return value\n\nclass ProjectResponseSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Project\n        fields = [\"id\", \"name\", \"slug\", \"created_at\"]\n        read_only_fields = fields` },
        { filename: 'tests/test_project_serializer.py', language: 'python', variant: 'test', description: 'Serializer reject slug trùng trong organization.', code: `def test_project_slug_unique_in_org(org, project):\n    serializer = ProjectCreateSerializer(data={\"name\": \"X\", \"slug\": project.slug}, context={\"organization\": org})\n    assert serializer.is_valid() is False` }
      ],
      commonErrors: errors(['Dùng một serializer cho cả create/update/response làm lộ field', 'Validation cần user/tenant nhưng không truyền context', 'Không test serializer errors']),
      productionChecklist: checklist(['Tách input/output serializer cho API quan trọng', 'Chỉ expose fields cần thiết', 'Validation dùng context an toàn', 'Test serializer error messages']),
      relatedPatterns: ['drf-viewset-advanced', 'tenant-aware-query-filter'],
      searchKeywords: ['drf serializer', 'serializer validation', 'nested serializer']
    }),
  pattern({
      id: 'drf-viewset-advanced',
      title: 'DRF ViewSet Advanced',
      vietnameseTitle: 'DRF ViewSet nâng cao',
      shortDescription: 'Tổ chức ViewSet production với get_queryset tenant-aware, serializer theo action và service layer cho business logic.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework'],
      whyUse: ['API Django có CRUD và permission phức tạp.', 'Cần filter query theo tenant/user.', 'Cần serializer khác nhau theo action.'],
      whyNotUse: ['Endpoint đơn giản không cần ViewSet.', 'Business logic đang quá nhỏ.'],
      installCommand: 'pip install djangorestframework',
      folderStructure: `apps/projects/views.py\napps/projects/services.py`,
      codeTemplates: [
        { filename: 'apps/projects/views.py', language: 'python', variant: 'production', description: 'ViewSet tenant-aware và serializer per action.', code: `from rest_framework import viewsets\nfrom rest_framework.permissions import IsAuthenticated\n\nclass ProjectViewSet(viewsets.ModelViewSet):\n    permission_classes = [IsAuthenticated]\n\n    def get_queryset(self):\n        return Project.objects.filter(organization=self.request.user.active_organization)\n\n    def get_serializer_class(self):\n        if self.action == \"create\":\n            return ProjectCreateSerializer\n        return ProjectResponseSerializer\n\n    def perform_create(self, serializer):\n        project_service.create_project(\n            organization=self.request.user.active_organization,\n            payload=serializer.validated_data,\n            actor=self.request.user,\n        )` },
        { filename: 'tests/test_project_viewset.py', language: 'python', variant: 'test', description: 'ViewSet không trả project organization khác.', code: `def test_project_list_is_tenant_scoped(api_client, user_org_a, project_org_b):\n    api_client.force_authenticate(user_org_a)\n    response = api_client.get(\"/api/projects/\")\n    assert project_org_b.id not in [item[\"id\"] for item in response.json()]` }
      ],
      commonErrors: errors(['get_queryset trả toàn bộ dữ liệu', 'Business logic nhét hết vào perform_create', 'Không đổi serializer theo action']),
      productionChecklist: checklist(['get_queryset luôn tenant-aware', 'Serializer per action rõ ràng', 'Service layer xử lý business logic', 'Test list/retrieve/update/delete với tenant khác']),
      relatedPatterns: ['drf-permissions-policy', 'drf-serializer-advanced'],
      searchKeywords: ['drf viewset', 'get_queryset', 'tenant viewset']
    }),
  pattern({
      id: 'drf-permissions-policy',
      title: 'DRF Permissions Policy',
      vietnameseTitle: 'DRF permission class theo role/resource',
      shortDescription: 'Tạo permission class kiểm tra user, role, tenant và object-level access thay vì chỉ IsAuthenticated.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework'],
      whyUse: ['API cần phân quyền admin/member/viewer.', 'Cần object-level permission.', 'Cần ownership check cho resource.'],
      whyNotUse: ['Endpoint public hoặc chỉ cần login.', 'Permission được xử lý bằng service khác đủ rõ.'],
      installCommand: 'pip install djangorestframework',
      folderStructure: `apps/core/permissions.py`,
      codeTemplates: [
        { filename: 'apps/core/permissions.py', language: 'python', variant: 'production', description: 'Permission class object-level.', code: `from rest_framework.permissions import BasePermission\n\nclass IsOrganizationMember(BasePermission):\n    def has_permission(self, request, view):\n        return bool(request.user and request.user.is_authenticated and request.user.active_organization_id)\n\n    def has_object_permission(self, request, view, obj):\n        return getattr(obj, \"organization_id\", None) == request.user.active_organization_id\n\nclass IsOrganizationAdmin(IsOrganizationMember):\n    def has_permission(self, request, view):\n        return super().has_permission(request, view) and request.user.active_membership_role in {\"admin\", \"owner\"}` },
        { filename: 'tests/test_drf_permissions.py', language: 'python', variant: 'test', description: 'Object-level permission chặn tenant khác.', code: `def test_object_permission_rejects_other_org(rf, user_org_a, project_org_b):\n    request = rf.get(\"/\")\n    request.user = user_org_a\n    assert IsOrganizationMember().has_object_permission(request, None, project_org_b) is False` }
      ],
      commonErrors: errors(['Chỉ dùng has_permission mà quên has_object_permission', 'So sánh organization object thay vì id gây query thừa', 'Không test role viewer/member/admin']),
      productionChecklist: checklist(['Object-level permission cho retrieve/update/delete', 'Permission class nhỏ và test được', 'Không tin organization_id từ request body', 'Audit action admin nhạy cảm']),
      relatedPatterns: ['advanced-rbac-tenant-roles', 'resource-ownership-check'],
      searchKeywords: ['drf permissions', 'object permission', 'has_object_permission']
    }),
  pattern({
      id: 'drf-filtering-search-ordering',
      title: 'DRF Filtering / Search / Ordering',
      vietnameseTitle: 'DRF filtering, search và ordering an toàn',
      shortDescription: 'Cho phép filter/search/sort danh sách API nhưng whitelist field để tránh query nặng hoặc lộ dữ liệu.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework', 'django-filter'],
      whyUse: ['API list cần filter/search/sort.', 'Frontend cần query linh hoạt.', 'Cần tránh expose mọi field cho ordering.'],
      whyNotUse: ['List nhỏ không cần filter.', 'Search production cần engine riêng.'],
      installCommand: 'pip install django-filter djangorestframework',
      folderStructure: `apps/projects/filters.py\napps/projects/views.py`,
      codeTemplates: [
        { filename: 'apps/projects/views.py', language: 'python', variant: 'production', description: 'DRF filter backends với whitelist.', code: `from django_filters.rest_framework import DjangoFilterBackend\nfrom rest_framework.filters import SearchFilter, OrderingFilter\n\nclass ProjectViewSet(viewsets.ModelViewSet):\n    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]\n    filterset_fields = [\"status\", \"created_by_id\"]\n    search_fields = [\"name\", \"slug\"]\n    ordering_fields = [\"created_at\", \"name\"]\n    ordering = [\"-created_at\"]` },
        { filename: 'tests/test_drf_filtering.py', language: 'python', variant: 'test', description: 'Ordering field không whitelist bị bỏ qua hoặc reject.', code: `def test_ordering_only_allows_whitelisted_fields(api_client, user):\n    api_client.force_authenticate(user)\n    res = api_client.get(\"/api/projects/?ordering=password\")\n    assert res.status_code in (200, 400)` }
      ],
      commonErrors: errors(['Cho ordering_fields="__all__"', 'Search trên field không index gây chậm', 'Filter chạy trước tenant scope không rõ']),
      productionChecklist: checklist(['Whitelist filter/search/order fields', 'Index field search/filter phổ biến', 'Luôn tenant scope queryset trước', 'Test query params bất thường']),
      relatedPatterns: ['pagination-filtering-sorting', 'drf-viewset-advanced'],
      searchKeywords: ['drf filter', 'django-filter', 'search_fields', 'ordering_fields']
    }),
  pattern({
      id: 'drf-throttling-rate-limit',
      title: 'DRF Throttling / Rate Limit',
      vietnameseTitle: 'DRF throttling để giới hạn request',
      shortDescription: 'Dùng DRF throttling cho anonymous/user/API scope để chống spam, brute force và abuse endpoint.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework', 'Redis optional'],
      whyUse: ['Endpoint login/reset password/public API cần giới hạn.', 'Muốn chống brute force và abuse.', 'Cần rate limit theo scope.'],
      whyNotUse: ['Chỉ chạy internal network có gateway limit.', 'Cần distributed rate limit nâng cao bằng Redis/custom middleware.'],
      installCommand: 'pip install djangorestframework',
      folderStructure: `config/settings/base.py\napps/auth/views.py`,
      codeTemplates: [
        { filename: 'config/settings/base.py', language: 'python', variant: 'config', description: 'DRF throttle config theo scope.', code: `REST_FRAMEWORK = {\n    \"DEFAULT_THROTTLE_CLASSES\": [\n        \"rest_framework.throttling.AnonRateThrottle\",\n        \"rest_framework.throttling.UserRateThrottle\",\n        \"rest_framework.throttling.ScopedRateThrottle\",\n    ],\n    \"DEFAULT_THROTTLE_RATES\": {\n        \"anon\": \"100/hour\",\n        \"user\": \"1000/hour\",\n        \"login\": \"5/minute\",\n        \"password_reset\": \"3/hour\",\n    },\n}` },
        { filename: 'apps/auth/views.py', language: 'python', variant: 'production', description: 'Scope throttle cho login endpoint.', code: `class LoginView(APIView):\n    throttle_scope = \"login\"\n\n    def post(self, request):\n        serializer = LoginSerializer(data=request.data)\n        serializer.is_valid(raise_exception=True)\n        return Response(auth_service.login(serializer.validated_data))` },
        { filename: 'tests/test_drf_throttling.py', language: 'python', variant: 'test', description: 'Login bị throttle sau nhiều lần.', code: `def test_login_throttle(api_client, settings):\n    settings.REST_FRAMEWORK[\"DEFAULT_THROTTLE_RATES\"][\"login\"] = \"1/minute\"\n    api_client.post(\"/api/login/\", {\"email\": \"a@b.com\", \"password\": \"x\"})\n    res = api_client.post(\"/api/login/\", {\"email\": \"a@b.com\", \"password\": \"x\"})\n    assert res.status_code == 429` }
      ],
      commonErrors: errors(['Không throttle login/password reset', 'Rate limit chỉ theo IP phía proxy không đủ', 'Test throttle không clear cache']),
      productionChecklist: checklist(['Scope riêng cho login/reset/webhook nếu cần', 'Cache backend ổn định cho throttle', 'Message 429 rõ nhưng không lộ info', 'Monitor số lần throttle']),
      relatedPatterns: ['rate-limit-login', 'drf-simplejwt-auth'],
      searchKeywords: ['drf throttling', 'rate limit', 'ScopedRateThrottle']
    }),
  pattern({
      id: 'drf-simplejwt-auth',
      title: 'DRF SimpleJWT Authentication',
      vietnameseTitle: 'JWT auth trong DRF bằng SimpleJWT',
      shortDescription: 'Thiết lập access/refresh token trong Django REST Framework với rotation, blacklist và protected API.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django REST Framework', 'SimpleJWT'],
      whyUse: ['DRF API cần token auth cho frontend/mobile.', 'Cần refresh token.', 'Muốn dùng package phổ biến thay vì tự viết JWT.'],
      whyNotUse: ['Server-rendered Django dùng session auth là đủ.', 'Enterprise SSO/OIDC là yêu cầu chính.'],
      installCommand: 'pip install djangorestframework djangorestframework-simplejwt',
      folderStructure: `config/settings/base.py\nconfig/urls.py`,
      codeTemplates: [
        { filename: 'config/settings/base.py', language: 'python', variant: 'config', description: 'SimpleJWT config production-aware.', code: `from datetime import timedelta\n\nINSTALLED_APPS += [\"rest_framework_simplejwt.token_blacklist\"]\n\nREST_FRAMEWORK = {\n    \"DEFAULT_AUTHENTICATION_CLASSES\": [\n        \"rest_framework_simplejwt.authentication.JWTAuthentication\",\n    ],\n}\n\nSIMPLE_JWT = {\n    \"ACCESS_TOKEN_LIFETIME\": timedelta(minutes=15),\n    \"REFRESH_TOKEN_LIFETIME\": timedelta(days=7),\n    \"ROTATE_REFRESH_TOKENS\": True,\n    \"BLACKLIST_AFTER_ROTATION\": True,\n}` },
        { filename: 'config/urls.py', language: 'python', variant: 'production', description: 'Token obtain/refresh endpoints.', code: `from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView\n\nurlpatterns = [\n    path(\"api/token/\", TokenObtainPairView.as_view(), name=\"token_obtain_pair\"),\n    path(\"api/token/refresh/\", TokenRefreshView.as_view(), name=\"token_refresh\"),\n]` },
        { filename: 'tests/test_simplejwt.py', language: 'python', variant: 'test', description: 'Protected endpoint yêu cầu token.', code: `def test_protected_endpoint_requires_jwt(api_client):\n    res = api_client.get(\"/api/projects/\")\n    assert res.status_code in (401, 403)` }
      ],
      commonErrors: errors(['Access token lifetime quá dài', 'Không bật blacklist khi rotate refresh token', 'Lưu token vào localStorage mà không cân nhắc XSS']),
      productionChecklist: checklist(['Access token ngắn hạn', 'Refresh token rotation/blacklist bật nếu phù hợp', 'Throttle login endpoint', 'Test protected API không token']),
      relatedPatterns: ['django-custom-user-model', 'drf-throttling-rate-limit'],
      searchKeywords: ['simplejwt', 'drf jwt', 'django jwt', 'refresh token']
    }),
  pattern({
      id: 'django-celery-integration',
      title: 'Django Celery Integration',
      vietnameseTitle: 'Tích hợp Celery với Django',
      shortDescription: 'Thiết lập Celery worker cho Django để gửi email, OCR, import/export và job định kỳ.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django', 'Celery', 'Redis'],
      whyUse: ['Django có tác vụ lâu như email/export/import/OCR.', 'Cần retry và worker riêng.', 'Cần scheduled tasks.'],
      whyNotUse: ['Task rất nhẹ và không cần retry.', 'App static không có backend runtime.'],
      installCommand: 'pip install celery redis',
      folderStructure: `config/celery.py\nconfig/__init__.py\napps/reports/tasks.py`,
      codeTemplates: [
        { filename: 'config/celery.py', language: 'python', variant: 'production', description: 'Celery app đọc Django settings.', code: `import os\nfrom celery import Celery\n\nos.environ.setdefault(\"DJANGO_SETTINGS_MODULE\", \"config.settings.production\")\n\napp = Celery(\"config\")\napp.config_from_object(\"django.conf:settings\", namespace=\"CELERY\")\napp.autodiscover_tasks()` },
        { filename: 'config/__init__.py', language: 'python', variant: 'config', description: 'Load Celery app khi Django start.', code: `from .celery import app as celery_app\n\n__all__ = (\"celery_app\",)` },
        { filename: 'apps/reports/tasks.py', language: 'python', variant: 'production', description: 'Task retryable cho export report.', code: `from config.celery import app\n\n@app.task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)\ndef generate_report_task(self, report_id: int):\n    return report_service.generate(report_id)` },
        { filename: 'tests/test_celery_task.py', language: 'python', variant: 'test', description: 'Task gọi service đúng report_id.', code: `def test_generate_report_task_calls_service(mocker):\n    mocked = mocker.patch(\"apps.reports.tasks.report_service.generate\", return_value=\"ok\")\n    assert generate_report_task(123) == \"ok\"\n    mocked.assert_called_once_with(123)` }
      ],
      commonErrors: errors(['Import Django model trước khi settings ready', 'Task không idempotent', 'Không cấu hình retry/backoff']),
      productionChecklist: checklist(['Worker chạy riêng web process', 'Broker/result backend rõ ràng', 'Task idempotent nếu retry', 'Monitoring worker và dead jobs']),
      relatedPatterns: ['celery-worker-setup', 'django-management-command'],
      searchKeywords: ['django celery', 'celery django', 'background task django']
    }),
  pattern({
      id: 'django-management-command',
      title: 'Django Management Command',
      vietnameseTitle: 'Django management command cho tác vụ vận hành',
      shortDescription: 'Tạo command chạy import, cleanup, backfill, reindex hoặc maintenance task có logging và dry-run.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django'],
      whyUse: ['Cần chạy tác vụ vận hành thủ công/CI/cron.', 'Cần dry-run trước khi sửa dữ liệu.', 'Cần backfill migration dữ liệu an toàn.'],
      whyNotUse: ['Task phải chạy liên tục nền thì dùng Celery/worker.', 'Chỉ là script local tạm thời.'],
      installCommand: 'pip install django',
      folderStructure: `apps/projects/management/commands/backfill_project_slug.py`,
      codeTemplates: [
        { filename: 'apps/projects/management/commands/backfill_project_slug.py', language: 'python', variant: 'production', description: 'Command có --dry-run và batch limit.', code: `from django.core.management.base import BaseCommand\n\nclass Command(BaseCommand):\n    help = \"Backfill missing project slugs\"\n\n    def add_arguments(self, parser):\n        parser.add_argument(\"--dry-run\", action=\"store_true\")\n        parser.add_argument(\"--limit\", type=int, default=500)\n\n    def handle(self, *args, **options):\n        qs = Project.objects.filter(slug=\"\")[: options[\"limit\"]]\n        for project in qs:\n            project.slug = slugify(project.name)\n            self.stdout.write(f\"Backfill project={project.id} slug={project.slug}\")\n            if not options[\"dry_run\"]:\n                project.save(update_fields=[\"slug\"])\n        self.stdout.write(self.style.SUCCESS(\"Done\"))` },
        { filename: 'tests/test_management_command.py', language: 'python', variant: 'test', description: 'Dry-run không save thay đổi.', code: `def test_backfill_slug_dry_run_does_not_save(call_command, project):\n    call_command(\"backfill_project_slug\", dry_run=True, limit=10)\n    project.refresh_from_db()\n    assert project.slug == \"\"` }
      ],
      commonErrors: errors(['Command không có dry-run', 'Chạy toàn bộ bảng không batch', 'Không log record đã xử lý']),
      productionChecklist: checklist(['Có --dry-run cho command sửa dữ liệu', 'Batch limit rõ ràng', 'Log đủ để audit', 'Test command trước production']),
      relatedPatterns: ['data-retention-policy', 'scheduled-cleanup-job'],
      searchKeywords: ['django management command', 'backfill', 'maintenance command']
    }),
  pattern({
      id: 'django-file-validation-security',
      title: 'Django File Upload Security',
      vietnameseTitle: 'Bảo mật upload file trong Django',
      shortDescription: 'Validate size, extension, MIME, storage path và access control khi upload file bằng Django/DRF.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['Django', 'Django REST Framework'],
      whyUse: ['User upload ảnh/PDF/Excel.', 'File private theo tenant.', 'Cần chống upload file nguy hiểm hoặc quá lớn.'],
      whyNotUse: ['Không có user uploads.', 'File chỉ là static asset nội bộ.'],
      installCommand: 'pip install djangorestframework python-magic',
      folderStructure: `apps/files/validators.py\napps/files/serializers.py`,
      codeTemplates: [
        { filename: 'apps/files/validators.py', language: 'python', variant: 'production', description: 'Validate upload size và content type.', code: `ALLOWED_CONTENT_TYPES = {\"image/png\", \"image/jpeg\", \"application/pdf\"}\nMAX_UPLOAD_SIZE = 10 * 1024 * 1024\n\ndef validate_upload_file(file):\n    if file.size > MAX_UPLOAD_SIZE:\n        raise ValidationError(\"File too large\")\n    if getattr(file, \"content_type\", None) not in ALLOWED_CONTENT_TYPES:\n        raise ValidationError(\"Unsupported file type\")` },
        { filename: 'apps/files/serializers.py', language: 'python', variant: 'production', description: 'Serializer validate file trước khi save.', code: `class FileUploadSerializer(serializers.Serializer):\n    file = serializers.FileField()\n\n    def validate_file(self, value):\n        validate_upload_file(value)\n        return value` },
        { filename: 'tests/test_file_upload_security.py', language: 'python', variant: 'test', description: 'Reject file type không cho phép.', code: `def test_rejects_unsupported_file_type(api_client, user):\n    api_client.force_authenticate(user)\n    file = SimpleUploadedFile(\"shell.php\", b\"<?php\", content_type=\"application/x-php\")\n    res = api_client.post(\"/api/files/\", {\"file\": file})\n    assert res.status_code == 400` }
      ],
      commonErrors: errors(['Tin content_type từ client mà không kiểm tra thêm nếu cần', 'Lưu filename gốc chưa sanitize', 'File private nhưng URL public']),
      productionChecklist: checklist(['Limit size ở Django và reverse proxy', 'Validate MIME/extension', 'Tên file random không dùng user filename', 'Private file cần permission/presigned access']),
      relatedPatterns: ['file-validation-security', 'secure-file-storage-access'],
      searchKeywords: ['django file upload', 'drf upload', 'upload security django']
    }),
  pattern({
      id: 'django-testing-fixtures',
      title: 'Django Testing Fixtures',
      vietnameseTitle: 'Fixture test Django/DRF',
      shortDescription: 'Tạo fixture user, API client, organization và database để test DRF API ổn định.',
      category: 'django',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['pytest-django', 'DRF'],
      whyUse: ['Dự án Django cần test API/auth/permission.', 'Muốn test nhanh và ít lặp setup.', 'Cần fixture tenant/user.'],
      whyNotUse: ['Chỉ dùng unittest built-in và team chưa dùng pytest.', 'Prototype chưa có test.'],
      installCommand: 'pip install pytest pytest-django djangorestframework',
      folderStructure: `pytest.ini\nconftest.py\napps/projects/tests/test_api.py`,
      codeTemplates: [
        { filename: 'pytest.ini', language: 'ini', variant: 'config', description: 'pytest-django settings.', code: `[pytest]\nDJANGO_SETTINGS_MODULE = config.settings.test\npython_files = tests.py test_*.py *_tests.py` },
        { filename: 'conftest.py', language: 'python', variant: 'test', description: 'Fixture API client và user.', code: `import pytest\nfrom rest_framework.test import APIClient\n\n@pytest.fixture\ndef api_client():\n    return APIClient()\n\n@pytest.fixture\ndef auth_client(api_client, django_user_model):\n    user = django_user_model.objects.create_user(email=\"user@example.com\", password=\"secret\")\n    api_client.force_authenticate(user)\n    return api_client, user` },
        { filename: 'apps/projects/tests/test_api.py', language: 'python', variant: 'test', description: 'Test API authenticated.', code: `def test_project_list_requires_auth(api_client):\n    res = api_client.get(\"/api/projects/\")\n    assert res.status_code in (401, 403)\n\ndef test_project_list_authenticated(auth_client):\n    client, user = auth_client\n    res = client.get(\"/api/projects/\")\n    assert res.status_code == 200` }
      ],
      commonErrors: errors(['Test dùng database production/dev', 'Fixture tạo user thiếu password/email', 'Không test unauthenticated case']),
      productionChecklist: checklist(['pytest-django dùng settings test riêng', 'Test auth/permission/tenant isolation', 'Factory/fixtures không phụ thuộc external API', 'CI chạy test trước deploy']),
      relatedPatterns: ['pytest-api-tests', 'drf-viewset-advanced'],
      searchKeywords: ['pytest django', 'drf test', 'django fixture', 'APIClient']
    }),
  pattern({
      id: 'django-deployment-checklist',
      title: 'Django Deployment Checklist',
      vietnameseTitle: 'Checklist deploy Django production',
      shortDescription: 'Checklist cấu hình Django production: collectstatic, migrations, security settings, workers, env và healthcheck.',
      category: 'django',
      difficulty: 'Advanced',
      productionLevel: 'Production-ready',
      libraries: ['Django', 'Gunicorn', 'Docker'],
      whyUse: ['Chuẩn bị deploy Django production.', 'Cần kiểm tra security settings.', 'Cần run migration/static đúng thứ tự.'],
      whyNotUse: ['Chỉ chạy local demo.', 'App static frontend không có Django server.'],
      installCommand: 'pip install gunicorn django-environ',
      folderStructure: `Dockerfile\nentrypoint.sh\ndocs/deploy/django-checklist.md`,
      codeTemplates: [
        { filename: 'docs/deploy/django-checklist.md', language: 'markdown', variant: 'production', description: 'Checklist deploy Django.', code: `# Django Production Deploy Checklist\n\nBefore deploy:\n- DEBUG=False\n- SECRET_KEY from env\n- ALLOWED_HOSTS set\n- DATABASE_URL set\n- SECURE_SSL_REDIRECT enabled behind HTTPS\n- SESSION_COOKIE_SECURE=True\n- CSRF_COOKIE_SECURE=True\n- Static files configured\n- Migrations reviewed\n\nDeploy steps:\n1. Install dependencies\n2. Run checks: python manage.py check --deploy\n3. Run migrations\n4. Collect static\n5. Start gunicorn/uvicorn worker\n6. Check health endpoint\n7. Watch logs/errors` },
        { filename: 'entrypoint.sh', language: 'bash', variant: 'production', description: 'Entrypoint chạy migration và collectstatic.', code: `#!/usr/bin/env bash\nset -e\npython manage.py check --deploy\npython manage.py migrate --noinput\npython manage.py collectstatic --noinput\ngunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3` }
      ],
      commonErrors: errors(['Quên python manage.py check --deploy', 'Run migration không có rollback plan', 'Static/media config sai']),
      productionChecklist: checklist(['check --deploy pass', 'Migrations được review', 'Static files phục vụ đúng', 'Healthcheck và error tracking hoạt động']),
      relatedPatterns: ['django-settings-split', 'docker-deploy-fastapi'],
      searchKeywords: ['django deployment', 'check deploy', 'gunicorn django', 'collectstatic']
    })
];
