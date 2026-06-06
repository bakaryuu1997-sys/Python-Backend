# rules.md — AI Coding Rules for Python Backend Compass

## 1. Mục đích của file này

File này định nghĩa các quy tắc bắt buộc cho AI assistant, coding agent hoặc developer khi xây dựng dự án **Python Backend Compass**.

Dự án này là một web app dạng thư viện tra cứu backend Python, tập trung vào:

- Decision guide: muốn làm chức năng backend nào thì dùng gì.
- Template code backend Python.
- Library recommendation.
- Backend pattern.
- Production checklist.
- Search nhanh.
- Copy template dễ dùng.

Dự án **không phải** app bài tập, không phải course, không phải social platform, không phải forum.

---

## 2. Nguyên tắc sản phẩm

## 2.1. Luôn giữ sản phẩm đúng phạm vi

Chỉ build những chức năng phục vụ việc tra cứu backend Python.

Được phép làm:

- Trang chủ.
- Search.
- Category.
- Tag.
- Pattern detail.
- Library guide.
- Decision guide.
- Code template.
- Copy code.
- Copy toàn bộ template.
- Folder structure viewer.
- Checklist production.
- Nội dung “khi nào dùng / khi nào không dùng”.
- Nội dung “muốn làm chức năng X thì cần gì”.
- Template minimal và production.

Không được tự ý thêm:

- Bài tập.
- Quiz.
- Course.
- Comment.
- Forum.
- Chat realtime.
- Social feed.
- Like/rating.
- Payment.
- User workspace.
- Login phức tạp.
- AI chatbot trong MVP.
- Project management.
- Task management.
- Gamification.
- Chấm điểm code.
- Online code runner.

Nếu cần thêm chức năng mới, phải kiểm tra:

```txt
Chức năng này có giúp người dùng tra cứu backend Python nhanh hơn không?
Chức năng này có giúp copy template dễ hơn không?
Chức năng này có giúp quyết định thư viện/pattern đúng hơn không?
```

Nếu câu trả lời là không, không thêm.

---

## 3. Nguyên tắc phát triển chậm và chắc

Mỗi lần chỉnh sửa chỉ nên làm một nhóm thay đổi nhỏ.

Không được thay đổi quá nhiều file cùng lúc nếu không cần thiết.

Quy trình mỗi bước:

```txt
1. Đọc PRD.
2. Xác định phạm vi nhỏ.
3. Tạo hoặc sửa ít file nhất có thể.
4. Chạy kiểm tra.
5. Tự đánh giá.
6. Báo rõ đã làm gì, còn thiếu gì, bước tiếp theo là gì.
```

Không được nói “hoàn thành” nếu chưa kiểm tra tối thiểu.

Mỗi lần hoàn thành một bước cần có phần:

```txt
Đã làm:
- ...

Đã kiểm tra:
- ...

Rủi ro còn lại:
- ...

Bước tiếp theo:
- ...
```

---

## 4. Quy tắc kiến trúc frontend MVP

MVP ưu tiên static-first.

Stack khuyến nghị:

```txt
Next.js
TypeScript
Tailwind CSS
MDX hoặc JSON content
Fuse.js hoặc Lunr.js cho search local
```

MVP không bắt buộc có backend riêng.

Lý do:

- Dễ build.
- Dễ deploy.
- Dễ thêm nội dung.
- Ít rủi ro.
- Search nhanh với vài trăm pattern.
- Không cần database sớm.

---

## 5. Quy tắc cấu trúc thư mục dự án

Cấu trúc frontend đề xuất:

```txt
python-backend-compass/
├── app/
│   ├── page.tsx
│   ├── patterns/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── libraries/
│   │   └── page.tsx
│   ├── decision-guide/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── search/
│   ├── pattern/
│   ├── code/
│   ├── copy/
│   └── ui/
├── content/
│   ├── patterns/
│   ├── libraries/
│   ├── decisions/
│   └── architecture/
├── lib/
│   ├── content.ts
│   ├── search.ts
│   ├── slug.ts
│   └── copy.ts
├── types/
│   ├── pattern.ts
│   ├── library.ts
│   └── decision.ts
├── public/
├── docs/
│   ├── prd.md
│   ├── rules.md
│   └── agent.md
├── package.json
├── tsconfig.json
└── README.md
```

Không đặt nội dung pattern trực tiếp trong component UI nếu nội dung dài.

Content phải tách khỏi UI.

---

## 6. Quy tắc content

## 6.1. Mỗi pattern phải có format chuẩn

Mỗi pattern bắt buộc có:

```txt
id
slug
title
category
description
use_cases
when_to_use
when_not_to_use
recommended_libraries
install_commands
folder_structure
flow
templates
env_vars
common_errors
production_checklist
related_patterns
tags
difficulty
production_level
```

## 6.2. Không viết nội dung lan man

Mỗi pattern phải trả lời nhanh:

```txt
Dùng khi nào?
Không nên dùng khi nào?
Cần thư viện gì?
Cài như thế nào?
Viết những file nào?
Flow xử lý ra sao?
Copy template ở đâu?
Cần checklist production gì?
```

## 6.3. Mỗi template phải có filename rõ ràng

Không tạo code block không biết thuộc file nào.

Mỗi template cần:

```txt
filename
language
description
code
```

Ví dụ:

```json
{
  "filename": "app/routers/auth_router.py",
  "language": "python",
  "description": "Router xử lý register/login/protected route",
  "code": "..."
}
```

---

## 7. Quy tắc search

Search là tính năng cốt lõi.

Search phải hỗ trợ:

- Tìm theo title.
- Tìm theo description.
- Tìm theo use case.
- Tìm theo library.
- Tìm theo tag.
- Tìm theo synonym.
- Tìm theo filename/template name.

Ví dụ synonym bắt buộc có:

```json
{
  "auth": ["login", "register", "jwt", "token", "authentication"],
  "ocr": ["image to text", "scan text", "text recognition", "read image"],
  "upload": ["file upload", "image upload", "multipart"],
  "cache": ["redis", "speed up api", "response cache"],
  "background-job": ["queue", "worker", "celery", "async task"],
  "webhook": ["callback", "event receiver", "signature verification"]
}
```

Kết quả search phải hiển thị:

```txt
Title
Short description
Category
Libraries
Tags
Difficulty
Nút mở chi tiết
```

Không bắt người dùng phải mở nhiều trang mới biết nội dung có đúng nhu cầu không.

---

## 8. Quy tắc UI

## 8.1. Giao diện phải phục vụ tra cứu nhanh

Ưu tiên:

- Search lớn, dễ thấy.
- Sidebar category rõ.
- Filter dễ dùng.
- Nội dung chia section ngắn.
- Code block dễ copy.
- Folder tree dễ đọc.
- Checklist rõ ràng.
- Không có animation thừa.

## 8.2. Trang pattern detail phải có thứ tự cố định

Thứ tự đề xuất:

```txt
1. Title
2. Description
3. Quick decision
4. Khi nào dùng
5. Khi nào không dùng
6. Thư viện đề xuất
7. Install command
8. Flow xử lý
9. Folder structure
10. Templates
11. Env vars
12. Common errors
13. Production checklist
14. Related patterns
```

## 8.3. Copy button là bắt buộc

Mỗi code block phải có nút copy.

Mỗi pattern nên có:

- Copy install command.
- Copy folder structure.
- Copy từng file.
- Copy all templates.
- Copy checklist.

Nếu copy bị lỗi, phải sửa trước khi thêm tính năng mới.

---

## 9. Quy tắc code frontend

## 9.1. TypeScript

Bắt buộc dùng TypeScript.

Không dùng `any` nếu không thật sự cần.

Nên định nghĩa type rõ:

```ts
type Pattern = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
};
```

## 9.2. Component

Component phải nhỏ, rõ trách nhiệm.

Ví dụ:

```txt
SearchBox
SearchResults
PatternCard
PatternDetail
CodeBlock
CopyButton
FolderTree
LibraryBadge
Checklist
DecisionCard
```

Không viết một component quá dài chứa cả search, layout, data parsing và render code.

## 9.3. Styling

Ưu tiên Tailwind CSS.

Không hard-code style lặp lại quá nhiều.

Không thêm UI library nặng nếu chưa cần.

## 9.4. State

MVP chỉ cần state local:

- Search query.
- Selected category.
- Selected tags.
- Copy status.
- Theme nếu có.

Không dùng Redux/Zustand nếu chưa cần.

---

## 10. Quy tắc backend nếu có ở phase sau

Backend không phải ưu tiên MVP.

Chỉ thêm backend khi cần:

- Admin CRUD content.
- Full-text search server-side.
- User bookmark.
- Project generator.
- API phục vụ nhiều client.

Nếu thêm backend, dùng:

```txt
FastAPI
Pydantic
SQLAlchemy
Alembic
PostgreSQL
Redis nếu cần cache/job
pytest
Docker
```

Backend phải theo pattern:

```txt
router
schema
service
repository
model
core config
```

Không để logic nghiệp vụ trong router.

Không query database trực tiếp trong router nếu app đã qua giai đoạn demo nhỏ.

---

## 11. Quy tắc template backend Python trong app

Template phải hướng tới code sạch, dễ hiểu, có thể dùng thực tế.

Mỗi template Python nên tuân thủ:

- Có type hints.
- Có Pydantic schema.
- Có error handling cơ bản.
- Có config qua environment variables nếu cần.
- Không hard-code secret.
- Không log password/token.
- Không bỏ qua validation file upload.
- Không viết query SQL bằng string nếu không cần.
- Không dùng global mutable state nguy hiểm.
- Không dùng dependency không còn phổ biến nếu có lựa chọn tốt hơn.

---

## 12. Quy tắc bảo mật cho nội dung template

Template phải cảnh báo rõ các case bảo mật:

Authentication:

- Hash password bằng bcrypt/argon2.
- JWT phải có expiration.
- Refresh token cần kiểm soát.
- Login nên có rate limit.
- Không log password.
- Không trả password hash ra response.

Upload file:

- Check file size.
- Check MIME type.
- Check extension.
- Không tin filename từ user.
- Đổi tên file khi lưu.
- Không lưu file public nếu có dữ liệu nhạy cảm.
- Xóa file tạm khi xử lý xong.

OCR:

- Không log text nhạy cảm.
- Không lưu ảnh giấy tờ tùy thân nếu không cần.
- Có timeout.
- Dùng background job nếu file lớn.
- Có giới hạn số trang PDF.

Webhook:

- Verify signature.
- Dùng idempotency.
- Không tin payload nếu chưa verify.
- Log event id, không log secret.

Database:

- Dùng ORM/query parameter.
- Không nối chuỗi SQL từ input.
- Migration phải có rollback nếu có thể.
- Transaction cho thao tác quan trọng.

---

## 13. Quy tắc chất lượng nội dung

Mỗi nội dung phải có tính thực dụng.

Tránh câu chung chung kiểu:

```txt
Dùng thư viện này để xử lý tốt hơn.
```

Nên viết rõ:

```txt
Dùng Celery khi task mất nhiều thời gian, cần retry, worker riêng hoặc xử lý ngoài request-response cycle.
Không cần Celery nếu chỉ gửi một email đơn giản và không cần retry phức tạp.
```

Mỗi pattern nên có bảng quyết định nếu có nhiều lựa chọn.

Ví dụ OCR:

```txt
Tesseract: đơn giản, local CPU.
EasyOCR: dễ dùng, nhiều ngôn ngữ.
PaddleOCR: mạnh cho tài liệu/form/hóa đơn.
Cloud OCR: production ổn định nhưng tốn chi phí.
```

---

## 14. Quy tắc dependency

Không thêm package nếu chưa cần.

Trước khi thêm package, phải trả lời:

```txt
Package này giải quyết vấn đề gì?
Có thể làm bằng built-in hoặc package đang có không?
Package này có làm app nặng hơn không?
Có ảnh hưởng bảo trì không?
```

MVP frontend không nên thêm quá nhiều thư viện.

Gợi ý đủ dùng:

```txt
next
react
typescript
tailwindcss
fuse.js
lucide-react
gray-matter nếu dùng markdown
next-mdx-remote hoặc MDX nếu cần
```

---

## 15. Quy tắc kiểm thử

MVP frontend cần kiểm tra tối thiểu:

- Search trả kết quả đúng.
- Category filter hoạt động.
- Tag filter hoạt động.
- Copy code hoạt động.
- Pattern page render được.
- Không lỗi build.
- Không lỗi TypeScript.
- Responsive cơ bản.

Nếu có backend:

- Test service.
- Test repository.
- Test API.
- Test auth.
- Test upload validation.
- Test webhook signature.
- Test error handler.

---

## 16. Definition of Done cho mỗi task

Một task chỉ được coi là xong khi:

```txt
1. Code đã được thêm/sửa đúng phạm vi.
2. Không phá tính năng cũ.
3. Build không lỗi.
4. Type check không lỗi nếu có setup.
5. Search/copy/page liên quan đã kiểm tra thủ công hoặc bằng test.
6. Có báo cáo ngắn đã làm gì.
7. Có nêu rủi ro còn lại nếu có.
```

Không được đánh dấu hoàn thành nếu chỉ mới viết code nhưng chưa kiểm tra.

---

## 17. Definition of Done cho MVP

MVP hoàn thành khi có:

- Trang chủ.
- Search hoạt động.
- Sidebar category.
- Pattern list.
- Pattern detail.
- Library guide.
- Decision guide.
- Ít nhất 25 pattern backend.
- Code block có copy button.
- Copy all templates.
- Responsive cơ bản.
- Build thành công.
- README hướng dẫn chạy.
- Nội dung không có bài tập hoặc chức năng thừa.

---

## 18. Quy tắc báo cáo tiến độ

Sau mỗi bước build, AI/dev phải báo theo format:

```txt
Đã hoàn thành:
- ...

Đã kiểm tra:
- ...

Chưa làm:
- ...

Rủi ro:
- ...

Bước tiếp theo hợp lý:
- ...
```

Báo cáo phải trung thực. Nếu chưa test thì nói chưa test.

---

## 19. Ưu tiên khi có lỗi

Thứ tự ưu tiên sửa:

```txt
1. App không chạy/build lỗi.
2. Copy button lỗi.
3. Search lỗi.
4. Pattern page lỗi.
5. Sai dữ liệu content.
6. UI xấu nhưng vẫn dùng được.
7. Tính năng phụ.
```

Không thêm tính năng mới khi app còn lỗi search/copy/build.

---

## 20. Nguyên tắc cuối cùng

Dự án này phải là công cụ giúp developer backend Python làm việc nhanh hơn và chuyên nghiệp hơn.

Mọi quyết định thiết kế, code, content đều phải phục vụ 4 câu hỏi:

```txt
Người dùng muốn làm chức năng gì?
Nên dùng thư viện nào?
Cần viết những file nào?
Có template nào copy được ngay?
```

Nếu một phần không giúp trả lời 4 câu hỏi trên, hãy bỏ hoặc để phase sau.
