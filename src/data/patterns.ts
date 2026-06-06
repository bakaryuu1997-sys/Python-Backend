import { AI_RAG_PATTERNS } from './pattern-packs/ai-rag';
import { API_BASICS_PATTERNS } from './pattern-packs/api-basics';
import { ARCHITECTURE_PATTERNS } from './pattern-packs/architecture';
import { AUTH_SECURITY_PATTERNS } from './pattern-packs/auth-security';
import { BACKGROUND_JOBS_PATTERNS } from './pattern-packs/background-jobs';
import { CACHE_REDIS_PATTERNS } from './pattern-packs/cache-redis';
import { DATABASE_PATTERNS } from './pattern-packs/database';
import { DEPLOYMENT_PATTERNS } from './pattern-packs/deployment';
import { DISTRIBUTED_SYSTEMS_PATTERNS } from './pattern-packs/distributed-systems';
import { DJANGO_PATTERNS } from './pattern-packs/django';
import { ENTERPRISE_SAAS_PATTERNS } from './pattern-packs/enterprise-saas';
import { FASTAPI_PATTERNS } from './pattern-packs/fastapi';
import { FILE_UPLOAD_PATTERNS } from './pattern-packs/file-upload';
import { OCR_DOCS_PATTERNS } from './pattern-packs/ocr-docs';
import { TESTING_PATTERNS } from './pattern-packs/testing';
import { WEBHOOK_PAYMENT_PATTERNS } from './pattern-packs/webhook-payment';
import { OPERATIONS_RELEASE_PATTERNS } from './pattern-packs/operations-release';
import { ADVANCED_POSTGRES_PATTERNS } from './pattern-packs/advanced-postgres';
import { FASTAPI_INTERNALS_PATTERNS } from './pattern-packs/fastapi-internals';
import { API_GOVERNANCE_PATTERNS } from './pattern-packs/api-governance';
import { TESTING_QUALITY_PATTERNS } from './pattern-packs/testing-quality';
import { DEVOPS_CLOUD_PATTERNS } from './pattern-packs/devops-cloud';
import { DATA_ENGINEERING_PATTERNS } from './pattern-packs/data-engineering';
import { CONCURRENCY_ML_STREAMING_PATTERNS } from './pattern-packs/concurrency-ml-streaming';

export const PATTERNS = [
  ...AI_RAG_PATTERNS, ...API_BASICS_PATTERNS, ...ARCHITECTURE_PATTERNS, ...AUTH_SECURITY_PATTERNS, ...BACKGROUND_JOBS_PATTERNS, ...CACHE_REDIS_PATTERNS, ...DATABASE_PATTERNS, ...DEPLOYMENT_PATTERNS, ...DISTRIBUTED_SYSTEMS_PATTERNS, ...DJANGO_PATTERNS, ...ENTERPRISE_SAAS_PATTERNS, ...FASTAPI_PATTERNS, ...FILE_UPLOAD_PATTERNS, ...OCR_DOCS_PATTERNS, ...TESTING_PATTERNS, ...WEBHOOK_PAYMENT_PATTERNS, ...OPERATIONS_RELEASE_PATTERNS, ...ADVANCED_POSTGRES_PATTERNS, ...FASTAPI_INTERNALS_PATTERNS, ...API_GOVERNANCE_PATTERNS, ...TESTING_QUALITY_PATTERNS, ...DEVOPS_CLOUD_PATTERNS, ...DATA_ENGINEERING_PATTERNS, ...CONCURRENCY_ML_STREAMING_PATTERNS
];
