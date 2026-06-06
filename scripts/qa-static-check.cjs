
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const entryFile = path.join(root, 'tmp-qa-entry.ts');
const outfile = path.join(root, 'tmp-qa-bundle.cjs');

const entryContent = `import { PATTERNS } from './src/data/patterns';
import { PATTERN_INDEX } from './src/data/patternIndex';
import { CATEGORIES } from './src/data/categories';
import { LIBRARIES } from './src/data/libraries';
import { DECISION_CARDS } from './src/data/decisions';
import { searchPatterns } from './src/lib/search';

export {
  PATTERNS,
  PATTERN_INDEX,
  CATEGORIES,
  LIBRARIES,
  DECISION_CARDS,
  searchPatterns,
};
`;

fs.writeFileSync(entryFile, entryContent, 'utf8');

esbuild.buildSync({
  entryPoints: [entryFile],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile,
  logLevel: 'silent',
});

if (fs.existsSync(entryFile)) {
  fs.unlinkSync(entryFile);
}


const bundle = require(outfile);
const { PATTERNS, PATTERN_INDEX, CATEGORIES, LIBRARIES, DECISION_CARDS, searchPatterns } = bundle;

function assert(cond, msg, issues, severity='error') {
  if (!cond) issues.push({severity, msg});
}

const issues = [];
const warnings = [];
const ids = new Set();
const categoryIds = new Set(CATEGORIES.map(c => c.id));
const patternIds = new Set(PATTERNS.map(p => p.id));

PATTERNS.forEach(p => {
  assert(!ids.has(p.id), `Duplicate pattern id: ${p.id}`, issues);
  ids.add(p.id);
  assert(p.id && p.title && p.vietnameseTitle && p.shortDescription, `Missing basic fields: ${p.id}`, issues);
  assert(categoryIds.has(p.category), `Invalid category ${p.category} in ${p.id}`, issues);
  assert(['Easy','Medium','Advanced'].includes(p.difficulty), `Invalid difficulty ${p.difficulty} in ${p.id}`, issues);
  assert(Array.isArray(p.libraries) && p.libraries.length > 0, `No libraries: ${p.id}`, issues);
  assert(Array.isArray(p.whyUse) && p.whyUse.length >= 2, `whyUse too thin: ${p.id}`, warnings, 'warning');
  assert(Array.isArray(p.whyNotUse) && p.whyNotUse.length >= 2, `whyNotUse too thin: ${p.id}`, warnings, 'warning');
  assert(p.quickDecision && Array.isArray(p.quickDecision.bestFor), `Missing quickDecision: ${p.id}`, issues);
  assert(typeof p.installCommand === 'string' && p.installCommand.length > 0, `Missing installCommand: ${p.id}`, warnings, 'warning');
  assert(Array.isArray(p.codeTemplates) && p.codeTemplates.length > 0, `No codeTemplates: ${p.id}`, warnings, 'warning');
  (p.codeTemplates || []).forEach((t, i) => {
    assert(t.filename && t.language && t.code && t.description, `Incomplete template ${p.id}#${i}`, warnings, 'warning');
  });
  (p.relatedPatterns || []).forEach(r => {
    assert(patternIds.has(r), `Broken relatedPattern ${p.id} -> ${r}`, issues);
  });
});

// Compact index consistency
assert(PATTERN_INDEX.length === PATTERNS.length, `Pattern index count ${PATTERN_INDEX.length} != full patterns ${PATTERNS.length}`, issues);
const indexIds = new Set(PATTERN_INDEX.map(p => p.id));
PATTERNS.forEach(p => assert(indexIds.has(p.id), `Pattern missing from index: ${p.id}`, issues));

// Confirm compact index really has no code templates
const indexWithCode = PATTERN_INDEX.filter(p => (p.codeTemplates || []).some(t => t.code));
assert(indexWithCode.length === 0, `Pattern index still contains code templates: ${indexWithCode.slice(0,3).map(p=>p.id).join(', ')}`, issues);

// Decision links
DECISION_CARDS.forEach(c => {
  assert(patternIds.has(c.patternId), `Decision card points to missing pattern: ${c.id} -> ${c.patternId}`, issues);
});

// Library categories
LIBRARIES.forEach(l => {
  assert(categoryIds.has(l.category), `Library ${l.name} has invalid category ${l.category}`, warnings, 'warning');
});

// Search tests
const searchCases = [
  ['login JWT', ['jwt-auth-api']],
  ['chụp ảnh OCR', ['image-ocr-api']],
  ['RAG ingestion', ['rag-ingestion-pipeline']],
  ['Django ViewSet', ['drf-viewset-advanced']],
  ['tenant isolation', ['tenant-aware-query-filter']],
  ['release checklist', ['release-checklist']],
  ['prompt injection', ['prompt-injection-defense-rag']],
  ['Vercel deploy', ['vercel-deployment-checklist']],
  ['PostgreSQL isolation', ['postgres-transaction-isolation']],
  ['FastAPI lifespan', ['fastapi-lifespan-resources']],
  ['API error taxonomy', ['api-error-taxonomy']],
  ['property testing', ['property-based-testing-hypothesis']],
  ['Docker Compose', ['docker-compose-prod-like']],
  ['ETL job', ['etl-job-structure']],
];

const searchResults = [];
for (const [query, expectedIds] of searchCases) {
  const results = searchPatterns(PATTERN_INDEX, query).slice(0, 25);
  const resultIds = results.map(r => r.pattern.id);
  const found = expectedIds.some(id => resultIds.includes(id));
  searchResults.push({query, expectedIds, top25: resultIds, passed: found});
  assert(found, `Search '${query}' did not find expected ${expectedIds.join('/')}. Top25=${resultIds.join(', ')}`, issues);
}

// Category coverage
const byCategory = {};
PATTERNS.forEach(p => byCategory[p.category] = (byCategory[p.category] || 0) + 1);

// Backend coverage keywords (strict content audit)
const allText = PATTERNS.map(p => [
  p.id, p.title, p.vietnameseTitle, p.shortDescription, p.category, p.libraries.join(' '),
  p.whyUse.join(' '), p.whyNotUse.join(' '), (p.searchKeywords || []).join(' ')
].join(' ')).join('\n').toLowerCase();

const coverageChecks = [
  ['FastAPI', /fastapi/],
  ['Django/DRF', /django|drf/],
  ['SQLAlchemy/Alembic', /sqlalchemy|alembic/],
  ['Auth/Security', /jwt|rbac|security|auth|sso|api key/],
  ['OCR/Documents', /ocr|pdf|document/],
  ['Background jobs', /celery|background|worker/],
  ['Cache/Redis', /redis|cache/],
  ['Testing', /pytest|test/],
  ['Deployment/Vercel/Docker', /docker|deploy|vercel/],
  ['Architecture', /clean architecture|ddd|cqrs|outbox|saga/],
  ['AI/RAG', /rag|llm|embedding|vector/],
  ['Operations', /release|rollback|qa|postmortem/],
  ['Advanced PostgreSQL', /transaction isolation|deadlock|advisory lock|partial index|partitioning/],
  ['Advanced FastAPI', /lifespan|dependency injection|middleware order|openapi customization|anyio/],
  ['API Governance', /error taxonomy|idempotency contract|deprecation policy|sdk generation|contract testing/],
  ['Testing Quality', /hypothesis|mutation testing|contract testing|testcontainers/],
  ['DevOps Cloud', /docker compose|kubernetes|cloud run|terraform|nginx/],
  ['Data Engineering', /etl|data validation|big csv|reconciliation|analytics table/],
];
const coverage = coverageChecks.map(([name, regex]) => ({name, present: regex.test(allText)}));
coverage.forEach(c => assert(c.present, `Missing coverage area: ${c.name}`, warnings, 'warning'));

fs.unlinkSync(outfile);

const report = {
  counts: {
    patterns: PATTERNS.length,
    patternIndex: PATTERN_INDEX.length,
    categories: CATEGORIES.length,
    libraries: LIBRARIES.length,
    decisions: DECISION_CARDS.length,
    errors: issues.length,
    warnings: warnings.length,
  },
  byCategory,
  searchResults,
  coverage,
  errors: issues,
  warnings,
};

console.log(JSON.stringify(report, null, 2));
process.exit(issues.length ? 1 : 0);
