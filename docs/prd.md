# PRD — Python Backend Decision & Template Library

**Tên dự án đề xuất:** Python Backend Compass  
**Loại sản phẩm:** Web app thư viện tra cứu backend Python, decision guide và template code  
**Phiên bản PRD:** v1.0  
**Mục tiêu:** Giúp developer tra cứu nhanh “muốn làm chức năng X thì cần dùng gì, viết như thế nào, chọn thư viện nào, cấu trúc code ra sao”.

---

## 1. Tóm tắt sản phẩm

Python Backend Compass là một web app dạng thư viện kỹ thuật dành cho lập trình backend Python. Ứng dụng không phải nền tảng học bài tập, không phải blog, không phải app quản lý project. Mục tiêu chính là giúp developer backend tra cứu nhanh các pattern, template, thư viện và checklist cần dùng khi xây dựng chức năng thực tế.

Ví dụ người dùng có thể tìm:

- Muốn làm REST API thì dùng gì?
- Muốn login JWT thì cần những file nào?
- Muốn upload ảnh thì dùng thư viện gì?
- Muốn chụp ảnh OCR thì backend cần xử lý ra sao?
- Muốn gửi email nền thì dùng BackgroundTasks hay Celery?
- Muốn xử lý webhook thanh toán thì cần template gì?
- Muốn dùng Redis cache thì viết pattern thế nào?
- Muốn viết clean architecture với FastAPI thì chia folder ra sao?

Sản phẩm tập trung vào 3 giá trị:

1. Ra quyết định nhanh.
2. Copy template chuẩn.
3. Tra cứu thư viện phù hợp theo từng chức năng backend.

---

## 2. Vấn đề cần giải quyết

Khi viết backend Python, người mới hoặc fresher thường gặp các vấn đề sau:

- Không biết chức năng này nên dùng framework/thư viện nào.
- Không biết nên chia folder như thế nào.
- Không biết API flow nên đi từ router, service, repository ra sao.
- Không biết template code chuẩn để bắt đầu.
- Không biết khi nào dùng FastAPI, Django, Flask, SQLAlchemy, Celery, Redis, Alembic, Pydantic.
- Mỗi lần làm chức năng lại phải tìm nhiều nguồn khác nhau.
- Copy code từ nhiều nơi dễ bị thiếu bảo mật, thiếu validate, thiếu error handling.
- Không có checklist kỹ thuật trước khi dùng một pattern.

Python Backend Compass giải quyết bằng cách gom thành một thư viện có tìm kiếm, phân loại, decision map và template code có thể copy ngay.

---

## 3. Mục tiêu sản phẩm

### 3.1. Mục tiêu chính

Xây dựng một web app giúp developer backend Python:

- Tra cứu chức năng backend theo nhu cầu.
- Biết khi nào nên dùng framework/thư viện nào.
- Xem cấu trúc thư mục đề xuất.
- Xem flow xử lý backend.
- Copy template code theo từng file.
- Copy toàn bộ template của một pattern.
- Tìm kiếm nhanh theo tên chức năng, thư viện, từ khóa kỹ thuật.
- Xem checklist kỹ thuật để tránh lỗi phổ biến.
- Xem mức độ phức tạp và yêu cầu production của từng pattern.

### 3.2. Không nằm trong phạm vi

Ứng dụng **không cần**:

- Bài tập luyện tập.
- Chấm điểm code.
- Đăng bài cộng đồng.
- Chat realtime.
- Forum.
- Course học lập trình.
- Hệ thống user phức tạp.
- Payment.
- AI agent ở bản đầu.
- Tự động generate project production hoàn chỉnh ở MVP.
- Chạy code trực tiếp trong browser.
- Quản lý task cá nhân.

---

## 4. Người dùng mục tiêu

### 4.1. Backend fresher / junior

Nhu cầu:

- Cần biết nên dùng thư viện gì.
- Cần template để bắt đầu nhanh.
- Cần hiểu flow backend chuẩn.
- Cần checklist để tránh code thiếu.

### 4.2. Developer đang làm project cá nhân

Nhu cầu:

- Muốn build API nhanh.
- Muốn copy cấu trúc chuẩn.
- Muốn tra cứu các chức năng như auth, upload, OCR, email, webhook, cache.

### 4.3. Developer muốn chuẩn hóa code

Nhu cầu:

- Muốn lưu lại pattern chuẩn.
- Muốn có thư viện template riêng.
- Muốn dùng lại cấu trúc router/service/repository/schema.

---

## 5. Định vị sản phẩm

Python Backend Compass là:

> “Thư viện tra cứu quyết định kỹ thuật và template backend Python.”

Không phải:

- Blog dạy Python.
- Website bài tập.
- Nền tảng khóa học.
- Công cụ low-code.
- Công cụ sinh app tự động hoàn toàn.

---

## 6. Stack đề xuất

### 6.1. MVP đơn giản, dễ build

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- Markdown/MDX hoặc JSON content
- Fuse.js hoặc Lunr.js để search local

Backend giai đoạn đầu:

- Không bắt buộc có backend
- Có thể dùng static content trước

Lưu trữ nội dung:

- `/content/patterns/*.mdx`
- hoặc `/data/patterns/*.json`

Deploy:

- Vercel hoặc Docker static app

### 6.2. Giai đoạn nâng cấp có backend

Backend:

- FastAPI
- Pydantic
- SQLAlchemy
- PostgreSQL hoặc SQLite
- Alembic
- Redis nếu cần cache
- Docker

Search nâng cao:

- PostgreSQL full-text search
- Meilisearch
- Typesense
- Elasticsearch nếu dữ liệu lớn

---

## 7. Cấu trúc thông tin chính

Ứng dụng nên có các nhóm nội dung sau:

```txt
Python Backend Compass
├── Decision Guide
├── Feature Library
├── Code Templates
├── Library Guide
├── Architecture Patterns
├── Production Checklist
├── Error Handling Guide
├── Security Guide
└── Deployment Guide
```

---

## 8. Chức năng chính của app

## 8.1. Trang chủ

### Mục tiêu

Giúp người dùng nhanh chóng chọn thứ họ cần tra cứu.

### Thành phần

- Thanh tìm kiếm lớn.
- Danh mục chức năng phổ biến.
- Nút “Tôi muốn làm chức năng gì?”
- Danh sách pattern hay dùng.
- Danh sách thư viện backend phổ biến.
- Gợi ý nhanh:

```txt
Muốn làm REST API?
Muốn làm login JWT?
Muốn upload file?
Muốn xử lý OCR?
Muốn gửi email?
Muốn dùng Redis cache?
Muốn viết test API?
Muốn deploy FastAPI?
```

---

## 8.2. Tìm kiếm

### Mục tiêu

Người dùng nhập từ khóa và tìm thấy đúng pattern/template.

### Search cần hỗ trợ

Tìm theo:

- Tên chức năng.
- Tên thư viện.
- Use case.
- Framework.
- Từ khóa kỹ thuật.
- Tag.
- Độ khó.
- Loại template.

Ví dụ search:

```txt
jwt
login
upload image
ocr
redis cache
pagination
sqlalchemy
celery
docker
webhook
payment
email
fastapi crud
role permission
```

### Kết quả search hiển thị

Mỗi kết quả nên có:

- Tên pattern.
- Mô tả ngắn.
- Khi nào dùng.
- Thư viện chính.
- Tags.
- Độ phức tạp.
- Nút mở chi tiết.
- Nút copy nhanh nếu là template phổ biến.

Ví dụ:

```txt
OCR Image Upload API
Dùng khi cần nhận ảnh từ client, xử lý OCR và trả text.
Libraries: FastAPI, UploadFile, Pillow, OpenCV, PaddleOCR/Tesseract
Tags: upload, image, ocr, ai
Complexity: Medium
```

---

## 8.3. Decision Guide — “Muốn làm chức năng X thì dùng gì?”

Đây là tính năng quan trọng nhất.

### Mục tiêu

Người dùng chọn nhu cầu, app trả về:

- Nên dùng thư viện/framework nào.
- Vì sao dùng.
- Khi nào không nên dùng.
- Cấu trúc file cần viết.
- Template liên quan.
- Checklist kỹ thuật.

### Ví dụ decision item

#### Use case: Muốn làm REST API

Nên dùng:

- FastAPI nếu làm API hiện đại, cần OpenAPI docs tự động, type hints, tốc độ phát triển nhanh.
- Django REST Framework nếu dự án đã dùng Django hoặc cần hệ sinh thái Django.
- Flask nếu app rất nhỏ hoặc cần kiểm soát tối giản.

Cần viết:

- Router/controller.
- Request schema.
- Response schema.
- Service.
- Repository.
- Database model.
- Error handler.
- Test API.

Template liên quan:

- FastAPI CRUD Router.
- Pydantic Schema.
- SQLAlchemy Repository.
- Pytest API Test.

---

## 9. Feature Library — Danh sách chức năng cần có

Mỗi chức năng nên có một trang chi tiết theo format thống nhất.

### Format một trang chức năng

Mỗi trang gồm:

```txt
1. Tên chức năng
2. Mô tả ngắn
3. Khi nào dùng?
4. Khi nào không nên dùng?
5. Thư viện đề xuất
6. Kiến trúc xử lý
7. Flow request/response
8. Cấu trúc thư mục
9. Template code
10. Biến môi trường cần có
11. Lỗi thường gặp
12. Checklist production
13. Pattern liên quan
```

---

# 10. Danh sách chức năng backend cần hỗ trợ

## 10.1. REST API CRUD

### Khi nào dùng?

Dùng khi cần tạo API thêm/sửa/xóa/xem dữ liệu.

### Thư viện đề xuất

- FastAPI
- Pydantic
- SQLAlchemy
- Alembic
- PostgreSQL hoặc SQLite
- pytest
- httpx

### Template cần có

- `main.py`
- `database.py`
- `models/base.py`
- `models/user.py`
- `schemas/user_schema.py`
- `repositories/user_repository.py`
- `services/user_service.py`
- `routers/user_router.py`
- `tests/test_user_api.py`

---

## 10.2. Authentication — Register/Login/JWT

### Khi nào dùng?

Dùng khi app cần tài khoản người dùng, login, bảo vệ API.

### Thư viện đề xuất

- FastAPI
- Pydantic
- SQLAlchemy
- passlib hoặc bcrypt
- PyJWT hoặc python-jose
- python-multipart nếu login form
- email-validator

### Template cần có

- User model.
- Register schema.
- Login schema.
- Password hashing service.
- JWT create/verify service.
- Auth dependency.
- Protected route.
- Refresh token pattern.
- Logout/token blacklist nếu cần.

---

## 10.3. Authorization — Role & Permission

### Khi nào dùng?

Dùng khi cần phân quyền user/admin/staff hoặc permission theo resource.

### Thư viện đề xuất

- FastAPI dependency
- SQLAlchemy relationship
- Enum
- Casbin nếu permission phức tạp

### Template cần có

- Role enum.
- Permission table.
- User role relation.
- `require_role()`
- `require_permission()`
- Policy checker.
- Protected route by role.

---

## 10.4. Upload File

### Khi nào dùng?

Dùng khi người dùng cần upload ảnh, PDF, Excel, CSV, video ngắn hoặc tài liệu.

### Thư viện đề xuất

- FastAPI UploadFile
- python-multipart
- Pillow cho ảnh
- python-magic hoặc filetype để kiểm tra MIME
- boto3 nếu lưu S3
- aiofiles nếu lưu local async

### Template cần có

- Upload endpoint.
- Validate file size.
- Validate MIME type.
- Save local file.
- Save metadata vào database.
- Upload S3.
- Public/private file URL.
- Delete file.

---

## 10.5. Chụp ảnh OCR / Image OCR API

### Khi nào dùng?

Dùng khi app cần người dùng chụp ảnh hoặc upload ảnh rồi backend trích xuất chữ.

Ví dụ:

- Đọc hóa đơn.
- Đọc căn cước/hộ chiếu ở mức cơ bản.
- Đọc phiếu điểm.
- Đọc ảnh tài liệu.
- Đọc biển hiệu.
- Đọc ảnh scan.

### Luồng xử lý

```txt
Client chụp ảnh
→ Upload ảnh lên backend
→ Backend validate file
→ Tiền xử lý ảnh
→ OCR engine trích xuất text
→ Làm sạch text
→ Trả kết quả JSON
→ Lưu kết quả nếu cần
```

### Thư viện đề xuất

Backend API:

- FastAPI
- UploadFile
- Pydantic
- SQLAlchemy nếu lưu lịch sử OCR

Xử lý ảnh:

- Pillow
- OpenCV
- numpy

OCR engine:

- Tesseract / pytesseract: phù hợp OCR cơ bản, chạy local CPU, cần cài Tesseract binary.
- EasyOCR: dễ dùng, hỗ trợ nhiều ngôn ngữ, có thể nặng hơn.
- PaddleOCR: mạnh cho document OCR, layout OCR, nhiều trường hợp thực tế.
- Google Vision API / AWS Textract / Azure AI Vision: phù hợp production cần độ ổn định cao, nhưng có chi phí và phụ thuộc cloud.

### Khi nào chọn OCR engine nào?

| Trường hợp | Gợi ý |
|---|---|
| App cá nhân, OCR đơn giản | Tesseract |
| Cần hỗ trợ nhiều ngôn ngữ nhanh | EasyOCR |
| Cần OCR tài liệu, hóa đơn, form | PaddleOCR |
| Cần production ổn định, scale lớn | Google Vision / AWS Textract / Azure |
| Cần xử lý PDF scan nhiều trang | PaddleOCR / OCRmyPDF / cloud OCR |
| Cần extract key-value từ hóa đơn | AWS Textract / Google Document AI / PaddleOCR + parser |

### Template cần có

- `ocr_router.py`
- `ocr_service.py`
- `image_preprocess_service.py`
- `ocr_schema.py`
- `file_validation.py`
- `ocr_result_model.py`
- `tests/test_ocr_api.py`

### Checklist production

- Giới hạn dung lượng ảnh.
- Chỉ cho phép MIME hợp lệ.
- Scan virus nếu file public.
- Xóa file tạm sau khi OCR.
- Timeout OCR.
- Queue OCR nếu xử lý lâu.
- Không xử lý OCR nặng trực tiếp trong request nếu file lớn.
- Lưu raw image có kiểm soát quyền truy cập.
- Không log dữ liệu nhạy cảm trong ảnh.
- Có fallback khi OCR lỗi.

---

## 10.6. PDF OCR / Document Parsing

### Khi nào dùng?

Dùng khi người dùng upload PDF scan hoặc tài liệu nhiều trang cần trích xuất text.

### Thư viện đề xuất

- PyMuPDF hoặc pdf2image để convert PDF sang ảnh
- PaddleOCR
- pytesseract
- OCRmyPDF
- pypdf nếu PDF đã có text layer
- Celery nếu xử lý lâu

### Template cần có

- Upload PDF endpoint.
- Detect PDF text layer.
- Convert page to image.
- OCR từng page.
- Merge result.
- Return JSON/text.
- Background job cho PDF lớn.

---

## 10.7. Email Sending

### Khi nào dùng?

Dùng khi cần gửi email xác thực, reset password, thông báo.

### Thư viện đề xuất

- FastAPI-Mail
- aiosmtplib
- smtplib
- Jinja2 email template
- Celery nếu gửi nền

### Template cần có

- Email config.
- Email template.
- Send email service.
- Background send.
- Reset password email.
- Verify email.

---

## 10.8. Background Job

### Khi nào dùng?

Dùng khi tác vụ mất thời gian và không nên xử lý trực tiếp trong request.

Ví dụ:

- Gửi email.
- OCR file lớn.
- Resize ảnh.
- Gửi notification.
- Export Excel/PDF.
- Đồng bộ dữ liệu.
- Retry webhook.

### Thư viện đề xuất

- FastAPI BackgroundTasks cho task rất nhẹ.
- Celery + Redis/RabbitMQ cho production.
- RQ + Redis cho job queue đơn giản.
- APScheduler cho task định kỳ đơn giản.

### Template cần có

- BackgroundTasks example.
- Celery worker.
- Celery task.
- Retry task.
- Scheduled task.
- Job status API.

---

## 10.9. Redis Cache

### Khi nào dùng?

Dùng khi cần cache dữ liệu đọc nhiều hoặc tăng tốc API.

### Thư viện đề xuất

- redis-py
- fastapi-cache2
- aioredis/redis asyncio

### Template cần có

- Redis connection.
- Cache decorator.
- Manual get/set.
- Cache invalidation.
- Cache API response.
- Rate limit using Redis.

---

## 10.10. Rate Limiting

### Khi nào dùng?

Dùng khi cần giới hạn request để chống spam, abuse API, brute force login.

### Thư viện đề xuất

- slowapi
- fastapi-limiter
- Redis

### Template cần có

- Global rate limit.
- Per endpoint limit.
- Per IP limit.
- Login rate limit.
- Redis-backed limiter.

---

## 10.11. Pagination / Filtering / Sorting

### Khi nào dùng?

Dùng khi API trả danh sách dữ liệu.

### Thư viện đề xuất

- SQLAlchemy
- fastapi-pagination
- Pydantic

### Template cần có

- Limit/offset pagination.
- Page/page_size pagination.
- Cursor pagination.
- Filter by query params.
- Sort whitelist.

---

## 10.12. Error Handling

### Khi nào dùng?

Dùng cho mọi API production.

### Thư viện đề xuất

- FastAPI exception handlers
- Pydantic validation error
- structlog/loguru cho logging

### Template cần có

- Custom exception.
- Global exception handler.
- Standard error response.
- Validation error formatter.
- 404/401/403/500 handling.

---

## 10.13. Logging

### Khi nào dùng?

Dùng khi cần debug, audit, monitor production.

### Thư viện đề xuất

- logging built-in
- loguru
- structlog
- sentry-sdk

### Template cần có

- App logger.
- Request logging middleware.
- Error logging.
- JSON logging.
- Correlation ID.

---

## 10.14. Database Migration

### Khi nào dùng?

Dùng khi database schema thay đổi theo thời gian.

### Thư viện đề xuất

- Alembic cho SQLAlchemy/FastAPI
- Django migrations cho Django

### Template cần có

- Alembic init.
- Create migration.
- Upgrade/downgrade.
- Model import config.
- Migration checklist.

---

## 10.15. Webhook Receiver

### Khi nào dùng?

Dùng khi nhận event từ bên thứ ba như Stripe, GitHub, ZaloPay, Momo, Slack.

### Thư viện đề xuất

- FastAPI
- hmac/hashlib
- Pydantic
- Celery nếu xử lý async

### Template cần có

- Webhook endpoint.
- Signature verification.
- Idempotency key.
- Event model.
- Retry-safe handler.
- Queue processing.

---

## 10.16. Payment Integration

### Khi nào dùng?

Dùng khi app cần thanh toán.

### Thư viện đề xuất

- stripe
- requests/httpx
- provider SDK tương ứng
- webhook verification
- database transaction

### Template cần có

- Create payment session.
- Payment status model.
- Payment webhook.
- Verify signature.
- Idempotency handling.
- Refund pattern.

---

## 10.17. Notification

### Khi nào dùng?

Dùng khi cần gửi thông báo qua email, push, Slack, Discord, Telegram.

### Thư viện đề xuất

- httpx
- Celery
- Firebase Admin SDK
- Slack SDK
- python-telegram-bot

### Template cần có

- Notification service interface.
- Email notification.
- Telegram notification.
- Slack notification.
- Retry notification.

---

## 10.18. CSV / Excel Import

### Khi nào dùng?

Dùng khi người dùng upload file CSV/Excel để import dữ liệu.

### Thư viện đề xuất

- pandas
- openpyxl
- csv built-in
- pydantic validation
- Celery nếu file lớn

### Template cần có

- Upload CSV.
- Read Excel.
- Validate từng dòng.
- Return error report.
- Bulk insert.
- Background import.

---

## 10.19. Export Excel / CSV / PDF

### Khi nào dùng?

Dùng khi cần xuất báo cáo.

### Thư viện đề xuất

- pandas
- openpyxl
- xlsxwriter
- reportlab
- WeasyPrint
- Jinja2 template

### Template cần có

- Export CSV.
- Export Excel.
- Export PDF from HTML.
- Background export.
- Download file endpoint.

---

## 10.20. Search API

### Khi nào dùng?

Dùng khi app cần tìm kiếm dữ liệu.

### Thư viện đề xuất

- PostgreSQL full-text search cho search vừa phải.
- Meilisearch cho search nhanh dễ dùng.
- Typesense cho search production nhẹ.
- Elasticsearch/OpenSearch cho search lớn, phức tạp.

### Template cần có

- Basic search query.
- Full-text search.
- Search index sync.
- Search filter.
- Search pagination.

---

## 10.21. Real-time / WebSocket

### Khi nào dùng?

Dùng khi cần chat, realtime status, notification realtime.

### Thư viện đề xuất

- FastAPI WebSocket
- Redis Pub/Sub
- Socket.IO nếu cần ecosystem socket
- Django Channels nếu dùng Django

### Template cần có

- WebSocket endpoint.
- Connection manager.
- Broadcast message.
- Auth WebSocket.
- Redis Pub/Sub.

---

## 10.22. API Documentation

### Khi nào dùng?

Dùng cho mọi API cần chia sẻ với frontend hoặc team.

### Thư viện đề xuất

- FastAPI OpenAPI built-in
- Swagger UI
- ReDoc
- mkdocs-material cho docs ngoài API

### Template cần có

- API metadata.
- Tags.
- Response model.
- Error response docs.
- Example request/response.

---

## 10.23. Testing

### Khi nào dùng?

Dùng cho mọi backend nghiêm túc.

### Thư viện đề xuất

- pytest
- httpx
- pytest-asyncio
- factory_boy
- faker
- coverage

### Template cần có

- Unit test service.
- Integration test API.
- Test database.
- Auth test client.
- Fixture.
- Mock external API.

---

## 10.24. Docker Deployment

### Khi nào dùng?

Dùng khi cần chạy app ổn định ở môi trường khác nhau.

### Thư viện/công cụ đề xuất

- Docker
- Docker Compose
- Uvicorn
- Gunicorn
- Nginx
- PostgreSQL
- Redis

### Template cần có

- Dockerfile.
- docker-compose.yml.
- .env.example.
- Start command.
- Healthcheck.
- Production config.

---

## 10.25. Security Basics

### Khi nào dùng?

Dùng cho toàn bộ API production.

### Nội dung cần có

- Password hashing.
- JWT expiration.
- Refresh token.
- CORS config.
- Rate limit.
- Input validation.
- File upload validation.
- SQL injection prevention.
- Secret management.
- HTTPS.
- Security headers.
- Audit log.

### Template cần có

- Security config.
- CORS config.
- Password hashing.
- Auth dependency.
- Rate limit.
- File validation.

---

## 11. Library Guide

App cần có khu vực tra cứu thư viện theo nhóm.

## 11.1. API Framework

| Thư viện | Khi nào dùng |
|---|---|
| FastAPI | API hiện đại, docs tự động, type hints, tốc độ phát triển nhanh |
| Django | Web app lớn, admin, ORM, auth có sẵn |
| Django REST Framework | REST API trong hệ sinh thái Django |
| Flask | App nhỏ, tối giản, cần tự chọn nhiều thành phần |
| Litestar | API async hiện đại, muốn thay thế FastAPI trong một số case |

## 11.2. Validation

| Thư viện | Khi nào dùng |
|---|---|
| Pydantic | Validate request/response, settings, schema |
| Marshmallow | Serialize/deserialize truyền thống |
| attrs/cattrs | Data class conversion nâng cao |

## 11.3. Database

| Thư viện | Khi nào dùng |
|---|---|
| SQLAlchemy | ORM mạnh, dùng tốt với FastAPI |
| SQLModel | Kết hợp SQLAlchemy + Pydantic, phù hợp app nhỏ/vừa |
| Django ORM | Khi dùng Django |
| asyncpg | PostgreSQL async cấp thấp |
| psycopg | PostgreSQL driver |

## 11.4. Migration

| Thư viện | Khi nào dùng |
|---|---|
| Alembic | Migration cho SQLAlchemy |
| Django migrations | Migration trong Django |

## 11.5. OCR / Image Processing

| Thư viện | Khi nào dùng |
|---|---|
| pytesseract | OCR đơn giản, local CPU |
| EasyOCR | OCR nhiều ngôn ngữ, dễ dùng |
| PaddleOCR | OCR tài liệu, layout, form, hóa đơn |
| OpenCV | Tiền xử lý ảnh |
| Pillow | Đọc, resize, convert ảnh |
| pdf2image | Convert PDF scan sang ảnh |
| PyMuPDF | Đọc PDF, render page, extract text |
| OCRmyPDF | Thêm OCR text layer vào PDF |

## 11.6. Background Job

| Thư viện | Khi nào dùng |
|---|---|
| FastAPI BackgroundTasks | Task nhẹ, không cần queue riêng |
| Celery | Production queue, retry, worker |
| RQ | Queue đơn giản với Redis |
| APScheduler | Job định kỳ đơn giản |

## 11.7. Cache / Rate Limit

| Thư viện | Khi nào dùng |
|---|---|
| redis-py | Kết nối Redis |
| fastapi-cache2 | Cache response FastAPI |
| slowapi | Rate limit API |
| fastapi-limiter | Rate limit với Redis |

## 11.8. Testing

| Thư viện | Khi nào dùng |
|---|---|
| pytest | Test chính |
| httpx | Test API async/sync |
| pytest-asyncio | Test async |
| factory_boy | Tạo test data |
| faker | Fake data |
| coverage | Đo coverage |

## 11.9. Observability

| Thư viện | Khi nào dùng |
|---|---|
| sentry-sdk | Error tracking |
| loguru | Logging dễ dùng |
| structlog | Structured logging |
| prometheus-client | Metrics |
| OpenTelemetry | Tracing production |

---

## 12. Architecture Patterns cần có

## 12.1. Simple FastAPI Pattern

Dùng cho app nhỏ.

```txt
app/
├── main.py
├── database.py
├── models.py
├── schemas.py
└── routers.py
```

## 12.2. Layered Pattern

Dùng cho app vừa.

```txt
app/
├── main.py
├── core/
├── db/
├── models/
├── schemas/
├── repositories/
├── services/
├── routers/
└── tests/
```

## 12.3. Clean Architecture Light

Dùng cho app lớn hơn, cần tách domain rõ.

```txt
app/
├── core/
├── domain/
├── application/
├── infrastructure/
├── interfaces/
└── tests/
```

## 12.4. Plugin/Provider Pattern

Dùng khi có nhiều provider như email, OCR, storage, payment.

```txt
app/
├── providers/
│   ├── ocr/
│   ├── storage/
│   ├── payment/
│   └── notification/
```

Ví dụ OCR có thể có:

```txt
providers/ocr/
├── base.py
├── tesseract_provider.py
├── paddle_provider.py
└── google_vision_provider.py
```

---

## 13. Content Model

Mỗi pattern nên được lưu dưới dạng JSON hoặc MDX có metadata.

### 13.1. Pattern schema đề xuất

```json
{
  "id": "ocr-image-api",
  "title": "Image OCR API",
  "category": "AI / OCR",
  "description": "Nhận ảnh từ client, xử lý OCR và trả text.",
  "use_cases": [
    "Đọc hóa đơn",
    "Đọc ảnh tài liệu",
    "Đọc phiếu điểm"
  ],
  "when_to_use": [],
  "when_not_to_use": [],
  "libraries": [],
  "difficulty": "medium",
  "production_level": "medium",
  "tags": ["ocr", "image", "upload", "fastapi"],
  "folder_structure": [],
  "flow": [],
  "templates": [
    {
      "filename": "ocr_router.py",
      "language": "python",
      "code": "..."
    }
  ],
  "env_vars": [],
  "common_errors": [],
  "checklist": [],
  "related_patterns": []
}
```

---

## 14. UI/UX Requirements

## 14.1. Layout

Desktop layout:

```txt
┌──────────────────────────────────────────────┐
│ Topbar: Logo + Search + Theme                │
├───────────────┬──────────────────────────────┤
│ Sidebar       │ Content Detail                │
│ Categories    │ Pattern title                 │
│ Tags          │ When to use                   │
│ Libraries     │ Template code                 │
│ Filters       │ Checklist                     │
└───────────────┴──────────────────────────────┘
```

Mobile layout:

- Top search.
- Category drawer.
- Content cards.
- Sticky copy buttons for code blocks.

## 14.2. Search UX

Search bar cần:

- Gợi ý kết quả khi đang nhập.
- Highlight keyword.
- Lọc theo category.
- Lọc theo framework.
- Lọc theo library.
- Lọc theo complexity.
- Không cần login để search.

## 14.3. Pattern detail UX

Mỗi trang pattern cần:

- Nút copy từng code block.
- Nút copy từng file.
- Nút copy toàn bộ template.
- Nút copy `.env.example`.
- Nút xem “minimal version”.
- Nút xem “production version”.
- Danh sách thư viện cần cài.
- Command cài đặt.
- Flow xử lý.
- Checklist production.

---

## 15. Các nút copy cần có

### Code block

- Copy code.
- Copy filename + code.
- Copy command.

### Pattern page

- Copy all templates.
- Copy folder structure.
- Copy install commands.
- Copy `.env.example`.
- Copy checklist.

### Library page

- Copy install command.
- Copy minimal config.
- Copy recommended setup.

---

## 16. Template page format

Ví dụ một template nên hiển thị:

```txt
Title: FastAPI JWT Auth
Description: Register/login/protected route với JWT.

Install:
pip install fastapi uvicorn sqlalchemy pydantic PyJWT passlib[bcrypt]

Folder:
app/
├── core/security.py
├── models/user.py
├── schemas/auth_schema.py
├── services/auth_service.py
└── routers/auth_router.py

Files:
1. security.py
2. auth_schema.py
3. auth_service.py
4. auth_router.py

Checklist:
- Password hash bằng bcrypt.
- JWT có expire time.
- Không log password.
- Login có rate limit.
```

---

## 17. Phân loại category

Các category chính:

```txt
API Basics
Authentication
Authorization
Database
File Upload
OCR / Document Processing
Background Jobs
Cache
Search
Webhook
Payment
Notification
Import / Export
Testing
Logging
Security
Deployment
Architecture
```

---

## 18. Bộ tag chuẩn

Tags nên có:

```txt
fastapi
django
flask
sqlalchemy
pydantic
postgresql
sqlite
redis
celery
jwt
auth
upload
image
ocr
pdf
email
webhook
payment
docker
pytest
logging
security
cache
rate-limit
background-job
```

---

## 19. Yêu cầu kỹ thuật MVP

### 19.1. MVP nên có

- Trang chủ.
- Search.
- Sidebar category.
- Trang danh sách pattern.
- Trang chi tiết pattern.
- Code block có nút copy.
- Copy all templates.
- Library guide.
- Decision guide.
- 25 pattern backend ban đầu.
- Dark mode nếu làm được dễ.
- Responsive layout.

### 19.2. MVP không cần

- Login.
- Database.
- Backend API riêng.
- Comment.
- Rating.
- Course.
- Bài tập.
- Payment.
- AI generation.
- Project build tự động.
- Multi-user workspace.

---

## 20. Content MVP — 25 pattern đầu tiên

MVP cần tối thiểu các pattern:

1. FastAPI Project Structure.
2. FastAPI CRUD API.
3. Pydantic Request/Response Schema.
4. SQLAlchemy Database Session.
5. Alembic Migration.
6. JWT Authentication.
7. Role Permission.
8. Upload Image.
9. Upload File to Local.
10. Upload File to S3.
11. Image OCR API.
12. PDF OCR API.
13. Email Sending.
14. Background Job with FastAPI BackgroundTasks.
15. Background Job with Celery.
16. Redis Cache.
17. Rate Limiting.
18. Pagination Filtering Sorting.
19. Global Error Handling.
20. Request Logging.
21. Webhook Receiver.
22. Payment Webhook.
23. CSV/Excel Import.
24. Export Excel/PDF.
25. Docker Deploy FastAPI.

---

## 21. Dữ liệu mẫu cho Decision Guide

## 21.1. Muốn làm API nhanh

Nên dùng:

- FastAPI.
- Pydantic.
- SQLAlchemy.
- Uvicorn.

Template:

- CRUD Router.
- Schema.
- Service.
- Repository.
- Database Session.

---

## 21.2. Muốn làm web admin

Nên dùng:

- Django.
- Django ORM.
- Django Admin.
- Django REST Framework nếu cần API.

Template:

- Django model.
- Admin config.
- Serializer.
- ViewSet.
- Permission class.

---

## 21.3. Muốn upload ảnh

Nên dùng:

- FastAPI UploadFile.
- python-multipart.
- Pillow.
- filetype/python-magic.
- S3 nếu production.

Template:

- Upload endpoint.
- Validate image.
- Resize image.
- Save file.
- Save metadata.

---

## 21.4. Muốn chụp ảnh OCR

Nên dùng:

- Frontend/mobile gửi ảnh qua multipart upload.
- FastAPI nhận ảnh.
- Pillow/OpenCV tiền xử lý.
- PaddleOCR hoặc Tesseract OCR.
- Celery nếu xử lý lâu.

Template:

- OCR upload endpoint.
- Image preprocess service.
- OCR provider interface.
- OCR result schema.
- OCR job queue nếu file lớn.

---

## 21.5. Muốn gửi email

Nên dùng:

- FastAPI-Mail hoặc aiosmtplib.
- Jinja2 template.
- BackgroundTasks cho task nhẹ.
- Celery nếu cần retry.

Template:

- Email config.
- Email service.
- Verify email template.
- Reset password template.

---

## 21.6. Muốn xử lý file lớn

Nên dùng:

- Upload endpoint chỉ nhận file và tạo job.
- Celery worker xử lý nền.
- Redis/RabbitMQ broker.
- Job status API.

Template:

- Create job endpoint.
- Celery task.
- Job model.
- Job status endpoint.

---

## 21.7. Muốn cache API

Nên dùng:

- Redis.
- fastapi-cache2 hoặc custom cache service.

Template:

- Redis connection.
- Cache key builder.
- Cache get/set.
- Invalidate cache.

---

## 21.8. Muốn chống spam API

Nên dùng:

- slowapi hoặc fastapi-limiter.
- Redis.
- IP/user-based rate limit.

Template:

- Rate limit middleware.
- Login endpoint limit.
- Global API limit.

---

## 21.9. Muốn nhận webhook

Nên dùng:

- FastAPI endpoint.
- Signature verification.
- Idempotency.
- Background job.

Template:

- Webhook router.
- Verify signature.
- Event handler.
- Idempotency table.

---

## 21.10. Muốn export báo cáo

Nên dùng:

- pandas/openpyxl cho Excel.
- Jinja2 + WeasyPrint hoặc reportlab cho PDF.
- Background job nếu báo cáo lớn.

Template:

- Export endpoint.
- Generate file service.
- Download response.
- Background export.

---

## 22. Non-functional Requirements

## 22.1. Performance

- Search local phải phản hồi nhanh dưới 300ms với vài trăm pattern.
- Trang pattern load nhanh.
- Không cần backend call nếu dữ liệu static.
- Code block không làm chậm UI.

## 22.2. Maintainability

- Content tách khỏi UI.
- Mỗi pattern là một file riêng.
- Metadata rõ ràng.
- Dễ thêm pattern mới.
- Template code lưu có cấu trúc.

## 22.3. Usability

- Người dùng phải tìm được pattern trong dưới 10 giây.
- Mỗi pattern phải trả lời được:
  - Dùng khi nào?
  - Dùng thư viện nào?
  - Viết file gì?
  - Copy code ở đâu?
  - Cần lưu ý gì khi production?

## 22.4. Security

- Nếu app static thì rủi ro thấp.
- Không lưu secret trong content.
- Không nhúng API key.
- Nếu sau này có backend, cần auth cho admin editor.
- Code template phải cảnh báo các lỗi bảo mật phổ biến.

---

## 23. Success Metrics

MVP thành công nếu:

- Có ít nhất 25 pattern backend hữu ích.
- Search tìm đúng pattern phổ biến.
- Người dùng copy được code từng file.
- Người dùng copy được toàn bộ template.
- Mỗi pattern có “khi nào dùng / khi nào không dùng”.
- Mỗi pattern có thư viện đề xuất.
- Mỗi pattern có checklist production.
- Người dùng không cần đọc bài dài vẫn biết bắt đầu từ đâu.

---

## 24. Roadmap

## Phase 1 — Static Knowledge Library

Mục tiêu:

- Làm web tra cứu static.
- Dùng Next.js + MDX/JSON.
- Có search.
- Có category.
- Có pattern detail.
- Có copy code.

Deliverables:

- Home page.
- Search.
- 25 pattern đầu tiên.
- Library guide.
- Decision guide.
- Copy buttons.

---

## Phase 2 — Template System

Mục tiêu:

- Chuẩn hóa template code.
- Copy từng file.
- Copy toàn bộ pattern.
- Hiển thị folder tree.
- Có install command.

Deliverables:

- Template renderer.
- Code block component.
- Copy all template.
- Pattern metadata schema.

---

## Phase 3 — Advanced Search & Filter

Mục tiêu:

- Search tốt hơn.
- Filter theo framework, library, complexity.
- Gợi ý keyword.

Deliverables:

- Search index.
- Tag filter.
- Category filter.
- Library filter.
- Highlight result.

---

## Phase 4 — Backend Optional

Mục tiêu:

- Thêm FastAPI backend nếu cần quản lý content động.

Deliverables:

- Pattern API.
- Admin CRUD pattern.
- PostgreSQL.
- Full-text search.
- Auth admin đơn giản.

---

## Phase 5 — Project Generator Optional

Mục tiêu:

- Cho phép chọn pattern và sinh zip project mẫu.

Deliverables:

- Select patterns.
- Generate folder.
- Generate files.
- Download zip.
- Không cần AI ở giai đoạn này.

---

## 25. Rủi ro và cách tránh

### Rủi ro 1: App biến thành blog quá dài

Cách tránh:

- Mỗi pattern phải có format cố định.
- Ưu tiên bảng, flow, template.
- Không viết lan man.

### Rủi ro 2: Quá nhiều tính năng thừa

Cách tránh:

- Không làm login ở MVP.
- Không làm bài tập.
- Không làm comment.
- Không làm community.
- Không làm AI trước.

### Rủi ro 3: Template không production-ready

Cách tránh:

- Mỗi template có checklist.
- Có “minimal” và “production”.
- Có cảnh báo lỗi thường gặp.
- Có security notes.

### Rủi ro 4: Search kém

Cách tránh:

- Mỗi pattern có tags.
- Có synonyms.
- Có use_cases.
- Có library metadata.

Ví dụ synonym:

```json
{
  "ocr": ["text recognition", "image to text", "scan text", "read image"],
  "auth": ["login", "register", "jwt", "token"],
  "upload": ["file upload", "image upload", "multipart"]
}
```

---

## 26. Kết luận

Python Backend Compass nên được xây dựng như một thư viện tra cứu backend chuyên nghiệp, tập trung vào quyết định kỹ thuật và template code.

Ưu tiên bản đầu:

1. Search tốt.
2. Decision guide rõ.
3. 25 pattern backend thực tế.
4. Template copy được.
5. Không bài tập.
6. Không tính năng thừa.
7. Nội dung đi thẳng vào “dùng khi nào, dùng gì, viết ra sao”.

Mục tiêu cuối cùng là khi developer cần làm một chức năng backend Python, họ mở app, tìm chức năng, đọc decision guide, copy template và triển khai ngay theo cấu trúc sạch.
