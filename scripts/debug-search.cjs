const esbuild = require('esbuild'); const path=require('path'); const fs=require('fs');
const outfile='tmp-debug.cjs';
const entryFile='tmp-qa-entry.ts';
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

esbuild.buildSync({entryPoints:[entryFile], bundle:true, platform:'node', format:'cjs', outfile, logLevel:'silent'});

if (fs.existsSync(entryFile)) {
  fs.unlinkSync(entryFile);
}

const {PATTERN_INDEX, searchPatterns}=require('../tmp-debug.cjs');
for (const q of ['FastAPI lifespan','property testing']) {
  const results=searchPatterns(PATTERN_INDEX,q);
  console.log('QUERY',q);
  for (const id of ['fastapi-lifespan-resources','property-based-testing-hypothesis','fastapi-crud-api','api-error-taxonomy']) {
    const r=results.find(x=>x.pattern.id===id);
    console.log(id, r? results.indexOf(r)+1 : 'none', r?.score, r?.matchedFields, r?.matchedTerms?.slice(0,10));
  }
  console.log(results.slice(0,8).map(r=>[r.pattern.id,r.score,r.matchedFields]));
}
fs.unlinkSync(outfile);
