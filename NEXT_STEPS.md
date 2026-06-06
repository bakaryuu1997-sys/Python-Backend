# NEXT_STEPS.md — After v1.3

## Best next step

Do **v1.4 — Desktop Browser QA + Vercel Deploy Candidate**.

Do not add backend, database, Gemini API, user system, or project generator before this QA pass.

## Required QA checklist

Run locally:

```bash
npm install
npm run dev
```

Check in desktop browser:

```txt
Homepage loads
Search suggestions work
Matched by labels are understandable
Keyword highlight is readable
Filter bar works with search
Decision cards open correct pattern
Pattern detail order is correct
Template variant badges are visible
Copy buttons work
Empty search state is helpful
Library guide is readable
No console error breaks usage
```

## Vercel deploy settings

```txt
Framework: Vite
Install command: npm install
Build command: npm run build
Output directory: dist
```

## After deploy QA

```txt
Home URL loads
Reload works
Search works on production URL
Filters work
Pattern detail opens
Copy buttons work in browser context
No Gemini/API errors
No backend secret required
```

## After stable deploy

Next expansion:

```txt
v1.5 — Architecture Pack
- DDD basics
- CQRS basic
- Outbox pattern
- Inbox pattern
- Saga pattern
- Modular monolith
- Provider/adapter pattern
```

## Next after v1.6
Bước tiếp theo hợp lý:

### v1.7 — Advanced Django/DRF Pack

Nên bổ sung:

1. Django settings split
2. Custom User Model
3. Django Admin hardening
4. DRF Serializer advanced
5. DRF ViewSet advanced
6. DRF permissions
7. DRF filtering/search/ordering
8. DRF throttling
9. DRF SimpleJWT
10. Django Celery integration
11. Django management command
12. Django file upload security
13. Django testing fixtures
14. Django deployment checklist

Sau v1.7 mới nên làm:

- v1.8 Advanced AI/RAG Pack
- v1.9 Operations & Release Management Pack
- v2.0 Content Freshness + Browser QA + Vercel Deploy Candidate

## Next after v1.7
Bước tiếp theo hợp lý:

### v1.8 — Advanced AI/RAG Pack

Nên bổ sung:

1. RAG ingestion pipeline
2. Hybrid search
3. Reranking
4. Citation builder
5. RAG evaluation
6. Multi-tenant RAG permission filter
7. Vector DB delete/reindex workflow
8. LLM provider abstraction sâu hơn
9. Streaming SSE/WebSocket polish
10. Tool registry
11. Prompt injection defense
12. Cost and token budget guard
13. AI observability
14. Human approval for agent actions

Sau v1.8 mới nên làm:
- v1.9 Operations & Release Management Pack
- v2.0 Content Freshness + Browser QA + Vercel Deploy Candidate

## Next after v1.8
Bước tiếp theo hợp lý:

### v1.9 — Operations & Release Management Pack

Nên bổ sung:

1. Release checklist
2. Migration safety checklist
3. Rollback strategy
4. Feature flag rollout
5. Backup/restore verification
6. Incident postmortem template
7. Dependency update workflow
8. Content freshness workflow
9. Deprecated pattern flag
10. Browser QA checklist
11. Vercel deployment checklist
12. Bundle/content performance checklist

Sau v1.9 mới nên làm:

- v2.0 Browser QA + Vercel Deploy Candidate

## Performance note after v1.8
Build vẫn pass nhưng Vite cảnh báo chunk JS lớn hơn 500kB. Không phải lỗi deploy, nhưng sau khi library vượt 150+ patterns nên ưu tiên:

1. Tạo compact search index chỉ chứa metadata.
2. Lazy-load full pattern detail theo id/category.
3. Không bundle toàn bộ code templates vào homepage nếu không cần.
4. Sau đó mới mở rộng thêm nhiều content pack lớn.

## Next after v1.9
Bước tiếp theo hợp lý:

### v2.0 — Browser QA + Vercel Deploy Candidate

Nên làm:

1. Chạy app bằng `npm run dev`.
2. Kiểm tra desktop browser thật.
3. Test search các nhóm chính:
   - login JWT
   - chụp ảnh OCR
   - RAG ingestion
   - Django ViewSet
   - tenant isolation
   - release checklist
4. Test filter category/difficulty/library.
5. Test pattern detail: Quick Decision → Khi nào dùng → Khi nào không dùng → Stack → Code.
6. Test copy button.
7. Test empty state.
8. Kiểm tra console lỗi runtime.
9. Kiểm tra Vite chunk warning và quyết định có cần compact search index trước deploy không.
10. Deploy preview lên Vercel.
11. Chạy Browser QA checklist trên preview URL.
12. Nếu ổn, deploy production.

Không nên thêm feature lớn trước khi QA.

## Next after v2.0
Bước tiếp theo là do bạn thực hiện trên máy/tài khoản Vercel:

1. Giải nén ZIP.
2. Chạy:
   ```bash
   npm install
   npm run dev
   ```
3. Làm QA theo `V2_MANUAL_BROWSER_QA_CHECKLIST.md`.
4. Push lên GitHub.
5. Import vào Vercel với:
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
6. QA preview URL.
7. Nếu ổn, deploy production.

Sau deploy production, bước tiếp theo mới nên là:

- Compact search index / lazy-load detail nếu Lighthouse hoặc user experience cho thấy load chậm.
- Sau đó mới mở rộng thêm content pack mới.

## Final steps for user
You can deploy after these steps:

1. Unzip the package.
2. Run:
   ```bash
   npm install
   npm run lint
   npm run build
   npm run dev
   ```
3. Open `http://localhost:3000`.
4. Run `V2_MANUAL_BROWSER_QA_CHECKLIST.md`.
5. Push to GitHub.
6. Import to Vercel:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
7. Deploy preview.
8. QA preview URL.
9. Deploy production.

## Next after v2.2
Now deploy preview instead of adding more large content.

User steps:

1. Run:
   ```bash
   npm install
   npm run dev
   ```
2. Open `http://localhost:3000`.
3. Test:
   - homepage load
   - search
   - filter
   - open pattern detail
   - copy code
4. Push to GitHub.
5. Deploy preview to Vercel.
6. QA preview URL.
7. Deploy production if clean.

After deploy, continue content packs:

1. Advanced SQL/PostgreSQL Pack
2. Advanced FastAPI Pack
3. API Design Governance Pack
4. DevOps/Cloud Pack
5. Testing Quality Pack

## Next after v2.3 QA
1. Run local manual browser QA.
2. Deploy Vercel preview.
3. QA preview URL.
4. Fix any visual/runtime bugs found in browser.
5. Deploy production only after preview QA is clean.
6. Continue backend content expansion after deploy:
   - Advanced PostgreSQL Pack
   - Advanced FastAPI Internals Pack
   - Testing Quality Pack
   - DevOps/Cloud Pack
   - API Governance Pack

## Next after v3.0
Do not add more content before deployment.

Final user steps:
1. `npm install`
2. `npm run lint`
3. `npm run build`
4. `npm run qa:static`
5. `npm run dev`
6. Manual browser QA
7. Push to GitHub
8. Deploy Vercel Preview
9. QA Preview URL
10. Promote to Production if clean
