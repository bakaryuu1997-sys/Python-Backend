import { Pattern } from '../types';

export const PATTERN_INDEX = [
  {
    "id": "rag-query-backend",
    "title": "RAG Backend Query API",
    "vietnameseTitle": "API hỏi đáp tài liệu RAG",
    "shortDescription": "Nhận câu hỏi, semantic search vector DB, build context và trả answer có citation.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Qdrant",
      "Embeddings",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User cần hỏi đáp tài liệu.",
      "Cần search ngữ nghĩa.",
      "Cần context + citation."
    ],
    "whyNotUse": [
      "Không có tài liệu cần hỏi đáp.",
      "Không có permission filter cho tài liệu nhạy cảm."
    ],
    "relatedPatterns": [
      "vector-database-pgvector",
      "llm-streaming-sse"
    ],
    "searchKeywords": [
      "app/services/retrieval_service.py",
      "RAG retrieval skeleton production-aware.",
      "minimal",
      "app/services/rag_service.py",
      "RAG service production-aware: permission filter, reranking hook, citation và output schema.",
      "production",
      "tests/test_rag_permissions.py",
      "Test RAG bắt buộc truyền permission filter để không leak tài liệu giữa user/tenant.",
      "test"
    ]
  },
  {
    "id": "vector-database-pgvector",
    "title": "pgvector Semantic Search",
    "vietnameseTitle": "Semantic search bằng pgvector",
    "shortDescription": "Lưu embedding vào PostgreSQL pgvector và query nearest neighbor theo metadata filter.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "pgvector",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn giữ vector trong PostgreSQL.",
      "Dataset vừa, cần metadata filter.",
      "Không muốn vận hành vector DB riêng."
    ],
    "whyNotUse": [
      "Vector dataset rất lớn cần Qdrant/Milvus.",
      "Postgres chưa bật extension pgvector."
    ],
    "relatedPatterns": [
      "rag-query-backend"
    ],
    "searchKeywords": [
      "sql/enable_pgvector.sql",
      "Enable extension.",
      "minimal"
    ]
  },
  {
    "id": "llm-streaming-sse",
    "title": "LLM Streaming with Server-Sent Events",
    "vietnameseTitle": "Streaming câu trả lời LLM bằng SSE",
    "shortDescription": "Trả token streaming qua SSE để UI chat/RAG phản hồi nhanh hơn.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "StreamingResponse"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Câu trả lời LLM dài.",
      "UI cần hiển thị token dần.",
      "Không cần WebSocket hai chiều."
    ],
    "whyNotUse": [
      "Cần realtime hai chiều hoặc binary data.",
      "Client không hỗ trợ EventSource."
    ],
    "relatedPatterns": [
      "rag-query-backend"
    ],
    "searchKeywords": [
      "app/routers/chat_router.py",
      "SSE streaming endpoint.",
      "minimal"
    ]
  },
  {
    "id": "llm-output-validation",
    "title": "LLM Output Validation with Pydantic",
    "vietnameseTitle": "Validate output LLM bằng Pydantic",
    "shortDescription": "Ép output AI về schema rõ ràng, parse lỗi và fallback thay vì tin text tự do.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "LLM"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "LLM phải trả JSON/schema.",
      "Cần lưu output vào DB.",
      "Cần giảm lỗi format ở production."
    ],
    "whyNotUse": [
      "Chỉ dùng LLM để chat text tự do.",
      "Không cần structured output."
    ],
    "relatedPatterns": [
      "rag-query-backend"
    ],
    "searchKeywords": [
      "llm validation",
      "structured output",
      "pydantic",
      "app/services/llm_validation.py",
      "Validate JSON output.",
      "minimal",
      "tests/test_llm_validation.py",
      "Invalid output bị từ chối.",
      "test"
    ]
  },
  {
    "id": "prompt-template-versioning",
    "title": "Prompt Template Versioning",
    "vietnameseTitle": "Version prompt template",
    "shortDescription": "Lưu prompt có version để biết output AI được sinh bởi prompt nào và rollback khi prompt lỗi.",
    "category": "ai-rag",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "LLM/RAG app thay đổi prompt thường xuyên.",
      "Cần audit answer theo prompt version.",
      "Cần rollback prompt."
    ],
    "whyNotUse": [
      "Prompt hard-code đơn giản trong prototype.",
      "Không dùng LLM."
    ],
    "relatedPatterns": [
      "rag-query-backend",
      "llm-output-validation"
    ],
    "searchKeywords": [
      "prompt",
      "versioning",
      "llm",
      "app/services/prompt_registry.py",
      "Prompt registry đơn giản.",
      "minimal"
    ]
  },
  {
    "id": "llm-cost-tracking",
    "title": "LLM Token Cost Tracking",
    "vietnameseTitle": "Theo dõi token/cost LLM",
    "shortDescription": "Ghi nhận input/output tokens, provider, model và cost để tránh chi phí AI vượt kiểm soát.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "LLM"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App gọi LLM thường xuyên.",
      "Cần giới hạn cost theo user/team.",
      "Cần dashboard usage."
    ],
    "whyNotUse": [
      "Không dùng paid LLM.",
      "Prototype ít request."
    ],
    "relatedPatterns": [
      "llm-streaming-sse",
      "rag-query-backend"
    ],
    "searchKeywords": [
      "llm cost",
      "token usage",
      "budget",
      "app/services/llm_usage.py",
      "Record usage.",
      "minimal",
      "tests/test_llm_budget.py",
      "Budget vượt bị chặn.",
      "test"
    ]
  },
  {
    "id": "tool-schema-pydantic",
    "title": "Typed Tool Schema with Pydantic",
    "vietnameseTitle": "Schema tool cho agent/AI backend",
    "shortDescription": "Định nghĩa tool input/output bằng Pydantic để AI/tool calls an toàn, validate được và dễ audit.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Xây agent tools hoặc MCP-style backend.",
      "Cần validate input tool trước khi chạy.",
      "Cần log output có schema."
    ],
    "whyNotUse": [
      "Không dùng agent/tool calling.",
      "Tool chỉ chạy nội bộ manual."
    ],
    "relatedPatterns": [
      "rag-query-backend",
      "llm-output-validation"
    ],
    "searchKeywords": [
      "tool calling",
      "agent",
      "pydantic tool",
      "app/tools/schemas.py",
      "Tool schema typed.",
      "minimal",
      "tests/test_tool_schema.py",
      "Tool input limit được validate.",
      "test"
    ]
  },
  {
    "id": "human-approval-gate",
    "title": "Human Approval Gate for AI Actions",
    "vietnameseTitle": "Duyệt thủ công hành động AI nguy hiểm",
    "shortDescription": "Yêu cầu approval trước khi agent gửi email, xóa file, gọi payment hoặc thao tác destructive.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Agent có quyền thao tác dữ liệu thật.",
      "Có hành động destructive hoặc tốn tiền.",
      "Cần audit approval."
    ],
    "whyNotUse": [
      "AI chỉ đọc dữ liệu.",
      "Không có tool/action nguy hiểm."
    ],
    "relatedPatterns": [
      "tool-schema-pydantic"
    ],
    "searchKeywords": [
      "approval",
      "agent safety",
      "destructive action",
      "app/services/approval_service.py",
      "Approval required before action.",
      "minimal",
      "tests/test_approval_gate.py",
      "Pending approval chặn action.",
      "test"
    ]
  },
  {
    "id": "llm-provider-fallback",
    "title": "LLM Provider Fallback Pattern",
    "vietnameseTitle": "Fallback giữa nhiều provider LLM",
    "shortDescription": "Dùng provider interface, timeout, retry và fallback để giảm rủi ro khi một LLM provider lỗi hoặc quá đắt.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Pydantic",
      "httpx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App phụ thuộc LLM runtime.",
      "Cần fallback khi provider lỗi.",
      "Cần kiểm soát cost và timeout."
    ],
    "whyNotUse": [
      "App static không gọi LLM.",
      "Không có backend bảo vệ API key."
    ],
    "relatedPatterns": [
      "provider-adapter-pattern",
      "llm-cost-tracking"
    ],
    "searchKeywords": [
      "llm fallback",
      "provider fallback",
      "multi provider",
      "app/providers/llm/router.py",
      "Fallback provider theo thứ tự ưu tiên.",
      "minimal",
      "tests/test_llm_fallback.py",
      "Provider đầu lỗi thì fallback provider thứ hai.",
      "test"
    ]
  },
  {
    "id": "rag-ingestion-pipeline",
    "title": "RAG Ingestion Pipeline",
    "vietnameseTitle": "Pipeline nạp tài liệu cho RAG",
    "shortDescription": "Pipeline upload tài liệu, extract text, chunk, embed và ghi vào vector database theo job nền.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Celery",
      "Pydantic",
      "Qdrant",
      "OpenAI-compatible embeddings"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần chat/search với tài liệu.",
      "File có thể lớn và cần xử lý nền.",
      "Muốn tracking trạng thái ingest theo document/job."
    ],
    "whyNotUse": [
      "Chỉ cần search keyword đơn giản.",
      "Không có tài liệu người dùng hoặc quyền truy cập tài liệu."
    ],
    "relatedPatterns": [
      "celery-worker-setup",
      "vector-db-delete-reindex-workflow",
      "multi-tenant-rag-permission-filter"
    ],
    "searchKeywords": [
      "rag ingestion",
      "document pipeline",
      "embedding pipeline",
      "chunking",
      "app/tasks/ingest_document.py",
      "Task ingest tài liệu idempotent theo document_id.",
      "minimal",
      "tests/test_rag_ingestion.py",
      "Document đã indexed thì task không upsert lại.",
      "test"
    ]
  },
  {
    "id": "hybrid-search-rag",
    "title": "Hybrid Search for RAG",
    "vietnameseTitle": "Hybrid search cho RAG",
    "shortDescription": "Kết hợp keyword search và vector search để tăng recall, đặc biệt với mã lỗi, tên riêng, API và thuật ngữ kỹ thuật.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "pgvector",
      "Qdrant"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Vector search bỏ sót keyword chính xác.",
      "Tài liệu có code, ID, error message, tên API.",
      "Cần search ổn định hơn cho RAG production."
    ],
    "whyNotUse": [
      "Dataset nhỏ và semantic search đã đủ tốt.",
      "Không có keyword index hoặc ranking pipeline."
    ],
    "relatedPatterns": [
      "rag-reranking-pipeline",
      "rag-evaluation-suite"
    ],
    "searchKeywords": [
      "hybrid search",
      "keyword vector search",
      "rrf",
      "reciprocal rank fusion",
      "app/search/hybrid_search.py",
      "Merge kết quả keyword và vector bằng reciprocal rank fusion.",
      "minimal",
      "tests/test_hybrid_search.py",
      "RRF ưu tiên kết quả xuất hiện ở nhiều nguồn.",
      "test"
    ]
  },
  {
    "id": "rag-reranking-pipeline",
    "title": "RAG Reranking Pipeline",
    "vietnameseTitle": "Reranking kết quả RAG",
    "shortDescription": "Lấy top-k rộng từ retrieval, sau đó rerank để chọn context chất lượng hơn trước khi gửi vào LLM.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Pydantic",
      "HTTPX"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Retrieval trả nhiều chunk nhiễu.",
      "Câu hỏi phức tạp cần chọn context tốt hơn.",
      "Muốn cải thiện citation và answer quality."
    ],
    "whyNotUse": [
      "Latency/cost rất nhạy và retrieval đã đủ tốt.",
      "Không có reranker model/provider."
    ],
    "relatedPatterns": [
      "hybrid-search-rag",
      "rag-evaluation-suite"
    ],
    "searchKeywords": [
      "reranking",
      "reranker",
      "cross encoder",
      "rag ranking",
      "app/rag/reranker.py",
      "Interface reranker có timeout và fallback.",
      "minimal",
      "tests/test_reranker.py",
      "Provider lỗi thì fallback về thứ tự retrieval.",
      "test"
    ]
  },
  {
    "id": "citation-builder-rag",
    "title": "Citation Builder for RAG",
    "vietnameseTitle": "Tạo citation cho câu trả lời RAG",
    "shortDescription": "Gắn source_id, document_id, page, heading và chunk span để câu trả lời có nguồn rõ ràng.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Người dùng cần biết câu trả lời lấy từ tài liệu nào.",
      "RAG dùng cho học tập, pháp lý, nội bộ công ty.",
      "Cần debug hallucination."
    ],
    "whyNotUse": [
      "Chat sáng tạo không cần nguồn.",
      "Tài liệu không có metadata/source đáng tin."
    ],
    "relatedPatterns": [
      "rag-ingestion-pipeline",
      "multi-tenant-rag-permission-filter"
    ],
    "searchKeywords": [
      "rag citation",
      "source attribution",
      "citations",
      "document source",
      "app/rag/citations.py",
      "Build citation từ chunks đã chọn.",
      "minimal",
      "tests/test_citations.py",
      "Citation bị trùng được dedupe.",
      "test"
    ]
  },
  {
    "id": "rag-evaluation-suite",
    "title": "RAG Evaluation Suite",
    "vietnameseTitle": "Bộ đánh giá chất lượng RAG",
    "shortDescription": "Tạo test set câu hỏi, expected sources và metrics để đo retrieval, citation và answer quality trước khi deploy.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "pytest",
      "pandas"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "RAG có dấu hiệu trả sai hoặc thiếu nguồn.",
      "Cần regression test khi đổi chunking/embedding/reranker.",
      "Muốn đo chất lượng trước deploy."
    ],
    "whyNotUse": [
      "Prototype nhỏ chưa có tài liệu cố định.",
      "Không có ground truth hoặc expected source."
    ],
    "relatedPatterns": [
      "hybrid-search-rag",
      "rag-reranking-pipeline",
      "citation-builder-rag"
    ],
    "searchKeywords": [
      "rag evaluation",
      "eval set",
      "retrieval quality",
      "source hit rate",
      "tests/eval/test_rag_quality.py",
      "Đánh giá retrieval source hit rate.",
      "minimal",
      "eval/rag_questions.csv",
      "Dataset đánh giá tối thiểu.",
      "config"
    ]
  },
  {
    "id": "multi-tenant-rag-permission-filter",
    "title": "Multi-tenant RAG Permission Filter",
    "vietnameseTitle": "Lọc quyền tài liệu trong RAG multi-tenant",
    "shortDescription": "Đảm bảo retrieval chỉ lấy chunks thuộc organization/workspace mà user được phép đọc.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Qdrant",
      "pgvector",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "RAG dùng trong SaaS nhiều tenant.",
      "Tài liệu private theo organization/workspace/user.",
      "Cần chống lộ dữ liệu qua vector search."
    ],
    "whyNotUse": [
      "Toàn bộ tài liệu public.",
      "App single-user local."
    ],
    "relatedPatterns": [
      "tenant-aware-query-filter",
      "vector-db-delete-reindex-workflow"
    ],
    "searchKeywords": [
      "multi tenant rag",
      "rag permission",
      "vector filter",
      "document permission",
      "app/rag/permission_filter.py",
      "Build filter metadata cho vector search.",
      "minimal",
      "tests/test_rag_permissions.py",
      "Vector search luôn có organization_id filter.",
      "test"
    ]
  },
  {
    "id": "vector-db-delete-reindex-workflow",
    "title": "Vector DB Delete / Reindex Workflow",
    "vietnameseTitle": "Xóa và reindex dữ liệu vector database",
    "shortDescription": "Quy trình xóa document khỏi vector index, reindex khi tài liệu đổi và chống stale chunks.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Qdrant",
      "pgvector",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User xóa/cập nhật tài liệu.",
      "Cần tuân thủ data deletion/retention.",
      "Embedding model hoặc chunking strategy thay đổi."
    ],
    "whyNotUse": [
      "Index dùng một lần local.",
      "Không cho user xóa/cập nhật tài liệu."
    ],
    "relatedPatterns": [
      "rag-ingestion-pipeline",
      "data-retention-policy"
    ],
    "searchKeywords": [
      "vector delete",
      "reindex",
      "stale chunks",
      "embedding migration",
      "app/tasks/reindex_document.py",
      "Reindex bằng cách xóa chunks cũ rồi upsert version mới.",
      "minimal",
      "tests/test_reindex.py",
      "Reindex xóa chunks cũ theo document và tenant.",
      "test"
    ]
  },
  {
    "id": "llm-provider-abstraction-advanced",
    "title": "Advanced LLM Provider Abstraction",
    "vietnameseTitle": "Trừu tượng hóa nhiều LLM provider",
    "shortDescription": "Thiết kế provider interface hỗ trợ timeout, retry, fallback, structured output và usage tracking.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Pydantic",
      "HTTPX"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần đổi giữa nhiều LLM provider.",
      "Muốn fallback khi provider lỗi hoặc quá đắt.",
      "Cần tracking token/cost theo tenant."
    ],
    "whyNotUse": [
      "App static không gọi LLM runtime.",
      "Chỉ dùng một provider trong script local."
    ],
    "relatedPatterns": [
      "llm-provider-fallback",
      "llm-cost-token-budget-guard"
    ],
    "searchKeywords": [
      "llm provider",
      "provider abstraction",
      "llm fallback",
      "usage tracking",
      "app/providers/llm/base.py",
      "Interface provider chuẩn hóa request/response.",
      "minimal",
      "app/providers/llm/router.py",
      "Router fallback và usage tracking.",
      "production"
    ]
  },
  {
    "id": "llm-streaming-sse-websocket",
    "title": "LLM Streaming with SSE / WebSocket",
    "vietnameseTitle": "Streaming LLM bằng SSE/WebSocket",
    "shortDescription": "Thiết kế endpoint streaming token cho chat/RAG, kèm cancellation, error event và audit usage.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SSE",
      "WebSocket"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Chat/RAG cần phản hồi token dần.",
      "Muốn UX tốt hơn thay vì chờ toàn bộ answer.",
      "Cần stream progress hoặc partial result."
    ],
    "whyNotUse": [
      "Response ngắn và latency thấp.",
      "Hạ tầng/proxy không hỗ trợ streaming ổn định."
    ],
    "relatedPatterns": [
      "llm-provider-abstraction-advanced",
      "ai-observability"
    ],
    "searchKeywords": [
      "llm streaming",
      "sse",
      "websocket streaming",
      "token stream",
      "app/routers/chat_stream_router.py",
      "SSE endpoint stream token.",
      "minimal",
      "tests/test_streaming_contract.py",
      "Stream phải có done event.",
      "test"
    ]
  },
  {
    "id": "agent-tool-registry",
    "title": "Agent Tool Registry",
    "vietnameseTitle": "Registry quản lý tools cho AI agent",
    "shortDescription": "Định nghĩa registry tool có schema input/output, permission, audit và version để agent gọi an toàn.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Pydantic",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "AI agent cần gọi nhiều action backend.",
      "Cần kiểm soát tool nào destructive.",
      "Cần audit và permission cho tool calls."
    ],
    "whyNotUse": [
      "Chatbot chỉ trả lời text, không action.",
      "Không có backend bảo vệ tool execution."
    ],
    "relatedPatterns": [
      "human-approval-agent-actions",
      "tool-schema-pydantic"
    ],
    "searchKeywords": [
      "tool registry",
      "agent tools",
      "tool calling",
      "mcp",
      "app/agent/tools/registry.py",
      "Tool registry với metadata permission.",
      "minimal",
      "tests/test_tool_registry.py",
      "Tool destructive phải có permission rõ.",
      "test"
    ]
  },
  {
    "id": "prompt-injection-defense-rag",
    "title": "Prompt Injection Defense for RAG",
    "vietnameseTitle": "Phòng chống prompt injection trong RAG",
    "shortDescription": "Giảm rủi ro tài liệu độc hại hướng dẫn LLM bỏ qua policy, lộ secret hoặc gọi tool sai.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Policy",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "RAG đọc tài liệu user upload hoặc web content.",
      "Agent có tool/action.",
      "Cần tách instructions hệ thống và nội dung tài liệu."
    ],
    "whyNotUse": [
      "RAG chỉ đọc tài liệu nội bộ đã kiểm duyệt và không có tools.",
      "Chat không thực hiện hành động."
    ],
    "relatedPatterns": [
      "agent-tool-registry",
      "human-approval-agent-actions"
    ],
    "searchKeywords": [
      "prompt injection",
      "rag security",
      "untrusted context",
      "agent safety",
      "docs/security/prompt-injection.md",
      "Policy chống prompt injection thực dụng.",
      "minimal",
      "app/rag/prompt_policy.py",
      "Wrap retrieved context với cảnh báo untrusted.",
      "production"
    ]
  },
  {
    "id": "llm-cost-token-budget-guard",
    "title": "LLM Cost and Token Budget Guard",
    "vietnameseTitle": "Giới hạn token và chi phí LLM",
    "shortDescription": "Kiểm soát token/cost theo request, user, tenant và plan để tránh hóa đơn tăng bất ngờ.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App gọi LLM thường xuyên.",
      "Có nhiều tenant hoặc plan khác nhau.",
      "Cần giới hạn monthly usage và per-request budget."
    ],
    "whyNotUse": [
      "Không gọi LLM runtime.",
      "Chỉ chạy local không tốn tiền provider."
    ],
    "relatedPatterns": [
      "plan-limit-enforcement",
      "llm-provider-abstraction-advanced"
    ],
    "searchKeywords": [
      "llm cost",
      "token budget",
      "usage tracking",
      "cost control",
      "app/llm/budget.py",
      "Guard budget trước khi gọi LLM.",
      "minimal",
      "tests/test_llm_budget.py",
      "Vượt budget thì chặn trước khi gọi provider.",
      "test"
    ]
  },
  {
    "id": "ai-observability",
    "title": "AI Observability",
    "vietnameseTitle": "Observability cho AI/RAG backend",
    "shortDescription": "Log/trace các bước retrieval, rerank, prompt, token usage, latency và errors mà không lộ dữ liệu nhạy cảm.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenTelemetry",
      "Sentry",
      "structlog"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần debug RAG trả sai.",
      "Cần đo latency/cost của từng bước.",
      "Cần điều tra lỗi provider hoặc retrieval."
    ],
    "whyNotUse": [
      "Prototype local không có production traffic.",
      "Không có dữ liệu/LLM runtime."
    ],
    "relatedPatterns": [
      "pii-redaction-logging",
      "rag-evaluation-suite"
    ],
    "searchKeywords": [
      "ai observability",
      "rag tracing",
      "llm logs",
      "token usage",
      "app/observability/ai_trace.py",
      "Log AI event đã redaction.",
      "minimal",
      "tests/test_ai_observability.py",
      "Không log prompt/raw context nhạy cảm vào span.",
      "test"
    ]
  },
  {
    "id": "human-approval-agent-actions",
    "title": "Human Approval for Agent Actions",
    "vietnameseTitle": "Duyệt thủ công cho hành động AI agent",
    "shortDescription": "Bắt buộc human approval trước khi agent thực hiện hành động phá hủy hoặc nhạy cảm như xóa dữ liệu, gửi email, đổi quyền.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Agent có thể gọi tool thay đổi dữ liệu.",
      "Hành động có rủi ro bảo mật/chi phí/pháp lý.",
      "Cần audit ai đã approve."
    ],
    "whyNotUse": [
      "Agent chỉ trả lời text.",
      "Tool chỉ read-only và không truy cập dữ liệu nhạy cảm."
    ],
    "relatedPatterns": [
      "agent-tool-registry",
      "admin-action-approval",
      "prompt-injection-defense-rag"
    ],
    "searchKeywords": [
      "human approval",
      "agent safety",
      "destructive action",
      "approval gate",
      "app/agent/approval.py",
      "Gate action destructive qua approval request.",
      "minimal",
      "tests/test_agent_approval.py",
      "Delete document yêu cầu approval.",
      "test"
    ]
  },
  {
    "id": "pydantic-schema-validation",
    "title": "Pydantic Request and Response Schema",
    "vietnameseTitle": "Validate request/response bằng Pydantic",
    "shortDescription": "Chuẩn hóa input/output API, tránh trả thừa field nhạy cảm và giảm lỗi dữ liệu.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần validate request body.",
      "Cần response_model không trả password_hash.",
      "Cần document OpenAPI rõ cho frontend."
    ],
    "whyNotUse": [
      "Script nội bộ không nhận input bên ngoài.",
      "Luồng dữ liệu đã được validate bởi framework khác."
    ],
    "relatedPatterns": [
      "fastapi-crud-api",
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "app/schemas/user_schema.py",
      "Schema tách create/read/update.",
      "minimal"
    ]
  },
  {
    "id": "pagination-filtering-sorting",
    "title": "Pagination Filtering Sorting API",
    "vietnameseTitle": "Phân trang, lọc, sắp xếp API",
    "shortDescription": "Template query list API với limit/offset, filter whitelist và sort whitelist.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API trả danh sách nhiều bản ghi.",
      "Frontend cần search/filter/sort.",
      "Cần tránh sort field không cho phép."
    ],
    "whyNotUse": [
      "Endpoint trả vài item cố định.",
      "Dữ liệu realtime cần cursor riêng."
    ],
    "relatedPatterns": [
      "fastapi-crud-api"
    ],
    "searchKeywords": [
      "app/routers/items_router.py",
      "Pagination query params.",
      "minimal"
    ]
  },
  {
    "id": "global-error-handling",
    "title": "Global Error Handling",
    "vietnameseTitle": "Xử lý lỗi API toàn cục",
    "shortDescription": "Chuẩn hóa error response, custom exception và validation error để frontend dễ xử lý.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn error format thống nhất.",
      "Không muốn lộ stack trace.",
      "Frontend cần code/message/details rõ."
    ],
    "whyNotUse": [
      "Script nội bộ không có API.",
      "Framework đã có handler riêng đủ dùng."
    ],
    "relatedPatterns": [
      "request-logging"
    ],
    "searchKeywords": [
      "app/core/errors.py",
      "Custom error handler.",
      "minimal"
    ]
  },
  {
    "id": "settings-management",
    "title": "Settings Management with pydantic-settings",
    "vietnameseTitle": "Quản lý cấu hình .env",
    "shortDescription": "Đọc cấu hình từ environment, tách dev/staging/prod và tránh hard-code secret.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "pydantic-settings"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần DATABASE_URL/JWT_SECRET.",
      "Deploy nhiều môi trường.",
      "Không muốn hard-code config."
    ],
    "whyNotUse": [
      "Script nhỏ không có config.",
      "App frontend static không có secret backend."
    ],
    "relatedPatterns": [
      "jwt-auth-api",
      "sqlalchemy-session-pattern"
    ],
    "searchKeywords": [
      "app/core/config.py",
      "Settings typed.",
      "minimal"
    ]
  },
  {
    "id": "api-versioning-router",
    "title": "API Versioning Router",
    "vietnameseTitle": "Version API v1/v2 bằng router prefix",
    "shortDescription": "Tổ chức API theo version để frontend/mobile không vỡ khi backend thay đổi contract.",
    "category": "api-basics",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có nhiều client dùng API cùng lúc.",
      "Cần thay đổi response/request mà không phá app cũ.",
      "Cần deprecate endpoint có kế hoạch."
    ],
    "whyNotUse": [
      "Prototype nội bộ chỉ có một client.",
      "API chưa public và chưa có contract ổn định."
    ],
    "relatedPatterns": [
      "fastapi-project-structure"
    ],
    "searchKeywords": [
      "versioning",
      "api contract",
      "deprecate",
      "app/main.py",
      "Mount router theo version rõ ràng.",
      "minimal",
      "tests/test_api_versioning.py",
      "Test v1/v2 cùng tồn tại.",
      "test"
    ]
  },
  {
    "id": "flask-blueprint-api",
    "title": "Flask Blueprint API",
    "vietnameseTitle": "API Flask bằng Blueprint",
    "shortDescription": "Cấu trúc Flask nhỏ gọn với Blueprint, config và error handler cho API đơn giản.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Flask"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App API nhỏ, cần kiểm soát tối giản.",
      "Không cần FastAPI/OpenAPI mạnh.",
      "Team quen Flask."
    ],
    "whyNotUse": [
      "Cần type validation/OpenAPI tự động.",
      "Dự án lớn cần nhiều convention."
    ],
    "relatedPatterns": [
      "fastapi-crud-api"
    ],
    "searchKeywords": [
      "flask",
      "blueprint",
      "minimal api",
      "app/users/routes.py",
      "Blueprint endpoint.",
      "minimal",
      "tests/test_flask_users.py",
      "Test validation.",
      "test"
    ]
  },
  {
    "id": "websocket-connection-manager",
    "title": "WebSocket Connection Manager",
    "vietnameseTitle": "Quản lý kết nối WebSocket",
    "shortDescription": "Connection manager cho realtime notification/status, broadcast và disconnect an toàn.",
    "category": "api-basics",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "WebSocket"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần realtime status/progress.",
      "Chat hoặc notification live.",
      "Polling không đủ tốt."
    ],
    "whyNotUse": [
      "Chỉ cần stream một chiều thì dùng SSE.",
      "Không cần realtime."
    ],
    "relatedPatterns": [
      "job-status-api",
      "llm-streaming-sse"
    ],
    "searchKeywords": [
      "websocket",
      "realtime",
      "notification",
      "app/realtime/connection_manager.py",
      "Connection manager.",
      "minimal",
      "tests/test_connection_manager.py",
      "Disconnect xóa connection.",
      "test"
    ]
  },
  {
    "id": "sse-job-progress",
    "title": "Server-Sent Events Job Progress",
    "vietnameseTitle": "SSE stream tiến độ job",
    "shortDescription": "Stream tiến độ OCR/export/import bằng SSE khi không cần WebSocket hai chiều.",
    "category": "api-basics",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "StreamingResponse"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Frontend cần xem job progress realtime.",
      "Chỉ cần server gửi client một chiều.",
      "Muốn đơn giản hơn WebSocket."
    ],
    "whyNotUse": [
      "Cần client gửi message realtime ngược lại.",
      "Proxy không hỗ trợ SSE."
    ],
    "relatedPatterns": [
      "job-status-api",
      "llm-streaming-sse"
    ],
    "searchKeywords": [
      "sse",
      "progress",
      "eventsource",
      "app/routers/events_router.py",
      "SSE progress stream.",
      "minimal",
      "tests/test_sse_job.py",
      "Endpoint SSE trả đúng content-type.",
      "test"
    ]
  },
  {
    "id": "openapi-customization",
    "title": "OpenAPI Documentation Customization",
    "vietnameseTitle": "Tùy chỉnh OpenAPI docs",
    "shortDescription": "Thêm tags, security scheme, response examples để frontend và QA dùng API dễ hơn.",
    "category": "api-basics",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần chia API docs theo module.",
      "Frontend cần example request/response.",
      "Cần mô tả auth trong Swagger."
    ],
    "whyNotUse": [
      "API private không cần docs.",
      "Dự án dùng framework khác."
    ],
    "relatedPatterns": [
      "fastapi-project-structure"
    ],
    "searchKeywords": [
      "openapi",
      "swagger",
      "docs",
      "app/main.py",
      "OpenAPI metadata và tags.",
      "minimal"
    ]
  },
  {
    "id": "layered-architecture-fastapi",
    "title": "Layered Architecture for FastAPI",
    "vietnameseTitle": "Kiến trúc nhiều lớp cho FastAPI",
    "shortDescription": "Tách router, schema, service, repository, model để code backend dễ đọc, dễ test và dễ mở rộng.",
    "category": "architecture",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App đã vượt khỏi CRUD một file.",
      "Cần tách business logic khỏi router.",
      "Team cần cấu trúc folder dễ hiểu."
    ],
    "whyNotUse": [
      "Prototype rất nhỏ chỉ vài endpoint.",
      "Team chưa cần tách layer vì domain quá đơn giản."
    ],
    "relatedPatterns": [
      "fastapi-crud-api",
      "service-repository-pattern"
    ],
    "searchKeywords": [
      "layered architecture",
      "service repository",
      "clean folder",
      "app/services/user_service.py",
      "Service layer nhận repository và chứa business rule.",
      "minimal",
      "tests/test_user_service.py",
      "Test service bằng fake repository để không phụ thuộc database.",
      "test"
    ]
  },
  {
    "id": "service-repository-pattern",
    "title": "Service / Repository Pattern",
    "vietnameseTitle": "Pattern Service và Repository",
    "shortDescription": "Tách logic nghiệp vụ và truy vấn database để router mỏng, code dễ test và giảm lặp query.",
    "category": "architecture",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Router đang chứa quá nhiều logic.",
      "Cần unit test business rule mà không cần HTTP.",
      "Cần thay đổi database query mà không ảnh hưởng API."
    ],
    "whyNotUse": [
      "Endpoint demo quá nhỏ.",
      "Thêm layer nhưng không có logic thật sẽ làm code rối."
    ],
    "relatedPatterns": [
      "layered-architecture-fastapi",
      "transaction-unit-of-work"
    ],
    "searchKeywords": [
      "service layer",
      "repository",
      "thin router",
      "app/repositories/order_repository.py",
      "Repository chỉ chịu trách nhiệm database query.",
      "minimal",
      "app/services/order_service.py",
      "Service giữ business rule và transaction boundary.",
      "production"
    ]
  },
  {
    "id": "clean-architecture-light",
    "title": "Clean Architecture Light",
    "vietnameseTitle": "Clean Architecture phiên bản nhẹ",
    "shortDescription": "Tách domain, application use case, infrastructure và interface mà không làm project quá nặng.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Domain có nhiều rule.",
      "Cần thay provider database/OCR/payment dễ dàng.",
      "Muốn use case test độc lập framework."
    ],
    "whyNotUse": [
      "MVP nhỏ chưa có domain phức tạp.",
      "Team mới học backend chưa quen architecture nhiều lớp."
    ],
    "relatedPatterns": [
      "provider-adapter-pattern",
      "domain-model-vs-orm-model"
    ],
    "searchKeywords": [
      "clean architecture",
      "use case",
      "domain application infrastructure",
      "app/application/create_invoice.py",
      "Use case không phụ thuộc FastAPI router.",
      "minimal",
      "tests/test_create_invoice_usecase.py",
      "Test use case bằng fake repository/provider.",
      "test"
    ]
  },
  {
    "id": "hexagonal-architecture-adapters",
    "title": "Hexagonal Architecture Adapters",
    "vietnameseTitle": "Hexagonal Architecture với ports/adapters",
    "shortDescription": "Định nghĩa port trong application layer và adapter cho database, OCR, payment, storage hoặc LLM provider.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Python Protocol",
      "FastAPI",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần đổi provider mà không sửa use case.",
      "Cần test bằng fake adapter.",
      "Có nhiều external service như OCR/payment/storage."
    ],
    "whyNotUse": [
      "App nhỏ chỉ dùng một provider cố định.",
      "Team chưa cần abstraction."
    ],
    "relatedPatterns": [
      "provider-adapter-pattern",
      "s3-presigned-upload"
    ],
    "searchKeywords": [
      "hexagonal",
      "port adapter",
      "ports and adapters",
      "app/application/ports.py",
      "Port định nghĩa contract cho storage provider.",
      "minimal",
      "app/infrastructure/adapters/s3_storage.py",
      "Adapter triển khai port bằng S3-compatible storage.",
      "production"
    ]
  },
  {
    "id": "domain-driven-design-basics",
    "title": "Domain-Driven Design Basics",
    "vietnameseTitle": "DDD cơ bản cho backend Python",
    "shortDescription": "Tổ chức code quanh domain, aggregate, entity, value object và domain service thay vì chỉ quanh database table.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Python dataclasses",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Business rule phức tạp.",
      "Domain cần ngôn ngữ chung với team.",
      "Nhiều use case thao tác cùng aggregate."
    ],
    "whyNotUse": [
      "CRUD đơn giản không có rule.",
      "Team chưa hiểu domain model."
    ],
    "relatedPatterns": [
      "domain-model-vs-orm-model",
      "clean-architecture-light"
    ],
    "searchKeywords": [
      "ddd",
      "domain model",
      "aggregate",
      "value object",
      "app/domain/orders/entities.py",
      "Aggregate root giữ invariant của Order.",
      "minimal",
      "app/domain/orders/value_objects.py",
      "Value object cho Money để tránh truyền số tiền tùy tiện.",
      "production"
    ]
  },
  {
    "id": "domain-model-vs-orm-model",
    "title": "Domain Model vs ORM Model",
    "vietnameseTitle": "Domain model khác ORM model thế nào",
    "shortDescription": "Khi domain phức tạp, không nên để SQLAlchemy model chứa toàn bộ business rule hoặc dùng thẳng làm domain entity.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "SQLAlchemy",
      "dataclasses"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Business rule cần test độc lập database.",
      "ORM model đang phình to.",
      "Cần mapping rõ giữa persistence và domain."
    ],
    "whyNotUse": [
      "CRUD nhỏ, không có domain rule.",
      "Tách quá sớm làm code verbose."
    ],
    "relatedPatterns": [
      "domain-driven-design-basics",
      "sqlalchemy-session-pattern"
    ],
    "searchKeywords": [
      "domain vs orm",
      "mapper",
      "persistence model",
      "app/mappers/user_mapper.py",
      "Mapper chuyển ORM model sang domain entity.",
      "minimal"
    ]
  },
  {
    "id": "provider-adapter-pattern",
    "title": "Provider / Adapter Pattern",
    "vietnameseTitle": "Pattern Provider/Adapter cho OCR, payment, storage, LLM",
    "shortDescription": "Dùng interface chung để thay Tesseract/PaddleOCR, Stripe/Momo, S3/local storage hoặc OpenAI/Gemini mà không sửa use case.",
    "category": "architecture",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Python Protocol",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có nhiều provider cùng chức năng.",
      "Cần fallback provider.",
      "Cần test bằng fake provider."
    ],
    "whyNotUse": [
      "Chỉ dùng một provider cố định mãi mãi.",
      "Abstraction làm code khó hiểu hơn giá trị nhận được."
    ],
    "relatedPatterns": [
      "image-ocr-api",
      "llm-provider-fallback"
    ],
    "searchKeywords": [
      "provider",
      "adapter",
      "strategy",
      "ocr provider",
      "app/providers/ocr/base.py",
      "Base provider contract cho OCR.",
      "minimal",
      "app/services/ocr_service.py",
      "Service nhận provider qua dependency injection.",
      "production"
    ]
  },
  {
    "id": "modular-monolith-structure",
    "title": "Modular Monolith Structure",
    "vietnameseTitle": "Cấu trúc modular monolith",
    "shortDescription": "Giữ một deployable app nhưng tách module theo domain như users, orders, billing để tránh microservice quá sớm.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Team muốn boundary rõ nhưng chưa cần microservice.",
      "Deploy đơn giản hơn distributed system.",
      "Domain lớn dần theo module."
    ],
    "whyNotUse": [
      "App rất nhỏ.",
      "Cần scale độc lập từng service ngay từ đầu."
    ],
    "relatedPatterns": [
      "microservice-boundary-decision",
      "clean-architecture-light"
    ],
    "searchKeywords": [
      "modular monolith",
      "module boundary",
      "monolith",
      "app/modules/orders/router.py",
      "Mỗi module tự có router/service/schema.",
      "minimal",
      "app/main.py",
      "App root chỉ compose các module routers.",
      "production"
    ]
  },
  {
    "id": "microservice-boundary-decision",
    "title": "Microservice Boundary Decision",
    "vietnameseTitle": "Khi nào mới tách microservice",
    "shortDescription": "Decision guide giúp tránh tách microservice quá sớm và xác định boundary theo domain, data ownership, scale và team ownership.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "Message Queue",
      "OpenTelemetry"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Module cần scale/deploy độc lập.",
      "Team ownership tách rõ.",
      "Data ownership và SLA khác nhau."
    ],
    "whyNotUse": [
      "Chưa có monitoring/retry/tracing.",
      "Team nhỏ và domain chưa ổn định.",
      "Chỉ muốn code trông hiện đại."
    ],
    "relatedPatterns": [
      "modular-monolith-structure",
      "outbox-pattern"
    ],
    "searchKeywords": [
      "microservice",
      "boundary",
      "modular monolith",
      "docs/microservice-boundary-checklist.md",
      "Checklist trước khi tách service.",
      "minimal"
    ]
  },
  {
    "id": "cqrs-basic-pattern",
    "title": "CQRS Basic Pattern",
    "vietnameseTitle": "CQRS cơ bản: tách command và query",
    "shortDescription": "Tách luồng ghi dữ liệu và đọc dữ liệu khi read model khác write model hoặc query quá phức tạp.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Query đọc phức tạp hơn command ghi.",
      "Cần read model tối ưu cho dashboard/report.",
      "Muốn tách command handler và query handler."
    ],
    "whyNotUse": [
      "CRUD đơn giản.",
      "Không có nhu cầu read/write model khác nhau."
    ],
    "relatedPatterns": [
      "read-model-projection",
      "modular-monolith-structure"
    ],
    "searchKeywords": [
      "cqrs",
      "command query",
      "read model",
      "app/application/commands/create_order.py",
      "Command handler xử lý ghi.",
      "minimal",
      "app/application/queries/get_order_summary.py",
      "Query handler đọc projection/dashboard data.",
      "production"
    ]
  },
  {
    "id": "read-model-projection",
    "title": "Read Model Projection",
    "vietnameseTitle": "Projection cho read model",
    "shortDescription": "Tạo bảng/view dữ liệu đọc nhanh cho dashboard, search, report thay vì query phức tạp trực tiếp từ transactional tables.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "SQLAlchemy",
      "Celery",
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dashboard query chậm.",
      "Read data cần format khác write data.",
      "Cần rebuild projection khi logic thay đổi."
    ],
    "whyNotUse": [
      "Data ít và query đơn giản.",
      "Chưa có event/job pipeline."
    ],
    "relatedPatterns": [
      "cqrs-basic-pattern",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "projection",
      "read model",
      "dashboard",
      "app/projections/order_summary.py",
      "Rebuild projection từ bảng orders.",
      "minimal"
    ]
  },
  {
    "id": "outbox-pattern",
    "title": "Transactional Outbox Pattern",
    "vietnameseTitle": "Outbox pattern chống mất event",
    "shortDescription": "Ghi business data và event vào cùng transaction, worker đọc outbox để publish event an toàn.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "SQLAlchemy",
      "Celery",
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần không mất event sau khi commit DB.",
      "Webhook/payment/order cần publish event chắc chắn.",
      "Muốn retry publish độc lập."
    ],
    "whyNotUse": [
      "App không có event async.",
      "Không có worker xử lý outbox."
    ],
    "relatedPatterns": [
      "idempotent-consumer-pattern",
      "retry-backoff-policy"
    ],
    "searchKeywords": [
      "outbox",
      "transactional outbox",
      "event publish",
      "app/models/outbox_event.py",
      "Outbox table lưu event trong cùng transaction.",
      "minimal",
      "app/tasks/publish_outbox.py",
      "Worker publish event pending và mark sent.",
      "production",
      "tests/test_outbox.py",
      "Đảm bảo tạo order cũng tạo outbox event trong cùng transaction.",
      "test"
    ]
  },
  {
    "id": "inbox-pattern",
    "title": "Inbox Pattern for Message Deduplication",
    "vietnameseTitle": "Inbox pattern chống xử lý message trùng",
    "shortDescription": "Lưu message id đã xử lý để consumer/webhook không chạy lại business logic khi nhận event trùng.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "SQLAlchemy",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Message broker hoặc webhook có thể gửi lại event.",
      "Payment/order update phải idempotent.",
      "Consumer cần retry an toàn."
    ],
    "whyNotUse": [
      "Event không quan trọng hoặc xử lý trùng không sao.",
      "Không có event/message pipeline."
    ],
    "relatedPatterns": [
      "outbox-pattern",
      "webhook-signature-verification"
    ],
    "searchKeywords": [
      "inbox",
      "deduplication",
      "duplicate message",
      "app/services/message_consumer.py",
      "Check message id trước khi xử lý.",
      "minimal"
    ]
  },
  {
    "id": "api-gateway-bff-pattern",
    "title": "API Gateway / BFF Pattern",
    "vietnameseTitle": "API Gateway / Backend-for-Frontend",
    "shortDescription": "Dùng gateway/BFF để gom API theo nhu cầu frontend, che giấu service nội bộ và chuẩn hóa auth/rate limit.",
    "category": "architecture",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "httpx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Frontend cần response riêng theo màn hình.",
      "Có nhiều service nội bộ.",
      "Cần auth/rate limit/logging ở một lớp."
    ],
    "whyNotUse": [
      "Monolith đơn giản là đủ.",
      "Gateway chỉ proxy mù không thêm giá trị."
    ],
    "relatedPatterns": [
      "microservice-boundary-decision",
      "timeout-strategy"
    ],
    "searchKeywords": [
      "bff",
      "api gateway",
      "backend for frontend",
      "app/bff/dashboard_router.py",
      "BFF endpoint gom nhiều nguồn dữ liệu cho dashboard.",
      "minimal"
    ]
  },
  {
    "id": "feature-module-boundary",
    "title": "Feature Module Boundary",
    "vietnameseTitle": "Ranh giới module theo feature/domain",
    "shortDescription": "Cách quyết định file nào thuộc module nào để tránh shared folder trở thành nơi chứa mọi thứ.",
    "category": "architecture",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Project nhiều module domain.",
      "Shared folder đang phình to.",
      "Team cần ownership rõ."
    ],
    "whyNotUse": [
      "App vài file nhỏ.",
      "Domain chưa rõ."
    ],
    "relatedPatterns": [
      "modular-monolith-structure"
    ],
    "searchKeywords": [
      "module boundary",
      "feature module",
      "shared folder",
      "docs/module-boundary.md",
      "Checklist quyết định module boundary.",
      "minimal"
    ]
  },
  {
    "id": "jwt-auth-api",
    "title": "JWT Authentication with Refresh Token",
    "vietnameseTitle": "Đăng nhập JWT + refresh token",
    "shortDescription": "Register/login, hash password, access token, refresh token và dependency bảo vệ API.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "PyJWT",
      "bcrypt",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "SPA/mobile app cần token auth.",
      "Cần protected API.",
      "Cần refresh token để không bắt user login liên tục."
    ],
    "whyNotUse": [
      "Web truyền thống dùng server session/cookie.",
      "Không có user account."
    ],
    "relatedPatterns": [
      "rbac-permission",
      "rate-limit-login"
    ],
    "searchKeywords": [
      "app/core/security.py",
      "Hash password và tạo JWT.",
      "minimal",
      "app/dependencies/auth.py",
      "Dependency bảo vệ route bằng Bearer token, không log token và trả lỗi 401 chuẩn.",
      "production",
      "tests/test_auth.py",
      "Test route protected không token phải trả 401.",
      "test"
    ]
  },
  {
    "id": "rbac-permission",
    "title": "Role-Based Access Control Dependency",
    "vietnameseTitle": "Phân quyền role admin/user",
    "shortDescription": "Dependency kiểm tra role/permission trước khi cho gọi endpoint nhạy cảm.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Enum",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần admin/user/staff role.",
      "Endpoint cần chặn theo quyền.",
      "Cần rule tái sử dụng ở nhiều route."
    ],
    "whyNotUse": [
      "App public không phân quyền.",
      "Permission cực phức tạp nên dùng policy engine như Casbin."
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "app/core/permissions.py",
      "Dependency require_role.",
      "minimal"
    ]
  },
  {
    "id": "cors-production-config",
    "title": "CORS Production Config",
    "vietnameseTitle": "Cấu hình CORS production",
    "shortDescription": "Cấu hình CORS an toàn thay vì allow_origins=* trong production.",
    "category": "auth-security",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "CORS"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Frontend khác domain gọi API.",
      "Deploy production cần whitelist origin.",
      "Cần tránh browser chặn request hợp lệ."
    ],
    "whyNotUse": [
      "App không có browser client.",
      "Chỉ chạy cùng domain và không cần CORS."
    ],
    "relatedPatterns": [
      "settings-management"
    ],
    "searchKeywords": [
      "cors",
      "origin",
      "browser security",
      "app/main.py",
      "CORS middleware với whitelist origin.",
      "minimal",
      "tests/test_cors.py",
      "Kiểm tra origin không whitelist không được cấp header.",
      "test"
    ]
  },
  {
    "id": "security-headers-middleware",
    "title": "Security Headers Middleware",
    "vietnameseTitle": "Middleware security headers",
    "shortDescription": "Thêm headers bảo mật cơ bản cho API/web app khi trả response qua reverse proxy hoặc trực tiếp.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần harden HTTP response.",
      "App có browser client.",
      "Muốn giảm rủi ro clickjacking/mime sniffing."
    ],
    "whyNotUse": [
      "API sau gateway đã set headers đầy đủ.",
      "Prototype local."
    ],
    "relatedPatterns": [
      "cors-production-config"
    ],
    "searchKeywords": [
      "headers",
      "hardening",
      "clickjacking",
      "app/middleware/security_headers.py",
      "Middleware thêm header bảo mật.",
      "minimal",
      "tests/test_security_headers.py",
      "Test headers có mặt.",
      "test"
    ]
  },
  {
    "id": "api-key-auth",
    "title": "API Key Authentication",
    "vietnameseTitle": "Xác thực bằng API key",
    "shortDescription": "Bảo vệ endpoint machine-to-machine bằng API key có hash, prefix và scope.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Service bên thứ ba gọi API.",
      "Cần machine-to-machine auth đơn giản.",
      "Không muốn dùng OAuth cho integration nhỏ."
    ],
    "whyNotUse": [
      "User login thông thường nên dùng session/JWT/OIDC.",
      "API public không cần auth."
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "api key",
      "integration",
      "machine to machine",
      "app/dependencies/api_key.py",
      "Dependency đọc X-API-Key và kiểm tra hash.",
      "minimal",
      "tests/test_api_key_auth.py",
      "Test missing key trả 401.",
      "test"
    ]
  },
  {
    "id": "password-reset-flow",
    "title": "Password Reset Flow",
    "vietnameseTitle": "Luồng quên mật khẩu",
    "shortDescription": "Tạo reset token ngắn hạn, gửi email, reset password an toàn và không leak user tồn tại hay không.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Email"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App có user account.",
      "Cần quên mật khẩu an toàn.",
      "Cần token expire và one-time use."
    ],
    "whyNotUse": [
      "App dùng SSO/OIDC không quản lý password.",
      "Không có email service."
    ],
    "relatedPatterns": [
      "email-sending",
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "forgot password",
      "reset password",
      "token one time",
      "app/services/password_reset_service.py",
      "Service tạo token reset một lần.",
      "minimal",
      "tests/test_password_reset.py",
      "Token đã dùng không được dùng lại.",
      "test"
    ]
  },
  {
    "id": "refresh-token-rotation",
    "title": "Refresh Token Rotation",
    "vietnameseTitle": "Refresh token rotation",
    "shortDescription": "Refresh token có rotation, revoke và reuse detection để giảm rủi ro token bị đánh cắp.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "JWT"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần session lâu dài trên mobile/web.",
      "Cần logout/revoke token.",
      "Cần phát hiện refresh token bị reuse."
    ],
    "whyNotUse": [
      "App chỉ dùng short-lived access token.",
      "Không quản lý user session."
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "refresh token",
      "rotation",
      "revoke",
      "app/services/token_service.py",
      "Rotation refresh token.",
      "minimal",
      "tests/test_refresh_rotation.py",
      "Reuse token cũ phải bị chặn.",
      "test"
    ]
  },
  {
    "id": "tenant-aware-query",
    "title": "Tenant-Aware Query Filter",
    "vietnameseTitle": "Query theo tenant/workspace",
    "shortDescription": "Bắt buộc filter tenant_id/workspace_id ở repository để tránh leak dữ liệu giữa tổ chức.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App SaaS nhiều workspace.",
      "Dữ liệu mỗi organization phải tách biệt.",
      "Cần permission filter nhất quán."
    ],
    "whyNotUse": [
      "Single-tenant app.",
      "Không có organization/workspace."
    ],
    "relatedPatterns": [
      "rbac-permission",
      "rag-query-backend"
    ],
    "searchKeywords": [
      "multi tenant",
      "tenant isolation",
      "workspace",
      "app/repositories/base_repository.py",
      "Base query bắt buộc tenant_id.",
      "minimal",
      "tests/test_tenant_scope.py",
      "Query luôn có tenant filter.",
      "test"
    ]
  },
  {
    "id": "audit-log-pattern",
    "title": "Audit Log Pattern",
    "vietnameseTitle": "Audit log hành động quan trọng",
    "shortDescription": "Ghi lại ai làm gì, lúc nào, trên resource nào cho admin/security/debug.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Admin action cần truy vết.",
      "Payment/security/user data thay đổi.",
      "Cần điều tra sự cố."
    ],
    "whyNotUse": [
      "Prototype không có user thật.",
      "Log thường đã đủ và không cần audit."
    ],
    "relatedPatterns": [
      "tenant-aware-query",
      "rbac-permission"
    ],
    "searchKeywords": [
      "audit",
      "admin log",
      "governance",
      "app/services/audit_service.py",
      "Audit service.",
      "minimal",
      "tests/test_audit_log.py",
      "Audit được ghi khi update permission.",
      "test"
    ]
  },
  {
    "id": "resource-ownership-check",
    "title": "Resource Ownership Check",
    "vietnameseTitle": "Kiểm tra quyền sở hữu tài nguyên",
    "shortDescription": "Đảm bảo user chỉ thao tác resource thuộc tenant/workspace của họ trước khi read/update/delete.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint nhận resource_id từ path.",
      "Cần chống user đoán ID resource tenant khác.",
      "Update/delete cần kiểm tra ownership."
    ],
    "whyNotUse": [
      "Resource public thật sự.",
      "Đã dùng RLS và vẫn có service-level check đầy đủ."
    ],
    "relatedPatterns": [
      "tenant-aware-query-filter",
      "advanced-rbac-tenant-roles"
    ],
    "searchKeywords": [
      "ownership check",
      "resource ownership",
      "id guessing",
      "tenant access",
      "app/services/resource_guard.py",
      "Guard lấy resource theo id và tenant cùng lúc.",
      "minimal",
      "tests/test_resource_ownership.py",
      "ID tồn tại ở tenant khác vẫn trả 404/403.",
      "test"
    ]
  },
  {
    "id": "pii-redaction-logging",
    "title": "PII Redaction in Logs",
    "vietnameseTitle": "Ẩn dữ liệu cá nhân trong log",
    "shortDescription": "Redact email, phone, token, password, API key và dữ liệu nhạy cảm trước khi ghi log/audit/LLM trace.",
    "category": "auth-security",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "structlog",
      "logging"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Log có request body hoặc metadata user.",
      "App xử lý dữ liệu cá nhân, tài liệu, OCR hoặc auth.",
      "Cần giảm rủi ro lộ PII trong log vendor."
    ],
    "whyNotUse": [
      "Log chỉ chứa event kỹ thuật không có payload.",
      "App local demo."
    ],
    "relatedPatterns": [
      "structured-json-logging",
      "audit-log-enterprise"
    ],
    "searchKeywords": [
      "pii redaction",
      "log redaction",
      "sensitive data",
      "privacy",
      "app/core/redaction.py",
      "Redaction recursive cho dict/list.",
      "minimal",
      "tests/test_redaction.py",
      "Không để token/email trong output log.",
      "test"
    ]
  },
  {
    "id": "field-level-encryption",
    "title": "Field-level Encryption",
    "vietnameseTitle": "Mã hóa cấp trường cho dữ liệu nhạy cảm",
    "shortDescription": "Mã hóa một số field như tax_id, secret, credential hoặc document metadata trước khi lưu database.",
    "category": "auth-security",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "cryptography"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Database chứa field nhạy cảm.",
      "Cần giảm rủi ro khi DB snapshot bị lộ.",
      "Cần tách key management khỏi data storage."
    ],
    "whyNotUse": [
      "Chỉ cần hash một chiều như password/API key.",
      "Không có key rotation plan."
    ],
    "relatedPatterns": [
      "secret-rotation-runbook",
      "pii-redaction-logging"
    ],
    "searchKeywords": [
      "field encryption",
      "fernet",
      "encrypt sensitive data",
      "app/core/encryption.py",
      "Fernet encryption wrapper tối thiểu.",
      "minimal",
      "tests/test_field_encryption.py",
      "Ciphertext không chứa plaintext và decrypt được.",
      "test"
    ]
  },
  {
    "id": "email-sending",
    "title": "Email Sending Service",
    "vietnameseTitle": "Gửi email xác thực/reset password",
    "shortDescription": "Service gửi email qua SMTP với Jinja2 template và background task.",
    "category": "background-jobs",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "aiosmtplib",
      "Jinja2",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần verify email/reset password.",
      "Cần email template tái sử dụng.",
      "Gửi email không nên block response."
    ],
    "whyNotUse": [
      "Không gửi email.",
      "Cần marketing email lớn nên dùng provider chuyên dụng."
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/services/email_service.py",
      "Email service async.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-backgroundtasks",
    "title": "FastAPI BackgroundTasks for Lightweight Work",
    "vietnameseTitle": "BackgroundTasks cho tác vụ nhẹ",
    "shortDescription": "Chạy tác vụ nhẹ sau response như ghi log, gửi email đơn giản hoặc cleanup file tạm.",
    "category": "background-jobs",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Basic production",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Task nhẹ, không cần retry phức tạp.",
      "Muốn response trả nhanh hơn.",
      "Không muốn dựng Redis/Celery."
    ],
    "whyNotUse": [
      "Task nặng, lâu, cần retry/job status.",
      "Cần worker độc lập."
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/routers/task_router.py",
      "BackgroundTasks example.",
      "minimal"
    ]
  },
  {
    "id": "celery-worker-setup",
    "title": "Celery Worker with Redis Broker",
    "vietnameseTitle": "Celery worker xử lý nền",
    "shortDescription": "Queue production cho OCR, email, import/export, retry và task status.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Celery",
      "Redis",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Task lâu cần chạy ngoài request.",
      "Cần retry/backoff.",
      "Cần worker scale độc lập."
    ],
    "whyNotUse": [
      "Task chỉ mất vài ms.",
      "Không muốn thêm Redis/broker."
    ],
    "relatedPatterns": [
      "pdf-ocr-api",
      "email-sending"
    ],
    "searchKeywords": [
      "app/worker.py",
      "Celery app config.",
      "minimal",
      "app/tasks/ocr_tasks.py",
      "Task OCR có retry/backoff và không xử lý file lớn trực tiếp trong request.",
      "production",
      "tests/test_job_status.py",
      "Test tạo job trả job_id thay vì chờ xử lý xong.",
      "test"
    ]
  },
  {
    "id": "export-excel-pdf",
    "title": "Export Excel / PDF Report",
    "vietnameseTitle": "Xuất Excel/PDF report",
    "shortDescription": "Sinh file báo cáo Excel hoặc PDF, trả download response hoặc chạy background job.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "openpyxl",
      "pandas",
      "Jinja2",
      "WeasyPrint"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần xuất báo cáo cho admin.",
      "Cần template file rõ.",
      "Report lớn nên chạy nền."
    ],
    "whyNotUse": [
      "Chỉ cần JSON API.",
      "PDF phức tạp cần service report riêng."
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/services/export_service.py",
      "Export Excel từ rows.",
      "minimal"
    ]
  },
  {
    "id": "job-status-api",
    "title": "Job Status API",
    "vietnameseTitle": "API trạng thái job",
    "shortDescription": "Tạo job_id, lưu trạng thái queued/running/completed/failed và cho frontend polling.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Celery",
      "Redis",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Task chạy lâu như OCR/import/export.",
      "Frontend cần biết tiến độ.",
      "Cần retry và báo lỗi rõ."
    ],
    "whyNotUse": [
      "Task dưới 1 giây trả ngay được.",
      "Không có worker nền."
    ],
    "relatedPatterns": [
      "celery-worker-setup",
      "pdf-ocr-api"
    ],
    "searchKeywords": [
      "job status",
      "polling",
      "background task",
      "app/routers/jobs_router.py",
      "Endpoint tạo và đọc trạng thái job.",
      "minimal",
      "tests/test_job_status_api.py",
      "Create job trả 202.",
      "test"
    ]
  },
  {
    "id": "scheduled-cleanup-job",
    "title": "Scheduled Cleanup Job",
    "vietnameseTitle": "Job dọn file tạm định kỳ",
    "shortDescription": "Dọn file tạm, export hết hạn, token hết hạn bằng scheduler/cron an toàn.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "APScheduler",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có file tạm, export, token hết hạn.",
      "Cần giảm storage rác.",
      "Cần chạy định kỳ theo lịch."
    ],
    "whyNotUse": [
      "Không lưu dữ liệu tạm.",
      "Đã có managed lifecycle policy."
    ],
    "relatedPatterns": [
      "job-status-api"
    ],
    "searchKeywords": [
      "scheduler",
      "cleanup",
      "cron",
      "app/jobs/cleanup.py",
      "Cleanup files older than TTL.",
      "minimal",
      "tests/test_cleanup_job.py",
      "Không xóa file mới.",
      "test"
    ]
  },
  {
    "id": "email-template-jinja",
    "title": "Email Template with Jinja2",
    "vietnameseTitle": "Template email bằng Jinja2",
    "shortDescription": "Render email verify/reset password bằng template, tách nội dung khỏi service gửi email.",
    "category": "background-jobs",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Jinja2",
      "aiosmtplib"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần email verify/reset password.",
      "Muốn nội dung email dễ sửa.",
      "Cần gửi email nền."
    ],
    "whyNotUse": [
      "Không gửi email.",
      "Dùng provider template hosted hoàn toàn."
    ],
    "relatedPatterns": [
      "password-reset-flow",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "email",
      "jinja2",
      "reset password",
      "app/services/email_template.py",
      "Render email HTML.",
      "minimal",
      "templates/email/reset_password.html",
      "Reset password email.",
      "minimal"
    ]
  },
  {
    "id": "excel-export-background",
    "title": "Excel Export Background Job",
    "vietnameseTitle": "Export Excel chạy nền",
    "shortDescription": "Tạo báo cáo Excel qua worker, lưu file riêng tư và cho frontend tải khi hoàn thành.",
    "category": "background-jobs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "openpyxl",
      "Celery",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Báo cáo lớn dễ timeout.",
      "Cần export Excel/PDF.",
      "Frontend cần polling job status."
    ],
    "whyNotUse": [
      "Report nhỏ trả ngay được.",
      "Không có worker/storage."
    ],
    "relatedPatterns": [
      "job-status-api",
      "scheduled-cleanup-job"
    ],
    "searchKeywords": [
      "excel export",
      "report",
      "openpyxl",
      "app/tasks/export_tasks.py",
      "Generate Excel file.",
      "minimal",
      "tests/test_excel_export.py",
      "File Excel được tạo.",
      "test"
    ]
  },
  {
    "id": "redis-cache-aside",
    "title": "Redis Cache-Aside Pattern",
    "vietnameseTitle": "Cache-aside Redis",
    "shortDescription": "Pattern cache thủ công: đọc Redis trước, miss thì query DB và set TTL.",
    "category": "cache-redis",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint đọc nhiều.",
      "Dữ liệu ít đổi.",
      "Muốn giảm tải database."
    ],
    "whyNotUse": [
      "Dữ liệu thay đổi liên tục khó invalidation.",
      "Response chứa dữ liệu user nhạy cảm chưa có cache key an toàn."
    ],
    "relatedPatterns": [
      "rate-limit-login"
    ],
    "searchKeywords": [
      "app/services/cache_service.py",
      "Cache-aside helper.",
      "minimal",
      "app/services/cache_service.py",
      "Cache service có JSON serialization, TTL và invalidate key rõ ràng.",
      "production",
      "tests/test_cache_service.py",
      "Test cache miss/hit cơ bản bằng fake redis hoặc mock.",
      "test"
    ]
  },
  {
    "id": "rate-limit-login",
    "title": "Redis-backed API Rate Limiter",
    "vietnameseTitle": "Chống spam API/login bằng Redis",
    "shortDescription": "Giới hạn request theo IP/user để chống brute-force và spam endpoint.",
    "category": "cache-redis",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Login endpoint cần chống brute-force.",
      "API public có nguy cơ spam.",
      "Cần limit theo IP hoặc user."
    ],
    "whyNotUse": [
      "API nội bộ không public.",
      "Không có Redis hoặc gateway đã xử lý rate limit."
    ],
    "relatedPatterns": [
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "app/core/rate_limit.py",
      "Fixed-window rate limit.",
      "minimal",
      "app/core/rate_limit.py",
      "Redis fixed-window limiter cho login theo IP/email để giảm brute force.",
      "production",
      "tests/test_rate_limit.py",
      "Test limiter trả 429 sau khi vượt quá số lần cho phép.",
      "test"
    ]
  },
  {
    "id": "cache-stampede-lock",
    "title": "Cache Stampede Prevention",
    "vietnameseTitle": "Chống cache stampede",
    "shortDescription": "Dùng distributed lock/soft TTL để tránh nhiều request cùng rebuild cache khi key hết hạn.",
    "category": "cache-redis",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint đọc nhiều và rebuild cache tốn kém.",
      "Cache key hot hay expire cùng lúc.",
      "Muốn giảm tải DB khi traffic cao."
    ],
    "whyNotUse": [
      "Cache đơn giản ít traffic.",
      "Rebuild cache rất rẻ."
    ],
    "relatedPatterns": [
      "redis-cache-aside"
    ],
    "searchKeywords": [
      "cache stampede",
      "distributed lock",
      "hot key",
      "app/services/cache_stampede.py",
      "Lock khi rebuild cache.",
      "minimal",
      "tests/test_cache_stampede.py",
      "Rebuild chỉ gọi khi cache miss.",
      "test"
    ]
  },
  {
    "id": "distributed-lock-redis",
    "title": "Distributed Lock with Redis",
    "vietnameseTitle": "Distributed lock Redis",
    "shortDescription": "Khóa tác vụ chạy đồng thời như export, sync, webhook retry bằng Redis lock có TTL.",
    "category": "cache-redis",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần đảm bảo một job chỉ chạy một instance.",
      "Có nhiều worker replica.",
      "Task idempotency vẫn cần nhưng muốn giảm duplicate."
    ],
    "whyNotUse": [
      "Task pure/idempotent hoàn toàn và duplicate không tốn kém.",
      "Chỉ một process chạy local."
    ],
    "relatedPatterns": [
      "cache-stampede-lock",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "redis lock",
      "distributed lock",
      "app/core/distributed_lock.py",
      "Redis lock có token owner.",
      "minimal",
      "tests/test_redis_lock.py",
      "Chỉ một lock acquire thành công.",
      "test"
    ]
  },
  {
    "id": "sqlalchemy-session-pattern",
    "title": "SQLAlchemy Session and Repository Pattern",
    "vietnameseTitle": "SQLAlchemy session + repository",
    "shortDescription": "Thiết lập engine/session dependency và repository để query DB an toàn, dễ test.",
    "category": "database",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "PostgreSQL",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dự án FastAPI cần SQL database.",
      "Muốn tách query DB khỏi router.",
      "Cần transaction rõ ràng."
    ],
    "whyNotUse": [
      "Dự án Django đã dùng Django ORM.",
      "Prototype không có database."
    ],
    "relatedPatterns": [
      "alembic-migration",
      "transaction-unit-of-work"
    ],
    "searchKeywords": [
      "app/db/session.py",
      "Session dependency cho FastAPI.",
      "minimal"
    ]
  },
  {
    "id": "alembic-migration",
    "title": "Alembic Database Migration",
    "vietnameseTitle": "Migration database bằng Alembic",
    "shortDescription": "Quản lý thay đổi schema database bằng migration có thể upgrade/downgrade.",
    "category": "database",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Alembic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Schema DB thay đổi theo thời gian.",
      "Cần deploy có kiểm soát.",
      "Cần rollback khi migration lỗi."
    ],
    "whyNotUse": [
      "Không dùng SQL database.",
      "Prototype throwaway không deploy."
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern"
    ],
    "searchKeywords": [
      "commands.sh",
      "Lệnh migration thường dùng.",
      "minimal"
    ]
  },
  {
    "id": "async-sqlalchemy-engine",
    "title": "Async SQLAlchemy Engine",
    "vietnameseTitle": "SQLAlchemy async engine",
    "shortDescription": "Thiết lập AsyncSession cho FastAPI khi cần xử lý nhiều IO database không blocking.",
    "category": "database",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "asyncpg",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint nhiều IO DB và app async.",
      "Muốn dùng asyncpg PostgreSQL.",
      "Cần tránh blocking event loop."
    ],
    "whyNotUse": [
      "Team chưa quen async transaction.",
      "App sync đơn giản chạy ổn với Session thường."
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern"
    ],
    "searchKeywords": [
      "app/db/async_session.py",
      "Async session dependency.",
      "minimal"
    ]
  },
  {
    "id": "transaction-unit-of-work",
    "title": "Transaction Unit of Work",
    "vietnameseTitle": "Transaction + Unit of Work",
    "shortDescription": "Gói nhiều thao tác DB trong một transaction để đảm bảo atomicity cho payment/order/import.",
    "category": "database",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Một request cập nhật nhiều bảng.",
      "Cần commit/rollback rõ ràng.",
      "Webhook/payment/order cần atomic."
    ],
    "whyNotUse": [
      "Chỉ đọc dữ liệu.",
      "Một thao tác đơn giản auto-commit đủ."
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern",
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "transaction",
      "rollback",
      "unit of work",
      "app/db/uow.py",
      "Unit of Work context manager.",
      "minimal",
      "tests/test_uow.py",
      "Rollback khi exception.",
      "test"
    ]
  },
  {
    "id": "database-index-query-plan",
    "title": "Database Index and Query Plan",
    "vietnameseTitle": "Index và query plan",
    "shortDescription": "Tạo index đúng chỗ và kiểm tra EXPLAIN để tránh API chậm khi dữ liệu lớn.",
    "category": "database",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Query filter/sort thường xuyên.",
      "Bảng lớn và API list chậm.",
      "Cần tối ưu trước production."
    ],
    "whyNotUse": [
      "Bảng rất nhỏ.",
      "Chưa có query pattern rõ."
    ],
    "relatedPatterns": [
      "pagination-filtering-sorting"
    ],
    "searchKeywords": [
      "index",
      "query plan",
      "explain",
      "performance",
      "sql/indexes.sql",
      "Index thường dùng.",
      "minimal",
      "tests/test_query_uses_index.py",
      "Test logic cấp app: endpoint trả nhanh với pagination.",
      "test"
    ]
  },
  {
    "id": "n-plus-one-avoidance",
    "title": "Avoid N+1 Queries",
    "vietnameseTitle": "Tránh N+1 query",
    "shortDescription": "Dùng eager loading/selectinload để tránh query trong vòng lặp khi trả dữ liệu quan hệ.",
    "category": "database",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API trả list kèm quan hệ.",
      "Log DB có quá nhiều query lặp.",
      "Cần tối ưu response list."
    ],
    "whyNotUse": [
      "Không có relationship.",
      "Chỉ lấy một record đơn giản."
    ],
    "relatedPatterns": [
      "database-index-query-plan"
    ],
    "searchKeywords": [
      "n+1",
      "eager loading",
      "selectinload",
      "app/repositories/order_repository.py",
      "selectinload tránh N+1.",
      "minimal",
      "tests/test_orders_repository.py",
      "Smoke test repository trả items đã load.",
      "test"
    ]
  },
  {
    "id": "healthcheck-endpoint",
    "title": "Healthcheck Endpoint",
    "vietnameseTitle": "Endpoint kiểm tra trạng thái app",
    "shortDescription": "Endpoint /health trả trạng thái app, version và dependency readiness cơ bản.",
    "category": "deployment",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần monitor uptime.",
      "Vercel/Docker/K8s cần healthcheck.",
      "CI/CD kiểm tra deploy."
    ],
    "whyNotUse": [
      "App static frontend không có backend.",
      "Script CLI không chạy HTTP."
    ],
    "relatedPatterns": [
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "app/routers/health_router.py",
      "Healthcheck endpoint.",
      "minimal"
    ]
  },
  {
    "id": "docker-deploy-fastapi",
    "title": "Docker Deploy FastAPI",
    "vietnameseTitle": "Docker deploy FastAPI",
    "shortDescription": "Dockerfile production cho FastAPI với Uvicorn, non-root user và healthcheck.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Docker",
      "Uvicorn",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Deploy API ổn định nhiều môi trường.",
      "Cần chạy production giống local.",
      "Cần container cho CI/CD."
    ],
    "whyNotUse": [
      "App frontend static deploy Vercel không cần Docker.",
      "Prototype chạy local."
    ],
    "relatedPatterns": [
      "healthcheck-endpoint"
    ],
    "searchKeywords": [
      "Dockerfile",
      "Dockerfile FastAPI production.",
      "minimal",
      "docker-compose.yml",
      "Compose production-like với API, Postgres, Redis và healthcheck.",
      "production",
      "scripts/smoke_test.sh",
      "Smoke test sau deploy để kiểm tra healthcheck và route docs cơ bản.",
      "test"
    ]
  },
  {
    "id": "github-actions-ci",
    "title": "GitHub Actions CI for Python Backend",
    "vietnameseTitle": "CI GitHub Actions cho backend Python",
    "shortDescription": "Workflow chạy ruff, typecheck, pytest và build Docker trước khi merge.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "GitHub Actions",
      "pytest",
      "ruff"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần kiểm tra tự động khi push/PR.",
      "Muốn tránh deploy code lỗi.",
      "Cần quality gate."
    ],
    "whyNotUse": [
      "Repo cá nhân chưa cần CI.",
      "Không dùng GitHub."
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      ".github/workflows/ci.yml",
      "CI workflow.",
      "minimal"
    ]
  },
  {
    "id": "structured-json-logging",
    "title": "Structured JSON Logging",
    "vietnameseTitle": "Logging JSON có correlation id",
    "shortDescription": "Log dạng JSON để dễ search, gắn request_id và không log dữ liệu nhạy cảm.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "structlog",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần debug production.",
      "Log được gửi về ELK/Cloud Logging.",
      "Cần trace request qua nhiều service."
    ],
    "whyNotUse": [
      "Prototype local đơn giản.",
      "Không có observability pipeline."
    ],
    "relatedPatterns": [
      "request-logging",
      "sentry-error-tracking"
    ],
    "searchKeywords": [
      "json log",
      "structured logging",
      "request id",
      "app/core/logging.py",
      "Structlog config.",
      "minimal",
      "tests/test_logging_redaction.py",
      "Không log password/token.",
      "test"
    ]
  },
  {
    "id": "correlation-id-middleware",
    "title": "Correlation ID Middleware",
    "vietnameseTitle": "Middleware request id",
    "shortDescription": "Sinh/nhận X-Request-ID để trace log qua nhiều request/service.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần debug request production.",
      "Có nhiều service/worker.",
      "Muốn response trả request id cho support."
    ],
    "whyNotUse": [
      "App nhỏ local không cần trace.",
      "Gateway đã quản lý correlation id."
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "request id",
      "correlation id",
      "trace",
      "app/middleware/correlation_id.py",
      "Middleware X-Request-ID.",
      "minimal",
      "tests/test_correlation_id.py",
      "Header được giữ lại.",
      "test"
    ]
  },
  {
    "id": "sentry-error-tracking",
    "title": "Sentry Error Tracking",
    "vietnameseTitle": "Theo dõi lỗi bằng Sentry",
    "shortDescription": "Tích hợp Sentry để bắt exception production, kèm environment và release version.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "sentry-sdk",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần biết lỗi production ngay.",
      "Cần stack trace và release tracking.",
      "App đã có user thật."
    ],
    "whyNotUse": [
      "Prototype local.",
      "Không được gửi dữ liệu nhạy cảm ra bên ngoài."
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "sentry",
      "error tracking",
      "app/core/sentry.py",
      "Init Sentry.",
      "minimal",
      "tests/test_sentry_config.py",
      "DSN rỗng không crash app.",
      "test"
    ]
  },
  {
    "id": "opentelemetry-tracing",
    "title": "OpenTelemetry Tracing",
    "vietnameseTitle": "Tracing bằng OpenTelemetry",
    "shortDescription": "Instrument API để đo latency, trace external calls và correlate log/metrics.",
    "category": "deployment",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenTelemetry",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần quan sát service production.",
      "API gọi nhiều external services.",
      "Cần trace chậm ở DB/HTTP."
    ],
    "whyNotUse": [
      "App nhỏ chưa cần tracing.",
      "Không có collector/backend nhận trace."
    ],
    "relatedPatterns": [
      "correlation-id-middleware",
      "structured-json-logging"
    ],
    "searchKeywords": [
      "otel",
      "tracing",
      "observability",
      "app/core/telemetry.py",
      "Instrument FastAPI.",
      "minimal",
      "tests/test_telemetry_setup.py",
      "Setup tracing không phá app.",
      "test"
    ]
  },
  {
    "id": "prometheus-metrics",
    "title": "Prometheus Metrics Endpoint",
    "vietnameseTitle": "Metrics Prometheus",
    "shortDescription": "Expose /metrics để đo request count, latency và custom business metrics.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "prometheus-client",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần dashboard latency/error rate.",
      "Deploy với Prometheus/Grafana.",
      "Muốn alert theo metrics."
    ],
    "whyNotUse": [
      "Không có monitoring stack.",
      "App static frontend."
    ],
    "relatedPatterns": [
      "opentelemetry-tracing"
    ],
    "searchKeywords": [
      "metrics",
      "prometheus",
      "grafana",
      "app/routers/metrics_router.py",
      "Metrics endpoint.",
      "minimal",
      "tests/test_metrics.py",
      "Metrics trả text prometheus.",
      "test"
    ]
  },
  {
    "id": "feature-flag-pattern",
    "title": "Feature Flag Pattern",
    "vietnameseTitle": "Feature flag backend",
    "shortDescription": "Bật/tắt tính năng theo user/tenant/environment để release an toàn.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần rollout từ từ.",
      "Muốn tắt nhanh feature lỗi.",
      "Cần A/B hoặc tenant-specific feature."
    ],
    "whyNotUse": [
      "App nhỏ không có release risk.",
      "Feature không ảnh hưởng production."
    ],
    "relatedPatterns": [
      "vercel-deployment-checklist"
    ],
    "searchKeywords": [
      "feature flag",
      "rollout",
      "release",
      "app/core/feature_flags.py",
      "Feature flag service.",
      "minimal",
      "tests/test_feature_flags.py",
      "Tenant flag.",
      "test"
    ]
  },
  {
    "id": "backup-restore-postgres",
    "title": "PostgreSQL Backup and Restore Runbook",
    "vietnameseTitle": "Runbook backup/restore Postgres",
    "shortDescription": "Checklist và lệnh backup/restore database trước migration hoặc release nguy hiểm.",
    "category": "deployment",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "pg_dump"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có database production.",
      "Trước migration lớn.",
      "Cần disaster recovery."
    ],
    "whyNotUse": [
      "Không dùng database.",
      "Managed provider đã có backup nhưng vẫn cần restore test."
    ],
    "relatedPatterns": [
      "alembic-migration"
    ],
    "searchKeywords": [
      "backup",
      "restore",
      "postgres",
      "runbook",
      "runbooks/postgres-backup-restore.md",
      "Runbook backup/restore.",
      "minimal",
      "tests/test_backup_runbook_exists.py",
      "Runbook tồn tại trong repo.",
      "test"
    ]
  },
  {
    "id": "incident-runbook-template",
    "title": "Production Incident Runbook",
    "vietnameseTitle": "Runbook xử lý incident",
    "shortDescription": "Mẫu quy trình xử lý sự cố production: detect, mitigate, communicate, postmortem.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Runbook"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App đã có người dùng thật.",
      "Cần xử lý outage/lỗi bảo mật/lỗi deploy.",
      "Team cần quy trình rõ."
    ],
    "whyNotUse": [
      "Prototype cá nhân chưa production.",
      "Không có vận hành production."
    ],
    "relatedPatterns": [
      "feature-flag-pattern",
      "sentry-error-tracking"
    ],
    "searchKeywords": [
      "incident",
      "runbook",
      "ops",
      "runbooks/incident.md",
      "Incident runbook.",
      "minimal"
    ]
  },
  {
    "id": "static-vercel-library-architecture",
    "title": "Static Vercel Library Architecture",
    "vietnameseTitle": "Kiến trúc thư viện static trên Vercel",
    "shortDescription": "Cấu trúc app documentation/template library không backend, content-driven, search client-side và deploy Vercel.",
    "category": "deployment",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Vite",
      "React",
      "Vercel"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App chỉ đọc nội dung/template.",
      "Không cần user login/database.",
      "Muốn deploy rẻ và ổn định."
    ],
    "whyNotUse": [
      "Cần admin editor online.",
      "Cần AI generator gọi API key server-side."
    ],
    "relatedPatterns": [
      "vercel-deployment-checklist",
      "feature-flag-pattern"
    ],
    "searchKeywords": [
      "vercel",
      "static",
      "no backend",
      "vite",
      "README.md",
      "Mô tả kiến trúc static.",
      "minimal",
      "vercel.json",
      "Optional Vercel static routing.",
      "config"
    ]
  },
  {
    "id": "configuration-layering",
    "title": "Configuration Layering",
    "vietnameseTitle": "Phân lớp cấu hình dev/staging/prod",
    "shortDescription": "Tổ chức settings theo môi trường để không hard-code config và giảm lỗi deploy.",
    "category": "deployment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pydantic-settings"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có nhiều môi trường dev/staging/prod.",
      "Cần bật/tắt feature hoặc provider theo env.",
      "Muốn validate config khi app start."
    ],
    "whyNotUse": [
      "Static frontend không có secret runtime.",
      "App nhỏ không có môi trường staging."
    ],
    "relatedPatterns": [
      "settings-management",
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "settings",
      "configuration",
      "environment",
      "app/core/settings.py",
      "Settings typed và validate bằng Pydantic.",
      "minimal"
    ]
  },
  {
    "id": "idempotent-consumer-pattern",
    "title": "Idempotent Consumer Pattern",
    "vietnameseTitle": "Consumer idempotent khi xử lý event",
    "shortDescription": "Thiết kế consumer để event xử lý nhiều lần vẫn cho kết quả đúng, đặc biệt với payment, webhook và queue retry.",
    "category": "distributed-systems",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Redis",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Queue retry có thể chạy lại task.",
      "Webhook provider gửi event nhiều lần.",
      "Payment/order không được cộng tiền/trừ hàng trùng."
    ],
    "whyNotUse": [
      "Task thuần read-only.",
      "Xử lý trùng không gây hại."
    ],
    "relatedPatterns": [
      "inbox-pattern",
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "idempotent consumer",
      "idempotency",
      "duplicate event",
      "app/services/idempotency.py",
      "Dùng idempotency key để chỉ xử lý một lần.",
      "minimal",
      "tests/test_idempotent_consumer.py",
      "Đảm bảo handler không chạy lần hai với cùng key.",
      "test"
    ]
  },
  {
    "id": "saga-pattern-basics",
    "title": "Saga Pattern Basics",
    "vietnameseTitle": "Saga pattern cho workflow nhiều bước",
    "shortDescription": "Chia transaction phân tán thành nhiều bước có compensating action khi một bước thất bại.",
    "category": "distributed-systems",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Celery",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Workflow order-payment-shipping nhiều bước.",
      "Không thể dùng một DB transaction.",
      "Cần rollback logic bằng compensating action."
    ],
    "whyNotUse": [
      "Một database transaction là đủ.",
      "Team chưa có observability/retry."
    ],
    "relatedPatterns": [
      "outbox-pattern",
      "retry-backoff-policy"
    ],
    "searchKeywords": [
      "saga",
      "compensating transaction",
      "distributed transaction",
      "app/sagas/order_saga.py",
      "Saga orchestration đơn giản với compensate.",
      "minimal"
    ]
  },
  {
    "id": "retry-backoff-policy",
    "title": "Retry with Exponential Backoff",
    "vietnameseTitle": "Retry với exponential backoff",
    "shortDescription": "Retry external API hoặc queue task an toàn bằng backoff, jitter, max attempts và timeout.",
    "category": "distributed-systems",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "tenacity",
      "httpx",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "External API lỗi tạm thời.",
      "Webhook publish fail.",
      "Task cần retry nhưng không spam provider."
    ],
    "whyNotUse": [
      "Lỗi validation không thể tự hồi phục.",
      "Không có timeout/idempotency."
    ],
    "relatedPatterns": [
      "circuit-breaker-pattern",
      "idempotent-consumer-pattern"
    ],
    "searchKeywords": [
      "retry",
      "backoff",
      "jitter",
      "tenacity",
      "app/clients/payment_client.py",
      "HTTP client retry có backoff và timeout.",
      "minimal"
    ]
  },
  {
    "id": "timeout-strategy",
    "title": "Timeout Strategy for External APIs",
    "vietnameseTitle": "Chiến lược timeout khi gọi API ngoài",
    "shortDescription": "Luôn đặt connect/read/write timeout để request không treo worker và làm nghẽn toàn hệ thống.",
    "category": "distributed-systems",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "httpx",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Gọi payment/OCR/LLM/vector DB bên ngoài.",
      "Worker bị treo do API chậm.",
      "Cần fail fast và retry có kiểm soát."
    ],
    "whyNotUse": [
      "Không gọi external API.",
      "Task batch có timeout riêng cấp worker."
    ],
    "relatedPatterns": [
      "retry-backoff-policy",
      "circuit-breaker-pattern"
    ],
    "searchKeywords": [
      "timeout",
      "external api",
      "httpx timeout",
      "app/clients/http.py",
      "HTTPX client có timeout rõ ràng.",
      "minimal"
    ]
  },
  {
    "id": "circuit-breaker-pattern",
    "title": "Circuit Breaker Pattern",
    "vietnameseTitle": "Circuit breaker khi service ngoài lỗi liên tục",
    "shortDescription": "Tạm ngừng gọi provider đang lỗi để bảo vệ hệ thống và trả fallback nhanh hơn.",
    "category": "distributed-systems",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Redis",
      "httpx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Provider ngoài lỗi liên tục.",
      "Retry làm hệ thống chậm thêm.",
      "Cần fallback hoặc degrade gracefully."
    ],
    "whyNotUse": [
      "Chưa có monitoring/fallback.",
      "External call không quan trọng hoặc rất hiếm."
    ],
    "relatedPatterns": [
      "timeout-strategy",
      "retry-backoff-policy"
    ],
    "searchKeywords": [
      "circuit breaker",
      "resilience",
      "fallback",
      "app/resilience/circuit_breaker.py",
      "Circuit breaker đơn giản dùng counter lỗi.",
      "minimal"
    ]
  },
  {
    "id": "bulkhead-pattern",
    "title": "Bulkhead Pattern for Workers",
    "vietnameseTitle": "Bulkhead pattern để cô lập tài nguyên",
    "shortDescription": "Tách pool worker/queue/connection cho tác vụ nặng để một nhóm lỗi không kéo sập toàn bộ app.",
    "category": "distributed-systems",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Celery",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "OCR/export nặng làm chậm email/webhook.",
      "Cần tách queue theo workload.",
      "Cần scale worker độc lập."
    ],
    "whyNotUse": [
      "Chỉ có vài task nhỏ.",
      "Không vận hành nhiều worker."
    ],
    "relatedPatterns": [
      "celery-worker-setup",
      "pdf-ocr-api"
    ],
    "searchKeywords": [
      "bulkhead",
      "queue isolation",
      "worker pool",
      "celeryconfig.py",
      "Route task vào queue riêng.",
      "minimal"
    ]
  },
  {
    "id": "django-drf-viewset",
    "title": "Django REST Framework ViewSet",
    "vietnameseTitle": "DRF ViewSet CRUD",
    "shortDescription": "CRUD API nhanh trong Django bằng ModelSerializer, ViewSet và permission class.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dự án đã dùng Django.",
      "Cần admin/ORM/auth có sẵn.",
      "CRUD nhiều model."
    ],
    "whyNotUse": [
      "Microservice API nhẹ không cần Django ecosystem.",
      "Không cần admin hoặc ORM Django."
    ],
    "relatedPatterns": [
      "django-admin-model",
      "jwt-auth-api"
    ],
    "searchKeywords": [
      "django",
      "drf",
      "viewset",
      "serializer",
      "users/views.py",
      "ViewSet CRUD với permission.",
      "minimal",
      "tests/test_userprofile_api.py",
      "Test unauthenticated bị chặn.",
      "test"
    ]
  },
  {
    "id": "django-admin-model",
    "title": "Django Admin Model Setup",
    "vietnameseTitle": "Django Admin cho model",
    "shortDescription": "Đăng ký model vào Django Admin để quản trị dữ liệu nội bộ nhanh và an toàn.",
    "category": "django",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần admin nội bộ nhanh.",
      "Cần xem/sửa dữ liệu bằng UI có sẵn.",
      "Dự án Django có model nhiều."
    ],
    "whyNotUse": [
      "Không dùng Django.",
      "Admin public không có kiểm soát quyền."
    ],
    "relatedPatterns": [
      "django-drf-viewset"
    ],
    "searchKeywords": [
      "django admin",
      "modeladmin",
      "users/admin.py",
      "Admin class có search/list_filter.",
      "minimal",
      "tests/test_admin_registration.py",
      "Smoke test admin site load.",
      "test"
    ]
  },
  {
    "id": "django-settings-split",
    "title": "Django Settings Split",
    "vietnameseTitle": "Tách settings Django theo môi trường",
    "shortDescription": "Tách base/dev/staging/production settings để tránh hard-code secret, debug mode và cấu hình sai khi deploy.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "django-environ"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dự án Django có dev/staging/prod.",
      "Cần tách DEBUG, ALLOWED_HOSTS, database, cache, storage.",
      "Muốn tránh commit secret vào repo."
    ],
    "whyNotUse": [
      "Prototype một file local.",
      "Dự án chưa deploy production."
    ],
    "relatedPatterns": [
      "django-deployment-checklist",
      "secret-rotation-runbook"
    ],
    "searchKeywords": [
      "django settings split",
      "production settings",
      "django environ",
      "config/settings/base.py",
      "Base settings dùng chung.",
      "minimal",
      "config/settings/production.py",
      "Production override bắt buộc an toàn.",
      "production",
      "tests/test_settings.py",
      "Production không được bật DEBUG.",
      "test"
    ]
  },
  {
    "id": "django-custom-user-model",
    "title": "Django Custom User Model",
    "vietnameseTitle": "Custom User Model cho Django",
    "shortDescription": "Tạo custom user model ngay từ đầu để tránh kẹt schema khi cần email login, organization hoặc profile mở rộng.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn login bằng email thay username.",
      "Cần mở rộng user cho SaaS/enterprise.",
      "Dự án mới chưa migrate production."
    ],
    "whyNotUse": [
      "Dự án cũ đã production với default User và không cần đổi.",
      "Chỉ prototype rất nhỏ."
    ],
    "relatedPatterns": [
      "django-admin-hardening",
      "drf-simplejwt-auth"
    ],
    "searchKeywords": [
      "django custom user",
      "email login",
      "AUTH_USER_MODEL",
      "accounts/models.py",
      "Custom user dùng email làm username field.",
      "minimal",
      "config/settings/base.py",
      "Khai báo AUTH_USER_MODEL trước migration đầu tiên.",
      "config",
      "tests/test_user_model.py",
      "User email unique và username disabled.",
      "test"
    ]
  },
  {
    "id": "django-admin-hardening",
    "title": "Django Admin Hardening",
    "vietnameseTitle": "Gia cố bảo mật Django Admin",
    "shortDescription": "Cấu hình admin production an toàn hơn: quyền truy cập, audit, readonly field, search/filter và hạn chế dữ liệu nhạy cảm.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Django Admin dùng trong production/internal ops.",
      "Có dữ liệu user/payment/file nhạy cảm.",
      "Cần giảm rủi ro admin thao tác nhầm."
    ],
    "whyNotUse": [
      "Admin chỉ chạy local.",
      "Bạn xây admin riêng hoàn toàn."
    ],
    "relatedPatterns": [
      "audit-log-enterprise",
      "django-custom-user-model"
    ],
    "searchKeywords": [
      "django admin",
      "admin hardening",
      "staff permissions",
      "accounts/admin.py",
      "Admin hiển thị an toàn và readonly field nhạy cảm.",
      "minimal",
      "config/settings/production.py",
      "Cookie/security settings cho admin.",
      "config"
    ]
  },
  {
    "id": "drf-serializer-advanced",
    "title": "DRF Serializer Advanced",
    "vietnameseTitle": "DRF Serializer nâng cao",
    "shortDescription": "Dùng serializer cho nested input, validation theo context, read/write fields và response shape ổn định.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API Django cần validate request rõ.",
      "Cần tách input/output serializer.",
      "Cần context user/tenant trong validation."
    ],
    "whyNotUse": [
      "API cực nhỏ dùng function view đơn giản.",
      "Không dùng DRF."
    ],
    "relatedPatterns": [
      "drf-viewset-advanced",
      "tenant-aware-query-filter"
    ],
    "searchKeywords": [
      "drf serializer",
      "serializer validation",
      "nested serializer",
      "apps/projects/serializers.py",
      "Tách create serializer và response serializer.",
      "minimal",
      "tests/test_project_serializer.py",
      "Serializer reject slug trùng trong organization.",
      "test"
    ]
  },
  {
    "id": "drf-viewset-advanced",
    "title": "DRF ViewSet Advanced",
    "vietnameseTitle": "DRF ViewSet nâng cao",
    "shortDescription": "Tổ chức ViewSet production với get_queryset tenant-aware, serializer theo action và service layer cho business logic.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API Django có CRUD và permission phức tạp.",
      "Cần filter query theo tenant/user.",
      "Cần serializer khác nhau theo action."
    ],
    "whyNotUse": [
      "Endpoint đơn giản không cần ViewSet.",
      "Business logic đang quá nhỏ."
    ],
    "relatedPatterns": [
      "drf-permissions-policy",
      "drf-serializer-advanced"
    ],
    "searchKeywords": [
      "drf viewset",
      "get_queryset",
      "tenant viewset",
      "apps/projects/views.py",
      "ViewSet tenant-aware và serializer per action.",
      "minimal",
      "tests/test_project_viewset.py",
      "ViewSet không trả project organization khác.",
      "test"
    ]
  },
  {
    "id": "drf-permissions-policy",
    "title": "DRF Permissions Policy",
    "vietnameseTitle": "DRF permission class theo role/resource",
    "shortDescription": "Tạo permission class kiểm tra user, role, tenant và object-level access thay vì chỉ IsAuthenticated.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API cần phân quyền admin/member/viewer.",
      "Cần object-level permission.",
      "Cần ownership check cho resource."
    ],
    "whyNotUse": [
      "Endpoint public hoặc chỉ cần login.",
      "Permission được xử lý bằng service khác đủ rõ."
    ],
    "relatedPatterns": [
      "advanced-rbac-tenant-roles",
      "resource-ownership-check"
    ],
    "searchKeywords": [
      "drf permissions",
      "object permission",
      "has_object_permission",
      "apps/core/permissions.py",
      "Permission class object-level.",
      "minimal",
      "tests/test_drf_permissions.py",
      "Object-level permission chặn tenant khác.",
      "test"
    ]
  },
  {
    "id": "drf-filtering-search-ordering",
    "title": "DRF Filtering / Search / Ordering",
    "vietnameseTitle": "DRF filtering, search và ordering an toàn",
    "shortDescription": "Cho phép filter/search/sort danh sách API nhưng whitelist field để tránh query nặng hoặc lộ dữ liệu.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework",
      "django-filter"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API list cần filter/search/sort.",
      "Frontend cần query linh hoạt.",
      "Cần tránh expose mọi field cho ordering."
    ],
    "whyNotUse": [
      "List nhỏ không cần filter.",
      "Search production cần engine riêng."
    ],
    "relatedPatterns": [
      "pagination-filtering-sorting",
      "drf-viewset-advanced"
    ],
    "searchKeywords": [
      "drf filter",
      "django-filter",
      "search_fields",
      "ordering_fields",
      "apps/projects/views.py",
      "DRF filter backends với whitelist.",
      "minimal",
      "tests/test_drf_filtering.py",
      "Ordering field không whitelist bị bỏ qua hoặc reject.",
      "test"
    ]
  },
  {
    "id": "drf-throttling-rate-limit",
    "title": "DRF Throttling / Rate Limit",
    "vietnameseTitle": "DRF throttling để giới hạn request",
    "shortDescription": "Dùng DRF throttling cho anonymous/user/API scope để chống spam, brute force và abuse endpoint.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework",
      "Redis optional"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint login/reset password/public API cần giới hạn.",
      "Muốn chống brute force và abuse.",
      "Cần rate limit theo scope."
    ],
    "whyNotUse": [
      "Chỉ chạy internal network có gateway limit.",
      "Cần distributed rate limit nâng cao bằng Redis/custom middleware."
    ],
    "relatedPatterns": [
      "rate-limit-login",
      "drf-simplejwt-auth"
    ],
    "searchKeywords": [
      "drf throttling",
      "rate limit",
      "ScopedRateThrottle",
      "config/settings/base.py",
      "DRF throttle config theo scope.",
      "minimal",
      "apps/auth/views.py",
      "Scope throttle cho login endpoint.",
      "production",
      "tests/test_drf_throttling.py",
      "Login bị throttle sau nhiều lần.",
      "test"
    ]
  },
  {
    "id": "drf-simplejwt-auth",
    "title": "DRF SimpleJWT Authentication",
    "vietnameseTitle": "JWT auth trong DRF bằng SimpleJWT",
    "shortDescription": "Thiết lập access/refresh token trong Django REST Framework với rotation, blacklist và protected API.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django REST Framework",
      "SimpleJWT"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "DRF API cần token auth cho frontend/mobile.",
      "Cần refresh token.",
      "Muốn dùng package phổ biến thay vì tự viết JWT."
    ],
    "whyNotUse": [
      "Server-rendered Django dùng session auth là đủ.",
      "Enterprise SSO/OIDC là yêu cầu chính."
    ],
    "relatedPatterns": [
      "django-custom-user-model",
      "drf-throttling-rate-limit"
    ],
    "searchKeywords": [
      "simplejwt",
      "drf jwt",
      "django jwt",
      "refresh token",
      "config/settings/base.py",
      "SimpleJWT config production-aware.",
      "minimal",
      "config/urls.py",
      "Token obtain/refresh endpoints.",
      "production",
      "tests/test_simplejwt.py",
      "Protected endpoint yêu cầu token.",
      "test"
    ]
  },
  {
    "id": "django-celery-integration",
    "title": "Django Celery Integration",
    "vietnameseTitle": "Tích hợp Celery với Django",
    "shortDescription": "Thiết lập Celery worker cho Django để gửi email, OCR, import/export và job định kỳ.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "Celery",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Django có tác vụ lâu như email/export/import/OCR.",
      "Cần retry và worker riêng.",
      "Cần scheduled tasks."
    ],
    "whyNotUse": [
      "Task rất nhẹ và không cần retry.",
      "App static không có backend runtime."
    ],
    "relatedPatterns": [
      "celery-worker-setup",
      "django-management-command"
    ],
    "searchKeywords": [
      "django celery",
      "celery django",
      "background task django",
      "config/celery.py",
      "Celery app đọc Django settings.",
      "minimal",
      "config/__init__.py",
      "Load Celery app khi Django start.",
      "config",
      "apps/reports/tasks.py",
      "Task retryable cho export report.",
      "production",
      "tests/test_celery_task.py",
      "Task gọi service đúng report_id.",
      "test"
    ]
  },
  {
    "id": "django-management-command",
    "title": "Django Management Command",
    "vietnameseTitle": "Django management command cho tác vụ vận hành",
    "shortDescription": "Tạo command chạy import, cleanup, backfill, reindex hoặc maintenance task có logging và dry-run.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần chạy tác vụ vận hành thủ công/CI/cron.",
      "Cần dry-run trước khi sửa dữ liệu.",
      "Cần backfill migration dữ liệu an toàn."
    ],
    "whyNotUse": [
      "Task phải chạy liên tục nền thì dùng Celery/worker.",
      "Chỉ là script local tạm thời."
    ],
    "relatedPatterns": [
      "data-retention-policy",
      "scheduled-cleanup-job"
    ],
    "searchKeywords": [
      "django management command",
      "backfill",
      "maintenance command",
      "apps/projects/management/commands/backfill_project_slug.py",
      "Command có --dry-run và batch limit.",
      "minimal",
      "tests/test_management_command.py",
      "Dry-run không save thay đổi.",
      "test"
    ]
  },
  {
    "id": "django-file-validation-security",
    "title": "Django File Upload Security",
    "vietnameseTitle": "Bảo mật upload file trong Django",
    "shortDescription": "Validate size, extension, MIME, storage path và access control khi upload file bằng Django/DRF.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User upload ảnh/PDF/Excel.",
      "File private theo tenant.",
      "Cần chống upload file nguy hiểm hoặc quá lớn."
    ],
    "whyNotUse": [
      "Không có user uploads.",
      "File chỉ là static asset nội bộ."
    ],
    "relatedPatterns": [
      "file-validation-security",
      "secure-file-storage-access"
    ],
    "searchKeywords": [
      "django file upload",
      "drf upload",
      "upload security django",
      "apps/files/validators.py",
      "Validate upload size và content type.",
      "minimal",
      "apps/files/serializers.py",
      "Serializer validate file trước khi save.",
      "production",
      "tests/test_file_upload_security.py",
      "Reject file type không cho phép.",
      "test"
    ]
  },
  {
    "id": "django-testing-fixtures",
    "title": "Django Testing Fixtures",
    "vietnameseTitle": "Fixture test Django/DRF",
    "shortDescription": "Tạo fixture user, API client, organization và database để test DRF API ổn định.",
    "category": "django",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest-django",
      "DRF"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dự án Django cần test API/auth/permission.",
      "Muốn test nhanh và ít lặp setup.",
      "Cần fixture tenant/user."
    ],
    "whyNotUse": [
      "Chỉ dùng unittest built-in và team chưa dùng pytest.",
      "Prototype chưa có test."
    ],
    "relatedPatterns": [
      "pytest-api-tests",
      "drf-viewset-advanced"
    ],
    "searchKeywords": [
      "pytest django",
      "drf test",
      "django fixture",
      "APIClient",
      "pytest.ini",
      "pytest-django settings.",
      "minimal",
      "conftest.py",
      "Fixture API client và user.",
      "test",
      "apps/projects/tests/test_api.py",
      "Test API authenticated.",
      "test"
    ]
  },
  {
    "id": "django-deployment-checklist",
    "title": "Django Deployment Checklist",
    "vietnameseTitle": "Checklist deploy Django production",
    "shortDescription": "Checklist cấu hình Django production: collectstatic, migrations, security settings, workers, env và healthcheck.",
    "category": "django",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "Gunicorn",
      "Docker"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Chuẩn bị deploy Django production.",
      "Cần kiểm tra security settings.",
      "Cần run migration/static đúng thứ tự."
    ],
    "whyNotUse": [
      "Chỉ chạy local demo.",
      "App static frontend không có Django server."
    ],
    "relatedPatterns": [
      "django-settings-split",
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "django deployment",
      "check deploy",
      "gunicorn django",
      "collectstatic",
      "docs/deploy/django-checklist.md",
      "Checklist deploy Django.",
      "minimal",
      "entrypoint.sh",
      "Entrypoint chạy migration và collectstatic.",
      "production"
    ]
  },
  {
    "id": "organization-workspace-model",
    "title": "Organization / Workspace Data Model",
    "vietnameseTitle": "Mô hình Organization / Workspace cho SaaS",
    "shortDescription": "Thiết kế bảng organization, workspace, membership và role để app SaaS hỗ trợ nhiều công ty/tổ chức.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App có nhiều công ty hoặc team dùng chung hệ thống.",
      "Cần phân quyền theo organization/workspace.",
      "Cần billing, plan limit hoặc audit theo tenant."
    ],
    "whyNotUse": [
      "App cá nhân một người dùng.",
      "Chưa có nhu cầu tách dữ liệu theo tổ chức."
    ],
    "relatedPatterns": [
      "tenant-aware-query-filter",
      "advanced-rbac-tenant-roles",
      "audit-log-enterprise"
    ],
    "searchKeywords": [
      "organization",
      "workspace",
      "membership",
      "saas data model",
      "multi company",
      "app/models/organization.py",
      "Model organization/workspace/membership tối thiểu cho SaaS.",
      "minimal",
      "tests/test_membership_model.py",
      "Test user không được trùng membership trong cùng organization.",
      "test"
    ]
  },
  {
    "id": "tenant-aware-query-filter",
    "title": "Tenant-aware Query Filter",
    "vietnameseTitle": "Filter query theo tenant để chống lộ dữ liệu",
    "shortDescription": "Bắt buộc mọi query dữ liệu tenant-owned phải filter theo organization_id/workspace_id từ context đã xác thực.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "App multi-tenant cần cô lập dữ liệu.",
      "Muốn tránh lỗi thiếu WHERE organization_id.",
      "Cần audit bảo mật trước khi deploy enterprise."
    ],
    "whyNotUse": [
      "App single-tenant.",
      "Dữ liệu public hoàn toàn."
    ],
    "relatedPatterns": [
      "organization-workspace-model",
      "row-level-security-postgres",
      "resource-ownership-check"
    ],
    "searchKeywords": [
      "tenant filter",
      "tenant isolation",
      "multi tenant query",
      "organization_id",
      "app/core/tenant.py",
      "Tenant context lấy từ user/session đã xác thực.",
      "minimal",
      "app/repositories/base_tenant_repository.py",
      "Repository base luôn nhận tenant context.",
      "production",
      "tests/test_tenant_isolation.py",
      "Test không đọc được data organization khác.",
      "test"
    ]
  },
  {
    "id": "row-level-security-postgres",
    "title": "PostgreSQL Row Level Security for SaaS",
    "vietnameseTitle": "PostgreSQL RLS để tăng lớp bảo vệ tenant",
    "shortDescription": "Dùng Row Level Security như lớp bảo vệ bổ sung để giảm rủi ro lộ dữ liệu khi app query sai.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Tenant isolation là yêu cầu bảo mật cao.",
      "Muốn defense-in-depth ngoài application filter.",
      "Hệ thống có dữ liệu enterprise nhạy cảm."
    ],
    "whyNotUse": [
      "Team chưa hiểu rõ RLS và session variables.",
      "App đơn giản chưa cần độ phức tạp này."
    ],
    "relatedPatterns": [
      "tenant-aware-query-filter",
      "organization-workspace-model"
    ],
    "searchKeywords": [
      "postgres rls",
      "row level security",
      "tenant isolation",
      "migrations/versions/enable_rls.py",
      "Migration bật RLS và policy theo current_setting.",
      "minimal",
      "app/db/tenant_session.py",
      "Set tenant id vào DB transaction trước khi query.",
      "production"
    ]
  },
  {
    "id": "advanced-rbac-tenant-roles",
    "title": "Advanced RBAC for Tenant Roles",
    "vietnameseTitle": "RBAC nâng cao theo organization/workspace",
    "shortDescription": "Thiết kế role owner/admin/member/viewer theo tenant thay vì role global đơn giản.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần owner/admin/member theo organization.",
      "Một user có thể có role khác nhau ở từng workspace.",
      "Cần kiểm soát quyền thao tác tài nguyên."
    ],
    "whyNotUse": [
      "App chỉ có admin/user global.",
      "Không có nhiều organization/workspace."
    ],
    "relatedPatterns": [
      "organization-workspace-model",
      "policy-engine-casbin-abac"
    ],
    "searchKeywords": [
      "advanced rbac",
      "tenant role",
      "workspace role",
      "permission matrix",
      "app/core/permissions.py",
      "Role hierarchy và permission matrix tối thiểu.",
      "minimal",
      "app/dependencies/permissions.py",
      "FastAPI dependency yêu cầu permission theo tenant context.",
      "production",
      "tests/test_permissions.py",
      "Test viewer không được ghi dữ liệu.",
      "test"
    ]
  },
  {
    "id": "policy-engine-casbin-abac",
    "title": "Policy Engine with Casbin ABAC",
    "vietnameseTitle": "Policy engine Casbin cho RBAC/ABAC",
    "shortDescription": "Tách permission policy khỏi code khi role/attribute/resource condition bắt đầu phức tạp.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Casbin",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Permission nhiều điều kiện theo role, attribute hoặc resource.",
      "Cần policy thay đổi mà ít sửa business code.",
      "Enterprise customer cần rule rõ ràng và audit được."
    ],
    "whyNotUse": [
      "Chỉ cần vài role đơn giản.",
      "Team chưa sẵn sàng bảo trì policy files."
    ],
    "relatedPatterns": [
      "advanced-rbac-tenant-roles",
      "audit-log-enterprise"
    ],
    "searchKeywords": [
      "casbin",
      "abac",
      "policy engine",
      "permission",
      "app/core/policy/enforcer.py",
      "Casbin enforcer wrapper.",
      "minimal",
      "app/dependencies/policy.py",
      "Dependency kiểm tra policy.",
      "production",
      "tests/test_policy.py",
      "Test policy quan trọng.",
      "test"
    ]
  },
  {
    "id": "api-key-management",
    "title": "API Key Management",
    "vietnameseTitle": "Quản lý API key cho tích hợp bên ngoài",
    "shortDescription": "Tạo, hash, rotate, revoke và scope API key cho khách hàng hoặc service integration.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "secrets",
      "hashlib"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Khách hàng cần gọi API bằng machine credential.",
      "Cần revoke/rotate key.",
      "Cần scope quyền theo API key."
    ],
    "whyNotUse": [
      "Chỉ có frontend user login.",
      "Không có public API/integration."
    ],
    "relatedPatterns": [
      "secret-rotation-runbook",
      "audit-log-enterprise",
      "rate-limit-login"
    ],
    "searchKeywords": [
      "api key",
      "machine auth",
      "key rotation",
      "hash api key",
      "app/services/api_key_service.py",
      "Sinh key raw một lần, lưu hash vào database.",
      "minimal",
      "app/dependencies/api_key_auth.py",
      "Dependency đọc API key từ header và verify hash.",
      "production",
      "tests/test_api_keys.py",
      "Revoked key không còn dùng được.",
      "test"
    ]
  },
  {
    "id": "secret-rotation-runbook",
    "title": "Secret Rotation Runbook",
    "vietnameseTitle": "Runbook xoay vòng secret/API key",
    "shortDescription": "Quy trình xoay vòng JWT secret, API key, webhook secret và provider credentials an toàn.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Vercel",
      "Docker",
      "Vault optional"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Secret có nguy cơ lộ.",
      "Enterprise yêu cầu rotation định kỳ.",
      "Cần rollback an toàn khi đổi secret."
    ],
    "whyNotUse": [
      "Prototype local không có secret thật.",
      "Không có quy trình vận hành production."
    ],
    "relatedPatterns": [
      "api-key-management",
      "webhook-signature-verification"
    ],
    "searchKeywords": [
      "secret rotation",
      "key rotation",
      "runbook",
      "jwt secret",
      "docs/runbooks/secret-rotation.md",
      "Runbook xoay vòng secret không làm downtime.",
      "minimal",
      "app/core/secrets.py",
      "Verify token với nhiều secret trong giai đoạn rotation.",
      "config"
    ]
  },
  {
    "id": "audit-log-enterprise",
    "title": "Enterprise Audit Log",
    "vietnameseTitle": "Audit log cho hành động nhạy cảm",
    "shortDescription": "Ghi lại ai làm gì, trên tenant/resource nào, khi nào và kết quả ra sao để phục vụ debug, compliance và bảo mật.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có admin action, billing, permission, data export/delete.",
      "Enterprise customer cần audit trail.",
      "Cần điều tra incident."
    ],
    "whyNotUse": [
      "App prototype không có hành động nhạy cảm.",
      "Chỉ logging kỹ thuật là đủ."
    ],
    "relatedPatterns": [
      "admin-action-approval",
      "pii-redaction-logging"
    ],
    "searchKeywords": [
      "audit log",
      "compliance",
      "admin action log",
      "security event",
      "app/models/audit_log.py",
      "Audit log model immutable-ish.",
      "minimal",
      "app/services/audit_service.py",
      "Audit service với metadata đã redaction.",
      "production",
      "tests/test_audit_log.py",
      "Audit metadata không lưu secret.",
      "test"
    ]
  },
  {
    "id": "admin-action-approval",
    "title": "Admin Action Approval Gate",
    "vietnameseTitle": "Cổng duyệt cho thao tác admin nguy hiểm",
    "shortDescription": "Yêu cầu confirm/approval cho thao tác phá hủy như xóa organization, export dữ liệu, đổi billing hoặc rotate secret.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có thao tác admin không thể undo.",
      "Cần four-eyes approval cho enterprise.",
      "Muốn giảm rủi ro thao tác nhầm."
    ],
    "whyNotUse": [
      "App nhỏ chưa có admin dangerous actions.",
      "Action có thể undo dễ dàng."
    ],
    "relatedPatterns": [
      "audit-log-enterprise",
      "secret-rotation-runbook"
    ],
    "searchKeywords": [
      "approval gate",
      "admin approval",
      "four eyes",
      "dangerous action",
      "app/models/approval_request.py",
      "Model approval request.",
      "minimal",
      "app/services/approval_service.py",
      "Không cho self-approve action nhạy cảm.",
      "production",
      "tests/test_approval.py",
      "Requester không được tự approve.",
      "test"
    ]
  },
  {
    "id": "data-retention-policy",
    "title": "Data Retention Policy",
    "vietnameseTitle": "Chính sách lưu giữ và xóa dữ liệu",
    "shortDescription": "Định nghĩa dữ liệu nào giữ bao lâu, khi nào anonymize/delete, và job nào thực thi retention.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Celery",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có dữ liệu cá nhân, audit, upload, OCR hoặc export files.",
      "Enterprise/compliance yêu cầu retention.",
      "Cần cleanup storage để giảm chi phí."
    ],
    "whyNotUse": [
      "App chưa lưu dữ liệu user.",
      "Prototype không có storage dài hạn."
    ],
    "relatedPatterns": [
      "scheduled-cleanup-job",
      "soft-delete-restore-pattern",
      "secure-file-storage-access"
    ],
    "searchKeywords": [
      "data retention",
      "cleanup",
      "privacy",
      "storage lifecycle",
      "docs/policies/data-retention.md",
      "Policy retention rõ theo loại dữ liệu.",
      "minimal",
      "app/tasks/retention.py",
      "Cleanup job idempotent.",
      "production"
    ]
  },
  {
    "id": "soft-delete-restore-pattern",
    "title": "Soft Delete and Restore Pattern",
    "vietnameseTitle": "Soft delete và khôi phục dữ liệu",
    "shortDescription": "Dùng deleted_at/deleted_by để ẩn dữ liệu trước khi xóa thật, hỗ trợ restore và audit.",
    "category": "enterprise-saas",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User/admin có thể xóa nhầm.",
      "Cần audit ai xóa và khi nào.",
      "Cần retention trước hard delete."
    ],
    "whyNotUse": [
      "Dữ liệu nhạy cảm phải xóa vật lý ngay theo policy.",
      "Bảng log append-only không nên restore."
    ],
    "relatedPatterns": [
      "data-retention-policy",
      "audit-log-enterprise"
    ],
    "searchKeywords": [
      "soft delete",
      "restore",
      "deleted_at",
      "app/models/mixins.py",
      "Mixin soft delete.",
      "minimal",
      "app/repositories/soft_delete_repository.py",
      "Repository chỉ query dữ liệu chưa xóa.",
      "production",
      "tests/test_soft_delete.py",
      "Soft-deleted record không còn xuất hiện ở query thường.",
      "test"
    ]
  },
  {
    "id": "oidc-sso-integration",
    "title": "OIDC / SSO Integration",
    "vietnameseTitle": "Tích hợp đăng nhập SSO/OIDC",
    "shortDescription": "Tích hợp đăng nhập doanh nghiệp qua OpenID Connect với mapping user, organization và domain claim.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Authlib",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Khách hàng enterprise yêu cầu SSO.",
      "Cần login qua Google Workspace, Okta, Azure AD.",
      "Cần map claim sang organization/membership."
    ],
    "whyNotUse": [
      "App chỉ phục vụ user cá nhân.",
      "Chưa có nhu cầu enterprise onboarding."
    ],
    "relatedPatterns": [
      "organization-workspace-model",
      "verified-domain-ownership",
      "saml-sso-decision"
    ],
    "searchKeywords": [
      "oidc",
      "sso",
      "single sign on",
      "authlib",
      "okta",
      "azure ad",
      "app/auth/oidc.py",
      "OIDC client config outline.",
      "minimal",
      "app/services/sso_service.py",
      "Map claims sang tenant/membership.",
      "production",
      "tests/test_sso_mapping.py",
      "Email domain chưa verify không được login.",
      "test"
    ]
  },
  {
    "id": "saml-sso-decision",
    "title": "SAML SSO Decision Guide",
    "vietnameseTitle": "Khi nào cần SAML SSO",
    "shortDescription": "Decision pattern cho trường hợp enterprise yêu cầu SAML thay vì OIDC.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "python3-saml optional"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Khách hàng enterprise legacy yêu cầu SAML.",
      "IdP không hỗ trợ OIDC tốt.",
      "Sales contract yêu cầu SAML SSO."
    ],
    "whyNotUse": [
      "OIDC đủ dùng và IdP hỗ trợ tốt.",
      "Team chưa có kinh nghiệm vận hành SAML metadata/cert."
    ],
    "relatedPatterns": [
      "oidc-sso-integration",
      "verified-domain-ownership"
    ],
    "searchKeywords": [
      "saml",
      "sso",
      "enterprise login",
      "identity provider",
      "docs/decisions/saml-vs-oidc.md",
      "Decision matrix SAML vs OIDC.",
      "minimal"
    ]
  },
  {
    "id": "scim-user-provisioning",
    "title": "SCIM User Provisioning",
    "vietnameseTitle": "SCIM để đồng bộ user enterprise",
    "shortDescription": "Hỗ trợ enterprise IdP tự động tạo, cập nhật, vô hiệu hóa user và group trong organization.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "FastAPI",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Khách hàng enterprise cần automatic provisioning/deprovisioning.",
      "User lifecycle quản lý từ Okta/Azure AD.",
      "Cần giảm thao tác invite/remove thủ công."
    ],
    "whyNotUse": [
      "App chưa bán enterprise.",
      "Invite email thủ công là đủ."
    ],
    "relatedPatterns": [
      "api-key-management",
      "organization-workspace-model",
      "audit-log-enterprise"
    ],
    "searchKeywords": [
      "scim",
      "provisioning",
      "deprovisioning",
      "okta",
      "azure ad",
      "app/routers/scim_router.py",
      "SCIM Users endpoint outline.",
      "minimal",
      "app/services/scim_service.py",
      "Deprovision user từ SCIM active=false.",
      "production",
      "tests/test_scim.py",
      "SCIM deprovision disable membership.",
      "test"
    ]
  },
  {
    "id": "verified-domain-ownership",
    "title": "Verified Domain Ownership",
    "vietnameseTitle": "Xác minh domain của organization",
    "shortDescription": "Xác minh domain bằng DNS TXT để map SSO/email domain vào organization an toàn.",
    "category": "enterprise-saas",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "dnspython"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần auto-join hoặc SSO theo email domain.",
      "Enterprise cần chứng minh quyền sở hữu domain.",
      "Tránh user claim organization bằng domain không thuộc họ."
    ],
    "whyNotUse": [
      "Không dùng domain-based onboarding/SSO.",
      "Organization tạo thủ công bởi admin nội bộ."
    ],
    "relatedPatterns": [
      "oidc-sso-integration",
      "organization-workspace-model"
    ],
    "searchKeywords": [
      "domain verification",
      "dns txt",
      "verified domain",
      "sso domain",
      "app/services/domain_verification.py",
      "Verify DNS TXT token.",
      "minimal",
      "tests/test_domain_verification.py",
      "Token đúng thì verify true.",
      "test"
    ]
  },
  {
    "id": "invite-user-flow",
    "title": "Invite User Flow",
    "vietnameseTitle": "Luồng mời user vào organization/workspace",
    "shortDescription": "Tạo invite token có hạn, role dự kiến, audit và accept flow an toàn cho SaaS team.",
    "category": "enterprise-saas",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "secrets"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Organization admin mời thành viên.",
      "Cần role ngay khi accept invite.",
      "Cần expire/revoke invite."
    ],
    "whyNotUse": [
      "Chỉ có self-signup không team.",
      "User provisioning hoàn toàn qua SCIM."
    ],
    "relatedPatterns": [
      "organization-workspace-model",
      "email-template-jinja"
    ],
    "searchKeywords": [
      "invite user",
      "team invite",
      "organization invite",
      "app/services/invite_service.py",
      "Tạo invite token hash và expire.",
      "minimal",
      "app/services/accept_invite.py",
      "Accept invite idempotent-ish.",
      "production"
    ]
  },
  {
    "id": "plan-limit-enforcement",
    "title": "Plan Limit Enforcement",
    "vietnameseTitle": "Kiểm soát giới hạn theo gói SaaS",
    "shortDescription": "Enforce giới hạn theo plan như số user, workspace, storage, API calls, OCR jobs hoặc RAG documents.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "SaaS có free/pro/enterprise plan.",
      "Cần chặn vượt quota trước khi tạo resource.",
      "Cần billing usage và audit."
    ],
    "whyNotUse": [
      "App miễn phí không có plan.",
      "Không có quota/usage."
    ],
    "relatedPatterns": [
      "organization-workspace-model",
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "plan limits",
      "quota",
      "billing usage",
      "saas plan",
      "app/core/plan_limits.py",
      "Plan limits map.",
      "minimal",
      "app/services/usage_service.py",
      "Check quota trước khi tạo resource.",
      "production",
      "tests/test_plan_limits.py",
      "Free plan bị chặn khi vượt quota.",
      "test"
    ]
  },
  {
    "id": "secure-file-storage-access",
    "title": "Secure File Storage Access",
    "vietnameseTitle": "Bảo vệ file riêng tư trong SaaS",
    "shortDescription": "Lưu file private, cấp presigned URL có hạn và verify tenant/permission trước khi download.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "boto3",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User upload tài liệu, OCR image, export hoặc invoice nhạy cảm.",
      "File phải private theo tenant.",
      "Cần URL tải file có hạn."
    ],
    "whyNotUse": [
      "File public static asset.",
      "Không lưu file user."
    ],
    "relatedPatterns": [
      "s3-presigned-upload",
      "tenant-aware-query-filter",
      "data-retention-policy"
    ],
    "searchKeywords": [
      "secure file storage",
      "private s3",
      "presigned download",
      "tenant file",
      "app/services/file_access_service.py",
      "Verify tenant trước khi tạo presigned download.",
      "minimal",
      "tests/test_private_file_access.py",
      "Tenant khác không lấy được presigned URL.",
      "test"
    ]
  },
  {
    "id": "compliance-checklist-soc2-lite",
    "title": "SOC2-lite Backend Compliance Checklist",
    "vietnameseTitle": "Checklist compliance backend kiểu SOC2-lite",
    "shortDescription": "Checklist thực dụng cho startup/SaaS trước khi phục vụ khách hàng enterprise.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Runbook"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Chuẩn bị bán cho enterprise.",
      "Cần bằng chứng kiểm soát truy cập, audit, backup, incident.",
      "Muốn hệ thống vận hành có kỷ luật hơn."
    ],
    "whyNotUse": [
      "MVP cá nhân chưa có user thật.",
      "Chưa lưu dữ liệu nhạy cảm."
    ],
    "relatedPatterns": [
      "audit-log-enterprise",
      "backup-restore-postgres",
      "incident-runbook-template"
    ],
    "searchKeywords": [
      "soc2",
      "compliance",
      "enterprise checklist",
      "governance",
      "docs/compliance/soc2-lite-checklist.md",
      "Checklist SOC2-lite cho backend.",
      "minimal"
    ]
  },
  {
    "id": "security-incident-response",
    "title": "Security Incident Response Runbook",
    "vietnameseTitle": "Runbook xử lý sự cố bảo mật",
    "shortDescription": "Quy trình cô lập, điều tra, rotate secret, thông báo và postmortem khi có nghi ngờ lộ dữ liệu/secret.",
    "category": "enterprise-saas",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Runbook"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có user thật và dữ liệu nhạy cảm.",
      "Có secret/API key/webhook có thể bị lộ.",
      "Cần phản ứng nhanh khi incident xảy ra."
    ],
    "whyNotUse": [
      "Prototype local chưa vận hành.",
      "Chưa có bất kỳ dữ liệu production nào."
    ],
    "relatedPatterns": [
      "audit-log-enterprise",
      "secret-rotation-runbook",
      "pii-redaction-logging"
    ],
    "searchKeywords": [
      "security incident",
      "incident response",
      "breach",
      "runbook",
      "docs/runbooks/security-incident-response.md",
      "Runbook incident bảo mật.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-project-structure",
    "title": "FastAPI Production Project Structure",
    "vietnameseTitle": "Cấu trúc dự án FastAPI production",
    "shortDescription": "Cấu trúc folder rõ layer router, schema, service, repository, model, core config và tests để dự án dễ mở rộng.",
    "category": "fastapi",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Bắt đầu dự án FastAPI mới cần cấu trúc sạch.",
      "Muốn tách router/service/repository để tránh logic nằm trong route.",
      "Dự án sẽ có auth, database, upload, job hoặc nhiều module."
    ],
    "whyNotUse": [
      "Prototype 1 file cực nhỏ chỉ test ý tưởng.",
      "Team chưa cần tách domain và chưa có database."
    ],
    "relatedPatterns": [
      "fastapi-crud-api",
      "settings-management",
      "healthcheck-endpoint"
    ],
    "searchKeywords": [
      "folder structure",
      "clean architecture",
      "layered",
      "app/main.py",
      "App entrypoint production-friendly.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-crud-api",
    "title": "FastAPI CRUD API with Service Layer",
    "vietnameseTitle": "CRUD API FastAPI chuẩn service layer",
    "shortDescription": "Template CRUD API có router, schema, service, repository và xử lý lỗi 404 rõ ràng.",
    "category": "fastapi",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần API thêm/sửa/xóa/xem dữ liệu.",
      "Muốn code dễ test và không query DB trực tiếp trong router.",
      "Frontend cần response schema ổn định."
    ],
    "whyNotUse": [
      "Tác vụ chỉ đọc 1 endpoint đơn giản không cần DB.",
      "Dự án dùng Django/DRF thì nên dùng ViewSet/Serializer."
    ],
    "relatedPatterns": [
      "pydantic-schema-validation",
      "sqlalchemy-session-pattern"
    ],
    "searchKeywords": [
      "app/routers/user_router.py",
      "Router CRUD tối giản nhưng production-aware.",
      "minimal",
      "app/services/user_service.py",
      "Service layer kiểm tra trùng email, tách business logic khỏi router và repository.",
      "production",
      "tests/test_user_api.py",
      "Integration test cho create/get user để đảm bảo route, schema và service chạy đúng.",
      "test"
    ]
  },
  {
    "id": "image-upload-validation",
    "title": "Secure Image Upload Validation",
    "vietnameseTitle": "Upload ảnh an toàn",
    "shortDescription": "Nhận ảnh qua multipart, giới hạn dung lượng, kiểm tra MIME và đổi tên file an toàn.",
    "category": "file-upload",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "python-multipart",
      "Pillow",
      "filetype"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User upload ảnh avatar/product/document.",
      "Cần tránh file độc hại hoặc quá lớn.",
      "Cần lưu metadata file."
    ],
    "whyNotUse": [
      "File upload trực tiếp lên S3 bằng presigned URL.",
      "Không nhận file từ user."
    ],
    "relatedPatterns": [
      "image-ocr-api",
      "s3-presigned-upload"
    ],
    "searchKeywords": [
      "app/core/file_validation.py",
      "Validate image upload.",
      "minimal"
    ]
  },
  {
    "id": "s3-presigned-upload",
    "title": "S3 Presigned Upload URL",
    "vietnameseTitle": "Upload file lên S3 bằng presigned URL",
    "shortDescription": "Backend tạo presigned URL để client upload trực tiếp lên S3/MinIO, giảm tải server.",
    "category": "file-upload",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "boto3",
      "FastAPI",
      "S3/MinIO"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "File lớn không nên đi qua backend.",
      "Cần private bucket và URL upload có hạn.",
      "Muốn scale upload tốt."
    ],
    "whyNotUse": [
      "File nhỏ cần backend xử lý ngay.",
      "Không dùng object storage."
    ],
    "relatedPatterns": [
      "image-upload-validation"
    ],
    "searchKeywords": [
      "app/services/storage_service.py",
      "Tạo presigned upload URL.",
      "minimal",
      "app/services/storage_service.py",
      "Storage service production: whitelist content type, safe object key và hạn chế thời gian URL.",
      "production",
      "tests/test_s3_presigned_upload.py",
      "Test presigned URL chỉ cho content type hợp lệ và key nằm trong private namespace.",
      "test"
    ]
  },
  {
    "id": "csv-excel-import",
    "title": "CSV / Excel Import with Row Validation",
    "vietnameseTitle": "Import CSV/Excel có validate từng dòng",
    "shortDescription": "Upload file dữ liệu, validate từng dòng, trả error report và bulk insert an toàn.",
    "category": "file-upload",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pandas",
      "openpyxl",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Admin import danh sách user/product/order.",
      "Cần báo lỗi từng dòng.",
      "Cần bulk insert sau khi validate."
    ],
    "whyNotUse": [
      "File rất lớn cần streaming/chunk job.",
      "Dữ liệu nhạy cảm chưa có audit log."
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/services/import_service.py",
      "Validate Excel rows.",
      "minimal"
    ]
  },
  {
    "id": "file-validation-security",
    "title": "File Upload Validation Security",
    "vietnameseTitle": "Bảo mật upload file",
    "shortDescription": "Validation file size, MIME, extension và safe filename trước khi lưu hoặc xử lý OCR/import.",
    "category": "file-upload",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "python-magic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có upload ảnh/PDF/Excel/CSV.",
      "Cần tránh file giả MIME hoặc file quá lớn.",
      "Cần đổi filename để tránh path traversal."
    ],
    "whyNotUse": [
      "Không nhận file từ user.",
      "Chỉ xử lý file nội bộ tin cậy."
    ],
    "relatedPatterns": [
      "image-upload-validation",
      "s3-presigned-upload"
    ],
    "searchKeywords": [
      "file security",
      "mime",
      "extension",
      "safe filename",
      "app/core/file_validation.py",
      "Validation upload an toàn.",
      "minimal",
      "tests/test_file_validation.py",
      "Chặn extension nguy hiểm.",
      "test"
    ]
  },
  {
    "id": "large-file-chunked-upload",
    "title": "Large File Chunked Upload",
    "vietnameseTitle": "Upload file lớn theo chunk",
    "shortDescription": "Pattern upload file lớn theo từng chunk, lưu trạng thái và ghép file khi đủ chunks.",
    "category": "file-upload",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "S3",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "File lớn dễ timeout nếu upload một lần.",
      "Cần resume upload.",
      "Cần kiểm soát chunk index/checksum."
    ],
    "whyNotUse": [
      "File nhỏ dưới vài MB.",
      "Có thể dùng presigned S3 multipart trực tiếp."
    ],
    "relatedPatterns": [
      "s3-presigned-upload",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "chunk upload",
      "large file",
      "resume upload",
      "app/routers/chunk_upload_router.py",
      "API nhận chunk và hoàn tất upload.",
      "minimal",
      "tests/test_chunk_upload.py",
      "Test chunk endpoint trả received.",
      "test"
    ]
  },
  {
    "id": "csv-import-validation",
    "title": "CSV Import with Row Validation",
    "vietnameseTitle": "Import CSV có validate từng dòng",
    "shortDescription": "Import CSV/Excel có validation row, trả error report và chỉ bulk insert khi dữ liệu hợp lệ.",
    "category": "file-upload",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pandas",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "User upload CSV/Excel.",
      "Cần báo lỗi từng dòng.",
      "Cần tránh insert dữ liệu bẩn."
    ],
    "whyNotUse": [
      "File rất nhỏ nhập thủ công được.",
      "Import chạy hoàn toàn nội bộ."
    ],
    "relatedPatterns": [
      "file-validation-security",
      "job-status-api"
    ],
    "searchKeywords": [
      "csv import",
      "excel import",
      "row validation",
      "app/services/import_service.py",
      "Validate từng row bằng Pydantic.",
      "minimal",
      "tests/test_csv_import.py",
      "Invalid row có error report.",
      "test"
    ]
  },
  {
    "id": "image-ocr-api",
    "title": "Image OCR API with PaddleOCR",
    "vietnameseTitle": "API chụp ảnh OCR",
    "shortDescription": "Upload ảnh, tiền xử lý bằng OpenCV/Pillow, trích xuất text bằng PaddleOCR và trả JSON.",
    "category": "ocr-docs",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "UploadFile",
      "Pillow",
      "OpenCV",
      "PaddleOCR"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Đọc chữ từ ảnh, hóa đơn, tài liệu, phiếu điểm.",
      "Cần OCR local không gửi dữ liệu ra cloud.",
      "Cần trích xuất text từ ảnh upload."
    ],
    "whyNotUse": [
      "File lớn/PDF nhiều trang xử lý trực tiếp trong request.",
      "Cần SLA realtime dưới 100ms.",
      "Server RAM quá thấp để load OCR model."
    ],
    "relatedPatterns": [
      "image-upload-validation",
      "pdf-ocr-api",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/routers/ocr_router.py",
      "Endpoint OCR ảnh.",
      "minimal",
      "app/services/file_validation.py",
      "Validation file upload: giới hạn dung lượng, extension và MIME type trước khi OCR.",
      "production",
      "tests/test_ocr_upload.py",
      "Test API OCR từ chối file không hợp lệ để tránh lỗi production.",
      "test"
    ]
  },
  {
    "id": "pdf-ocr-api",
    "title": "PDF OCR Background Pipeline",
    "vietnameseTitle": "OCR PDF scan nhiều trang",
    "shortDescription": "Convert PDF scan sang ảnh, OCR từng trang và xử lý nền để tránh timeout.",
    "category": "ocr-docs",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PyMuPDF",
      "PaddleOCR",
      "Celery",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "PDF scan nhiều trang cần lấy text.",
      "OCR lâu cần queue.",
      "Cần job status cho client."
    ],
    "whyNotUse": [
      "PDF đã có text layer thì dùng pypdf/PyMuPDF extract text.",
      "File rất nhạy cảm chưa có storage policy."
    ],
    "relatedPatterns": [
      "image-ocr-api",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/tasks/pdf_ocr_task.py",
      "Task OCR PDF nền.",
      "minimal",
      "app/services/pdf_service.py",
      "Render PDF từng trang có giới hạn số trang, DPI và dung lượng để tránh worker quá tải.",
      "production",
      "tests/test_pdf_ocr.py",
      "Test API tạo OCR job cho PDF, không xử lý file trực tiếp trong request.",
      "test"
    ]
  },
  {
    "id": "request-logging",
    "title": "Request Logging with Correlation ID",
    "vietnameseTitle": "Logging request + correlation ID",
    "shortDescription": "Middleware gắn request id, log method/path/status/time và hỗ trợ debug production.",
    "category": "testing",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "logging"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần trace lỗi production.",
      "Cần correlation id giữa frontend/backend.",
      "Cần log thời gian xử lý request."
    ],
    "whyNotUse": [
      "App CLI không có HTTP request.",
      "Đã có observability gateway xử lý."
    ],
    "relatedPatterns": [
      "global-error-handling"
    ],
    "searchKeywords": [
      "app/middleware/request_logging.py",
      "Middleware logging.",
      "minimal"
    ]
  },
  {
    "id": "pytest-api-tests",
    "title": "Pytest API Tests with httpx",
    "vietnameseTitle": "Test API bằng pytest/httpx",
    "shortDescription": "Test endpoint FastAPI, fixture test client, assert status code và response schema.",
    "category": "testing",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "httpx",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần kiểm tra API trước deploy.",
      "Cần test auth/upload/webhook.",
      "Cần CI chạy tự động."
    ],
    "whyNotUse": [
      "Prototype throwaway.",
      "Chỉ test unit service không cần HTTP client."
    ],
    "relatedPatterns": [
      "healthcheck-endpoint"
    ],
    "searchKeywords": [
      "tests/test_health.py",
      "Test health endpoint.",
      "minimal",
      "tests/conftest.py",
      "Fixture client/test database dùng chung cho toàn bộ API tests.",
      "production",
      "tests/test_auth_flow.py",
      "Test flow register/login/protected route ở mức integration.",
      "test"
    ]
  },
  {
    "id": "mock-external-api",
    "title": "Mock External API in Tests",
    "vietnameseTitle": "Mock API bên ngoài trong test",
    "shortDescription": "Mock payment/OCR/LLM/email provider để test nhanh, ổn định và không tốn tiền.",
    "category": "testing",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "respx",
      "httpx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Service gọi API ngoài.",
      "Test CI không được phụ thuộc network.",
      "Cần kiểm tra retry/error handling."
    ],
    "whyNotUse": [
      "Không gọi external API.",
      "Chỉ test bằng contract sandbox riêng."
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "mock",
      "external api",
      "respx",
      "tests/test_external_api.py",
      "Mock HTTP bằng respx.",
      "minimal"
    ]
  },
  {
    "id": "test-database-fixture",
    "title": "Test Database Fixture",
    "vietnameseTitle": "Test database fixture",
    "shortDescription": "Tạo database/session riêng cho test, rollback sau mỗi test để kết quả ổn định.",
    "category": "testing",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API dùng database.",
      "Cần test repository/service thật.",
      "CI cần dữ liệu sạch mỗi test."
    ],
    "whyNotUse": [
      "Không dùng DB.",
      "Chỉ unit test pure function."
    ],
    "relatedPatterns": [
      "sqlalchemy-session-pattern",
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "test db",
      "fixture",
      "rollback",
      "tests/conftest.py",
      "Session rollback fixture.",
      "minimal",
      "tests/test_repository.py",
      "Repository dùng fixture.",
      "test"
    ]
  },
  {
    "id": "locust-load-test",
    "title": "Load Testing with Locust",
    "vietnameseTitle": "Load test API bằng Locust",
    "shortDescription": "Kiểm tra endpoint chịu tải, latency p95 và lỗi trước khi production.",
    "category": "testing",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Locust"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API quan trọng cần kiểm tra tải.",
      "Muốn phát hiện bottleneck DB/cache.",
      "Trước release lớn."
    ],
    "whyNotUse": [
      "App nhỏ chưa có traffic.",
      "Chưa có môi trường staging."
    ],
    "relatedPatterns": [
      "prometheus-metrics"
    ],
    "searchKeywords": [
      "load test",
      "performance",
      "locust",
      "locustfile.py",
      "Locust smoke load test.",
      "minimal",
      "commands.sh",
      "Chạy load test.",
      "test"
    ]
  },
  {
    "id": "webhook-signature-verification",
    "title": "Webhook Signature Verification",
    "vietnameseTitle": "Verify chữ ký webhook",
    "shortDescription": "Nhận webhook từ payment/GitHub/Slack an toàn với HMAC signature và idempotency.",
    "category": "webhook-payment",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "hmac",
      "hashlib"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhận event từ bên thứ ba.",
      "Cần chống request giả mạo.",
      "Cần xử lý retry không ghi trùng."
    ],
    "whyNotUse": [
      "Webhook provider không ký payload.",
      "Chỉ nhận nội bộ qua private network."
    ],
    "relatedPatterns": [
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "app/routers/webhook_router.py",
      "Webhook HMAC verify.",
      "minimal",
      "app/services/webhook_service.py",
      "Webhook service có verify chữ ký HMAC, idempotency key và tách xử lý event khỏi router.",
      "production",
      "tests/test_webhook_signature.py",
      "Test webhook sai chữ ký phải bị từ chối và event trùng không xử lý lại.",
      "test"
    ]
  },
  {
    "id": "payment-webhook-handler",
    "title": "Payment Webhook Status Handler",
    "vietnameseTitle": "Xử lý trạng thái thanh toán",
    "shortDescription": "Cập nhật payment status từ webhook, dùng idempotency để tránh ghi nhận trùng.",
    "category": "webhook-payment",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "SQLAlchemy",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Tích hợp Stripe/MoMo/PayOS.",
      "Cần cập nhật đơn hàng theo event.",
      "Provider có thể retry nhiều lần."
    ],
    "whyNotUse": [
      "Thanh toán xử lý thủ công.",
      "Không có database transaction."
    ],
    "relatedPatterns": [
      "webhook-signature-verification"
    ],
    "searchKeywords": [
      "app/services/payment_webhook_service.py",
      "Idempotent payment update.",
      "minimal",
      "app/services/payment_service.py",
      "Payment service dùng transaction, idempotency và không tin payment status nếu chưa qua webhook verified.",
      "production",
      "tests/test_payment_webhook.py",
      "Test webhook payment idempotent: gửi cùng event nhiều lần không cộng tiền/trạng thái lại.",
      "test"
    ]
  },
  {
    "id": "release-checklist",
    "title": "Release Checklist",
    "vietnameseTitle": "Checklist release production",
    "shortDescription": "Checklist trước khi release để đảm bảo lint, build, QA, rollback, monitoring và content review đã sẵn sàng.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "GitHub Actions",
      "Vercel"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Sắp deploy bản mới lên production.",
      "Muốn tránh quên lint/build/browser QA.",
      "Team cần quy trình release lặp lại được."
    ],
    "whyNotUse": [
      "Prototype local chưa có user thật.",
      "Thay đổi chỉ là note cá nhân không deploy."
    ],
    "relatedPatterns": [
      "browser-qa-checklist",
      "vercel-deployment-checklist",
      "rollback-strategy"
    ],
    "searchKeywords": [
      "release checklist",
      "production release",
      "quality gate",
      "deploy checklist",
      "docs/release/release-checklist.md",
      "Checklist release ngắn gọn nhưng đủ dùng.",
      "minimal",
      ".github/workflows/ci.yml",
      "CI quality gate tối thiểu.",
      "production"
    ]
  },
  {
    "id": "migration-safety-checklist",
    "title": "Migration Safety Checklist",
    "vietnameseTitle": "Checklist an toàn migration",
    "shortDescription": "Checklist migration database an toàn: backward compatible, rollback plan, batch update và zero-downtime mindset.",
    "category": "operations-release",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "Alembic",
      "Django Migrations"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Backend có database production.",
      "Migration thay đổi schema hoặc data lớn.",
      "Muốn giảm downtime và rollback rủi ro."
    ],
    "whyNotUse": [
      "App static không có database runtime.",
      "Migration chỉ chạy local test."
    ],
    "relatedPatterns": [
      "alembic-migration",
      "django-deployment-checklist"
    ],
    "searchKeywords": [
      "migration safety",
      "zero downtime migration",
      "alembic migration",
      "django migration",
      "docs/release/migration-safety.md",
      "Checklist migration an toàn.",
      "minimal"
    ]
  },
  {
    "id": "rollback-strategy",
    "title": "Rollback Strategy",
    "vietnameseTitle": "Chiến lược rollback khi release lỗi",
    "shortDescription": "Chuẩn bị cách quay lại phiên bản ổn định, rollback content/static deploy và xử lý migration không rollback được.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Vercel",
      "Git"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Release có thể làm hỏng search, UI, build hoặc content.",
      "Cần quay lại nhanh nếu production lỗi.",
      "Cần biết migration nào không thể rollback đơn giản."
    ],
    "whyNotUse": [
      "Chỉ làm local không deploy.",
      "Thay đổi nhỏ không ảnh hưởng production."
    ],
    "relatedPatterns": [
      "release-checklist",
      "migration-safety-checklist",
      "incident-postmortem-template"
    ],
    "searchKeywords": [
      "rollback",
      "revert release",
      "redeploy previous",
      "production rollback",
      "docs/release/rollback-strategy.md",
      "Rollback plan thực dụng.",
      "minimal"
    ]
  },
  {
    "id": "feature-flag-rollout",
    "title": "Feature Flag Rollout",
    "vietnameseTitle": "Rollout tính năng bằng feature flag",
    "shortDescription": "Dùng feature flag để bật tính năng theo môi trường, tenant, phần trăm user hoặc allowlist.",
    "category": "operations-release",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic Settings",
      "Redis optional"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn release code nhưng chưa bật feature cho mọi user.",
      "Cần thử nghiệm theo tenant/allowlist.",
      "Cần kill switch khi feature lỗi."
    ],
    "whyNotUse": [
      "Feature nhỏ không rủi ro.",
      "Team chưa có quy trình dọn flag cũ."
    ],
    "relatedPatterns": [
      "plan-limit-enforcement",
      "release-checklist"
    ],
    "searchKeywords": [
      "feature flag",
      "rollout",
      "kill switch",
      "allowlist",
      "app/core/feature_flags.py",
      "Feature flag service tối thiểu.",
      "minimal",
      "docs/release/feature-flags.md",
      "Quy tắc dùng feature flag.",
      "production"
    ]
  },
  {
    "id": "backup-restore-verification",
    "title": "Backup / Restore Verification",
    "vietnameseTitle": "Kiểm tra backup và restore",
    "shortDescription": "Không chỉ tạo backup, mà phải định kỳ restore thử để biết backup có dùng được khi sự cố xảy ra.",
    "category": "operations-release",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Advanced",
    "libraries": [
      "PostgreSQL",
      "S3"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Production có database hoặc file storage quan trọng.",
      "Cần đảm bảo khôi phục được sau incident.",
      "Enterprise/compliance yêu cầu evidence."
    ],
    "whyNotUse": [
      "App static không lưu dữ liệu server.",
      "Dữ liệu có thể rebuild hoàn toàn từ Git."
    ],
    "relatedPatterns": [
      "backup-restore-postgres",
      "security-incident-response"
    ],
    "searchKeywords": [
      "backup restore",
      "restore verification",
      "disaster recovery",
      "rpo rto",
      "docs/runbooks/backup-restore-verification.md",
      "Runbook verify backup/restore.",
      "minimal"
    ]
  },
  {
    "id": "incident-postmortem-template",
    "title": "Incident Postmortem Template",
    "vietnameseTitle": "Template postmortem sau sự cố",
    "shortDescription": "Template ghi lại timeline, impact, root cause và action items sau incident để tránh lặp lại lỗi.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Runbook"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có sự cố production, deploy lỗi hoặc security incident.",
      "Muốn học từ lỗi thay vì chỉ fix tạm.",
      "Cần action items có owner."
    ],
    "whyNotUse": [
      "Bug nhỏ local không ảnh hưởng user.",
      "Không có production system."
    ],
    "relatedPatterns": [
      "security-incident-response",
      "release-checklist"
    ],
    "searchKeywords": [
      "postmortem",
      "incident report",
      "root cause",
      "action items",
      "docs/incidents/postmortem-template.md",
      "Postmortem template.",
      "minimal"
    ]
  },
  {
    "id": "dependency-update-workflow",
    "title": "Dependency Update Workflow",
    "vietnameseTitle": "Quy trình cập nhật dependency",
    "shortDescription": "Quy trình cập nhật package an toàn: phân loại patch/minor/major, chạy test/build và ghi breaking changes.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Dependabot",
      "npm",
      "pip"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Project dùng nhiều package frontend/backend.",
      "Cần cập nhật security patch.",
      "Muốn tránh update làm vỡ build/template."
    ],
    "whyNotUse": [
      "Prototype không deploy.",
      "Repo đóng băng không maintenance."
    ],
    "relatedPatterns": [
      "release-checklist",
      "browser-qa-checklist"
    ],
    "searchKeywords": [
      "dependency update",
      "dependabot",
      "npm audit",
      "package update",
      ".github/dependabot.yml",
      "Dependabot cho npm package.",
      "minimal",
      "docs/maintenance/dependency-update.md",
      "Checklist update dependency.",
      "production"
    ]
  },
  {
    "id": "content-freshness-workflow",
    "title": "Content Freshness Workflow",
    "vietnameseTitle": "Quy trình giữ nội dung luôn mới",
    "shortDescription": "Quy trình review định kỳ pattern, library version, deprecated content và updatedAt để thư viện không lỗi thời.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Git",
      "Content Review"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Thư viện backend thay đổi liên tục.",
      "Pattern cũ có thể sai hoặc lỗi thời.",
      "Cần biết nội dung nào cần review lại."
    ],
    "whyNotUse": [
      "Tài liệu dùng một lần.",
      "Không có kế hoạch bảo trì."
    ],
    "relatedPatterns": [
      "deprecated-pattern-flag",
      "bundle-content-performance-checklist"
    ],
    "searchKeywords": [
      "content freshness",
      "content review",
      "updatedAt",
      "maintenance workflow",
      "docs/maintenance/content-freshness.md",
      "Workflow review nội dung định kỳ.",
      "minimal"
    ]
  },
  {
    "id": "deprecated-pattern-flag",
    "title": "Deprecated Pattern Flag",
    "vietnameseTitle": "Đánh dấu pattern đã lỗi thời",
    "shortDescription": "Thêm metadata deprecated/replacement để cảnh báo người dùng không copy template cũ hoặc không còn khuyến nghị.",
    "category": "operations-release",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "TypeScript"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Pattern cũ không còn nên dùng.",
      "Library đổi API hoặc có lỗ hổng.",
      "Muốn giữ lịch sử nhưng cảnh báo rõ."
    ],
    "whyNotUse": [
      "Bạn xóa hẳn content cũ và không cần lịch sử.",
      "Library/pattern vẫn còn tốt."
    ],
    "relatedPatterns": [
      "content-freshness-workflow"
    ],
    "searchKeywords": [
      "deprecated pattern",
      "replacement",
      "content lifecycle",
      "deprecation",
      "src/types.ts",
      "Metadata deprecated đề xuất thêm vào Pattern.",
      "minimal",
      "src/components/DeprecatedBanner.tsx",
      "Banner cảnh báo pattern deprecated.",
      "production"
    ]
  },
  {
    "id": "browser-qa-checklist",
    "title": "Browser QA Checklist",
    "vietnameseTitle": "Checklist kiểm tra trình duyệt trước deploy",
    "shortDescription": "Checklist kiểm tra thực tế trên browser: search, filter, detail page, copy, empty state, console và layout desktop.",
    "category": "operations-release",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Chrome",
      "Edge",
      "Playwright optional"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Build pass nhưng UI vẫn có thể lỗi.",
      "Cần kiểm tra app thật trước deploy.",
      "Search/copy/filter là tính năng lõi."
    ],
    "whyNotUse": [
      "Chỉ sửa docs không ảnh hưởng UI.",
      "Chưa có app chạy được."
    ],
    "relatedPatterns": [
      "release-checklist",
      "vercel-deployment-checklist"
    ],
    "searchKeywords": [
      "browser qa",
      "manual qa",
      "search test",
      "copy button test",
      "docs/qa/browser-qa-checklist.md",
      "Browser QA checklist cho app này.",
      "minimal"
    ]
  },
  {
    "id": "vercel-deployment-checklist",
    "title": "Vercel Deployment Checklist",
    "vietnameseTitle": "Checklist deploy Vercel",
    "shortDescription": "Checklist deploy Vite/React static app lên Vercel, kiểm tra build command, output, preview và production URL.",
    "category": "operations-release",
    "difficulty": "Easy",
    "difficultyVi": "Dễ",
    "productionLevel": "Production-ready",
    "libraries": [
      "Vercel",
      "Vite",
      "React"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Deploy Python Backend Compass lên Vercel.",
      "Cần preview deployment trước production.",
      "Muốn tránh sai build/output config."
    ],
    "whyNotUse": [
      "Deploy sang hosting khác.",
      "Chỉ chạy local."
    ],
    "relatedPatterns": [
      "browser-qa-checklist",
      "release-checklist"
    ],
    "searchKeywords": [
      "vercel deploy",
      "vite vercel",
      "output dist",
      "preview deployment",
      "docs/deploy/vercel-checklist.md",
      "Checklist deploy Vercel cho Vite static app.",
      "minimal",
      "vercel.json",
      "Optional SPA fallback cho Vite nếu cần.",
      "config"
    ]
  },
  {
    "id": "bundle-content-performance-checklist",
    "title": "Bundle / Content Performance Checklist",
    "vietnameseTitle": "Checklist hiệu năng bundle và content",
    "shortDescription": "Theo dõi bundle size khi thư viện có nhiều pattern; tách search index và lazy-load content khi cần.",
    "category": "operations-release",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Vite",
      "React"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Static library có 150+ patterns và code templates.",
      "Vite cảnh báo chunk lớn hơn 500kB.",
      "Muốn app load nhanh trước khi mở rộng tiếp."
    ],
    "whyNotUse": [
      "Content còn rất nhỏ.",
      "Không quan tâm load time vì chỉ dùng local."
    ],
    "relatedPatterns": [
      "content-freshness-workflow",
      "browser-qa-checklist"
    ],
    "searchKeywords": [
      "bundle size",
      "content performance",
      "vite chunk warning",
      "lazy load patterns",
      "docs/performance/bundle-content-checklist.md",
      "Checklist tối ưu bundle/content.",
      "minimal"
    ]
  },
  {
    "id": "postgres-transaction-isolation",
    "title": "PostgreSQL Transaction Isolation",
    "vietnameseTitle": "Isolation level trong PostgreSQL",
    "shortDescription": "Chọn isolation level đúng để tránh dirty/non-repeatable/phantom read khi xử lý tiền, tồn kho hoặc booking.",
    "category": "advanced-postgres",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Luồng có nhiều giao dịch ghi đồng thời",
      "Cần consistency cao hơn READ COMMITTED",
      "Có xử lý tiền, quota, tồn kho hoặc reservation"
    ],
    "whyNotUse": [
      "CRUD đơn giản không tranh chấp",
      "Không hiểu rõ lock và retry strategy"
    ],
    "relatedPatterns": [
      "retry-backoff-policy"
    ],
    "searchKeywords": [
      "transaction isolation",
      "serializable",
      "postgres",
      "app/db/transaction.py",
      "Chọn isolation level đúng để tránh dirty/non-repeatable/phantom read khi xử lý tiền, tồn kho hoặc booking.",
      "minimal"
    ]
  },
  {
    "id": "postgres-deadlock-handling",
    "title": "PostgreSQL Deadlock Handling",
    "vietnameseTitle": "Xử lý deadlock PostgreSQL",
    "shortDescription": "Thiết kế thứ tự lock, retry và logging để giảm lỗi deadlock trong production.",
    "category": "advanced-postgres",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có nhiều transaction update nhiều bảng",
      "Log có deadlock detected",
      "Cần retry an toàn cho transaction idempotent"
    ],
    "whyNotUse": [
      "Một transaction chỉ đọc dữ liệu",
      "Không có cạnh tranh ghi"
    ],
    "relatedPatterns": [
      "postgres-transaction-isolation"
    ],
    "searchKeywords": [
      "deadlock",
      "retry",
      "lock order",
      "app/db/deadlock_retry.py",
      "Thiết kế thứ tự lock, retry và logging để giảm lỗi deadlock trong production.",
      "minimal"
    ]
  },
  {
    "id": "postgres-advisory-locks",
    "title": "PostgreSQL Advisory Locks",
    "vietnameseTitle": "Advisory lock PostgreSQL",
    "shortDescription": "Dùng advisory lock để bảo vệ tác vụ theo key như billing cycle, import job hoặc scheduled task.",
    "category": "advanced-postgres",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần chỉ một process xử lý một key",
      "Cron/job có thể chạy trùng",
      "Muốn lock nhẹ không cần row cụ thể"
    ],
    "whyNotUse": [
      "Cần lock row data chuẩn",
      "Không có PostgreSQL"
    ],
    "relatedPatterns": [
      "distributed-lock-redis"
    ],
    "searchKeywords": [
      "advisory lock",
      "pg_try_advisory_lock",
      "app/db/advisory_lock.py",
      "Dùng advisory lock để bảo vệ tác vụ theo key như billing cycle, import job hoặc scheduled task.",
      "minimal"
    ]
  },
  {
    "id": "postgres-partial-indexes",
    "title": "PostgreSQL Partial Indexes",
    "vietnameseTitle": "Partial index PostgreSQL",
    "shortDescription": "Tạo index có điều kiện để tăng tốc query phổ biến mà không phình index toàn bảng.",
    "category": "advanced-postgres",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "Alembic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Query thường filter status/deleted_at/tenant",
      "Bảng lớn nhưng chỉ một phần row active",
      "Muốn giảm index size"
    ],
    "whyNotUse": [
      "Bảng nhỏ",
      "Điều kiện query thay đổi liên tục"
    ],
    "relatedPatterns": [
      "soft-delete-restore-pattern"
    ],
    "searchKeywords": [
      "partial index",
      "concurrent index",
      "migrations/add_partial_index.py",
      "Tạo index có điều kiện để tăng tốc query phổ biến mà không phình index toàn bảng.",
      "minimal"
    ]
  },
  {
    "id": "postgres-materialized-views",
    "title": "PostgreSQL Materialized Views",
    "vietnameseTitle": "Materialized view cho báo cáo",
    "shortDescription": "Dùng materialized view cho dashboard/report nặng, refresh theo lịch để tránh query trực tiếp quá chậm.",
    "category": "advanced-postgres",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dashboard aggregate chậm",
      "Report đọc nhiều ghi ít",
      "Có thể chấp nhận dữ liệu trễ"
    ],
    "whyNotUse": [
      "Cần real-time tuyệt đối",
      "Dữ liệu nhỏ query trực tiếp được"
    ],
    "relatedPatterns": [
      "scheduled-cleanup-job"
    ],
    "searchKeywords": [
      "materialized view",
      "reporting",
      "app/reports/materialized_view.py",
      "Dùng materialized view cho dashboard/report nặng, refresh theo lịch để tránh query trực tiếp quá chậm.",
      "minimal"
    ]
  },
  {
    "id": "postgres-partitioning",
    "title": "PostgreSQL Partitioning Strategy",
    "vietnameseTitle": "Partitioning PostgreSQL",
    "shortDescription": "Partition bảng lớn theo thời gian/tenant để quản lý dữ liệu, retention và query performance.",
    "category": "advanced-postgres",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Bảng log/event rất lớn",
      "Cần retention theo tháng",
      "Query chủ yếu theo time range"
    ],
    "whyNotUse": [
      "Bảng vừa nhỏ",
      "Team chưa vận hành partition"
    ],
    "relatedPatterns": [
      "data-retention-policy"
    ],
    "searchKeywords": [
      "partitioning",
      "large table",
      "docs/database/partitioning.md",
      "Partition bảng lớn theo thời gian/tenant để quản lý dữ liệu, retention và query performance.",
      "minimal"
    ]
  },
  {
    "id": "postgres-read-replicas",
    "title": "Read Replica Routing",
    "vietnameseTitle": "Routing đọc sang read replica",
    "shortDescription": "Tách read/write database routing để giảm tải primary nhưng vẫn tránh stale read trong luồng nhạy cảm.",
    "category": "advanced-postgres",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Read-heavy API",
      "Có read replica",
      "Cần giảm tải primary"
    ],
    "whyNotUse": [
      "Cần read-after-write consistency tuyệt đối",
      "Chưa có replica monitoring"
    ],
    "relatedPatterns": [
      "redis-cache-aside"
    ],
    "searchKeywords": [
      "read replica",
      "routing",
      "stale read",
      "app/db/routing.py",
      "Tách read/write database routing để giảm tải primary nhưng vẫn tránh stale read trong luồng nhạy cảm.",
      "minimal"
    ]
  },
  {
    "id": "postgres-pool-tuning",
    "title": "PostgreSQL Connection Pool Tuning",
    "vietnameseTitle": "Tuning connection pool PostgreSQL",
    "shortDescription": "Cấu hình pool size, overflow, timeout để tránh hết connection hoặc queue request quá lâu.",
    "category": "advanced-postgres",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API bị timeout do pool exhausted",
      "Có nhiều worker/process",
      "Database giới hạn max_connections"
    ],
    "whyNotUse": [
      "Traffic thấp",
      "Dùng serverless DB với pooling riêng chưa hiểu rõ"
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "connection pool",
      "pool_size",
      "max_connections",
      "app/db/engine.py",
      "Cấu hình pool size, overflow, timeout để tránh hết connection hoặc queue request quá lâu.",
      "minimal"
    ]
  },
  {
    "id": "postgres-query-plan-playbook",
    "title": "Query Plan Playbook",
    "vietnameseTitle": "Playbook đọc EXPLAIN ANALYZE",
    "shortDescription": "Quy trình đọc EXPLAIN ANALYZE để tìm seq scan, bad join, missing index và row estimate sai.",
    "category": "advanced-postgres",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Query chậm không rõ lý do",
      "Cần quyết định thêm index hay rewrite query",
      "Muốn debug production safely"
    ],
    "whyNotUse": [
      "Không có query chậm",
      "Bảng nhỏ"
    ],
    "relatedPatterns": [
      "database-index-query-plan"
    ],
    "searchKeywords": [
      "explain analyze",
      "query plan",
      "docs/database/query-plan.md",
      "Quy trình đọc EXPLAIN ANALYZE để tìm seq scan, bad join, missing index và row estimate sai.",
      "minimal"
    ]
  },
  {
    "id": "postgres-jsonb-patterns",
    "title": "PostgreSQL JSONB Patterns",
    "vietnameseTitle": "Pattern dùng JSONB an toàn",
    "shortDescription": "Dùng JSONB cho metadata linh hoạt nhưng vẫn kiểm soát index, validation và migration khi schema ổn định.",
    "category": "advanced-postgres",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Metadata thay đổi theo provider",
      "Cần lưu payload webhook/raw event",
      "Một số field chưa ổn định schema"
    ],
    "whyNotUse": [
      "Dữ liệu quan hệ rõ nên dùng column",
      "Cần query phức tạp trên mọi key"
    ],
    "relatedPatterns": [
      "webhook-signature-verification"
    ],
    "searchKeywords": [
      "jsonb",
      "metadata",
      "gin index",
      "app/schemas/metadata.py",
      "Dùng JSONB cho metadata linh hoạt nhưng vẫn kiểm soát index, validation và migration khi schema ổn định.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-lifespan-resources",
    "title": "FastAPI Lifespan Resources",
    "vietnameseTitle": "Quản lý resource bằng lifespan",
    "shortDescription": "Dùng lifespan để tạo/đóng client, pool, model hoặc cache resource thay vì global khởi tạo lộn xộn.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần quản lý HTTP client/DB/vector client",
      "Resource phải close khi app shutdown",
      "Muốn test app sạch hơn"
    ],
    "whyNotUse": [
      "Script nhỏ không có resource dài hạn",
      "Chạy serverless rất ngắn hạn"
    ],
    "relatedPatterns": [
      "fastapi-project-structure"
    ],
    "searchKeywords": [
      "lifespan",
      "startup",
      "shutdown",
      "app/main.py",
      "Dùng lifespan để tạo/đóng client, pool, model hoặc cache resource thay vì global khởi tạo lộn xộn.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-dependency-injection-advanced",
    "title": "FastAPI Dependency Injection Advanced",
    "vietnameseTitle": "Dependency injection nâng cao",
    "shortDescription": "Tổ chức dependency theo auth, tenant, service và repository để tránh router quá dày.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Router đang chứa nhiều setup service",
      "Cần inject tenant/service/db",
      "Muốn override dependency trong test"
    ],
    "whyNotUse": [
      "App nhỏ vài endpoint",
      "Dependency chain quá phức tạp không cần thiết"
    ],
    "relatedPatterns": [
      "tenant-aware-query-filter"
    ],
    "searchKeywords": [
      "depends",
      "dependency injection",
      "app/dependencies/services.py",
      "Tổ chức dependency theo auth, tenant, service và repository để tránh router quá dày.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-middleware-ordering",
    "title": "FastAPI Middleware Ordering",
    "vietnameseTitle": "Thứ tự middleware FastAPI",
    "shortDescription": "Quản lý thứ tự CORS, correlation ID, logging, auth-like middleware và error handling để tránh bug khó tìm.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Starlette"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có nhiều middleware",
      "Log thiếu request id",
      "CORS/error handling hoạt động lạ"
    ],
    "whyNotUse": [
      "Chỉ có một middleware đơn giản",
      "Không cần cross-cutting concerns"
    ],
    "relatedPatterns": [
      "correlation-id-middleware"
    ],
    "searchKeywords": [
      "middleware order",
      "cors",
      "logging",
      "app/main.py",
      "Quản lý thứ tự CORS, correlation ID, logging, auth-like middleware và error handling để tránh bug khó tìm.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-openapi-customization",
    "title": "FastAPI OpenAPI Customization",
    "vietnameseTitle": "Tùy biến OpenAPI FastAPI",
    "shortDescription": "Tùy biến schema, tags, security scheme và metadata để docs/API contract chuyên nghiệp hơn.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API public hoặc team frontend phụ thuộc docs",
      "Cần security scheme JWT/API key rõ",
      "Cần tag/summary nhất quán"
    ],
    "whyNotUse": [
      "API nội bộ nhỏ",
      "Không dùng generated docs"
    ],
    "relatedPatterns": [
      "openapi-customization"
    ],
    "searchKeywords": [
      "openapi",
      "swagger",
      "schema",
      "app/openapi.py",
      "Tùy biến schema, tags, security scheme và metadata để docs/API contract chuyên nghiệp hơn.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-async-testing-anyio",
    "title": "FastAPI Async Testing with AnyIO",
    "vietnameseTitle": "Test async FastAPI bằng AnyIO",
    "shortDescription": "Test async endpoints/services với httpx AsyncClient và anyio để tránh lỗi event loop.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "AnyIO",
      "HTTPX",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Endpoint async thật",
      "Service dùng async DB/client",
      "TestClient sync không đủ"
    ],
    "whyNotUse": [
      "Toàn bộ app sync",
      "Không dùng async dependencies"
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "anyio",
      "async test",
      "httpx",
      "tests/test_async_api.py",
      "Test async endpoints/services với httpx AsyncClient và anyio để tránh lỗi event loop.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-exception-hierarchy",
    "title": "FastAPI Exception Hierarchy",
    "vietnameseTitle": "Hệ thống exception chuẩn",
    "shortDescription": "Tạo domain exception và handler thống nhất để API error nhất quán, dễ test và không lộ stack trace.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhiều service raise lỗi khác nhau",
      "Frontend cần error code ổn định",
      "Muốn log lỗi production rõ"
    ],
    "whyNotUse": [
      "API nhỏ chưa nhiều lỗi",
      "Chỉ prototype"
    ],
    "relatedPatterns": [
      "api-error-taxonomy"
    ],
    "searchKeywords": [
      "exception",
      "error handler",
      "app/core/exceptions.py",
      "Tạo domain exception và handler thống nhất để API error nhất quán, dễ test và không lộ stack trace.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-api-compatibility-policy",
    "title": "FastAPI Compatibility Policy",
    "vietnameseTitle": "Chính sách tương thích API",
    "shortDescription": "Đặt rule không phá vỡ client: additive changes, deprecation window, versioning và contract tests.",
    "category": "fastapi-internals",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Có client/mobile/third-party dùng API",
      "Cần tránh breaking change",
      "API sống lâu"
    ],
    "whyNotUse": [
      "API nội bộ đổi tùy ý",
      "Chưa có external client"
    ],
    "relatedPatterns": [
      "api-deprecation-policy"
    ],
    "searchKeywords": [
      "compatibility",
      "breaking change",
      "docs/api/compatibility-policy.md",
      "Đặt rule không phá vỡ client: additive changes, deprecation window, versioning và contract tests.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-background-lifespan-queue",
    "title": "FastAPI In-process Queue Boundary",
    "vietnameseTitle": "Ranh giới queue trong FastAPI",
    "shortDescription": "Biết khi nào dùng BackgroundTasks/in-process queue và khi nào bắt buộc chuyển sang Celery/worker.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Task nhỏ vài giây",
      "Cần gửi email/log nhẹ",
      "Muốn tránh timeout"
    ],
    "whyNotUse": [
      "Task dài, cần retry, cần scale worker",
      "OCR/import/export nặng"
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "backgroundtasks",
      "queue boundary",
      "docs/fastapi/background-boundary.md",
      "Biết khi nào dùng BackgroundTasks/in-process queue và khi nào bắt buộc chuyển sang Celery/worker.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-router-versioning-governance",
    "title": "FastAPI Router Versioning Governance",
    "vietnameseTitle": "Quản trị version router FastAPI",
    "shortDescription": "Tổ chức /v1, /v2 và deprecation để API versioning không loạn.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API có nhiều client",
      "Cần giữ v1 trong khi phát triển v2",
      "Muốn governance rõ"
    ],
    "whyNotUse": [
      "Internal API nhỏ",
      "Không cần versioning"
    ],
    "relatedPatterns": [
      "api-versioning-router"
    ],
    "searchKeywords": [
      "versioning",
      "router governance",
      "app/api/v1/router.py",
      "Tổ chức /v1, /v2 và deprecation để API versioning không loạn.",
      "minimal"
    ]
  },
  {
    "id": "fastapi-security-dependencies",
    "title": "FastAPI Security Dependencies",
    "vietnameseTitle": "Security dependency chuẩn",
    "shortDescription": "Tách require_user, require_scope, require_tenant để endpoint đọc rõ quyền cần thiết.",
    "category": "fastapi-internals",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhiều endpoint có quyền khác nhau",
      "Cần scope/tenant/role",
      "Muốn tránh copy paste auth logic"
    ],
    "whyNotUse": [
      "API public",
      "Chỉ một quyền global"
    ],
    "relatedPatterns": [
      "advanced-rbac-tenant-roles"
    ],
    "searchKeywords": [
      "security dependencies",
      "scope",
      "app/dependencies/security.py",
      "Tách require_user, require_scope, require_tenant để endpoint đọc rõ quyền cần thiết.",
      "minimal"
    ]
  },
  {
    "id": "api-error-taxonomy",
    "title": "API Error Code Taxonomy",
    "vietnameseTitle": "Phân loại mã lỗi API",
    "shortDescription": "Chuẩn hóa error code/status/message để frontend và client SDK xử lý ổn định.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenAPI",
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Frontend cần xử lý lỗi theo code",
      "API public cần contract ổn định",
      "Muốn giảm lỗi message parsing"
    ],
    "whyNotUse": [
      "Prototype nội bộ nhỏ",
      "Không có client phụ thuộc"
    ],
    "relatedPatterns": [
      "fastapi-exception-hierarchy"
    ],
    "searchKeywords": [
      "error taxonomy",
      "api errors",
      "docs/api/error-taxonomy.md",
      "Chuẩn hóa error code/status/message để frontend và client SDK xử lý ổn định.",
      "minimal"
    ]
  },
  {
    "id": "api-idempotency-contract",
    "title": "API Idempotency Contract",
    "vietnameseTitle": "Contract idempotency API",
    "shortDescription": "Định nghĩa endpoint nào cần Idempotency-Key và cách lưu response để retry an toàn.",
    "category": "api-governance",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Payment/order/create job có thể retry",
      "Client/mobile có network retry",
      "Muốn tránh tạo duplicate resource"
    ],
    "whyNotUse": [
      "GET/read endpoint",
      "Action không gây side effect"
    ],
    "relatedPatterns": [
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "idempotency",
      "retry contract",
      "app/api/idempotency.py",
      "Định nghĩa endpoint nào cần Idempotency-Key và cách lưu response để retry an toàn.",
      "minimal"
    ]
  },
  {
    "id": "api-pagination-contract",
    "title": "API Pagination Contract",
    "vietnameseTitle": "Contract phân trang API",
    "shortDescription": "Chuẩn hóa cursor/limit pagination để tránh response lớn và kết quả không ổn định.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Pydantic"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "List endpoint có nhiều dữ liệu",
      "Client cần next cursor",
      "Offset pagination bắt đầu chậm"
    ],
    "whyNotUse": [
      "Dữ liệu rất nhỏ",
      "Admin internal page đơn giản"
    ],
    "relatedPatterns": [
      "pagination-filtering-sorting"
    ],
    "searchKeywords": [
      "cursor pagination",
      "app/schemas/pagination.py",
      "Chuẩn hóa cursor/limit pagination để tránh response lớn và kết quả không ổn định.",
      "minimal"
    ]
  },
  {
    "id": "api-deprecation-policy",
    "title": "API Deprecation Policy",
    "vietnameseTitle": "Chính sách deprecated API",
    "shortDescription": "Thông báo, header và timeline khi endpoint/field sắp bị bỏ để client có thời gian migrate.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API có client bên ngoài",
      "Cần thay field/endpoint cũ",
      "Muốn tránh breaking change đột ngột"
    ],
    "whyNotUse": [
      "API internal có thể đổi đồng bộ",
      "Chưa có client phụ thuộc"
    ],
    "relatedPatterns": [
      "fastapi-api-compatibility-policy"
    ],
    "searchKeywords": [
      "deprecation",
      "sunset",
      "docs/api/deprecation-policy.md",
      "Thông báo, header và timeline khi endpoint/field sắp bị bỏ để client có thời gian migrate.",
      "minimal"
    ]
  },
  {
    "id": "api-sdk-generation",
    "title": "API SDK Generation",
    "vietnameseTitle": "Sinh SDK từ OpenAPI",
    "shortDescription": "Dùng OpenAPI để generate client SDK TypeScript/Python, giảm lỗi contract giữa frontend/backend.",
    "category": "api-governance",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Frontend/client SDK gọi nhiều endpoint",
      "API public cần DX tốt",
      "Muốn type-safe client"
    ],
    "whyNotUse": [
      "API nhỏ vài endpoint",
      "OpenAPI chưa ổn định"
    ],
    "relatedPatterns": [
      "fastapi-openapi-customization"
    ],
    "searchKeywords": [
      "sdk",
      "openapi client",
      "docs/api/sdk-generation.md",
      "Dùng OpenAPI để generate client SDK TypeScript/Python, giảm lỗi contract giữa frontend/backend.",
      "minimal"
    ]
  },
  {
    "id": "api-webhook-retry-contract",
    "title": "Webhook Retry Contract",
    "vietnameseTitle": "Contract retry webhook",
    "shortDescription": "Định nghĩa retry, timeout, signature, idempotency và event ordering cho webhook provider/consumer.",
    "category": "api-governance",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Bạn gửi webhook cho khách hàng",
      "Cần retry khi endpoint khách hàng lỗi",
      "Cần event delivery log"
    ],
    "whyNotUse": [
      "Không phát webhook ra ngoài",
      "Chỉ nhận webhook"
    ],
    "relatedPatterns": [
      "webhook-signature-verification"
    ],
    "searchKeywords": [
      "webhook retry",
      "event delivery",
      "docs/api/webhook-retry-contract.md",
      "Định nghĩa retry, timeout, signature, idempotency và event ordering cho webhook provider/consumer.",
      "minimal"
    ]
  },
  {
    "id": "api-contract-testing",
    "title": "API Contract Testing",
    "vietnameseTitle": "Contract testing API",
    "shortDescription": "Kiểm tra response/request khớp OpenAPI để tránh breaking changes không phát hiện.",
    "category": "api-governance",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Schemathesis",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API public hoặc frontend phụ thuộc schema",
      "Muốn phát hiện breaking change sớm",
      "Có OpenAPI schema"
    ],
    "whyNotUse": [
      "API nhỏ không có schema",
      "Chưa ổn định contract"
    ],
    "relatedPatterns": [
      "api-sdk-generation"
    ],
    "searchKeywords": [
      "contract testing",
      "schemathesis",
      "tests/test_contract.py",
      "Kiểm tra response/request khớp OpenAPI để tránh breaking changes không phát hiện.",
      "minimal"
    ]
  },
  {
    "id": "api-backward-compatible-changes",
    "title": "Backward-compatible API Changes",
    "vietnameseTitle": "Thay đổi API tương thích ngược",
    "shortDescription": "Checklist thay đổi API không làm hỏng client cũ: field additive, optional, versioned behavior.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API có nhiều client",
      "Cần release thường xuyên",
      "Muốn giảm incident do breaking change"
    ],
    "whyNotUse": [
      "Client và backend deploy cùng lúc luôn",
      "API private thử nghiệm"
    ],
    "relatedPatterns": [
      "fastapi-api-compatibility-policy"
    ],
    "searchKeywords": [
      "backward compatible",
      "docs/api/backward-compatible.md",
      "Checklist thay đổi API không làm hỏng client cũ: field additive, optional, versioned behavior.",
      "minimal"
    ]
  },
  {
    "id": "api-rate-limit-contract",
    "title": "API Rate Limit Contract",
    "vietnameseTitle": "Contract rate limit API",
    "shortDescription": "Thiết kế header limit/remaining/reset và error 429 rõ ràng cho client retry hợp lý.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Public API cần giới hạn request",
      "Client cần biết retry khi nào",
      "Muốn tránh abuse"
    ],
    "whyNotUse": [
      "Internal API sau gateway đã limit",
      "Traffic thấp"
    ],
    "relatedPatterns": [
      "rate-limit-login"
    ],
    "searchKeywords": [
      "rate limit contract",
      "docs/api/rate-limit-contract.md",
      "Thiết kế header limit/remaining/reset và error 429 rõ ràng cho client retry hợp lý.",
      "minimal"
    ]
  },
  {
    "id": "api-version-routing-strategy",
    "title": "API Version Routing Strategy",
    "vietnameseTitle": "Chiến lược route version API",
    "shortDescription": "Chọn path/header/media type versioning và rule duy trì version cũ.",
    "category": "api-governance",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "Django REST Framework"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API public cần version lâu dài",
      "Có breaking change sắp tới",
      "Client upgrade chậm"
    ],
    "whyNotUse": [
      "API nội bộ deploy đồng bộ",
      "Không có breaking change"
    ],
    "relatedPatterns": [
      "fastapi-router-versioning-governance"
    ],
    "searchKeywords": [
      "api versioning",
      "docs/api/versioning-strategy.md",
      "Chọn path/header/media type versioning và rule duy trì version cũ.",
      "minimal"
    ]
  },
  {
    "id": "property-based-testing-hypothesis",
    "title": "Property-based Testing with Hypothesis",
    "vietnameseTitle": "Test theo thuộc tính bằng Hypothesis",
    "shortDescription": "Sinh nhiều input edge cases để test validation, parser, calculator, pricing và business rules.",
    "category": "testing-quality",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Hypothesis",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Logic có nhiều input edge cases",
      "Validation dễ bỏ sót case",
      "Muốn tăng chất lượng test"
    ],
    "whyNotUse": [
      "Endpoint đơn giản ít logic",
      "Team chưa quen property tests"
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "hypothesis",
      "property test",
      "tests/test_property.py",
      "Sinh nhiều input edge cases để test validation, parser, calculator, pricing và business rules.",
      "minimal"
    ]
  },
  {
    "id": "mutation-testing-python",
    "title": "Mutation Testing Python",
    "vietnameseTitle": "Mutation testing Python",
    "shortDescription": "Đo test suite có thực sự bắt lỗi không bằng cách mutate code và xem test có fail.",
    "category": "testing-quality",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "mutmut",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Test coverage cao nhưng vẫn lo thiếu assert",
      "Logic critical như billing/permissions",
      "Muốn cải thiện test quality"
    ],
    "whyNotUse": [
      "Test suite còn rất nhỏ/chậm",
      "Prototype"
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "mutation testing",
      "docs/testing/mutation-testing.md",
      "Đo test suite có thực sự bắt lỗi không bằng cách mutate code và xem test có fail.",
      "minimal"
    ]
  },
  {
    "id": "api-e2e-flow-testing",
    "title": "API E2E Flow Testing",
    "vietnameseTitle": "Test luồng API end-to-end",
    "shortDescription": "Test luồng nhiều bước như register→login→create→update→delete để bắt lỗi tích hợp.",
    "category": "testing-quality",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "HTTPX"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhiều endpoint liên quan nhau",
      "Muốn test user journey thật",
      "Cần confidence trước deploy"
    ],
    "whyNotUse": [
      "Chỉ unit test service nhỏ",
      "API chưa ổn định"
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "e2e api test",
      "tests/test_e2e_flow.py",
      "Test luồng nhiều bước như register→login→create→update→delete để bắt lỗi tích hợp.",
      "minimal"
    ]
  },
  {
    "id": "consumer-driven-contract-testing",
    "title": "Consumer-driven Contract Testing",
    "vietnameseTitle": "Contract test theo consumer",
    "shortDescription": "Đảm bảo backend không phá contract mà frontend/mobile/third-party đang dùng.",
    "category": "testing-quality",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pact",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhiều consumer gọi API",
      "Release backend/frontend lệch nhau",
      "Cần phát hiện breaking change"
    ],
    "whyNotUse": [
      "Một app fullstack deploy cùng lúc",
      "Không có external client"
    ],
    "relatedPatterns": [
      "api-contract-testing"
    ],
    "searchKeywords": [
      "consumer contract",
      "pact",
      "docs/testing/consumer-contract.md",
      "Đảm bảo backend không phá contract mà frontend/mobile/third-party đang dùng.",
      "minimal"
    ]
  },
  {
    "id": "load-test-scenarios",
    "title": "Load Test Scenarios by Endpoint",
    "vietnameseTitle": "Kịch bản load test theo endpoint",
    "shortDescription": "Tạo kịch bản load test riêng cho read-heavy, write-heavy, upload, RAG và auth endpoints.",
    "category": "testing-quality",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Locust"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Chuẩn bị production traffic",
      "Cần biết endpoint nào nghẽn",
      "Muốn đo p95/p99"
    ],
    "whyNotUse": [
      "Prototype chưa có traffic",
      "Không có môi trường test"
    ],
    "relatedPatterns": [
      "locust-load-test"
    ],
    "searchKeywords": [
      "load test",
      "locust",
      "locustfile.py",
      "Tạo kịch bản load test riêng cho read-heavy, write-heavy, upload, RAG và auth endpoints.",
      "minimal"
    ]
  },
  {
    "id": "test-data-factory-pattern",
    "title": "Test Data Factory Pattern",
    "vietnameseTitle": "Factory tạo dữ liệu test",
    "shortDescription": "Dùng factory để tạo user/org/project nhất quán, tránh fixture rối và test phụ thuộc nhau.",
    "category": "testing-quality",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "factory_boy",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Test nhiều model liên quan",
      "Fixture bị trùng lặp",
      "Cần tạo data nhanh"
    ],
    "whyNotUse": [
      "Test rất ít",
      "Không dùng ORM"
    ],
    "relatedPatterns": [
      "django-testing-fixtures"
    ],
    "searchKeywords": [
      "factory_boy",
      "test data",
      "tests/factories.py",
      "Dùng factory để tạo user/org/project nhất quán, tránh fixture rối và test phụ thuộc nhau.",
      "minimal"
    ]
  },
  {
    "id": "snapshot-openapi-testing",
    "title": "OpenAPI Snapshot Testing",
    "vietnameseTitle": "Snapshot test OpenAPI schema",
    "shortDescription": "Lưu snapshot schema để phát hiện thay đổi API ngoài ý muốn.",
    "category": "testing-quality",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "pytest",
      "OpenAPI"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "API contract quan trọng",
      "Muốn biết schema đổi khi nào",
      "Có SDK/generated client"
    ],
    "whyNotUse": [
      "Schema thay đổi liên tục có chủ đích",
      "API internal nhỏ"
    ],
    "relatedPatterns": [
      "api-sdk-generation"
    ],
    "searchKeywords": [
      "openapi snapshot",
      "tests/test_openapi_snapshot.py",
      "Lưu snapshot schema để phát hiện thay đổi API ngoài ý muốn.",
      "minimal"
    ]
  },
  {
    "id": "testcontainers-integration",
    "title": "Testcontainers Integration Tests",
    "vietnameseTitle": "Integration test bằng Testcontainers",
    "shortDescription": "Chạy PostgreSQL/Redis thật trong test để bắt lỗi khác biệt với mock/in-memory.",
    "category": "testing-quality",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "testcontainers",
      "pytest"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần test DB/Redis behavior thật",
      "Mock không đủ tin cậy",
      "CI có Docker"
    ],
    "whyNotUse": [
      "CI không chạy Docker",
      "Unit test đủ cho logic nhỏ"
    ],
    "relatedPatterns": [
      "pytest-api-tests"
    ],
    "searchKeywords": [
      "testcontainers",
      "integration test",
      "tests/test_postgres_container.py",
      "Chạy PostgreSQL/Redis thật trong test để bắt lỗi khác biệt với mock/in-memory.",
      "minimal"
    ]
  },
  {
    "id": "docker-compose-prod-like",
    "title": "Docker Compose Production-like Local Stack",
    "vietnameseTitle": "Docker Compose local giống production",
    "shortDescription": "Dựng Postgres, Redis, worker, API để dev/test gần production hơn.",
    "category": "devops-cloud",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Docker Compose"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Backend có DB/Redis/worker",
      "Muốn onboarding dev nhanh",
      "Cần test integration local"
    ],
    "whyNotUse": [
      "App static-only",
      "Dự án cực nhỏ không service ngoài"
    ],
    "relatedPatterns": [
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "docker compose",
      "docker-compose.yml",
      "Dựng Postgres, Redis, worker, API để dev/test gần production hơn.",
      "minimal"
    ]
  },
  {
    "id": "kubernetes-basics-fastapi",
    "title": "Kubernetes Basics for FastAPI",
    "vietnameseTitle": "Kubernetes basics cho FastAPI",
    "shortDescription": "Deployment, Service, ConfigMap, Secret và readiness/liveness probe tối thiểu.",
    "category": "devops-cloud",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Kubernetes"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần deploy container lên cluster",
      "Cần rolling update/scale",
      "Team dùng Kubernetes"
    ],
    "whyNotUse": [
      "Deploy Vercel/static app",
      "Small app dùng Render/Fly/Cloud Run là đủ"
    ],
    "relatedPatterns": [
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "kubernetes",
      "deployment",
      "k8s/deployment.yaml",
      "Deployment, Service, ConfigMap, Secret và readiness/liveness probe tối thiểu.",
      "minimal"
    ]
  },
  {
    "id": "cloud-run-fastapi-deploy",
    "title": "Cloud Run FastAPI Deploy",
    "vietnameseTitle": "Deploy FastAPI lên Cloud Run",
    "shortDescription": "Checklist container hóa FastAPI cho Google Cloud Run với env, port, health và concurrency.",
    "category": "devops-cloud",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Cloud Run",
      "Docker"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn serverless container backend",
      "Traffic thay đổi thất thường",
      "Không muốn quản lý VM"
    ],
    "whyNotUse": [
      "App static frontend",
      "Cần long-lived websocket phức tạp"
    ],
    "relatedPatterns": [
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "cloud run",
      "docs/deploy/cloud-run.md",
      "Checklist container hóa FastAPI cho Google Cloud Run với env, port, health và concurrency.",
      "minimal"
    ]
  },
  {
    "id": "nginx-reverse-proxy",
    "title": "Nginx Reverse Proxy",
    "vietnameseTitle": "Nginx reverse proxy cho backend",
    "shortDescription": "Cấu hình proxy, timeout, upload size, headers và gzip/brotli cho API.",
    "category": "devops-cloud",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Nginx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Deploy VM/VPS",
      "Cần TLS/reverse proxy",
      "Upload file/API timeout cần chỉnh"
    ],
    "whyNotUse": [
      "Deploy PaaS đã có proxy",
      "Static Vercel app"
    ],
    "relatedPatterns": [
      "file-validation-security"
    ],
    "searchKeywords": [
      "nginx",
      "reverse proxy",
      "nginx/backend.conf",
      "Cấu hình proxy, timeout, upload size, headers và gzip/brotli cho API.",
      "minimal"
    ]
  },
  {
    "id": "tls-ssl-checklist",
    "title": "TLS/SSL Checklist",
    "vietnameseTitle": "Checklist TLS/SSL",
    "shortDescription": "Checklist HTTPS, HSTS, secure cookies, redirect và certificate renewal.",
    "category": "devops-cloud",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "TLS",
      "Nginx"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Deploy production domain",
      "Có auth/cookie/API traffic",
      "Cần tránh mixed content"
    ],
    "whyNotUse": [
      "Local only",
      "Vercel tự quản TLS nhưng vẫn cần kiểm tra"
    ],
    "relatedPatterns": [
      "security-headers-middleware"
    ],
    "searchKeywords": [
      "tls",
      "ssl",
      "https",
      "docs/security/tls-checklist.md",
      "Checklist HTTPS, HSTS, secure cookies, redirect và certificate renewal.",
      "minimal"
    ]
  },
  {
    "id": "blue-green-deployment",
    "title": "Blue/Green Deployment",
    "vietnameseTitle": "Blue/green deployment",
    "shortDescription": "Triển khai phiên bản mới song song, chuyển traffic khi smoke test pass để giảm rủi ro.",
    "category": "devops-cloud",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Load Balancer",
      "Docker"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Production critical",
      "Cần rollback nhanh",
      "Không muốn downtime deploy"
    ],
    "whyNotUse": [
      "Static Vercel preview đủ dùng",
      "App nhỏ ít user"
    ],
    "relatedPatterns": [
      "rollback-strategy"
    ],
    "searchKeywords": [
      "blue green",
      "docs/deploy/blue-green.md",
      "Triển khai phiên bản mới song song, chuyển traffic khi smoke test pass để giảm rủi ro.",
      "minimal"
    ]
  },
  {
    "id": "terraform-basics-backend",
    "title": "Terraform Basics for Backend",
    "vietnameseTitle": "Terraform basics cho backend",
    "shortDescription": "Quản lý database, bucket, secrets và service bằng Infrastructure as Code.",
    "category": "devops-cloud",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Terraform"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cloud resources cần repeatable",
      "Muốn review infra changes",
      "Có nhiều env dev/staging/prod"
    ],
    "whyNotUse": [
      "Chỉ deploy Vercel static",
      "Không có cloud infra"
    ],
    "relatedPatterns": [
      "secure-file-storage-access"
    ],
    "searchKeywords": [
      "terraform",
      "iac",
      "infra/main.tf",
      "Quản lý database, bucket, secrets và service bằng Infrastructure as Code.",
      "minimal"
    ]
  },
  {
    "id": "log-aggregation-playbook",
    "title": "Log Aggregation Playbook",
    "vietnameseTitle": "Playbook gom log production",
    "shortDescription": "Chuẩn hóa JSON logs, correlation ID và gửi log tới provider để debug incident.",
    "category": "devops-cloud",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "structlog",
      "OpenTelemetry"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Nhiều service/worker",
      "Cần debug production",
      "Log local không đủ"
    ],
    "whyNotUse": [
      "App static không có server logs",
      "Prototype"
    ],
    "relatedPatterns": [
      "structured-json-logging"
    ],
    "searchKeywords": [
      "log aggregation",
      "docs/ops/log-aggregation.md",
      "Chuẩn hóa JSON logs, correlation ID và gửi log tới provider để debug incident.",
      "minimal"
    ]
  },
  {
    "id": "etl-job-structure",
    "title": "ETL Job Structure",
    "vietnameseTitle": "Cấu trúc ETL job Python",
    "shortDescription": "Tổ chức extract-transform-load thành các bước test được, idempotent và có checkpoint.",
    "category": "data-engineering",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Python",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Import dữ liệu định kỳ",
      "Pipeline nhiều bước",
      "Cần retry/checkpoint"
    ],
    "whyNotUse": [
      "Import nhỏ một lần",
      "Không lưu dữ liệu"
    ],
    "relatedPatterns": [
      "csv-import-validation"
    ],
    "searchKeywords": [
      "etl",
      "pipeline",
      "app/etl/job.py",
      "Tổ chức extract-transform-load thành các bước test được, idempotent và có checkpoint.",
      "minimal"
    ]
  },
  {
    "id": "data-validation-pipeline",
    "title": "Data Validation Pipeline",
    "vietnameseTitle": "Pipeline validate dữ liệu",
    "shortDescription": "Validate schema, required fields, ranges và business rules trước khi import vào DB.",
    "category": "data-engineering",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "Great Expectations"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Import CSV/Excel/API data",
      "Dữ liệu bẩn gây lỗi production",
      "Cần report dòng lỗi"
    ],
    "whyNotUse": [
      "Dữ liệu đã kiểm soát 100%",
      "Import thủ công nhỏ"
    ],
    "relatedPatterns": [
      "csv-import-validation"
    ],
    "searchKeywords": [
      "data validation",
      "app/data/validation.py",
      "Validate schema, required fields, ranges và business rules trước khi import vào DB.",
      "minimal"
    ]
  },
  {
    "id": "big-csv-import",
    "title": "Big CSV Import Pattern",
    "vietnameseTitle": "Import CSV lớn",
    "shortDescription": "Import file CSV lớn theo chunk, validate từng dòng và ghi batch để tránh hết RAM.",
    "category": "data-engineering",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "pandas",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "CSV hàng trăm MB/GB",
      "Cần progress/error report",
      "Không thể load toàn bộ vào RAM"
    ],
    "whyNotUse": [
      "File nhỏ vài nghìn dòng",
      "Dữ liệu real-time"
    ],
    "relatedPatterns": [
      "large-file-chunked-upload"
    ],
    "searchKeywords": [
      "big csv",
      "chunk import",
      "app/imports/big_csv.py",
      "Import file CSV lớn theo chunk, validate từng dòng và ghi batch để tránh hết RAM.",
      "minimal"
    ]
  },
  {
    "id": "data-reconciliation-job",
    "title": "Data Reconciliation Job",
    "vietnameseTitle": "Job đối soát dữ liệu",
    "shortDescription": "So sánh dữ liệu giữa hệ thống, phát hiện lệch và tạo report/action để sửa.",
    "category": "data-engineering",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "SQLAlchemy",
      "pandas"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Payment/order/report cần khớp nhau",
      "Có sync external provider",
      "Cần phát hiện thiếu/thừa record"
    ],
    "whyNotUse": [
      "Không có external data",
      "Dữ liệu nhỏ kiểm thủ công"
    ],
    "relatedPatterns": [
      "payment-webhook-handler"
    ],
    "searchKeywords": [
      "reconciliation",
      "data mismatch",
      "app/reconciliation/job.py",
      "So sánh dữ liệu giữa hệ thống, phát hiện lệch và tạo report/action để sửa.",
      "minimal"
    ]
  },
  {
    "id": "event-driven-projections",
    "title": "Event-driven Projections",
    "vietnameseTitle": "Projection từ event",
    "shortDescription": "Build read model/analytics table từ event stream để query nhanh và tách write/read concern.",
    "category": "data-engineering",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL",
      "Celery"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần dashboard/read model nhanh",
      "Có event/outbox",
      "Query trực tiếp từ domain tables quá chậm"
    ],
    "whyNotUse": [
      "App CRUD nhỏ",
      "Không có event history"
    ],
    "relatedPatterns": [
      "read-model-projection"
    ],
    "searchKeywords": [
      "projection",
      "event driven",
      "app/projections/projector.py",
      "Build read model/analytics table từ event stream để query nhanh và tách write/read concern.",
      "minimal"
    ]
  },
  {
    "id": "analytics-tables-design",
    "title": "Analytics Tables Design",
    "vietnameseTitle": "Thiết kế bảng analytics",
    "shortDescription": "Thiết kế bảng tổng hợp theo ngày/tenant/status để dashboard nhanh và predictable.",
    "category": "data-engineering",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "PostgreSQL"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Dashboard aggregate chậm",
      "Cần số liệu theo tenant/time",
      "Có batch job update"
    ],
    "whyNotUse": [
      "Data ít query trực tiếp OK",
      "Cần realtime từng giây"
    ],
    "relatedPatterns": [
      "postgres-materialized-views"
    ],
    "searchKeywords": [
      "analytics table",
      "docs/data/analytics-tables.md",
      "Thiết kế bảng tổng hợp theo ngày/tenant/status để dashboard nhanh và predictable.",
      "minimal"
    ]
  },
  {
    "id": "data-backfill-playbook",
    "title": "Data Backfill Playbook",
    "vietnameseTitle": "Playbook backfill dữ liệu",
    "shortDescription": "Quy trình backfill field/table mới bằng batch, dry-run, checkpoint và monitoring.",
    "category": "data-engineering",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Django",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Thêm field cần tính lại",
      "Migration data lớn",
      "Cần tránh lock/timeouts"
    ],
    "whyNotUse": [
      "Dữ liệu nhỏ vài record",
      "Có thể migrate đồng bộ nhanh"
    ],
    "relatedPatterns": [
      "django-management-command"
    ],
    "searchKeywords": [
      "backfill",
      "data migration",
      "docs/data/backfill.md",
      "Quy trình backfill field/table mới bằng batch, dry-run, checkpoint và monitoring.",
      "minimal"
    ]
  },
  {
    "id": "data-lineage-metadata",
    "title": "Data Lineage Metadata",
    "vietnameseTitle": "Metadata lineage dữ liệu",
    "shortDescription": "Ghi nguồn, version, job_id và transformed_at để biết dữ liệu đến từ đâu và có thể debug.",
    "category": "data-engineering",
    "difficulty": "Medium",
    "difficultyVi": "Trung bình",
    "productionLevel": "Production-ready",
    "libraries": [
      "Pydantic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "ETL nhiều nguồn",
      "Cần debug số liệu sai",
      "Cần audit pipeline"
    ],
    "whyNotUse": [
      "Không có pipeline",
      "Dữ liệu nhập thủ công nhỏ"
    ],
    "relatedPatterns": [
      "etl-job-structure"
    ],
    "searchKeywords": [
      "lineage",
      "metadata",
      "app/data/lineage.py",
      "Ghi nguồn, version, job_id và transformed_at để biết dữ liệu đến từ đâu và có thể debug.",
      "minimal"
    ]
  },
  {
    "id": "litestar-async-api",
    "title": "Litestar Async Web API",
    "vietnameseTitle": "API bất đồng bộ với Litestar",
    "shortDescription": "Xây dựng API bất đồng bộ hiệu năng cao sử dụng Litestar, thay thế FastAPI với cấu trúc Dependency Injection tối ưu và DTO validation.",
    "category": "api-basics",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Litestar",
      "Pydantic",
      "SQLAlchemy"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần hiệu năng xử lý HTTP routing và validation nhanh hơn FastAPI nhờ cơ chế DTO.",
      "Muốn sử dụng Dependency Injection cấu hình chặt chẽ hơn ở mức controller/app."
    ],
    "whyNotUse": [
      "Đội ngũ phát triển đã quen thuộc với FastAPI và thư viện bên thứ ba chỉ hỗ trợ FastAPI.",
      "Dự án đơn giản không cần quản lý cấu trúc code phức tạp."
    ],
    "relatedPatterns": [
      "fastapi-crud-api"
    ],
    "searchKeywords": [
      "app/controllers/user_controller.py",
      "Litestar Controller với Dependency Injection và validation qua DTO.",
      "minimal"
    ]
  },
  {
    "id": "kafka-stream-processing-faust",
    "title": "Kafka & Faust Stream Processing",
    "vietnameseTitle": "Xử lý luồng sự kiện Kafka bằng Faust",
    "shortDescription": "Xử lý stream dữ liệu hướng sự kiện thời gian thực quy mô lớn bằng Faust và Apache Kafka.",
    "category": "distributed-systems",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Faust-streaming",
      "Kafka-python",
      "Redis"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần xử lý luồng sự kiện liên tục với throughput siêu lớn từ Kafka.",
      "Muốn tích hợp mô hình State Store thời gian thực trong Python."
    ],
    "whyNotUse": [
      "Hạ tầng không sử dụng Kafka làm event broker.",
      "Chỉ cần xử lý hàng đợi tác vụ thông thường (hãy dùng Celery)."
    ],
    "relatedPatterns": [
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "app/worker.py",
      "Faust Agent đọc stream sự kiện từ Kafka và xử lý lưu trạng thái vào Faust Table.",
      "minimal"
    ]
  },
  {
    "id": "terraform-python-serverless",
    "title": "FastAPI Serverless IaC (Terraform)",
    "vietnameseTitle": "Triển khai FastAPI Serverless bằng Terraform",
    "shortDescription": "Mẫu hạ tầng đám mây dạng mã (IaC) để đóng gói và triển khai ứng dụng FastAPI chạy serverless trên AWS Lambda qua API Gateway.",
    "category": "devops-cloud",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "Terraform",
      "Mangum",
      "AWS Lambda"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Muốn triển khai FastAPI lên AWS Lambda để tối ưu chi phí hạ tầng (pay-per-request).",
      "Cần tự động hóa cấu hình IAM, API Gateway và Lambda bằng Terraform."
    ],
    "whyNotUse": [
      "Ứng dụng có lượng request đều đặn liên tục (dùng ECS/EC2 sẽ rẻ hơn).",
      "Ứng dụng có tác vụ xử lý kéo dài hơn 15 phút (giới hạn của Lambda)."
    ],
    "relatedPatterns": [
      "docker-deploy-fastapi"
    ],
    "searchKeywords": [
      "iac/main.tf",
      "Cấu hình Terraform cho AWS Lambda và API Gateway proxy để chuyển tiếp request đến FastAPI.",
      "minimal",
      "app/handler.py",
      "Mangum adapter bọc FastAPI ứng dụng để tương thích với API Gateway/Lambda.",
      "production"
    ]
  },
  {
    "id": "fastapi-model-serving-bentoml",
    "title": "Model Serving with BentoML & FastAPI",
    "vietnameseTitle": "Phục vụ AI model bằng BentoML & FastAPI",
    "shortDescription": "Tích hợp BentoML Service vào FastAPI để phục vụ mô hình Machine Learning, tối ưu hóa phần cứng bằng batching tự động.",
    "category": "ai-rag",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "BentoML",
      "FastAPI",
      "PyTorch"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần phục vụ (serving) AI model hiệu năng cao, tự động gom nhóm request (adaptive batching).",
      "Muốn đóng gói mô hình thành một container chạy độc lập dễ mở rộng."
    ],
    "whyNotUse": [
      "Chỉ cần tích hợp API của OpenAI/Gemini (hãy gọi trực tiếp API).",
      "Ứng dụng không sử dụng mô hình học máy tự host."
    ],
    "relatedPatterns": [
      "image-ocr-api"
    ],
    "searchKeywords": [
      "app/service.py",
      "BentoML Service bọc mô hình học máy với tính năng adaptive batching.",
      "minimal",
      "app/main.py",
      "FastAPI đóng vai trò Gateway giao tiếp với BentoML Service.",
      "production"
    ]
  },
  {
    "id": "asyncio-lowlevel-concurrency",
    "title": "Low-Level Asyncio Concurrency & Executors",
    "vietnameseTitle": "Điều phối Executor và Concurrency trong Asyncio",
    "shortDescription": "Tối ưu hóa các tác vụ tính toán nặng (CPU-bound) trong web server async bằng cách sử dụng Custom ProcessPoolExecutor và ThreadPoolExecutor.",
    "category": "fastapi-internals",
    "difficulty": "Advanced",
    "difficultyVi": "Nâng cao",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "asyncio",
      "concurrent.futures"
    ],
    "updatedAt": "Cập nhật trong v1",
    "whyUse": [
      "Cần chạy các tác vụ nặng (như tính toán ma trận, xử lý ảnh lớn, hash dữ liệu) mà không làm nghẽn event loop async chính.",
      "Muốn điều phối giới hạn tài nguyên CPU sử dụng ProcessPoolExecutor."
    ],
    "whyNotUse": [
      "Các tác vụ hoàn toàn là I-O bound (chỉ cần async/await thông thường).",
      "Đã đưa các tác vụ nặng này vào Celery worker xử lý ngoại tuyến."
    ],
    "relatedPatterns": [
      "fastapi-lifespan-resources"
    ],
    "searchKeywords": [
      "app/executors.py",
      "Khởi tạo và quản lý process/thread executors toàn cục để chạy tác vụ CPU-bound.",
      "minimal",
      "app/main.py",
      "FastAPI route sử dụng loop.run_in_executor để chạy hàm đồng bộ trên Pool riêng biệt.",
      "production"
    ]
  }
] as unknown as Pattern[];
