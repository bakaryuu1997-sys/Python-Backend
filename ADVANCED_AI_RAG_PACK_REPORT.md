# ADVANCED_AI_RAG_PACK_REPORT.md

## Pack

`v1.8 — Advanced AI/RAG Pack`

## Mục tiêu

Bổ sung các pattern AI/RAG production quan trọng mà không thêm runtime AI, không cần API key, không backend server, không database runtime trong app thư viện.

## Đã thêm

### Maintainability refactor

Trước v1.8, `src/data/patterns.ts` đã quá dài. Pack này đã tách dữ liệu thành:

```txt
src/data/patternUtils.ts
src/data/patterns.ts
src/data/pattern-packs/*.ts
```

`patterns.ts` giờ chỉ đóng vai trò tổng hợp các pack. Mỗi category nằm trong file riêng để dễ bảo trì.

### Decision cards mới

- Nâng cấp RAG production
- AI agent gọi tool an toàn

### Libraries mới

- LlamaIndex
- LangChain
- tiktoken
- sse-starlette

### Patterns mới

1. RAG Ingestion Pipeline
2. Hybrid Search for RAG
3. RAG Reranking Pipeline
4. Citation Builder for RAG
5. RAG Evaluation Suite
6. Multi-tenant RAG Permission Filter
7. Vector DB Delete / Reindex Workflow
8. Advanced LLM Provider Abstraction
9. LLM Streaming with SSE / WebSocket
10. Agent Tool Registry
11. Prompt Injection Defense for RAG
12. LLM Cost and Token Budget Guard
13. AI Observability
14. Human Approval for Agent Actions

## Trạng thái

- App vẫn static-only.
- Không thêm Gemini/OpenAI runtime generator.
- Không thêm backend API.
- Không thêm database runtime.
- Search/filter tiếp tục chạy trên static data.

## Pattern count

Tổng số patterns sau v1.8: **149**.

## Kiểm tra gợi ý

Search các từ khóa:

- `rag ingestion`
- `hybrid search`
- `reranking`
- `citation`
- `rag evaluation`
- `tenant rag`
- `vector reindex`
- `llm provider`
- `sse streaming`
- `tool registry`
- `prompt injection`
- `token budget`
- `ai observability`
- `human approval`
