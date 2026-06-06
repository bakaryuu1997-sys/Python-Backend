import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const OPERATIONS_RELEASE_PATTERNS: Pattern[] = [
  pattern({
    id: 'release-checklist',
    title: 'Release Checklist',
    vietnameseTitle: 'Checklist release production',
    shortDescription: 'Checklist trước khi release để đảm bảo lint, build, QA, rollback, monitoring và content review đã sẵn sàng.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['GitHub Actions', 'Vercel'],
    whyUse: ['Sắp deploy bản mới lên production.', 'Muốn tránh quên lint/build/browser QA.', 'Team cần quy trình release lặp lại được.'],
    whyNotUse: ['Prototype local chưa có user thật.', 'Thay đổi chỉ là note cá nhân không deploy.'],
    installCommand: 'npm run lint && npm run build',
    folderStructure: `docs/release/release-checklist.md\n.github/workflows/ci.yml`,
    codeTemplates: [
      { filename: 'docs/release/release-checklist.md', language: 'markdown', variant: 'production', description: 'Checklist release ngắn gọn nhưng đủ dùng.', code: `# Release Checklist

## Code quality
- [ ] npm run lint passed
- [ ] npm run build passed
- [ ] No unexpected console errors
- [ ] No broken imports or missing assets

## Content quality
- [ ] New patterns have whyUse/whyNotUse
- [ ] Code templates have filename and variant
- [ ] Related patterns point to valid ids
- [ ] Search keywords are included

## UX QA
- [ ] Search works
- [ ] Filter works
- [ ] Pattern detail opens
- [ ] Copy buttons work
- [ ] Empty state is readable

## Release safety
- [ ] Rollback plan exists
- [ ] Vercel preview checked
- [ ] Production deploy owner assigned` },
      { filename: '.github/workflows/ci.yml', language: 'yaml', variant: 'production', description: 'CI quality gate tối thiểu.', code: `name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build` }
    ],
    commonErrors: errors(['Deploy khi build chưa chạy', 'Không check preview URL', 'Không có rollback plan']),
    productionChecklist: checklist(['Lint/build pass trước release', 'Browser QA preview URL', 'Rollback owner rõ', 'Release note ghi thay đổi chính']),
    relatedPatterns: ['browser-qa-checklist', 'vercel-deployment-checklist', 'rollback-strategy'],
    searchKeywords: ['release checklist', 'production release', 'quality gate', 'deploy checklist']
  }),
  pattern({
    id: 'migration-safety-checklist',
    title: 'Migration Safety Checklist',
    vietnameseTitle: 'Checklist an toàn migration',
    shortDescription: 'Checklist migration database an toàn: backward compatible, rollback plan, batch update và zero-downtime mindset.',
    category: 'operations-release',
    difficulty: 'Advanced',
    productionLevel: 'Advanced',
    libraries: ['Alembic', 'Django Migrations'],
    whyUse: ['Backend có database production.', 'Migration thay đổi schema hoặc data lớn.', 'Muốn giảm downtime và rollback rủi ro.'],
    whyNotUse: ['App static không có database runtime.', 'Migration chỉ chạy local test.'],
    installCommand: 'no install required',
    folderStructure: `docs/release/migration-safety.md`,
    codeTemplates: [
      { filename: 'docs/release/migration-safety.md', language: 'markdown', variant: 'production', description: 'Checklist migration an toàn.', code: `# Migration Safety Checklist

## Before
- [ ] Migration reviewed by another developer
- [ ] Backup or restore point available
- [ ] Migration tested on staging copy
- [ ] Large data update is batched
- [ ] App supports old and new schema during rollout

## Safer sequence
1. Add nullable column/table/index
2. Deploy app that writes both old and new if needed
3. Backfill data in batches
4. Switch reads to new schema
5. Remove old column in a later release

## Avoid
- Drop/rename columns in the same release that app still uses
- Long locks during peak traffic
- Data migration without dry-run
- One-way migration with no rollback plan` }
    ],
    commonErrors: errors(['Drop column cùng release với app cũ', 'Data migration không batch', 'Không test rollback']),
    productionChecklist: checklist(['Backward compatible migration', 'Staging test with production-like data', 'Rollback/downgrade plan', 'Batch backfill for large tables']),
    relatedPatterns: ['alembic-migration', 'django-deployment-checklist'],
    searchKeywords: ['migration safety', 'zero downtime migration', 'alembic migration', 'django migration']
  }),
  pattern({
    id: 'rollback-strategy',
    title: 'Rollback Strategy',
    vietnameseTitle: 'Chiến lược rollback khi release lỗi',
    shortDescription: 'Chuẩn bị cách quay lại phiên bản ổn định, rollback content/static deploy và xử lý migration không rollback được.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['Vercel', 'Git'],
    whyUse: ['Release có thể làm hỏng search, UI, build hoặc content.', 'Cần quay lại nhanh nếu production lỗi.', 'Cần biết migration nào không thể rollback đơn giản.'],
    whyNotUse: ['Chỉ làm local không deploy.', 'Thay đổi nhỏ không ảnh hưởng production.'],
    installCommand: 'git revert <commit_sha>',
    folderStructure: `docs/release/rollback-strategy.md`,
    codeTemplates: [
      { filename: 'docs/release/rollback-strategy.md', language: 'markdown', variant: 'production', description: 'Rollback plan thực dụng.', code: `# Rollback Strategy

## Static frontend rollback
- Revert the commit or redeploy previous Vercel deployment.
- Confirm old deployment URL still works.
- Check search and pattern detail after rollback.

## Content rollback
- Revert pattern/content file changes.
- Run npm run lint and npm run build.
- Redeploy.

## Backend/database rollback
- Prefer forward-fix for schema changes when data loss is possible.
- Never assume a destructive migration can be reverted safely.
- Keep migrations backward compatible when possible.

## Communication
- Record incident timeline.
- Notify users/team if production was affected.
- Add a regression test or checklist item.` }
    ],
    commonErrors: errors(['Không biết deployment cũ nào ổn', 'Rollback code nhưng DB schema đã đổi', 'Không ghi timeline sự cố']),
    productionChecklist: checklist(['Previous deployment URL known', 'Rollback command documented', 'Migration rollback risk documented', 'Post-rollback smoke test']),
    relatedPatterns: ['release-checklist', 'migration-safety-checklist', 'incident-postmortem-template'],
    searchKeywords: ['rollback', 'revert release', 'redeploy previous', 'production rollback']
  }),
  pattern({
    id: 'feature-flag-rollout',
    title: 'Feature Flag Rollout',
    vietnameseTitle: 'Rollout tính năng bằng feature flag',
    shortDescription: 'Dùng feature flag để bật tính năng theo môi trường, tenant, phần trăm user hoặc allowlist.',
    category: 'operations-release',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['Pydantic Settings', 'Redis optional'],
    whyUse: ['Muốn release code nhưng chưa bật feature cho mọi user.', 'Cần thử nghiệm theo tenant/allowlist.', 'Cần kill switch khi feature lỗi.'],
    whyNotUse: ['Feature nhỏ không rủi ro.', 'Team chưa có quy trình dọn flag cũ.'],
    installCommand: 'no install required',
    folderStructure: `app/core/feature_flags.py\ndocs/release/feature-flags.md`,
    codeTemplates: [
      { filename: 'app/core/feature_flags.py', language: 'python', variant: 'production', description: 'Feature flag service tối thiểu.', code: `class FeatureFlags:
    def __init__(self, settings):
        self.settings = settings

    def enabled(self, name: str, *, tenant_id: int | None = None) -> bool:
        if name in self.settings.disabled_features:
            return False
        if name in self.settings.enabled_features:
            return True
        tenant_allowlist = self.settings.feature_tenant_allowlist.get(name, [])
        return tenant_id is not None and tenant_id in tenant_allowlist` },
      { filename: 'docs/release/feature-flags.md', language: 'markdown', variant: 'production', description: 'Quy tắc dùng feature flag.', code: `# Feature Flag Rules

- Every flag must have an owner.
- Every flag must have a removal date.
- Use flags for rollout, not as permanent architecture.
- Add kill switch for risky features.
- Clean stale flags every release cycle.` }
    ],
    commonErrors: errors(['Flag tồn tại mãi không dọn', 'Flag chỉ check frontend nhưng backend vẫn mở', 'Không có kill switch']),
    productionChecklist: checklist(['Flag owner và expiry rõ', 'Backend enforce flag với feature nhạy cảm', 'Có kill switch', 'Review stale flags định kỳ']),
    relatedPatterns: ['plan-limit-enforcement', 'release-checklist'],
    searchKeywords: ['feature flag', 'rollout', 'kill switch', 'allowlist']
  }),
  pattern({
    id: 'backup-restore-verification',
    title: 'Backup / Restore Verification',
    vietnameseTitle: 'Kiểm tra backup và restore',
    shortDescription: 'Không chỉ tạo backup, mà phải định kỳ restore thử để biết backup có dùng được khi sự cố xảy ra.',
    category: 'operations-release',
    difficulty: 'Advanced',
    productionLevel: 'Advanced',
    libraries: ['PostgreSQL', 'S3'],
    whyUse: ['Production có database hoặc file storage quan trọng.', 'Cần đảm bảo khôi phục được sau incident.', 'Enterprise/compliance yêu cầu evidence.'],
    whyNotUse: ['App static không lưu dữ liệu server.', 'Dữ liệu có thể rebuild hoàn toàn từ Git.'],
    installCommand: 'pg_dump && pg_restore',
    folderStructure: `docs/runbooks/backup-restore-verification.md`,
    codeTemplates: [
      { filename: 'docs/runbooks/backup-restore-verification.md', language: 'markdown', variant: 'production', description: 'Runbook verify backup/restore.', code: `# Backup / Restore Verification

## Schedule
- Weekly: verify latest backup exists
- Monthly: restore backup to isolated environment
- Quarterly: full disaster recovery drill

## Restore test
1. Create isolated database
2. Restore latest backup
3. Run smoke queries
4. Verify row counts for critical tables
5. Verify app can start against restored DB
6. Record result and restore duration

## Evidence
- Backup timestamp
- Restore command
- Tester
- Duration
- Issues found
- Follow-up actions` }
    ],
    commonErrors: errors(['Có backup nhưng chưa bao giờ restore thử', 'Backup không bao gồm object storage', 'Không biết RTO/RPO thực tế']),
    productionChecklist: checklist(['Restore test định kỳ', 'Backup gồm DB và file storage nếu cần', 'Evidence lưu lại', 'RTO/RPO được đo thực tế']),
    relatedPatterns: ['backup-restore-postgres', 'security-incident-response'],
    searchKeywords: ['backup restore', 'restore verification', 'disaster recovery', 'rpo rto']
  }),
  pattern({
    id: 'incident-postmortem-template',
    title: 'Incident Postmortem Template',
    vietnameseTitle: 'Template postmortem sau sự cố',
    shortDescription: 'Template ghi lại timeline, impact, root cause và action items sau incident để tránh lặp lại lỗi.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['Runbook'],
    whyUse: ['Có sự cố production, deploy lỗi hoặc security incident.', 'Muốn học từ lỗi thay vì chỉ fix tạm.', 'Cần action items có owner.'],
    whyNotUse: ['Bug nhỏ local không ảnh hưởng user.', 'Không có production system.'],
    installCommand: 'no install required',
    folderStructure: `docs/incidents/postmortem-template.md`,
    codeTemplates: [
      { filename: 'docs/incidents/postmortem-template.md', language: 'markdown', variant: 'production', description: 'Postmortem template.', code: `# Incident Postmortem

## Summary
What happened?

## Impact
- Users affected:
- Duration:
- Features affected:
- Severity:

## Timeline
- Detection:
- Mitigation:
- Recovery:
- Follow-up:

## Root cause
What actually caused the issue?

## What went well
- 

## What went wrong
- 

## Action items
| Action | Owner | Due date | Status |
|---|---|---:|---|
| Add regression test | | | |
| Update release checklist | | | |

## Prevention
How will we prevent this class of issue?` }
    ],
    commonErrors: errors(['Postmortem chỉ đổ lỗi cá nhân', 'Không có action item', 'Action item không có owner/due date']),
    productionChecklist: checklist(['Blameless tone', 'Timeline rõ', 'Action item có owner/due date', 'Checklist/test được cập nhật sau incident']),
    relatedPatterns: ['security-incident-response', 'release-checklist'],
    searchKeywords: ['postmortem', 'incident report', 'root cause', 'action items']
  }),
  pattern({
    id: 'dependency-update-workflow',
    title: 'Dependency Update Workflow',
    vietnameseTitle: 'Quy trình cập nhật dependency',
    shortDescription: 'Quy trình cập nhật package an toàn: phân loại patch/minor/major, chạy test/build và ghi breaking changes.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['Dependabot', 'npm', 'pip'],
    whyUse: ['Project dùng nhiều package frontend/backend.', 'Cần cập nhật security patch.', 'Muốn tránh update làm vỡ build/template.'],
    whyNotUse: ['Prototype không deploy.', 'Repo đóng băng không maintenance.'],
    installCommand: 'npm outdated && npm audit',
    folderStructure: `.github/dependabot.yml\ndocs/maintenance/dependency-update.md`,
    codeTemplates: [
      { filename: '.github/dependabot.yml', language: 'yaml', variant: 'production', description: 'Dependabot cho npm package.', code: `version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5` },
      { filename: 'docs/maintenance/dependency-update.md', language: 'markdown', variant: 'production', description: 'Checklist update dependency.', code: `# Dependency Update Workflow

1. Check changelog for breaking changes.
2. Update one risky package group at a time.
3. Run npm run lint.
4. Run npm run build.
5. Smoke test search/filter/pattern detail/copy.
6. Record known issues.
7. Merge only after CI passes.

Rules:
- Patch updates can be batched.
- Major updates need separate PR.
- Security updates have priority.` }
    ],
    commonErrors: errors(['Update quá nhiều major package cùng lúc', 'Không đọc changelog', 'Chỉ chạy npm install mà không build']),
    productionChecklist: checklist(['Dependabot hoặc lịch update rõ', 'Major updates tách riêng', 'Lint/build/smoke test pass', 'Security patch ưu tiên']),
    relatedPatterns: ['release-checklist', 'browser-qa-checklist'],
    searchKeywords: ['dependency update', 'dependabot', 'npm audit', 'package update']
  }),
  pattern({
    id: 'content-freshness-workflow',
    title: 'Content Freshness Workflow',
    vietnameseTitle: 'Quy trình giữ nội dung luôn mới',
    shortDescription: 'Quy trình review định kỳ pattern, library version, deprecated content và updatedAt để thư viện không lỗi thời.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['Git', 'Content Review'],
    whyUse: ['Thư viện backend thay đổi liên tục.', 'Pattern cũ có thể sai hoặc lỗi thời.', 'Cần biết nội dung nào cần review lại.'],
    whyNotUse: ['Tài liệu dùng một lần.', 'Không có kế hoạch bảo trì.'],
    installCommand: 'no install required',
    folderStructure: `docs/maintenance/content-freshness.md`,
    codeTemplates: [
      { filename: 'docs/maintenance/content-freshness.md', language: 'markdown', variant: 'production', description: 'Workflow review nội dung định kỳ.', code: `# Content Freshness Workflow

## Monthly
- Review top searched patterns
- Check official docs for major libraries
- Update install commands if changed
- Mark suspicious content for review

## Quarterly
- Review deprecated libraries/APIs
- Check security-sensitive templates
- Review AI/RAG provider assumptions
- Update content roadmap

## Pattern metadata
Each pattern should have:
- updatedAt
- productionLevel
- relatedPatterns
- searchKeywords
- deprecated flag when needed
- replacement pattern if deprecated

## Review priority
1. Auth/security
2. Deployment
3. Database/migrations
4. AI/RAG provider APIs
5. OCR/file upload` }
    ],
    commonErrors: errors(['Không biết pattern nào lỗi thời', 'Không update install command', 'Không đánh dấu deprecated']),
    productionChecklist: checklist(['Monthly review schedule', 'updatedAt được dùng thật', 'Deprecated content có replacement', 'Security templates review ưu tiên']),
    relatedPatterns: ['deprecated-pattern-flag', 'bundle-content-performance-checklist'],
    searchKeywords: ['content freshness', 'content review', 'updatedAt', 'maintenance workflow']
  }),
  pattern({
    id: 'deprecated-pattern-flag',
    title: 'Deprecated Pattern Flag',
    vietnameseTitle: 'Đánh dấu pattern đã lỗi thời',
    shortDescription: 'Thêm metadata deprecated/replacement để cảnh báo người dùng không copy template cũ hoặc không còn khuyến nghị.',
    category: 'operations-release',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ['TypeScript'],
    whyUse: ['Pattern cũ không còn nên dùng.', 'Library đổi API hoặc có lỗ hổng.', 'Muốn giữ lịch sử nhưng cảnh báo rõ.'],
    whyNotUse: ['Bạn xóa hẳn content cũ và không cần lịch sử.', 'Library/pattern vẫn còn tốt.'],
    installCommand: 'no install required',
    folderStructure: `src/types.ts\nsrc/components/PatternDetailPage.tsx`,
    codeTemplates: [
      { filename: 'src/types.ts', language: 'typescript', variant: 'production', description: 'Metadata deprecated đề xuất thêm vào Pattern.', code: `export interface PatternDeprecation {
  deprecated: boolean;
  deprecatedReason?: string;
  replacementPatternId?: string;
  deprecatedAt?: string;
}

export interface Pattern {
  id: string;
  // existing fields...
  deprecation?: PatternDeprecation;
}` },
      { filename: 'src/components/DeprecatedBanner.tsx', language: 'tsx', variant: 'production', description: 'Banner cảnh báo pattern deprecated.', code: `export function DeprecatedBanner({ pattern }: { pattern: Pattern }) {
  if (!pattern.deprecation?.deprecated) return null;
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
      Pattern này đã lỗi thời: {pattern.deprecation.deprecatedReason}
      {pattern.deprecation.replacementPatternId && (
        <span> Nên xem pattern thay thế: {pattern.deprecation.replacementPatternId}</span>
      )}
    </div>
  );
}` }
    ],
    commonErrors: errors(['Pattern lỗi thời nhưng vẫn hiển thị như production-ready', 'Không có replacement', 'Không có ngày/lý do deprecated']),
    productionChecklist: checklist(['Deprecated banner nổi bật', 'Search result có badge deprecated', 'Replacement pattern rõ', 'Review deprecated mỗi quý']),
    relatedPatterns: ['content-freshness-workflow'],
    searchKeywords: ['deprecated pattern', 'replacement', 'content lifecycle', 'deprecation']
  }),
  pattern({
    id: 'browser-qa-checklist',
    title: 'Browser QA Checklist',
    vietnameseTitle: 'Checklist kiểm tra trình duyệt trước deploy',
    shortDescription: 'Checklist kiểm tra thực tế trên browser: search, filter, detail page, copy, empty state, console và layout desktop.',
    category: 'operations-release',
    difficulty: 'Easy',
    productionLevel: 'Production-ready',
    libraries: ['Chrome', 'Edge', 'Playwright optional'],
    whyUse: ['Build pass nhưng UI vẫn có thể lỗi.', 'Cần kiểm tra app thật trước deploy.', 'Search/copy/filter là tính năng lõi.'],
    whyNotUse: ['Chỉ sửa docs không ảnh hưởng UI.', 'Chưa có app chạy được.'],
    installCommand: 'npm run dev',
    folderStructure: `docs/qa/browser-qa-checklist.md`,
    codeTemplates: [
      { filename: 'docs/qa/browser-qa-checklist.md', language: 'markdown', variant: 'production', description: 'Browser QA checklist cho app này.', code: `# Browser QA Checklist

## Homepage
- [ ] Page loads without blank screen
- [ ] Sidebar categories visible
- [ ] Decision cards visible
- [ ] Pattern grid visible

## Search
- [ ] Search "login JWT"
- [ ] Search "chụp ảnh OCR"
- [ ] Search "RAG ingestion"
- [ ] Matched by label appears
- [ ] Highlight is readable
- [ ] Empty state appears for unknown query

## Filters
- [ ] Category filter works
- [ ] Difficulty filter works
- [ ] Library filter works
- [ ] Reset filters works

## Pattern detail
- [ ] Quick Decision appears before code
- [ ] Khi nào dùng / không dùng visible
- [ ] Code templates render
- [ ] Copy button works

## Console
- [ ] No breaking runtime errors
- [ ] No missing asset errors` }
    ],
    commonErrors: errors(['Chỉ chạy build mà không mở browser', 'Không test empty state', 'Không test copy button']),
    productionChecklist: checklist(['QA trên Chrome/Edge desktop', 'Console không có runtime error nghiêm trọng', 'Search/filter/detail/copy pass', 'Ghi lại lỗi trước deploy']),
    relatedPatterns: ['release-checklist', 'vercel-deployment-checklist'],
    searchKeywords: ['browser qa', 'manual qa', 'search test', 'copy button test']
  }),
  pattern({
    id: 'vercel-deployment-checklist',
    title: 'Vercel Deployment Checklist',
    vietnameseTitle: 'Checklist deploy Vercel',
    shortDescription: 'Checklist deploy Vite/React static app lên Vercel, kiểm tra build command, output, preview và production URL.',
    category: 'operations-release',
    difficulty: 'Easy',
    productionLevel: 'Production-ready',
    libraries: ['Vercel', 'Vite', 'React'],
    whyUse: ['Deploy Python Backend Compass lên Vercel.', 'Cần preview deployment trước production.', 'Muốn tránh sai build/output config.'],
    whyNotUse: ['Deploy sang hosting khác.', 'Chỉ chạy local.'],
    installCommand: 'npm run build',
    folderStructure: `vercel.json optional\ndist/`,
    codeTemplates: [
      { filename: 'docs/deploy/vercel-checklist.md', language: 'markdown', variant: 'production', description: 'Checklist deploy Vercel cho Vite static app.', code: `# Vercel Deployment Checklist

## Project settings
- Framework preset: Vite
- Install command: npm install or npm ci
- Build command: npm run build
- Output directory: dist

## Before production
- [ ] Preview deployment works
- [ ] Search works on preview
- [ ] Pattern detail works on preview
- [ ] Copy buttons work
- [ ] No console-breaking errors
- [ ] Production domain configured if needed

## After production
- [ ] Open production URL
- [ ] Run browser QA smoke test
- [ ] Save deployment URL in release note` },
      { filename: 'vercel.json', language: 'json', variant: 'config', description: 'Optional SPA fallback cho Vite nếu cần.', code: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}` }
    ],
    commonErrors: errors(['Output directory không phải dist', 'Deploy production trước khi check preview', 'SPA refresh route lỗi nếu có client routing']),
    productionChecklist: checklist(['Build command đúng', 'Output dist đúng', 'Preview smoke test pass', 'Production URL kiểm tra sau deploy']),
    relatedPatterns: ['browser-qa-checklist', 'release-checklist'],
    searchKeywords: ['vercel deploy', 'vite vercel', 'output dist', 'preview deployment']
  }),
  pattern({
    id: 'bundle-content-performance-checklist',
    title: 'Bundle / Content Performance Checklist',
    vietnameseTitle: 'Checklist hiệu năng bundle và content',
    shortDescription: 'Theo dõi bundle size khi thư viện có nhiều pattern; tách search index và lazy-load content khi cần.',
    category: 'operations-release',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['Vite', 'React'],
    whyUse: ['Static library có 150+ patterns và code templates.', 'Vite cảnh báo chunk lớn hơn 500kB.', 'Muốn app load nhanh trước khi mở rộng tiếp.'],
    whyNotUse: ['Content còn rất nhỏ.', 'Không quan tâm load time vì chỉ dùng local.'],
    installCommand: 'npm run build',
    folderStructure: `src/data/search-index.ts\nsrc/data/pattern-packs/`,
    codeTemplates: [
      { filename: 'docs/performance/bundle-content-checklist.md', language: 'markdown', variant: 'production', description: 'Checklist tối ưu bundle/content.', code: `# Bundle / Content Performance Checklist

## Watch
- Main JS chunk size
- Gzip size
- Search input latency
- Pattern detail open time
- Lighthouse performance

## If bundle grows too much
1. Build compact search index with metadata only
2. Do not include full code templates in homepage bundle
3. Lazy-load pattern detail by category/id
4. Split pattern packs by category
5. Consider static JSON files for full detail
6. Keep search synonyms compact

## Current rule
- Do not hide Vite chunk warning by increasing limit first.
- Fix data loading strategy before adding hundreds more patterns.` }
    ],
    commonErrors: errors(['Nhét toàn bộ code templates vào search index', 'Ẩn cảnh báo chunk mà không tối ưu', 'Không đo search latency']),
    productionChecklist: checklist(['Search index compact', 'Pattern packs tách theo category', 'Full detail lazy-load khi cần', 'Bundle warning được ghi lại và xử lý theo plan']),
    relatedPatterns: ['content-freshness-workflow', 'browser-qa-checklist'],
    searchKeywords: ['bundle size', 'content performance', 'vite chunk warning', 'lazy load patterns']
  })
];
