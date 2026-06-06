# V2_MANUAL_BROWSER_QA_CHECKLIST.md

## How to run locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Desktop browser QA

Use Chrome or Edge on desktop.

### 1. Homepage load

- [ ] Page loads without blank screen
- [ ] Sidebar is visible
- [ ] Search bar is visible
- [ ] Decision section is visible
- [ ] Pattern cards are visible

### 2. Search tests

Search these exact queries:

- [ ] `login JWT`
- [ ] `chụp ảnh OCR`
- [ ] `RAG ingestion`
- [ ] `Django ViewSet`
- [ ] `tenant isolation`
- [ ] `release checklist`
- [ ] `prompt injection`
- [ ] `Vercel deploy`

Expected:

- [ ] Results appear
- [ ] Matched-by label appears
- [ ] Highlight is readable
- [ ] Clicking result opens correct pattern

### 3. Filter tests

- [ ] Filter by category
- [ ] Filter by difficulty
- [ ] Filter by library
- [ ] Combine search + filter
- [ ] Reset filters

Expected:

- [ ] Result count changes correctly
- [ ] No blank broken layout
- [ ] Empty state appears when no result

### 4. Pattern detail page

Open these patterns:

- [ ] JWT Authentication
- [ ] Image OCR API
- [ ] RAG Ingestion Pipeline
- [ ] DRF ViewSet Advanced
- [ ] Tenant-aware Query Filter
- [ ] Release Checklist

Expected order:

```txt
Quick Decision
→ Khi nào dùng
→ Khi nào không dùng
→ Recommended Stack
→ Install
→ Flow / Folder Structure
→ Code Templates
→ Common Errors
→ Production Checklist
```

### 5. Copy buttons

For at least 5 patterns:

- [ ] Copy install command
- [ ] Copy code block
- [ ] Copy folder structure
- [ ] Copy all templates if available

Expected:

- [ ] Clipboard contains correct text
- [ ] Button state changes to copied/success
- [ ] No console error

### 6. Empty state

Search:

```txt
random-not-existing-backend-pattern-xyz
```

Expected:

- [ ] Empty state appears
- [ ] Suggested queries appear
- [ ] UI remains readable

### 7. Console check

Open browser DevTools console.

- [ ] No runtime crash
- [ ] No missing asset error
- [ ] No uncaught React error
- [ ] No clipboard permission error after copy test

### 8. Responsive minimum

Even though app is desktop-first:

- [ ] 1366px width works
- [ ] 1440px width works
- [ ] 1920px width works

Mobile is not priority, but the app should not completely break if window is narrowed.
