# Python Backend Compass

**Python Backend Compass** là web app thư viện tra cứu backend Python dạng static-first, deploy lên Vercel, không cần database, không cần backend server riêng.

Mục tiêu của dự án:

```txt
Muốn làm chức năng backend gì?
→ Nên dùng thư viện nào?
→ Nên tổ chức code ra sao?
→ Có template nào copy được ngay?
→ Cần checklist production gì?
```

Dự án này không phải course, không phải blog cá nhân, không phải app bài tập. Đây là một **backend decision library + template library** dành cho Python backend developer.

---

## 1. Phạm vi sản phẩm

Ứng dụng tập trung vào:

- Backend Python.
- FastAPI.
- Django / Django REST Framework.
- Flask / lightweight APIs.
- SQLAlchemy / SQLModel / Alembic.
- Pydantic.
- Authentication / Authorization.
- Upload file / image / S3.
- OCR / PDF / document processing.
- Background jobs.
- Redis cache.
- Rate limiting.
- Webhook / payment.
- Import/export.
- Testing.
- Logging / observability.
- Docker / Vercel static deployment.
- Clean architecture.
- AI backend: LLM, RAG, vector database, tool backend.

---

## 2. Quyết định kiến trúc chính

Dự án này chọn hướng:

```txt
Frontend static web app
Content lưu bằng file JSON/MDX
Search chạy phía client
Deploy lên Vercel
Không database
Không backend API
Không auth
Không admin dashboard trong bản đầu
```

Lý do:

- Dễ deploy.
- Ít lỗi.
- Không cần vận hành server.
- Không cần quản lý database.
- Vercel phù hợp với Next.js static/content app.
- Nội dung có thể version control bằng Git.
- Search vài trăm đến vài nghìn pattern có thể chạy tốt bằng client-side index.

---

## 3. Stack đề xuất

```txt
Next.js
TypeScript
Tailwind CSS
Static JSON/MDX content
Fuse.js hoặc Orama/Pagefind cho search
Vercel deployment
```

Khuyến nghị MVP:

```txt
Next.js + TypeScript + Tailwind + JSON content + Fuse.js
```

Sau này nếu nội dung rất lớn:

```txt
Pagefind hoặc Orama local search
```

Vẫn không cần database/backend.

---

## 4. Tính năng chính

## 4.1. Trang chủ

Trang chủ cần có:

- Search bar lớn.
- Gợi ý nhanh theo use case.
- Category phổ biến.
- Pattern nổi bật.
- Library phổ biến.
- Đường dẫn đến Decision Guide.

Ví dụ use case:

```txt
Muốn làm REST API
Muốn login JWT
Muốn upload file
Muốn chụp ảnh OCR
Muốn xử lý PDF
Muốn gửi email
Muốn chạy background job
Muốn cache bằng Redis
Muốn deploy FastAPI
Muốn làm RAG backend
```

---

## 4.2. Search nhanh có gợi ý

Search là tính năng quan trọng nhất.

Search cần hỗ trợ:

- Gõ là có gợi ý.
- Fuzzy search.
- Search tiếng Việt và tiếng Anh.
- Search theo title.
- Search theo use case.
- Search theo tag.
- Search theo library.
- Search theo filename template.
- Search theo synonym.
- Keyboard navigation.
- Kết quả dưới 100-200ms với dữ liệu vừa.

Ví dụ:

```txt
"chụp ảnh lấy chữ" → Image OCR API
"login jwt" → JWT Authentication
"file lớn" → Background Job / Upload Large File
"redis" → Redis Cache / Rate Limit
"rag" → RAG Backend
```

---

## 4.3. Pattern Detail

Mỗi pattern cần hiển thị:

```txt
1. Title
2. Summary
3. Khi nào dùng?
4. Khi nào không dùng?
5. Recommended stack
6. Install commands
7. Architecture flow
8. Folder structure
9. Template files
10. .env example nếu có
11. Common errors
12. Security notes
13. Performance notes
14. Testing notes
15. Production checklist
16. Related patterns
```

---

## 4.4. Copy template

Bắt buộc có:

- Copy command.
- Copy code block.
- Copy từng file.
- Copy toàn bộ template.
- Copy folder structure.
- Copy `.env.example`.

Nếu copy lỗi, ưu tiên sửa trước khi thêm tính năng mới.

---

## 5. Nội dung MVP

MVP cần có ít nhất 25 pattern:

```txt
1. FastAPI Project Structure
2. FastAPI CRUD API
3. Pydantic Schema
4. SQLAlchemy Session
5. Alembic Migration
6. JWT Auth
7. Refresh Token
8. RBAC
9. Upload Image
10. Upload File to S3
11. Image OCR API
12. PDF OCR API
13. Email Sending
14. FastAPI BackgroundTasks
15. Celery Worker
16. Redis Cache
17. Rate Limiting
18. Pagination Filtering Sorting
19. Global Error Handling
20. Request Logging
21. Webhook Receiver
22. Payment Webhook
23. CSV/Excel Import
24. Export Excel/PDF
25. Docker Deploy FastAPI
```

---

## 6. Không làm trong bản đầu

Không thêm:

- Database.
- Backend API.
- Login.
- Admin dashboard.
- Comment.
- Forum.
- Course.
- Bài tập.
- Quiz.
- Payment.
- User workspace.
- Online code runner.
- AI chatbot.

Lý do: các phần này làm app phức tạp, không cần thiết cho mục tiêu thư viện tra cứu.

---

## 7. Cấu trúc thư mục đề xuất

```txt
python-backend-compass/
├── app/
├── components/
├── content/
├── lib/
├── types/
├── public/
├── docs/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

Xem chi tiết trong `docs/structure.md`.

---

## 8. Cách chạy local

Xem `docs/install.md`.

Tóm tắt:

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

---

## 9. Deploy lên Vercel

Cách đơn giản nhất:

```txt
1. Push project lên GitHub.
2. Import repository vào Vercel.
3. Vercel nhận diện Next.js.
4. Build command: npm run build.
5. Deploy.
```

Không cần database, không cần server, không cần biến môi trường trừ khi sau này dùng service ngoài.

---

## 10. Tài liệu trong repo

```txt
docs/prd.md
docs/rules.md
docs/agent.md
docs/goal.md
docs/content-roadmap.md
docs/install.md
docs/structure.md
docs/search-spec.md
docs/vercel-static-plan.md
```

---

## 11. Roadmap ngắn

```txt
Phase 1: Static app + 5 pattern mẫu
Phase 2: Search + suggestion + copy button
Phase 3: 25 pattern MVP
Phase 4: 50+ backend core patterns
Phase 5: 100+ production patterns
Phase 6: advanced architecture
Phase 7: AI backend/RAG/OCR/LLM patterns
```

---

## 12. Nguyên tắc quan trọng

Luôn giữ app là:

```txt
Static-first
Search-first
Template-first
No database
No backend unless thật sự cần sau này
Vercel-friendly
Content-driven
```

Mỗi tính năng mới phải trả lời được:

```txt
Nó có giúp tìm pattern nhanh hơn không?
Nó có giúp copy template tốt hơn không?
Nó có giúp quyết định thư viện/backend architecture tốt hơn không?
```

Nếu không, không thêm vào bản đầu.
