# content-roadmap.md — Complete Backend Python Content Roadmap

## 1. Mục đích

File này là bản đồ mở rộng nội dung cho **Python Backend Compass**.

Mục tiêu: xây dựng thư viện backend Python toàn diện, không chỉ dừng ở MVP.

Nội dung phải bao phủ:

```txt
- Backend Python cơ bản
- FastAPI
- Django / DRF
- Flask / lightweight API
- Database / ORM / migration
- Auth / security
- File upload / OCR / document processing
- Background jobs / queues
- Cache / rate limit
- Search
- Observability
- Testing
- Deployment
- Cloud-native backend
- Advanced architecture
- AI backend / RAG / LLM / agent tools
- Enterprise backend
- Production checklists
```

---

## 2. Content level

Mỗi topic nên có nhiều cấp độ.

```txt
Level 1: What / When to use
Level 2: Minimal template
Level 3: Production template
Level 4: Advanced pattern
Level 5: Anti-pattern / common mistakes
Level 6: Decision comparison
```

Ví dụ với OCR:

```txt
Level 1: OCR là gì, dùng khi nào
Level 2: Upload ảnh + pytesseract
Level 3: OCR queue với Celery
Level 4: Provider abstraction Tesseract/Paddle/Cloud OCR
Level 5: Không log dữ liệu nhạy cảm, không OCR file lớn trong request
Level 6: Tesseract vs EasyOCR vs PaddleOCR vs Cloud OCR
```

---

## 3. Pattern page standard

Mỗi pattern phải có đủ field:

```txt
id
slug
title
category
summary
problem
when_to_use
when_not_to_use
recommended_stack
library_choices
install_commands
architecture
request_flow
folder_structure
templates
env_vars
config_notes
security_notes
performance_notes
testing_notes
deployment_notes
common_errors
production_checklist
related_patterns
tags
difficulty
production_level
updated_at
deprecated
```

---

# 4. Category map

Tổng category cần có:

```txt
01. Backend Fundamentals
02. Python Project Setup
03. API Design
04. FastAPI
05. Django
06. Flask / Lightweight API
07. Pydantic / Validation
08. Database / ORM
09. Migration
10. Authentication
11. Authorization
12. Security
13. File Upload / Storage
14. OCR / Document Processing
15. Background Jobs / Queues
16. Cache / Rate Limiting
17. Search
18. Realtime
19. Webhook / Payment
20. Import / Export
21. Email / Notification
22. Testing
23. Logging / Observability
24. Performance
25. Deployment / Docker
26. Cloud-native / Kubernetes
27. CI/CD
28. Architecture Patterns
29. Distributed Systems
30. AI Backend / LLM
31. RAG / Vector Database
32. Agent Tools / MCP-style Backend
33. Enterprise / SaaS
34. Maintenance / Operations
35. Anti-patterns
```

---

# 5. Backend Fundamentals

## 5.1. Patterns cần có

```txt
1. Backend request-response lifecycle
2. HTTP basics for backend
3. REST API basics
4. JSON API design
5. Status code decision table
6. Request validation
7. Response serialization
8. API error format
9. API versioning
10. Idempotency basics
11. Stateless vs stateful backend
12. Sync vs async backend
13. Monolith vs modular monolith vs microservice
14. Environment variables
15. 12-factor app basics
```

## 5.2. Decision guide cần có

```txt
- Khi nào dùng REST?
- Khi nào dùng GraphQL?
- Khi nào dùng WebSocket?
- Khi nào dùng Server-Sent Events?
- Khi nào cần API versioning?
- Khi nào cần idempotency key?
```

---

# 6. Python Project Setup

## 6.1. Patterns cần có

```txt
1. Python version management
2. Virtual environment
3. pip vs pip-tools vs Poetry vs uv
4. pyproject.toml structure
5. requirements.txt structure
6. Dependency pinning
7. Ruff formatter/linter
8. Black formatter optional
9. mypy type checking
10. pre-commit hooks
11. .env and settings
12. Project structure for app
13. Makefile/task runner
14. Docker dev environment
15. Local development checklist
```

## 6.2. Kỹ thuật mới/cần theo dõi

```txt
- uv for fast Python package/project management
- pyproject.toml-first workflow
- Ruff as fast linter/formatter
- Type-checking with pyright/mypy
```

---

# 7. API Design

## Patterns cần có

```txt
1. REST resource naming
2. Request body design
3. Response envelope vs direct response
4. Error response schema
5. Pagination strategies
6. Filtering strategies
7. Sorting whitelist
8. Cursor pagination
9. Bulk API
10. Partial update PATCH
11. File upload endpoint
12. Streaming response
13. Server-Sent Events
14. WebSocket API
15. OpenAPI tags
16. API deprecation policy
17. API versioning in URL/header
18. API idempotency
19. API rate limit response
20. API client SDK generation
```

---

# 8. FastAPI

## 8.1. Core patterns

```txt
1. FastAPI minimal app
2. App factory pattern
3. Router structure
4. Dependency injection
5. Pydantic schema
6. Response model
7. Error handling
8. Middleware
9. Lifespan events
10. Settings with pydantic-settings
11. CORS
12. Static files
13. File upload
14. Form data
15. BackgroundTasks
16. WebSocket
17. StreamingResponse
18. Server-Sent Events
19. OpenAPI customization
20. Testing with TestClient/httpx
```

## 8.2. Production patterns

```txt
1. FastAPI layered architecture
2. FastAPI clean architecture light
3. FastAPI SQLAlchemy sync
4. FastAPI SQLAlchemy async
5. FastAPI SQLModel
6. FastAPI Alembic
7. FastAPI JWT auth
8. FastAPI OAuth2
9. FastAPI RBAC
10. FastAPI Redis cache
11. FastAPI Celery
12. FastAPI rate limit
13. FastAPI request logging
14. FastAPI OpenTelemetry
15. FastAPI Docker production
```

## 8.3. Decision guide

```txt
- Khi nào dùng sync endpoint?
- Khi nào dùng async endpoint?
- Khi nào dùng BackgroundTasks?
- Khi nào cần Celery?
- Khi nào dùng SQLAlchemy?
- Khi nào dùng SQLModel?
- Khi nào tách service/repository?
```

---

# 9. Django / DRF

## 9.1. Core patterns

```txt
1. Django project setup
2. Django app structure
3. Django settings split
4. Django model
5. Django migration
6. Django admin
7. Django forms
8. Django auth
9. Django permissions
10. Django middleware
11. Django signals
12. Django static/media files
13. Django async views
14. Django management command
15. Django testing
```

## 9.2. DRF patterns

```txt
1. DRF serializer
2. DRF ModelSerializer
3. DRF APIView
4. DRF GenericAPIView
5. DRF ViewSet
6. DRF Router
7. DRF permissions
8. DRF authentication
9. DRF pagination
10. DRF filtering
11. DRF throttling
12. DRF nested routes
13. DRF schema docs
14. DRF testing
15. DRF JWT with SimpleJWT
```

## 9.3. Decision guide

```txt
- Khi nào dùng Django thay vì FastAPI?
- Khi nào dùng DRF?
- Khi nào dùng Django Admin?
- Khi nào không nên dùng Django cho microservice nhỏ?
```

---

# 10. Flask / Lightweight API

## Patterns cần có

```txt
1. Flask minimal app
2. Flask blueprint
3. Flask config
4. Flask request validation
5. Flask SQLAlchemy
6. Flask migration
7. Flask JWT
8. Flask error handling
9. Flask testing
10. Flask production deploy
11. Quart for async Flask-like apps
12. Litestar overview
```

---

# 11. Pydantic / Validation

## Patterns cần có

```txt
1. BaseModel request schema
2. Response schema
3. Field validation
4. Custom validators
5. Nested models
6. Strict types
7. Settings management
8. Model serialization
9. Discriminated unions
10. Generic models
11. Validation error formatting
12. Pydantic with FastAPI
13. Pydantic for LLM output validation
14. Pydantic for tool schema
15. Migration notes between major versions
```

---

# 12. Database / ORM

## 12.1. SQL basics for backend

```txt
1. Table design
2. Primary key
3. Foreign key
4. Index
5. Unique constraint
6. Transaction
7. Isolation level overview
8. Join
9. Aggregation
10. Pagination query
11. Upsert
12. Soft delete
13. Audit columns
14. Migration strategy
15. Query performance
```

## 12.2. SQLAlchemy

```txt
1. Engine/session setup
2. Declarative model
3. Relationship
4. CRUD repository
5. Transaction pattern
6. Unit of Work
7. Async SQLAlchemy
8. Eager loading
9. Avoid N+1 queries
10. Raw SQL safely
11. Bulk insert/update
12. Connection pool config
13. Alembic integration
14. Testing with test database
15. Multi-database setup
```

## 12.3. SQLModel

```txt
1. SQLModel basic model
2. SQLModel with FastAPI
3. SQLModel relationship
4. SQLModel session
5. SQLModel migration note
6. When to use SQLModel vs SQLAlchemy
```

## 12.4. NoSQL

```txt
1. MongoDB with Motor
2. Redis as data store
3. DynamoDB overview
4. Document database decision
5. NoSQL anti-patterns
```

---

# 13. Migration

## Patterns cần có

```txt
1. Alembic init
2. Alembic env.py config
3. Autogenerate migration
4. Manual migration
5. Upgrade/downgrade
6. Data migration
7. Safe migration production
8. Zero-downtime migration
9. Django migration
10. Migration rollback checklist
```

---

# 14. Authentication

## Patterns cần có

```txt
1. Register API
2. Login API
3. Password hashing
4. JWT access token
5. Refresh token
6. Token rotation
7. Logout/token blacklist
8. Cookie-based auth
9. Session auth
10. API key auth
11. OAuth2 login
12. OIDC basics
13. Password reset
14. Email verification
15. MFA/TOTP overview
16. Login rate limit
17. Auth audit log
18. Auth testing
```

---

# 15. Authorization

## Patterns cần có

```txt
1. Role-based access control
2. Permission-based access control
3. Resource ownership check
4. Organization/workspace membership
5. Multi-tenant permission
6. Admin permission
7. Policy object
8. Casbin integration
9. ABAC basics
10. Permission testing
```

---

# 16. Security

## Patterns cần có

```txt
1. CORS production
2. CSRF overview
3. XSS prevention for APIs
4. SQL injection prevention
5. Secret management
6. Environment variable security
7. File upload security
8. MIME validation
9. Virus scan concept
10. Rate limiting
11. Brute-force prevention
12. Security headers
13. Password storage
14. Token expiration
15. Refresh token security
16. Webhook signature
17. Request body size limit
18. Dependency scanning
19. PII redaction
20. Audit logging
21. Data retention
22. Encryption at rest concept
23. Encryption in transit
24. API key rotation
25. Security checklist before deploy
```

---

# 17. File Upload / Storage

## Patterns cần có

```txt
1. Upload single file
2. Upload multiple files
3. Upload image
4. Validate file size
5. Validate MIME
6. Safe filename
7. Store local file
8. Store S3-compatible object
9. Presigned upload URL
10. Presigned download URL
11. Private file access
12. Delete file safely
13. File metadata table
14. Large file upload
15. Chunked upload
16. Virus scan pipeline
17. Image resize
18. Image thumbnail
19. Video upload overview
20. File cleanup job
```

---

# 18. OCR / Document Processing

## Patterns cần có

```txt
1. Image OCR API
2. OCR image preprocessing
3. Tesseract OCR
4. EasyOCR
5. PaddleOCR
6. Cloud OCR provider
7. PDF text extraction
8. PDF scan OCR
9. PDF page to image
10. OCR multi-page PDF
11. Receipt OCR
12. Invoice OCR
13. Table extraction
14. Form/key-value extraction
15. Layout-aware OCR
16. Document classification
17. OCR async job
18. OCR result storage
19. OCR confidence score
20. OCR correction pipeline
21. OCR privacy/security checklist
22. OCR provider abstraction
23. OCR benchmarking
24. OCR fallback strategy
25. OCR cost control
```

---

# 19. Background Jobs / Queues

## Patterns cần có

```txt
1. FastAPI BackgroundTasks
2. Celery Redis
3. Celery RabbitMQ
4. RQ Redis
5. Dramatiq overview
6. APScheduler
7. Cron job
8. Retry with backoff
9. Task timeout
10. Task result backend
11. Job status API
12. Dead letter queue concept
13. Idempotent task
14. Scheduled task
15. Periodic cleanup
16. Email worker
17. OCR worker
18. Export worker
19. Webhook retry worker
20. Worker monitoring
```

---

# 20. Cache / Rate Limiting

## Patterns cần có

```txt
1. Redis connection
2. Cache-aside pattern
3. API response cache
4. Query result cache
5. Cache invalidation
6. TTL strategy
7. Distributed lock
8. Session store
9. Rate limit by IP
10. Rate limit by user
11. Login rate limit
12. Sliding window limit
13. Token bucket overview
14. Cache stampede prevention
15. Redis healthcheck
```

---

# 21. Search

## Patterns cần có

```txt
1. SQL LIKE search
2. PostgreSQL full-text search
3. Trigram search
4. Meilisearch
5. Typesense
6. Elasticsearch/OpenSearch
7. Search indexing
8. Search filters
9. Search pagination
10. Search ranking
11. Hybrid keyword + vector search
12. Search result highlighting
13. Search permissions
14. Search index sync job
15. Search reindex workflow
```

---

# 22. Realtime

## Patterns cần có

```txt
1. WebSocket basic
2. WebSocket auth
3. Connection manager
4. Broadcast
5. Redis Pub/Sub
6. Server-Sent Events
7. Streaming response
8. Realtime notification
9. Chat backend overview
10. WebSocket scaling
```

---

# 23. Webhook / Payment

## Webhook patterns

```txt
1. Webhook receiver
2. Signature verification
3. Idempotency key
4. Event table
5. Webhook retry
6. Webhook dead letter
7. Webhook audit log
8. Webhook testing
```

## Payment patterns

```txt
1. Create checkout session
2. Payment intent/session model
3. Payment webhook
4. Payment status sync
5. Refund pattern
6. Invoice pattern
7. Subscription overview
8. Payment idempotency
9. Payment security checklist
```

---

# 24. Import / Export

## Import patterns

```txt
1. CSV upload
2. Excel upload
3. Validate rows
4. Error report
5. Bulk insert
6. Import job queue
7. Import preview
8. Rollback import
```

## Export patterns

```txt
1. Export CSV
2. Export Excel
3. Export PDF
4. Export large report async
5. Download generated file
6. Expiring export URL
7. Report template with Jinja2
8. Export audit log
```

---

# 25. Email / Notification

## Patterns cần có

```txt
1. SMTP email
2. FastAPI-Mail
3. aiosmtplib
4. Jinja2 email templates
5. Verify email
6. Reset password email
7. Email queue
8. Email retry
9. Telegram bot notification
10. Slack notification
11. Discord webhook
12. Push notification overview
13. Notification provider interface
14. Notification preferences
15. Notification audit log
```

---

# 26. Testing

## Patterns cần có

```txt
1. Pytest setup
2. Unit test service
3. Integration test API
4. FastAPI TestClient
5. httpx AsyncClient
6. Test database
7. Transaction rollback in test
8. Factory Boy
9. Faker
10. Mock external service
11. Monkeypatch
12. Test auth
13. Test upload
14. Test webhook
15. Test background job
16. Test email
17. Coverage
18. Contract test
19. Snapshot response test
20. Load test with Locust
21. Security test checklist
22. CI test workflow
```

---

# 27. Logging / Observability

## Patterns cần có

```txt
1. Python logging setup
2. Loguru setup
3. Structlog setup
4. JSON logging
5. Request logging middleware
6. Correlation ID
7. Trace ID
8. Sentry integration
9. Prometheus metrics
10. OpenTelemetry tracing
11. OpenTelemetry metrics/logs
12. Slow query log
13. Error alert
14. Healthcheck
15. Readiness/liveness
16. Business metrics
17. Audit log
18. Log redaction
19. Dashboard checklist
20. Incident debugging checklist
```

---

# 28. Performance

## Patterns cần có

```txt
1. Database index
2. Query plan basics
3. Avoid N+1
4. Eager loading
5. Connection pooling
6. Async performance decision
7. Worker count tuning
8. Response compression
9. Streaming large response
10. Batch processing
11. Bulk insert
12. Cache strategy
13. CDN for files
14. Rate limiting impact
15. Profiling Python backend
16. Memory leak checklist
17. Load testing
18. Performance budget
```

---

# 29. Deployment / Docker

## Patterns cần có

```txt
1. Dockerfile FastAPI
2. Dockerfile Django
3. docker-compose dev
4. docker-compose production-like
5. Uvicorn config
6. Gunicorn + Uvicorn workers
7. Nginx reverse proxy
8. Environment variables
9. Healthcheck
10. Migration on deploy
11. Static/media files
12. Docker secrets concept
13. Multi-stage build
14. Non-root container
15. Container security checklist
```

---

# 30. Cloud-native / Kubernetes

## Patterns cần có

```txt
1. Kubernetes deployment
2. Kubernetes service
3. Ingress
4. ConfigMap
5. Secret
6. Liveness/readiness probes
7. Horizontal Pod Autoscaler
8. Job/CronJob
9. Persistent volume overview
10. Helm chart basics
11. Rolling update
12. Blue/green concept
13. Canary concept
14. Cloud Run deploy
15. AWS ECS/Fargate overview
16. Fly.io/Render/Railway deploy
17. Managed Postgres
18. Managed Redis
19. Object storage
20. Backup/restore
```

---

# 31. CI/CD

## Patterns cần có

```txt
1. GitHub Actions lint
2. GitHub Actions test
3. GitHub Actions build
4. GitHub Actions Docker image
5. Dependency cache
6. Environment secrets
7. Migration in pipeline
8. Deploy preview
9. Release tagging
10. Rollback checklist
11. Security scanning
12. SBOM concept
13. Dependabot
14. Pre-commit CI
15. Quality gate
```

---

# 32. Architecture Patterns

## Patterns cần có

```txt
1. Simple app structure
2. Layered architecture
3. Service/repository
4. Clean Architecture light
5. Hexagonal architecture
6. DDD basics
7. Domain service
8. Application service
9. Unit of Work
10. Provider pattern
11. Strategy pattern
12. Adapter pattern
13. CQRS basic
14. Event-driven architecture
15. Outbox pattern
16. Inbox pattern
17. Saga pattern
18. Modular monolith
19. Microservice boundary
20. BFF pattern
21. API gateway
22. Multi-tenant architecture
23. Plugin architecture
24. Feature flag
25. Configuration layering
```

---

# 33. Distributed Systems

## Patterns cần có

```txt
1. Timeout
2. Retry with backoff
3. Circuit breaker
4. Bulkhead
5. Idempotency
6. Distributed lock
7. Message queue
8. Event bus
9. Eventual consistency
10. Duplicate message handling
11. Ordering issue
12. Transactional outbox
13. Saga
14. Service discovery overview
15. Rate limit distributed API
16. Consistency tradeoffs
17. CAP theorem overview for backend
18. Failure mode checklist
```

---

# 34. AI Backend / LLM

## Patterns cần có

```txt
1. LLM provider interface
2. OpenAI-compatible client wrapper
3. Prompt template
4. Prompt versioning
5. Chat history storage
6. Streaming chat API
7. SSE streaming
8. WebSocket streaming
9. Token usage tracking
10. Cost limit
11. LLM retry/fallback
12. LLM output validation
13. Function/tool calling
14. Agent action audit log
15. Human approval gate
16. Prompt injection defense basics
17. Sensitive data redaction
18. LLM observability
19. Evaluation dataset
20. Guardrails pattern
```

---

# 35. RAG / Vector Database

## Patterns cần có

```txt
1. Document upload
2. Text extraction
3. Chunking
4. Embedding generation
5. Vector insert
6. Semantic search
7. Hybrid search
8. Reranking
9. Context builder
10. Citation extraction
11. RAG answer API
12. Document permission filter
13. Multi-tenant vector index
14. Incremental indexing
15. Delete/reindex document
16. pgvector
17. Qdrant
18. Weaviate
19. Milvus
20. Chroma local
21. RAG evaluation
22. RAG caching
23. RAG security checklist
24. RAG cost control
25. RAG anti-patterns
```

---

# 36. Agent Tools / MCP-style Backend

## Patterns cần có

```txt
1. Tool endpoint design
2. Typed tool schema
3. Tool input validation
4. Tool output validation
5. Tool auth
6. Tool permission
7. Tool audit log
8. Tool idempotency
9. Tool streaming response
10. Tool error schema
11. MCP server concept
12. FastAPI + tool server bridge
13. Agent-safe filesystem access
14. Approval gate for destructive action
15. Sandbox execution boundary
16. Tool registry
17. Tool versioning
18. Tool observability
19. Tool rate limit
20. Tool security checklist
```

---

# 37. Enterprise / SaaS

## Patterns cần có

```txt
1. Organization model
2. Workspace model
3. Membership model
4. Team/role model
5. Tenant isolation
6. Tenant-aware query
7. Billing integration overview
8. Subscription webhook
9. Feature flag
10. Plan limit enforcement
11. Audit log
12. Admin action log
13. Invite user flow
14. SSO/OIDC overview
15. SCIM overview
16. Data export
17. Data deletion
18. Soft delete
19. Retention policy
20. Compliance checklist
```

---

# 38. Maintenance / Operations

## Patterns cần có

```txt
1. Backup database
2. Restore database
3. Migration rollback
4. Feature flag rollback
5. Incident checklist
6. Log investigation
7. Performance incident
8. Security incident
9. Secret rotation
10. Dependency update
11. Deprecated API handling
12. Data cleanup job
13. Storage cleanup job
14. Monitoring dashboard
15. Runbook template
```

---

# 39. Anti-patterns

## Nội dung cần có

```txt
1. Business logic inside router
2. No validation
3. No response schema
4. Hard-code secret
5. No password hashing
6. JWT without expiration
7. File upload without validation
8. OCR large file inside request
9. No timeout external API
10. No idempotency for webhook
11. No transaction for payment
12. Query database in loop
13. N+1 query
14. No migration strategy
15. No logging
16. Logging sensitive data
17. No rate limit login
18. No test for auth
19. No healthcheck
20. Deploy with debug mode
```

---

# 40. Content priority order

## Priority 1 — Must-have core

```txt
FastAPI
Pydantic
SQLAlchemy
Alembic
JWT Auth
Upload File
OCR
Celery
Redis
Pytest
Docker
Security basics
```

## Priority 2 — Production

```txt
Observability
Rate limiting
Webhook
Payment
CI/CD
Deployment
Performance
Testing advanced
```

## Priority 3 — Advanced architecture

```txt
Clean Architecture
DDD
Outbox
Saga
CQRS
Multi-tenancy
Distributed systems
```

## Priority 4 — AI-era backend

```txt
LLM backend
RAG
Vector DB
OCR advanced
Agent tools
MCP-style backend
Streaming
Cost control
Guardrails
```

## Priority 5 — Enterprise

```txt
SSO
Audit
Compliance
Tenant isolation
Feature flags
Runbooks
Backup/restore
Incident response
```

---

# 41. Target content quantity

## MVP

```txt
25 patterns
```

## Complete basic library

```txt
50 patterns
```

## Production library

```txt
100 patterns
```

## Advanced backend library

```txt
150 patterns
```

## AI-era backend library

```txt
200 patterns
```

## Complete compass

```txt
250-300+ patterns
```

---

# 42. Content freshness policy

Vì backend Python thay đổi liên tục, mỗi pattern nên có:

```txt
updated_at
library_versions_checked
deprecated
replacement_pattern
notes
```

Ví dụ:

```json
{
  "updated_at": "2026-06-04",
  "library_versions_checked": {
    "fastapi": "check latest docs",
    "pydantic": "v2.x",
    "sqlalchemy": "2.x"
  },
  "deprecated": false
}
```

## Cần rà soát định kỳ

```txt
FastAPI docs
Django docs
Pydantic docs
SQLAlchemy docs
Alembic docs
Celery docs
Redis docs
OpenTelemetry docs
Docker docs
Kubernetes docs
Vector database docs
LLM provider docs
OCR engine docs
Security advisories
```

---

# 43. Suggested first 25 MVP patterns

```txt
1. FastAPI Project Structure
2. FastAPI CRUD API
3. Pydantic Schema
4. SQLAlchemy Session
5. Alembic Migration
6. JWT Auth
7. Refresh Token
8. RBAC
9. Upload Image
10. Upload File to S3
11. Image OCR API
12. PDF OCR API
13. Email Sending
14. FastAPI BackgroundTasks
15. Celery Worker
16. Redis Cache
17. Rate Limiting
18. Pagination Filtering Sorting
19. Global Error Handling
20. Request Logging
21. Webhook Receiver
22. Payment Webhook
23. CSV/Excel Import
24. Export Excel/PDF
25. Docker Deploy FastAPI
```

---

# 44. Suggested next 25 patterns after MVP

```txt
26. FastAPI Settings Management
27. CORS Production Config
28. Healthcheck Endpoint
29. API Versioning
30. OpenAPI Customization
31. Async SQLAlchemy
32. Database Transaction Pattern
33. Unit of Work
34. Repository Pattern
35. N+1 Query Avoidance
36. Connection Pooling
37. Structured Logging
38. Sentry Integration
39. Prometheus Metrics
40. OpenTelemetry Tracing
41. File Upload Security
42. Presigned S3 Upload
43. Job Status API
44. Retry with Backoff
45. Idempotency Key
46. Webhook Idempotency
47. Test Database Fixture
48. Mock External API
49. GitHub Actions CI
50. Production Docker Compose
```

---

# 45. Suggested AI-era 50 patterns

```txt
1. LLM Provider Interface
2. Streaming Chat API
3. SSE Chat Response
4. WebSocket Chat Response
5. Prompt Template Storage
6. Prompt Versioning
7. Token Usage Tracking
8. LLM Cost Control
9. LLM Retry/Fallback
10. LLM Output Validation
11. Function Calling Backend
12. Tool Registry
13. Tool Permission
14. Agent Audit Log
15. Human Approval Gate
16. Prompt Injection Defense
17. RAG Upload Pipeline
18. Text Extraction Pipeline
19. Chunking Strategy
20. Embedding Generation
21. pgvector Search
22. Qdrant Search
23. Hybrid Search
24. Reranking
25. Citation Builder
26. Document Permission Filter
27. Multi-tenant RAG
28. Incremental Indexing
29. Delete from Vector Index
30. RAG Evaluation
31. OCR Provider Interface
32. PaddleOCR Document API
33. Tesseract Local OCR
34. Cloud OCR Adapter
35. Invoice Parsing
36. Table Extraction
37. Document Classification
38. Layout-aware OCR
39. OCR Background Worker
40. OCR Privacy Checklist
41. MCP Server Concept
42. Tool Endpoint Design
43. Tool Streaming
44. Tool Idempotency
45. Tool Security Checklist
46. Agent-safe File Access
47. Sandbox Execution Boundary
48. AI Request Observability
49. AI Data Retention
50. AI Backend Runbook
```

---

# 46. Quality checklist for every content item

Trước khi thêm pattern vào thư viện, kiểm tra:

```txt
- Có đúng category không?
- Có tags đủ để search không?
- Có synonyms nếu cần không?
- Có khi nào dùng không?
- Có khi nào không dùng không?
- Có install command không?
- Có template code không?
- Có production checklist không?
- Có security note không?
- Có testing note không?
- Có related patterns không?
- Có updated_at không?
```

---

# 47. Kết luận

Content roadmap này giúp Python Backend Compass mở rộng từ một MVP nhỏ thành một thư viện backend Python toàn diện.

Đích đến không phải chỉ là “có nhiều bài viết”, mà là có một hệ thống tri thức có cấu trúc:

```txt
Use case → Decision → Library → Architecture → Template → Checklist → Production notes
```

Nếu duy trì đúng cấu trúc này, app có thể trở thành công cụ tra cứu backend Python cực kỳ hữu ích cho học tập, làm dự án cá nhân và làm việc thực tế.
