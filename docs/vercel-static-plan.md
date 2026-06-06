# vercel-static-plan.md 窶・Vercel-only Static Architecture Plan

## 1. Quy蘯ｿt ﾄ黛ｻ杵h chﾃｭnh

D盻ｱ ﾃ｡n **Python Backend Compass** s蘯ｽ deploy lﾃｪn Vercel theo hﾆｰ盻嬾g static-first.

Quy蘯ｿt ﾄ黛ｻ杵h:

```txt
Khﾃｴng database
Khﾃｴng backend server
Khﾃｴng API routes trong MVP
Khﾃｴng auth
Khﾃｴng admin CMS
Khﾃｴng server-side search
Content n蘯ｱm trong Git repo
Search ch蘯｡y client-side
Deploy b蘯ｱng Vercel
```

ﾄ静｢y lﾃ quy蘯ｿt ﾄ黛ｻ杵h ﾄ妥ｺng cho s蘯｣n ph蘯ｩm thﾆｰ vi盻㌻ tra c盻ｩu vﾃｬ n盻冓 dung ch盻ｧ y蘯ｿu lﾃ read-only.

---

## 2. Vﾃｬ sao static-first phﾃｹ h盻｣p?

盻ｨng d盻･ng nﾃy c蘯ｧn:

```txt
- Hi盻ハ th盻・n盻冓 dung.
- Search n盻冓 dung.
- Copy template.
- ﾄ進盻「 hﾆｰ盻嬾g category/tag.
```

盻ｨng d盻･ng nﾃy chﾆｰa c蘯ｧn:

```txt
- User login.
- Ghi d盻ｯ li盻㎡ ngﾆｰ盻拱 dﾃｹng.
- Dashboard cﾃ｡ nhﾃ｢n.
- Database query runtime.
- Payment.
- Admin online.
```

Vﾃｬ v蘯ｭy static-first giﾃｺp:

```txt
- Deploy d盻・
- Chi phﾃｭ th蘯･p.
- ﾃ衡 l盻擁 production.
- Load nhanh.
- Khﾃｴng c蘯ｧn b蘯｣o trﾃｬ server.
- D盻・rollback b蘯ｱng Git.
- D盻・backup vﾃｬ content lﾃ file.
```

---

## 3. Ki蘯ｿn trﾃｺc ﾄ黛ｻ・xu蘯･t

```txt
Content JSON/MDX
      竊・Build-time content loader
      竊・Static pages + static search index
      竊・Next.js app
      竊・Vercel deploy
      竊・User search/copy/read templates in browser
```

---

## 4. Rendering strategy

Cﾃ｡c page nﾃｪn static:

```txt
/
/patterns
/patterns/[slug]
/decision-guide
/libraries
/architecture
/search
```

Khﾃｴng c蘯ｧn runtime server rendering.

Pattern detail cﾃｳ th盻・generate t盻ｫ content file.

---

## 5. Content strategy

Content lﾆｰu trong:

```txt
content/patterns/
content/libraries/
content/decisions/
content/search/
```

ﾆｯu tiﾃｪn JSON cho MVP vﾃｬ:

```txt
- D盻・validate.
- D盻・build search index.
- D盻・render theo section.
- ﾃ衡 l盻擁 hﾆ｡n MDX.
```

Sau nﾃy cﾃｳ th盻・thﾃｪm MDX n蘯ｿu mu盻創 bﾃi gi蘯｣i thﾃｭch dﾃi hﾆ｡n.

---

## 6. Search strategy

Dﾃｹng client-side search.

MVP:

```txt
Fuse.js
```

Cﾃ｡ch ho蘯｡t ﾄ黛ｻ冢g:

```txt
Build compact search index t盻ｫ content.
Bundle ho蘯ｷc lazy load index vﾃo browser.
User gﾃｵ query.
Fuse.js tr蘯｣ k蘯ｿt qu蘯｣ ngay.
```

Khﾃｴng dﾃｹng:

```txt
API route /api/search
Database
External search service
```

---

## 7. Copy strategy

Copy ch蘯｡y trﾃｪn browser b蘯ｱng Clipboard API.

C蘯ｧn fallback n蘯ｿu Clipboard API l盻擁:

```txt
navigator.clipboard.writeText()
fallback textarea copy
```

Copy khﾃｴng c蘯ｧn backend.

---

## 8. Image strategy

Vﾃｬ static export cﾃｳ th盻・khﾃｴng dﾃｹng ﾄ柁ｰ盻｣c image optimization m蘯ｷc ﾄ黛ｻ杵h trong m盻冲 s盻・c蘯･u hﾃｬnh, nﾃｪn:

```txt
- ﾆｯu tiﾃｪn SVG/icon nh蘯ｹ.
- Dﾃｹng 蘯｣nh ﾃｭt.
- N蘯ｿu b蘯ｭt output: "export", c蘯･u hﾃｬnh images.unoptimized = true.
```

App nﾃy ch盻ｧ y蘯ｿu lﾃ text/code nﾃｪn khﾃｴng ph盻･ thu盻冂 蘯｣nh.

---

## 9. Deployment mode

## 9.1. Mode A 窶・Vercel Next.js default

Khuy蘯ｿn ngh盻・cho ngﾆｰ盻拱 m盻嬖.

```txt
next build
Vercel t盻ｱ x盻ｭ lﾃｽ Next.js
Khﾃｴng c蘯ｧn output: "export"
```

ﾆｯu ﾄ訴盻ノ:

```txt
- ﾃ衡 c蘯･u hﾃｬnh.
- D盻・deploy.
- H盻｣p v盻嬖 Next.js trﾃｪn Vercel.
```

## 9.2. Mode B 窶・Static export

Dﾃｹng khi mu盻創 ﾄ黛ｺ｣m b蘯｣o khﾃｴng cﾃｳ runtime server.

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

Lﾆｰu ﾃｽ:

```txt
- Khﾃｴng dﾃｹng API routes.
- Khﾃｴng dﾃｹng server actions.
- Khﾃｴng dﾃｹng dynamic runtime fetch.
- Dynamic route c蘯ｧn generateStaticParams.
```

Khuy蘯ｿn ngh盻・

```txt
B蘯ｯt ﾄ黛ｺｧu v盻嬖 Mode A.
Khi app 盻貧 ﾄ黛ｻ杵h vﾃ ch蘯ｯc ch蘯ｯn static-only, cﾃｳ th盻・chuy盻ハ Mode B.
```

---

## 10. Vercel project settings

Cﾃi ﾄ黛ｺｷt khuy蘯ｿn ngh盻・

```txt
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm ci
Output Directory: default
Node Version: LTS
```

N蘯ｿu dﾃｹng pnpm:

```txt
Install Command: npm ci
Build Command: npm run build
```

---

## 11. Khﾃｴng c蘯ｧn environment variables

MVP khﾃｴng c蘯ｧn `.env`.

N蘯ｿu sau nﾃy c蘯ｧn analytics public:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_ANALYTICS_ID
```

Khﾃｴng ﾄ黛ｻ・secret trong static frontend:

```txt
DATABASE_URL
JWT_SECRET
OPENAI_API_KEY
AWS_SECRET_ACCESS_KEY
```

N蘯ｿu cﾃｳ secret, nghﾄｩa lﾃ app ﾄ妥｣ c蘯ｧn backend riﾃｪng ho蘯ｷc serverless function. MVP khﾃｴng dﾃｹng.

---

## 12. Khi nﾃo static khﾃｴng cﾃｲn ﾄ黛ｻｧ?

Static-first v蘯ｫn ﾄ黛ｻｧ cho thﾆｰ vi盻㌻ tra c盻ｩu r蘯･t lﾃ｢u.

Ch盻・cﾃ｢n nh蘯ｯc backend khi c蘯ｧn:

```txt
- User login.
- Bookmark cﾃ｡ nhﾃ｢n.
- Admin editor online.
- Search analytics.
- AI generate template.
- Project zip generator server-side.
- Multi-user collaboration.
```

Nh盻ｯng th盻ｩ nﾃy khﾃｴng thu盻冂 MVP.

---

## 13. R盻ｧi ro vﾃ cﾃ｡ch trﾃ｡nh

## R盻ｧi ro 1: Bundle search quﾃ｡ n蘯ｷng

Cﾃ｡ch trﾃ｡nh:

```txt
- Search index compact.
- Khﾃｴng ﾄ柁ｰa code template vﾃo index.
- Lazy load search index.
- Cﾃ｢n nh蘯ｯc Pagefind/Orama n蘯ｿu l盻嬾.
```

## R盻ｧi ro 2: Content JSON l盻擁 lﾃm build fail

Cﾃ｡ch trﾃ｡nh:

```txt
- Validate content schema.
- TypeScript types.
- Script ki盻ノ tra content.
- Thﾃｪm content t盻ｫ t盻ｫ.
```

## R盻ｧi ro 3: Copy button l盻擁

Cﾃ｡ch trﾃ｡nh:

```txt
- Test trﾃｪn Chrome/Edge.
- Cﾃｳ fallback copy.
- Khﾃｴng copy UI label.
```

## R盻ｧi ro 4: Static export l盻擁 dynamic route

Cﾃ｡ch trﾃ｡nh:

```txt
- generateStaticParams.
- Khﾃｴng fetch runtime.
- Khﾃｴng dﾃｹng API routes.
```

---

## 14. Recommended MVP implementation order

```txt
1. Create Next.js app.
2. Add Tailwind.
3. Add static content schema.
4. Add 5 pattern JSON files.
5. Render pattern list.
6. Render pattern detail.
7. Add copy button.
8. Add Fuse.js search.
9. Add search suggestions.
10. Add decision guide.
11. Add library guide.
12. Expand to 25 patterns.
13. Deploy Vercel.
```

---

## 15. Final rule

N蘯ｿu m盻冲 tﾃｭnh nﾄハg yﾃｪu c蘯ｧu database/backend/server secret, khﾃｴng ﾄ柁ｰa vﾃo MVP.

Cﾃ｢u h盻淑 ki盻ノ tra:

```txt
Tﾃｭnh nﾄハg nﾃy cﾃｳ ch蘯｡y ﾄ柁ｰ盻｣c hoﾃn toﾃn trﾃｪn static Vercel khﾃｴng?
```

N蘯ｿu khﾃｴng, ﾄ黛ｻ・phase sau.

MVP ph蘯｣i gi盻ｯ:

```txt
Simple
Fast
Static
Searchable
Copyable
Vercel-friendly
```

