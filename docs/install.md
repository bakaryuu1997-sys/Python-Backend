# install.md — Local Setup & Vercel Deployment Guide

## 1. Mục tiêu

File này hướng dẫn cài đặt, chạy local và deploy **Python Backend Compass** lên Vercel theo hướng đơn giản nhất:

```txt
Không database
Không backend API
Không server riêng
Không Docker bắt buộc
Deploy bằng Vercel
Content lưu trong repo
Search chạy trên client
```

---

## 2. Yêu cầu môi trường

Cần cài:

```txt
Node.js LTS
npm hoặc pnpm
Git
VS Code hoặc editor tương đương
```

Khuyến nghị:

```txt
Node.js 20+ hoặc bản LTS mới
pnpm nếu muốn cài package nhanh hơn
```

Nếu mới bắt đầu, dùng `npm` là đủ.

---

## 3. Tạo project Next.js

Nếu tạo mới từ đầu:

```bash
npx create-next-app@latest python-backend-compass
```

Khi được hỏi, chọn:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: No hoặc Yes đều được, nhưng nên thống nhất
App Router: Yes
Turbopack: tùy chọn
Import alias: Yes
```

Đi vào folder:

```bash
cd python-backend-compass
```

---

## 4. Cài package cần thiết

MVP nên cài ít package.

```bash
npm install fuse.js lucide-react
```

Nếu dùng Markdown/MDX content:

```bash
npm install gray-matter
```

Nếu dùng MDX nâng cao:

```bash
npm install @next/mdx
```

Khuyến nghị MVP đơn giản:

```txt
Dùng JSON content trước.
Chưa cần MDX nếu muốn build nhanh và ít lỗi.
```

---

## 5. Package scripts đề xuất

Trong `package.json` nên có:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

Nếu dùng Next.js mới không còn `next lint` mặc định, có thể dùng ESLint config riêng. Nhưng ở giai đoạn đầu, quan trọng nhất là:

```bash
npm run build
npm run typecheck
```

---

## 6. Chạy local

```bash
npm install
npm run dev
```

Mở:

```txt
http://localhost:3000
```

---

## 7. Build kiểm tra trước khi deploy

```bash
npm run build
```

Nếu có typecheck:

```bash
npm run typecheck
```

Nếu build lỗi, sửa trước khi deploy.

Không deploy khi:

```txt
- Search lỗi.
- Pattern page không render.
- Copy button lỗi.
- JSON content parse lỗi.
- TypeScript lỗi.
```

---

## 8. Cấu hình static-friendly cho Next.js

Vì app không cần backend/database, nên ưu tiên static-friendly.

Có 2 hướng:

## 8.1. Deploy Next.js bình thường lên Vercel

Khuyến nghị dùng hướng này trước.

Ưu điểm:

```txt
- Vercel hỗ trợ Next.js tốt.
- Không cần tự cấu hình static export.
- Vẫn có thể dùng static generation.
- Ít lỗi hơn cho người mới.
```

## 8.2. Static export hoàn toàn

Nếu muốn xuất HTML/CSS/JS static hoàn toàn, thêm vào `next.config.ts`:

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

Lưu ý khi dùng static export:

```txt
- Không dùng API routes.
- Không dùng server-only dynamic features.
- Không dùng image optimization mặc định của Next.js.
- Dynamic routes cần generate static params.
- Tất cả content nên build-time/static.
```

Với dự án này, static export phù hợp vì:

```txt
- Content nằm trong repo.
- Search index build từ file.
- Không có database.
- Không có login.
- Không có backend API.
```

---

## 9. Deploy lên Vercel

## 9.1. Cách deploy qua GitHub

```txt
1. Tạo repository GitHub.
2. Push source code.
3. Vào Vercel.
4. New Project.
5. Import repository.
6. Framework Preset: Next.js.
7. Build Command: npm run build.
8. Output Directory: để mặc định nếu deploy Next.js bình thường.
9. Deploy.
```

Nếu dùng static export với `output: "export"`:

```txt
- Vercel vẫn có thể build Next.js.
- Không cần thêm backend.
- Nếu tự cấu hình output directory, kiểm tra thư mục xuất ra là `out`.
```

Khuyến nghị:

```txt
Người mới nên để Vercel tự nhận diện Next.js trước.
Chỉ bật output: "export" khi đã chắc app không cần server features.
```

---

## 10. Environment variables

MVP không cần `.env`.

Chỉ thêm `.env.example` nếu sau này có:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_ANALYTICS_ID
```

Không thêm secret backend vì app static.

Không lưu:

```txt
API key riêng tư
Database URL
JWT secret
Cloud secret
```

trong frontend static.

---

## 11. Search local setup

Cài Fuse.js:

```bash
npm install fuse.js
```

Tạo search index từ content:

```txt
content/patterns/*.json
→ lib/search-index.ts
→ SearchBox component
```

Search cần chạy client-side.

Không gọi API search.

Không dùng database search.

Không dùng Elasticsearch/Meilisearch trong MVP.

---

## 12. Kiểm tra sau khi deploy

Sau khi deploy Vercel, kiểm tra:

```txt
1. Trang chủ load được.
2. Search gợi ý hoạt động.
3. Search từ khóa tiếng Việt hoạt động.
4. Mở pattern detail được.
5. Copy code hoạt động.
6. Copy all templates hoạt động.
7. Mobile layout dùng được.
8. Không có lỗi console nghiêm trọng.
9. Không có route 404 sai.
10. Reload trực tiếp pattern URL vẫn hoạt động.
```

---

## 13. Lỗi thường gặp

## 13.1. Search không ra kết quả

Kiểm tra:

```txt
- Pattern có tags không?
- Pattern có title/description không?
- Search index có load không?
- Component search có chạy ở client không?
- Có "use client" nếu dùng state/browser API không?
```

## 13.2. Copy button không hoạt động

Kiểm tra:

```txt
- Component có chạy client không?
- Có dùng navigator.clipboard không?
- Có fallback textarea copy không?
- Có copy đúng code string không?
```

## 13.3. Static export lỗi dynamic route

Kiểm tra:

```txt
- Có generateStaticParams không?
- Pattern slug có đủ không?
- Không dùng dynamic server fetch runtime.
```

## 13.4. Vercel build lỗi vì content JSON

Kiểm tra:

```txt
- JSON có dấu phẩy thừa không?
- Field bắt buộc có đủ không?
- Encoding UTF-8.
- Không có backtick/string multiline sai format.
```

---

## 14. Quy trình deploy an toàn

Trước khi merge/deploy:

```bash
npm run typecheck
npm run build
```

Checklist:

```txt
- Search OK.
- Copy OK.
- Pattern detail OK.
- Mobile OK.
- Không thêm backend/database.
- Không thêm package nặng không cần thiết.
```

---

## 15. Kết luận

Cách cài đặt/deploy tốt nhất cho dự án này:

```txt
Next.js static/content app
Deploy Vercel
Content trong repo
Search client-side
Không database
Không backend server
```

Đây là hướng đơn giản, ổn định và phù hợp nhất với mục tiêu thư viện tra cứu backend Python.
