# Python Backend Compass

A static-first Python backend decision and template library.

This app helps developers search backend use cases, decide which pattern/library to use, and copy implementation templates.

## Current status

```txt
Version: v1.4-architecture-pack
Patterns: 98
No backend
No database
No Gemini/OpenAI runtime generator
Static Vite + React + TypeScript
Ready for desktop QA before Vercel deploy
```

## Run locally

```bash
# Recommended package manager (especially on Windows & Node 24+ to avoid NPM bugs):
npm ci
npm run dev

# Or using npm:
npm ci
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Vercel settings

```txt
Framework: Vite
Install command: npm ci
Build command: npm run build
Output directory: dist
```

## Key files

```txt
src/data/patterns.ts       Backend pattern library
src/data/libraries.ts      Library guide
src/data/decisions.ts      Decision-first dashboard cards
src/lib/search.ts          Static search logic
docs/goal.md               Completion goal and status
LIBRARY_COMPLETION_AUDIT.md
PROGRESS_REPORT.md
NEXT_STEPS.md
```

## v1.6 Enterprise/SaaS Security Pack
B蘯｣n nﾃy ﾄ妥｣ b盻・sung nhﾃｳm Enterprise/SaaS Security Pack:

- Organization/workspace/membership model
- Tenant-aware query filtering
- PostgreSQL Row Level Security
- Advanced RBAC and Casbin ABAC
- API key management
- OIDC/SSO, SAML decision, SCIM provisioning
- Audit log, PII redaction, data retention
- Secure file access, secret rotation, compliance checklist
- Security incident response runbook

T盻貧g s盻・patterns hi盻㌻ t蘯｡i: **121**.

## v1.7 Advanced Django/DRF Pack
B蘯｣n nﾃy ﾄ妥｣ b盻・sung nhﾃｳm Advanced Django/DRF Pack:

- Django settings split
- Custom User Model
- Django Admin hardening
- DRF Serializer advanced
- DRF ViewSet advanced
- DRF permissions
- DRF filtering/search/ordering
- DRF throttling/rate limit
- DRF SimpleJWT
- Django Celery integration
- Django management command
- Django file upload security
- Django testing fixtures
- Django deployment checklist

T盻貧g s盻・patterns hi盻㌻ t蘯｡i: **135**.

## v1.8 Advanced AI/RAG Pack
B蘯｣n nﾃy ﾄ妥｣ b盻・sung nhﾃｳm Advanced AI/RAG Pack:

- RAG ingestion pipeline
- Hybrid search
- Reranking
- Citation builder
- RAG evaluation
- Multi-tenant RAG permission filter
- Vector DB delete/reindex workflow
- LLM provider abstraction nﾃ｢ng cao
- SSE/WebSocket streaming
- Tool registry
- Prompt injection defense
- Cost/token budget guard
- AI observability
- Human approval for agent actions

Ngoﾃi ra ﾄ妥｣ tﾃ｡ch `src/data/patterns.ts` thﾃnh cﾃ｡c pack nh盻・theo category ﾄ黛ｻ・d盻・b蘯｣o trﾃｬ.

T盻貧g s盻・patterns hi盻㌻ t蘯｡i: **149**.

## v1.9 Operations & Release Management Pack
B蘯｣n nﾃy ﾄ妥｣ b盻・sung nhﾃｳm Operations & Release Management Pack:

- Release checklist
- Migration safety checklist
- Rollback strategy
- Feature flag rollout
- Backup/restore verification
- Incident postmortem template
- Dependency update workflow
- Content freshness workflow
- Deprecated pattern flag
- Browser QA checklist
- Vercel deployment checklist
- Bundle/content performance checklist

Pack n蘯ｱm riﾃｪng 盻・`src/data/pattern-packs/operations-release.ts`.

T盻貧g s盻・patterns hi盻㌻ t蘯｡i: **161**.

## v2.0 Browser QA + Vercel Deploy Candidate
B蘯｣n nﾃy lﾃ deploy candidate cho Vercel preview.

ﾄ静｣ ki盻ノ tra t盻ｱ ﾄ黛ｻ冢g:

- npm ci must pass before deploy
- npm run lint passed
- npm run build passed
- Vite dev server local smoke passed
- Vite preview server local smoke passed

T盻貧g s盻・patterns: **161**.

Tﾃi li盻㎡ QA/deploy m盻嬖:

- `V2_BROWSER_QA_DEPLOY_CANDIDATE_REPORT.md`
- `V2_MANUAL_BROWSER_QA_CHECKLIST.md`
- `VERCEL_DEPLOY_CANDIDATE.md`

Lﾆｰu ﾃｽ: Vercel preview/production deploy chﾆｰa ﾄ柁ｰ盻｣c th盻ｱc hi盻㌻ trong mﾃｴi trﾆｰ盻拵g nﾃy vﾃｬ c蘯ｧn tﾃi kho蘯｣n/repo Vercel c盻ｧa b蘯｡n.

## v2.1 Final Predeploy
This package is the final predeploy package.

Added:

- `vercel.json`
- `.nvmrc`
- `.npmrc`
- `DEPLOY_NOW.md`
- `FINAL_PREDEPLOY_REPORT.md`

Total patterns: **161**.

Status: ready for Vercel preview deployment after your local manual browser QA.

## v2.2 Performance + Content Audit
This version fixes the main load-time problem by removing full code template packs from the initial homepage bundle.

Added:

- `src/data/patternIndex.ts`
- `src/data/patternLoader.ts`
- lazy-loaded `PatternDetailPage`
- lazy-loaded category pattern packs
- `PERFORMANCE_OPTIMIZATION_REPORT.md`
- `BACKEND_CONTENT_COVERAGE_AUDIT.md`

Build result:

- Main JS reduced from about 595.34 kB to 486.89 kB minified
- Main JS gzip reduced from about 167.88 kB to 122.28 kB
- Vite chunk warning removed

## v3.0 Release Complete Candidate
This version expands missing backend Python areas and passes strict QA.

Added packs:
- Advanced PostgreSQL
- Advanced FastAPI Internals
- API Governance
- Testing Quality
- DevOps / Cloud
- Data Engineering

Current totals:
- Patterns: 215
- Categories: 23
- Libraries/tools: 49
- Decision cards: 21

Checks:
- npm run lint: passed
- npm run build: passed
- npm run qa:static: passed
- Dev/preview smoke: passed

See `RELEASE_COMPLETE_QA_REPORT.md`.


