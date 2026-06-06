
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outfile = path.join(root, 'tmp-patterns.cjs');

esbuild.buildSync({
  entryPoints: [path.join(root, 'src/data/patterns.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile,
  logLevel: 'silent',
});

const { PATTERNS } = require(outfile);

const compact = PATTERNS.map((p) => ({
  id: p.id,
  title: p.title,
  vietnameseTitle: p.vietnameseTitle,
  shortDescription: p.shortDescription,
  category: p.category,
  difficulty: p.difficulty,
  difficultyVi: p.difficultyVi,
  productionLevel: p.productionLevel,
  libraries: p.libraries,
  updatedAt: p.updatedAt,
  whyUse: p.whyUse,
  whyNotUse: p.whyNotUse,
  relatedPatterns: p.relatedPatterns || [],
  searchKeywords: [
    ...(p.searchKeywords || []),
    ...(p.codeTemplates || []).flatMap((t) => [t.filename, t.description, t.variant || ''])
  ].filter(Boolean),
}));

const content = `import { Pattern } from '../types';

export const PATTERN_INDEX = ${JSON.stringify(compact, null, 2)} as unknown as Pattern[];
`;
fs.writeFileSync(path.join(root, 'src/data/patternIndex.ts'), content, 'utf8');
fs.unlinkSync(outfile);
console.log(`Generated src/data/patternIndex.ts with ${compact.length} compact patterns`);
