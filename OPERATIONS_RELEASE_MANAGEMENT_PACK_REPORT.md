# OPERATIONS_RELEASE_MANAGEMENT_PACK_REPORT.md

## Pack

`v1.9 — Operations & Release Management Pack`

## Mục tiêu

Bổ sung nhóm pattern vận hành/release để trước khi deploy không chỉ có nội dung backend, mà còn có checklist phát hành, rollback, QA, bảo trì content và kiểm soát hiệu năng bundle.

## Đã thêm

### Category mới

- Operations / Release

### Decision cards mới

- Chuẩn bị release production
- Duy trì thư viện luôn mới

### Libraries/tools mới

- GitHub Actions
- Dependabot
- Vercel
- Lighthouse

### Patterns mới

1. Release Checklist
2. Migration Safety Checklist
3. Rollback Strategy
4. Feature Flag Rollout
5. Backup / Restore Verification
6. Incident Postmortem Template
7. Dependency Update Workflow
8. Content Freshness Workflow
9. Deprecated Pattern Flag
10. Browser QA Checklist
11. Vercel Deployment Checklist
12. Bundle / Content Performance Checklist

## Maintainability

Pack này nằm riêng ở:

```txt
src/data/pattern-packs/operations-release.ts
```

Không nhồi thêm vào `patterns.ts`.

## Trạng thái

- App vẫn static-only.
- Không thêm backend runtime.
- Không thêm database runtime.
- Không thêm Gemini/OpenAI runtime.
- Search/filter tiếp tục chạy bằng static content.

## Pattern count

Tổng số patterns sau v1.9: **161**.

## Kiểm tra gợi ý

Search các từ khóa:

- `release checklist`
- `migration safety`
- `rollback`
- `feature flag`
- `backup restore`
- `postmortem`
- `dependency update`
- `content freshness`
- `deprecated`
- `browser QA`
- `Vercel deploy`
- `bundle performance`
