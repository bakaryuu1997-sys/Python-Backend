# goal.md — Python Backend Compass Completion Goal

## 1. Product goal

Build a static-first Python backend decision and template library that can be deployed to Vercel without a database, backend server, Gemini/OpenAI runtime generator, or server secrets.

The app must help a developer answer:

```txt
What backend feature do I want to build?
When should I use this pattern?
Which libraries should I use?
What files should I write?
Can I copy a reliable template?
```

## 2. Current version goal

Current target version:

```txt
v1.4-architecture-pack
```

This version is not a mock, not a demo, and not just documentation. It is a real static frontend library with searchable backend patterns and copyable templates.

## 3. Non-negotiable decisions

```txt
No Gemini runtime generator
No direct AI code generation in MVP
No backend API
No database
No required API key
No user login
No admin dashboard
No online code runner
No community/comment/rating
Deploy as static Vite app on Vercel
```

## 4. Definition of Done for predeploy static library

The predeploy static library is considered ready when:

```txt
1. npm run lint passes.
2. npm run build passes.
3. App has 50+ real backend patterns.
4. Dashboard is decision-first.
5. Search supports title, Vietnamese title, description, libraries, when-to-use, templates and synonyms.
6. Filter bar supports category, difficulty and library.
7. Pattern detail order is:
   Quick Decision → Khi nào dùng → Khi nào không dùng → Stack → Install → Flow → Folder → Code → Errors → Checklist.
8. Important patterns include production/test variants where useful.
9. No Gemini/API key/backend/database requirement remains.
10. Docs and progress reports are updated.
```

## 5. Current completion status

As of v1.3:

```txt
Patterns: 98
Library guide entries: 25+
Build: passing
TypeScript check: passing
Static predeploy library: about 94%
Long-term complete backend compass vision: about 62-65%
```

## 6. Why the full goal is not 100% yet

The long-term “perfect library” vision includes hundreds of patterns and continuous updates. The current app is strong enough as a predeploy library, but not the final lifetime version.

Still needed later:

```txt
Advanced Django/DRF pack
Advanced architecture pack: DDD, CQRS, Outbox, Saga, Modular Monolith — completed in v1.4
Enterprise/SaaS pack: SSO, SCIM, compliance, tenant isolation deep dive
Advanced AI/RAG pack: reranking, hybrid search, evaluation, provider fallback
Operations pack: incident drill, backup restore validation, release management
Content freshness workflow: updated_at, deprecated flag, replacement pattern
```

## 7. Next milestone

```txt
v1.5 — Advanced Django/DRF Pack
```

Do not add new features before QA. First verify the current app in a real desktop browser and deploy to Vercel.


## 8. Chunked completion plan

The long-term goal must be completed in small reliable packs, not one huge unsafe change.

```txt
v1.4 Architecture Pack — completed
v1.5 Advanced Django/DRF Pack
v1.6 Enterprise/SaaS Security Pack
v1.7 Advanced AI/RAG Pack
v1.8 Operations & Release Management Pack
v1.9 Content Freshness + Deprecated Pattern Workflow
v2.0 Browser QA + Vercel Deploy Candidate
```

Each pack must pass:

```txt
npm run lint
npm run build
content count audit
progress report update
```


## v1.6 — Enterprise/SaaS Security Pack

### Status

Completed in `Python-Backend-v1.6-enterprise-saas-security-pack`.

### Scope completed

- Organization/workspace/membership model
- Tenant-aware query filtering
- PostgreSQL RLS
- Advanced RBAC tenant roles
- Casbin ABAC policy engine
- Resource ownership check
- API key management
- Secret rotation runbook
- Audit log
- Admin action approval gate
- PII redaction
- Data retention policy
- Soft delete/restore
- Field-level encryption
- OIDC/SSO integration
- SAML SSO decision guide
- SCIM user provisioning
- Verified domain ownership
- Invite user flow
- Plan limit enforcement
- Secure private file access
- SOC2-lite checklist
- Security incident response runbook

### Definition of Done

- Static-only app remains intact.
- No Gemini/backend/database runtime added.
- Patterns are searchable and filterable.
- Build passes.


## v1.7 — Advanced Django/DRF Pack

### Status

Completed in `Python-Backend-v1.7-django-drf-advanced-pack`.

### Scope completed

- Django settings split
- Django custom user model
- Django admin hardening
- DRF serializer advanced
- DRF ViewSet advanced
- DRF permissions policy
- DRF filtering/search/ordering
- DRF throttling/rate limit
- DRF SimpleJWT authentication
- Django Celery integration
- Django management command
- Django file upload security
- Django testing fixtures
- Django deployment checklist

### Definition of Done

- Static-only app remains intact.
- No backend/database/Gemini runtime added.
- Patterns are searchable/filterable.
- Build passes.


## v1.8 — Advanced AI/RAG Pack

### Status

Completed in `Python-Backend-v1.8-advanced-ai-rag-pack`.

### Scope completed

- RAG ingestion pipeline
- Hybrid search
- Reranking
- Citation builder
- RAG evaluation
- Multi-tenant RAG permission filter
- Vector DB delete/reindex workflow
- Advanced LLM provider abstraction
- LLM streaming SSE/WebSocket
- Agent tool registry
- Prompt injection defense
- LLM cost/token budget guard
- AI observability
- Human approval for agent actions
- Pattern data split by category packs for maintainability

### Definition of Done

- Static-only app remains intact.
- No backend/database/Gemini runtime added.
- Patterns are searchable/filterable.
- Pattern data files are split by category.
- Lint and production build pass.


## v1.9 — Operations & Release Management Pack

### Status

Completed in `Python-Backend-v1.9-operations-release-management-pack`.

### Scope completed

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

### Definition of Done

- Static-only app remains intact.
- No backend/database/Gemini runtime added.
- Operations pack is split into its own pattern pack file.
- Patterns are searchable/filterable.
- Lint and production build pass.

### Next

Move to v2.0 Browser QA + Vercel Deploy Candidate.


## v2.0 — Browser QA + Vercel Deploy Candidate

### Status

Completed as a local deploy candidate package.

### Completed checks

- npm install passed
- npm run lint passed
- npm run build passed
- Vite dev server local smoke passed
- Vite preview server local smoke passed
- Manual browser QA checklist created
- Vercel deploy candidate instructions created

### Not completed in this environment

- Real Vercel preview deploy
- Real production deploy
- Full visual browser QA on the user's machine

Reason: these require the user's Vercel/GitHub account and an actual browser session.

### Decision

Compact search index is not required before first preview deployment, but should be considered before expanding far beyond 200-300 patterns or if Lighthouse/browser QA shows slow load/search.
