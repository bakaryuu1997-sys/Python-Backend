# ENTERPRISE_SAAS_SECURITY_PACK_REPORT.md

## Pack

`v1.6 — Enterprise/SaaS Security Pack`

## Mục tiêu

Bổ sung nhóm pattern dành cho SaaS/enterprise backend:

- Multi-tenant data model
- Organization/workspace/membership
- Tenant isolation
- RBAC/ABAC nâng cao
- SSO/OIDC/SAML/SCIM
- API key management
- Audit log
- PII redaction
- Data retention
- Secret rotation
- Secure file storage
- Compliance/SOC2-lite
- Security incident runbook

## Đã thêm

### Category mới

- `Enterprise / SaaS`

### Decision cards mới

- `Xây SaaS nhiều công ty`
- `SSO / Governance doanh nghiệp`

### Libraries mới

- Casbin
- Authlib
- PyOTP
- cryptography

### Patterns mới

1. Organization / Workspace Data Model
2. Tenant-aware Query Filter
3. PostgreSQL Row Level Security for SaaS
4. Advanced RBAC for Tenant Roles
5. Policy Engine with Casbin ABAC
6. Resource Ownership Check
7. API Key Management
8. Secret Rotation Runbook
9. Enterprise Audit Log
10. Admin Action Approval Gate
11. PII Redaction in Logs
12. Data Retention Policy
13. Soft Delete and Restore Pattern
14. Field-level Encryption
15. OIDC / SSO Integration
16. SAML SSO Decision Guide
17. SCIM User Provisioning
18. Verified Domain Ownership
19. Invite User Flow
20. Plan Limit Enforcement
21. Secure File Storage Access
22. SOC2-lite Backend Compliance Checklist
23. Security Incident Response Runbook

## Trạng thái

- App vẫn static-only.
- Không thêm backend runtime.
- Không thêm database runtime.
- Không thêm Gemini/OpenAI generator.
- Dữ liệu vẫn là TypeScript static content.
- Search/filter vẫn hoạt động theo category/library/difficulty.

## Kiểm tra cần làm sau pack này

- Search các từ khóa: `tenant`, `sso`, `scim`, `audit`, `api key`, `organization`, `workspace`, `rls`, `compliance`.
- Filter category `Enterprise / SaaS`.
- Mở pattern detail của `Organization / Workspace Data Model`.
- Kiểm tra code template variant production/test hiển thị đúng.
