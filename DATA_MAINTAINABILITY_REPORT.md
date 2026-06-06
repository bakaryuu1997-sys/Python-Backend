# DATA_MAINTAINABILITY_REPORT.md

## v1.8 data refactor

Trước v1.8, `src/data/patterns.ts` đã quá dài và khó bảo trì.

Đã tách thành:

```txt
src/data/patterns.ts                  # file tổng hợp, rất ngắn
src/data/patternUtils.ts              # helper, default checklist, template upgrade logic
src/data/pattern-packs/api-basics.ts
src/data/pattern-packs/fastapi.ts
src/data/pattern-packs/django.ts
src/data/pattern-packs/database.ts
src/data/pattern-packs/auth-security.ts
src/data/pattern-packs/enterprise-saas.ts
src/data/pattern-packs/ai-rag.ts
...
```

## Kết quả

- `src/data/patterns.ts`: 1510 bytes
- Tổng patterns: 149
- AI/RAG pack hiện có: 23 patterns

## Build status

- `npm install`: passed
- `npm run lint`: passed
- `npm run build`: passed

## Lưu ý

Vite vẫn cảnh báo JS chunk lớn hơn 500kB sau khi minify. Build vẫn pass.

Nguyên nhân: app là static library và bundle đang chứa toàn bộ pattern content để search/filter client-side.

Không nên che cảnh báo bằng cách tăng `chunkSizeWarningLimit` ngay. Hướng xử lý tốt hơn sau này:

1. Tách search index compact khỏi full pattern detail.
2. Lazy-load full pattern content khi mở detail.
3. Chỉ bundle metadata cho dashboard/search.
4. Cân nhắc static generated JSON per category nếu số pattern vượt 200-300.

## v1.9 bundle note
After v1.9:

- Build passed.
- Main JS chunk: about 595.34 kB minified / 167.88 kB gzip.
- Vite chunk warning remains.

This is acceptable for a predeploy static documentation app, but v2.0 should include browser QA and a decision on whether to create a compact search index before production deployment.
