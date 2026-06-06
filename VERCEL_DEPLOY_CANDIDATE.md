# VERCEL_DEPLOY_CANDIDATE.md

## Status

This project is ready for Vercel preview deployment as a static Vite/React app.

## Vercel settings

Use these settings:

```txt
Framework Preset: Vite
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
```

## Required environment variables

None.

Do not add:

```txt
GEMINI_API_KEY
OPENAI_API_KEY
DATABASE_URL
JWT_SECRET
```

This app is static-only and should not require secrets.

## Deploy flow

1. Push this project to GitHub.
2. Import repository into Vercel.
3. Select Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy preview.
7. Run `V2_MANUAL_BROWSER_QA_CHECKLIST.md` on the preview URL.
8. If preview is clean, promote/deploy production.

## Important note

Do not connect AI generator/API/serverless functions for v2.0. The app should remain:

- static
- searchable
- copyable
- Vercel-friendly
- no backend
- no database

