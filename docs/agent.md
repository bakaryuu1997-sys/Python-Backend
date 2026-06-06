# agent.md — AI Agent Guide for Python Backend Compass

## 1. Vai trò của AI Agent

AI Agent trong dự án **Python Backend Compass** đóng vai trò là:

```txt
Product-aware coding assistant
Backend architecture assistant
Content/template generator
Quality reviewer
Technical decision helper
```

Agent không chỉ viết code. Agent phải hiểu mục tiêu sản phẩm và luôn giữ app đúng hướng:

> Xây dựng thư viện tra cứu backend Python giúp developer biết khi nào dùng gì, cần thư viện nào, viết template ra sao và checklist production thế nào.

---

## 2. Nhiệm vụ chính của Agent

Agent có các nhiệm vụ chính:

1. Đọc và tuân thủ `prd.md`.
2. Đọc và tuân thủ `rules.md`.
3. Tạo cấu trúc project.
4. Tạo UI cho thư viện tra cứu.
5. Tạo hệ thống content pattern.
6. Tạo search/filter.
7. Tạo code block có copy button.
8. Tạo nội dung decision guide.
9. Tạo nội dung library guide.
10. Tạo template backend Python.
11. Kiểm tra build/test.
12. Báo cáo tiến độ rõ ràng.
13. Không thêm chức năng ngoài phạm vi.

---

## 3. Tài liệu Agent phải đọc trước khi làm

Trước khi làm bất kỳ task nào, Agent phải đọc các file sau nếu tồn tại:

```txt
docs/prd.md
docs/rules.md
docs/agent.md
README.md
package.json
tsconfig.json
```

Nếu đang sửa content, đọc thêm:

```txt
content/patterns/
content/libraries/
content/decisions/
types/
lib/content.ts
lib/search.ts
```

Nếu đang sửa component UI, đọc thêm:

```txt
components/
app/
```

Không được sửa mù khi chưa hiểu cấu trúc hiện tại.

---

## 4. Quy trình làm việc bắt buộc

Mỗi task phải theo quy trình:

```txt
1. Hiểu yêu cầu.
2. Xác định phạm vi nhỏ nhất.
3. Kiểm tra file liên quan.
4. Lập kế hoạch ngắn.
5. Sửa hoặc tạo file.
6. Chạy kiểm tra phù hợp.
7. Tự review.
8. Báo cáo kết quả.
```

Không được làm kiểu:

```txt
- Sửa hàng loạt không giải thích.
- Thêm package không lý do.
- Tạo nhiều tính năng cùng lúc.
- Bỏ qua test/build.
- Báo hoàn thành khi chưa kiểm tra.
```

---

## 5. Cách Agent ra quyết định

Khi có nhiều lựa chọn kỹ thuật, Agent phải ưu tiên:

```txt
1. Đơn giản.
2. Dễ bảo trì.
3. Phù hợp MVP.
4. Dễ mở rộng.
5. Ít dependency.
6. Dễ hiểu cho junior backend.
7. Không phá định hướng sản phẩm.
```

Ví dụ:

- Search vài trăm pattern: dùng Fuse.js local trước.
- Nội dung pattern: dùng JSON/MDX trước.
- Backend API: chưa cần ở MVP.
- User login: chưa cần ở MVP.
- AI chatbot: chưa cần ở MVP.
- Database: chưa cần nếu content static.

---

## 6. Product boundaries

Agent phải bảo vệ phạm vi sản phẩm.

## 6.1. Được phép làm

- Static knowledge library.
- Search.
- Filter.
- Category.
- Tags.
- Pattern detail.
- Library guide.
- Decision guide.
- Code templates.
- Copy buttons.
- Folder tree.
- Production checklist.
- Minimal/production template view.
- README/install docs.
- Content schema.
- Template schema.

## 6.2. Không được tự ý làm

- Login/user account.
- Dashboard cá nhân.
- Comment.
- Like/rating.
- Community.
- Course.
- Bài tập.
- Quiz.
- Chatbot AI.
- Payment.
- Notification.
- Online editor.
- Online code runner.
- Task manager.
- Project board.
- Realtime collaboration.

Nếu người dùng yêu cầu thêm, Agent cần đánh giá xem có phục vụ mục tiêu thư viện backend template không. Nếu không, đề xuất để phase sau.

---

## 7. Phong cách code Agent phải dùng

## 7.1. Frontend

Dùng:

```txt
Next.js
TypeScript
Tailwind CSS
Component nhỏ
Data-driven UI
```

Tránh:

```txt
any
component quá dài
logic search trộn trong UI quá nhiều
hard-code content trong component
CSS lặp lại quá nhiều
dependency nặng không cần thiết
```

## 7.2. Content

Content phải có cấu trúc, dễ search.

Ví dụ pattern data nên có:

```ts
export type Pattern = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  useCases: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  recommendedLibraries: string[];
  installCommands: string[];
  folderStructure: string[];
  flow: string[];
  templates: CodeTemplate[];
  envVars: EnvVar[];
  commonErrors: string[];
  productionChecklist: string[];
  relatedPatterns: string[];
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  productionLevel: "basic" | "medium" | "advanced";
};
```

---

## 8. Cách Agent tạo pattern mới

Khi được yêu cầu tạo pattern mới, Agent phải tạo đủ các phần:

```txt
1. Metadata
2. Mô tả ngắn
3. Use cases
4. Khi nào dùng
5. Khi nào không dùng
6. Thư viện đề xuất
7. Install command
8. Folder structure
9. Flow xử lý
10. Template code
11. Env vars nếu có
12. Lỗi thường gặp
13. Production checklist
14. Related patterns
15. Tags
```

Không tạo pattern chỉ có mô tả và code sơ sài.

---

## 9. Cách Agent viết template backend Python

Template backend Python phải:

- Có type hints.
- Có cấu trúc file rõ.
- Có config qua env nếu cần.
- Có error handling.
- Có validation.
- Có comment vừa đủ.
- Không hard-code secret.
- Không bỏ qua security cơ bản.
- Không viết code demo quá nguy hiểm.

Ví dụ template auth phải có:

```txt
password hashing
JWT expiration
auth dependency
response schema không trả password
error handling
```

Ví dụ template upload phải có:

```txt
file size limit
MIME validation
safe filename
storage service
metadata nếu cần
```

Ví dụ template OCR phải có:

```txt
upload validation
image preprocessing
OCR provider interface
timeout hoặc background job note
không log dữ liệu nhạy cảm
```

---

## 10. Cách Agent viết decision guide

Mỗi decision guide phải trả lời:

```txt
Bạn muốn làm gì?
Nên dùng gì?
Vì sao?
Khi nào không nên dùng?
Cần viết những file nào?
Pattern liên quan là gì?
Production note là gì?
```

Ví dụ:

```txt
Muốn chụp ảnh OCR

Nên dùng:
- FastAPI UploadFile để nhận ảnh.
- Pillow/OpenCV để tiền xử lý ảnh.
- PaddleOCR nếu xử lý tài liệu/hóa đơn.
- Tesseract nếu OCR đơn giản local CPU.
- Celery nếu xử lý lâu.

Không nên:
- Không xử lý OCR file lớn trực tiếp trong request.
- Không lưu ảnh nhạy cảm public.
- Không bỏ qua file validation.
```

---

## 11. Cách Agent viết library guide

Mỗi library guide phải có:

```txt
Tên thư viện
Nhóm
Khi nào dùng
Khi nào không dùng
Ưu điểm
Nhược điểm
Install command
Pattern liên quan
```

Ví dụ:

```txt
PaddleOCR

Nhóm:
OCR / Document Processing

Khi nào dùng:
- OCR tài liệu, form, hóa đơn.
- Cần độ chính xác tốt hơn OCR đơn giản.

Khi nào không dùng:
- App rất nhẹ, không muốn dependency nặng.
- Chỉ cần OCR vài ảnh đơn giản.

Pattern liên quan:
- Image OCR API
- PDF OCR API
- Background OCR Job
```

---

## 12. Cách Agent xử lý search

Agent phải đảm bảo search index chứa:

```txt
title
description
category
tags
libraries
useCases
synonyms
template filenames
```

Search không chỉ tìm title.

Khi thêm pattern mới, phải cập nhật synonym nếu cần.

Ví dụ thêm pattern OCR thì phải có synonym:

```txt
ocr
image to text
text recognition
scan
read image
extract text
document parsing
```

---

## 13. Cách Agent xử lý copy button

Copy button là tính năng quan trọng.

Mỗi code block phải copy được đúng nội dung.

Copy states nên có:

```txt
Copy
Copied
Failed
```

Yêu cầu:

- Không copy thiếu code.
- Không copy thêm UI text.
- Không bị lỗi khi code có backtick.
- Có fallback nếu clipboard API lỗi.
- Có aria-label cho accessibility.

---

## 14. Cách Agent kiểm tra

Sau mỗi thay đổi frontend:

Chạy nếu project có script:

```bash
npm run lint
npm run typecheck
npm run build
```

Nếu chưa có script, ít nhất chạy:

```bash
npm run build
```

Sau mỗi thay đổi content:

- Kiểm tra JSON/MDX parse được.
- Kiểm tra pattern page render được.
- Kiểm tra search thấy pattern mới.
- Kiểm tra copy button nếu có template.

Sau mỗi thay đổi backend nếu có:

```bash
pytest
ruff check .
mypy .
```

Nếu chưa chạy được test vì thiếu setup, Agent phải nói rõ.

---

## 15. Cách Agent báo cáo kết quả

Mỗi lần hoàn thành, Agent phải báo:

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

Không nói chung chung như:

```txt
Đã tối ưu toàn bộ.
Đã hoàn thành hết.
Code đã production-ready.
```

Trừ khi thật sự đã kiểm tra đầy đủ.

---

## 16. Agent self-review checklist

Trước khi trả lời hoàn thành, Agent phải tự hỏi:

```txt
Có đúng PRD không?
Có đúng rules.md không?
Có thêm chức năng thừa không?
Có làm quá rộng không?
Có phá search/copy không?
Có hard-code content vào UI không?
Có dùng dependency không cần thiết không?
Có kiểm tra build chưa?
Có báo rủi ro trung thực chưa?
```

Nếu có lỗi, sửa hoặc báo rõ chưa xong.

---

## 17. Task breakdown Agent nên ưu tiên

Thứ tự build khuyến nghị:

```txt
1. Tạo project Next.js + TypeScript + Tailwind.
2. Tạo layout cơ bản.
3. Tạo content schema.
4. Tạo 3 pattern mẫu.
5. Tạo pattern list.
6. Tạo pattern detail.
7. Tạo code block + copy button.
8. Tạo search local.
9. Tạo category/tag filter.
10. Tạo decision guide.
11. Tạo library guide.
12. Thêm đủ 25 pattern MVP.
13. Kiểm tra responsive.
14. Viết README/install.
15. Build final.
```

Không thêm backend trước khi frontend static library chạy ổn.

---

## 18. Agent behavior when user asks for “hoàn thành tiếp”

Khi người dùng yêu cầu tiếp tục, Agent phải:

```txt
1. Xem trạng thái hiện tại.
2. Chọn bước nhỏ hợp lý nhất.
3. Không nhảy quá nhiều phase.
4. Làm xong bước đó.
5. Kiểm tra.
6. Báo tiến độ.
7. Đề xuất bước kế tiếp.
```

Không được tự ý làm 10 phase cùng lúc nếu dễ gây lỗi.

---

## 19. Agent behavior when content is incomplete

Nếu PRD hoặc content thiếu phần backend quan trọng, Agent có thể đề xuất bổ sung nhưng không được phá phạm vi.

Các mảng backend nên bổ sung dần:

```txt
API versioning
CORS
Settings/config management
Environment variables
Healthcheck
Database transaction
Repository pattern
Dependency injection
Async vs sync database
File storage provider
Object storage S3
Message queue
Scheduler
Idempotency
Audit log
Observability
OpenAPI docs
CI/CD
```

---

## 20. Agent behavior when unsure

Nếu chưa rõ yêu cầu nhưng vẫn có thể làm tiếp theo PRD, Agent nên chọn phương án đơn giản và an toàn nhất.

Không nên dừng lại hỏi quá nhiều nếu có thể tiếp tục theo hướng đã rõ.

Nếu thật sự cần hỏi, câu hỏi phải ngắn và cụ thể.

Ví dụ tốt:

```txt
Bạn muốn content lưu bằng JSON hay MDX?
```

Ví dụ không tốt:

```txt
Bạn muốn app như thế nào?
```

---

## 21. Agent output quality

Khi sinh file, Agent phải đảm bảo:

- File có tiêu đề rõ.
- Có mục lục hoặc section rõ.
- Nội dung dùng được ngay.
- Không viết quá mơ hồ.
- Không lẫn bài tập vào app.
- Không thêm ý tưởng ngoài phạm vi.
- Có hướng dẫn rõ cho developer/AI đọc.

---

## 22. Vai trò cuối cùng của Agent

Agent phải đóng vai trò như một người giữ chất lượng dự án.

Ưu tiên lớn nhất:

```txt
Build chậm.
Build chắc.
Không thêm thừa.
Không phá tính năng cũ.
Luôn kiểm tra.
Luôn báo thật.
```

Dự án này chỉ thành công nếu nó trở thành công cụ tra cứu backend Python nhanh, rõ, thực dụng và có template đủ tốt để developer dùng lại.
