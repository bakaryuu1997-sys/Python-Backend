import { Pattern } from '../types';
import { PATTERN_INDEX } from './patternIndex';

type PatternPackModule = Record<string, Pattern[]>;

const PACK_LOADERS: Record<string, () => Promise<PatternPackModule>> = {
  'ai-rag': () => import('./pattern-packs/ai-rag'),
  'api-basics': () => import('./pattern-packs/api-basics'),
  'architecture': () => import('./pattern-packs/architecture'),
  'auth-security': () => import('./pattern-packs/auth-security'),
  'background-jobs': () => import('./pattern-packs/background-jobs'),
  'cache-redis': () => import('./pattern-packs/cache-redis'),
  'database': () => import('./pattern-packs/database'),
  'deployment': () => import('./pattern-packs/deployment'),
  'distributed-systems': () => import('./pattern-packs/distributed-systems'),
  'django': () => import('./pattern-packs/django'),
  'enterprise-saas': () => import('./pattern-packs/enterprise-saas'),
  'fastapi': () => import('./pattern-packs/fastapi'),
  'file-upload': () => import('./pattern-packs/file-upload'),
  'ocr-docs': () => import('./pattern-packs/ocr-docs'),
  'operations-release': () => import('./pattern-packs/operations-release'),
  'data-engineering': () => import('./pattern-packs/data-engineering'),
  'devops-cloud': () => import('./pattern-packs/devops-cloud'),
  'testing-quality': () => import('./pattern-packs/testing-quality'),
  'api-governance': () => import('./pattern-packs/api-governance'),
  'fastapi-internals': () => import('./pattern-packs/fastapi-internals'),
  'advanced-postgres': () => import('./pattern-packs/advanced-postgres'),
  'testing': () => import('./pattern-packs/testing'),
  'webhook-payment': () => import('./pattern-packs/webhook-payment'),
};

const loadedPatternCache = new Map<string, Pattern[]>();

function firstPatternArray(module: PatternPackModule): Pattern[] {
  const value = Object.values(module).find(Array.isArray);
  return value ?? [];
}

export async function loadPatternById(patternId: string): Promise<Pattern | null> {
  const summary = PATTERN_INDEX.find((pattern) => pattern.id === patternId);
  if (!summary) return null;

  if (!loadedPatternCache.has(summary.category)) {
    const loader = PACK_LOADERS[summary.category];
    if (!loader) return summary;
    const module = await loader();
    loadedPatternCache.set(summary.category, firstPatternArray(module));
  }

  return loadedPatternCache.get(summary.category)?.find((pattern) => pattern.id === patternId) ?? summary;
}

export function getPatternSummary(patternId: string): Pattern | undefined {
  return PATTERN_INDEX.find((pattern) => pattern.id === patternId);
}
