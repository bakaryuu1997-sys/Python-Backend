# DEPLOY_NOW.md

## Current status

This package is ready for you to deploy to Vercel preview.

## What is complete

- Static Vite/React app
- No backend runtime
- No database runtime
- No Gemini/OpenAI runtime
- 161 backend patterns
- Pattern data split by category packs
- Search/filter/copy UI included
- QA/deploy docs included
- Vercel config included

## Local commands

```bash
npm ci
npm run lint
npm run build
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Vercel settings

Use:

```txt
Framework Preset: Vite
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
```

## Environment variables

None.

Do not add:

```txt
GEMINI_API_KEY
OPENAI_API_KEY
DATABASE_URL
JWT_SECRET
```

## Required final manual check before production

Run this file:

```txt
V2_MANUAL_BROWSER_QA_CHECKLIST.md
```

At minimum, test:

```txt
login JWT
ch盻･p 蘯｣nh OCR
RAG ingestion
Django ViewSet
tenant isolation
release checklist
```

Then test:

```txt
filter category
filter difficulty
filter library
copy code
empty search state
console errors
```

## Deploy flow

1. Push this folder to GitHub.
2. Import repo into Vercel.
3. Deploy preview.
4. Run browser QA on preview URL.
5. If clean, promote/deploy production.

