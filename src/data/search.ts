export const SUGGESTED_SEARCH_CHIPS = [
  'FastAPI CRUD', 'login JWT', 'phân quyền admin', 'upload ảnh', 'chụp ảnh OCR', 'PDF OCR', 'file lớn Celery', 'Redis cache', 'chống spam API', 'webhook signature', 'export Excel', 'Docker deploy', 'RAG backend', 'RAG ingestion', 'hybrid search', 'reranking', 'citation builder', 'LLM streaming', 'AI agent tools', 'release checklist', 'rollback', 'browser QA', 'Vercel deploy', 'PostgreSQL isolation', 'FastAPI lifespan', 'API error taxonomy', 'property testing', 'Docker Compose', 'ETL job', 'content freshness', 'bundle performance'
];

export const SEARCH_SYNONYMS: Record<string, string[]> = {
  ocr: ['chụp ảnh lấy chữ', 'đọc chữ trong ảnh', 'nhận diện chữ', 'image to text', 'scan text', 'receipt', 'hóa đơn'],
  auth: ['login', 'đăng nhập', 'register', 'đăng ký', 'jwt', 'token', 'xác thực'],
  permission: ['phân quyền', 'role', 'rbac', 'admin', 'authorization'],
  upload: ['tải file', 'upload ảnh', 'multipart', 'file lớn', 's3'],
  cache: ['redis', 'tăng tốc api', 'response cache', 'cache-aside'],
  queue: ['celery', 'worker', 'task nền', 'background job', 'retry'],
  webhook: ['callback', 'payment event', 'verify signature', 'hmac', 'idempotency'],
  rag: ['chat tài liệu', 'vector search', 'embedding', 'semantic search', 'llm', 'hybrid search', 'reranking', 'citation', 'ingestion'],
  promptInjection: ['prompt injection', 'rag security', 'untrusted context', 'agent safety'],
  agentTools: ['tool registry', 'tool calling', 'mcp', 'human approval', 'agent action'],
  llmCost: ['token budget', 'cost control', 'usage tracking', 'llm observability'],
  releaseOps: ['release checklist', 'rollback', 'migration safety', 'feature flag', 'browser qa', 'vercel deploy'],
  contentMaintenance: ['content freshness', 'deprecated pattern', 'bundle size', 'performance checklist', 'dependency update'],
  advancedPostgres: ['postgresql isolation', 'deadlock', 'advisory lock', 'partial index', 'materialized view', 'partitioning', 'read replica', 'connection pool'],
  advancedFastapi: ['fastapi lifespan', 'dependency injection', 'middleware order', 'openapi customization', 'anyio testing'],
  apiGovernance: ['api error taxonomy', 'idempotency contract', 'api deprecation', 'sdk generation', 'contract testing'],
  devopsCloud: ['docker compose', 'kubernetes', 'cloud run', 'nginx', 'tls', 'terraform'],
  dataEngineering: ['etl', 'data validation', 'big csv', 'reconciliation', 'analytics table', 'backfill']
};
