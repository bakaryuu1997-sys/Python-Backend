# search-spec.md — Fast Search & Suggestion Specification

## 1. Mục tiêu

Search là tính năng lõi của Python Backend Compass.

Người dùng phải có thể gõ một nhu cầu tự nhiên và nhận gợi ý đúng trong thời gian rất ngắn.

Ví dụ:

```txt
"chụp ảnh lấy chữ" → Image OCR API
"ocr hóa đơn" → Receipt OCR / Image OCR API
"login jwt" → JWT Authentication
"phân quyền admin" → RBAC / Permission
"file lớn" → Large File Upload / Background Job
"redis chống spam" → Rate Limiting
"rag tài liệu" → RAG Upload Pipeline
```

---

## 2. Không dùng backend search

Vì app deploy lên Vercel dạng static, search phải chạy client-side.

Không dùng:

```txt
Database full-text search
Elasticsearch
Meilisearch server
Typesense server
API route search
Server action search
```

Dùng:

```txt
Fuse.js cho MVP
Hoặc Pagefind/Orama nếu content lớn hơn
```

Khuyến nghị bản đầu:

```txt
Fuse.js + static compact search index
```

---

## 3. Yêu cầu UX

Search box cần có:

```txt
- Auto focus trên desktop nếu phù hợp.
- Gợi ý khi gõ.
- Debounce 100-150ms.
- Keyboard navigation.
- Enter để mở kết quả đầu tiên.
- Esc để đóng suggestion.
- Highlight từ khóa nếu làm được.
- Empty state có gợi ý từ khóa phổ biến.
```

Không bắt người dùng bấm nút search.

---

## 4. Vị trí search

Search nên xuất hiện ở:

```txt
1. Home hero section
2. Topbar
3. Search page riêng
4. Mobile search drawer
```

Home search có thể lớn hơn.

Topbar search dùng để tra cứu nhanh khi đang đọc pattern.

---

## 5. Search index

Không index toàn bộ code template vì nặng.

Index item nên gồm:

```ts
export type SearchIndexItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  libraries: string[];
  useCases: string[];
  whenToUse: string[];
  synonyms: string[];
  templateFilenames: string[];
  difficulty: "easy" | "medium" | "hard";
  productionLevel: "basic" | "medium" | "advanced";
};
```

---

## 6. Weighted search keys

Fuse.js options đề xuất:

```ts
const fuseOptions = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "useCases", weight: 0.2 },
    { name: "tags", weight: 0.15 },
    { name: "libraries", weight: 0.1 },
    { name: "summary", weight: 0.1 },
    { name: "synonyms", weight: 0.07 },
    { name: "templateFilenames", weight: 0.03 }
  ]
};
```

Giải thích:

```txt
Title quan trọng nhất.
Use cases quan trọng hơn description.
Tags/libraries giúp tìm đúng kỹ thuật.
Synonyms giúp tìm tiếng Việt/từ đồng nghĩa.
Không ưu tiên filename quá cao.
```

---

## 7. Synonym dictionary

Tạo file:

```txt
content/search/synonyms.json
```

Ví dụ:

```json
{
  "ocr": [
    "image to text",
    "scan text",
    "text recognition",
    "extract text",
    "chụp ảnh lấy chữ",
    "đọc chữ trong ảnh",
    "nhận diện chữ"
  ],
  "auth": [
    "login",
    "register",
    "jwt",
    "token",
    "authentication",
    "đăng nhập",
    "đăng ký",
    "xác thực"
  ],
  "authorization": [
    "permission",
    "role",
    "rbac",
    "admin",
    "phân quyền",
    "quyền người dùng"
  ],
  "upload": [
    "file upload",
    "image upload",
    "multipart",
    "tải file",
    "tải ảnh",
    "upload ảnh"
  ],
  "background-job": [
    "queue",
    "worker",
    "celery",
    "async task",
    "xử lý nền",
    "tác vụ nền",
    "file lớn"
  ],
  "cache": [
    "redis",
    "response cache",
    "speed up api",
    "cache api",
    "tăng tốc api"
  ],
  "rate-limit": [
    "chống spam",
    "brute force",
    "limit request",
    "giới hạn request"
  ],
  "webhook": [
    "callback",
    "event receiver",
    "signature verification",
    "nhận sự kiện",
    "verify chữ ký"
  ],
  "rag": [
    "retrieval augmented generation",
    "chat với tài liệu",
    "hỏi đáp tài liệu",
    "vector search",
    "embedding"
  ]
}
```

---

## 8. Suggested queries

Tạo file:

```txt
content/search/suggested-queries.json
```

Ví dụ:

```json
[
  "FastAPI CRUD",
  "login JWT",
  "upload ảnh",
  "chụp ảnh OCR",
  "PDF OCR",
  "Redis cache",
  "Celery background job",
  "webhook signature",
  "pagination filtering",
  "Docker deploy FastAPI",
  "RAG backend",
  "LLM streaming"
]
```

Hiển thị khi search box đang rỗng hoặc không có kết quả.

---

## 9. Ranking rules

Thứ tự ưu tiên kết quả:

```txt
1. Exact title match
2. Use case match
3. Tag match
4. Library match
5. Synonym match
6. Summary match
7. Template filename match
```

Nếu query ngắn như `jwt`, ưu tiên pattern auth.

Nếu query là tiếng Việt như `chụp ảnh lấy chữ`, ưu tiên OCR.

Nếu query là `file lớn`, ưu tiên large upload/background job.

---

## 10. Search result card

Mỗi result card hiển thị:

```txt
Title
Summary
Category
Recommended libraries
Tags
Difficulty
Production level
Why matched nếu làm được
```

Ví dụ:

```txt
Image OCR API
Nhận ảnh từ client, xử lý OCR và trả text.
Category: OCR / Document Processing
Libraries: FastAPI, Pillow, OpenCV, PaddleOCR
Tags: ocr, image, upload
Difficulty: Medium
```

---

## 11. Search page

Trang `/search` nên có:

```txt
- Search input lớn.
- Filters bên trái hoặc phía trên.
- Result list.
- Suggested queries.
- Category chips.
- Library chips.
```

Filters:

```txt
Category
Framework
Library
Difficulty
Production level
```

---

## 12. Performance requirements

Mục tiêu:

```txt
Dưới 100ms với 100-300 patterns.
Dưới 200ms với 500-1000 patterns.
Không lag khi gõ nhanh.
Không bundle code template vào search index.
```

Nếu search index quá lớn:

```txt
1. Tách search index khỏi pattern detail.
2. Lazy load search index khi user focus search.
3. Dùng dynamic import.
4. Cân nhắc Pagefind/Orama.
5. Cân nhắc Web Worker nếu cần.
```

---

## 13. Client component rule

SearchBox phải là client component:

```tsx
"use client";
```

Vì cần:

```txt
useState
keyboard events
navigator
focus
debounce
```

Content loading/build index có thể nằm ở server/build-time.

---

## 14. Pseudocode

```ts
import Fuse from "fuse.js";
import searchIndex from "@/content/generated/search-index.json";

const fuse = new Fuse(searchIndex, fuseOptions);

export function searchPatterns(query: string) {
  if (!query.trim()) return [];

  return fuse
    .search(query.trim())
    .slice(0, 10)
    .map((result) => ({
      item: result.item,
      score: result.score
    }));
}
```

---

## 15. Search testing checklist

Test các query sau:

```txt
fastapi
crud
login jwt
đăng nhập
phân quyền admin
upload ảnh
chụp ảnh lấy chữ
ocr hóa đơn
pdf ocr
file lớn
celery
redis cache
chống spam
webhook
thanh toán
export excel
docker deploy
rag tài liệu
llm streaming
```

Mỗi query phải có kết quả hợp lý.

---

## 16. Khi nào nâng cấp khỏi Fuse.js?

Fuse.js đủ cho MVP và thư viện vừa.

Nên cân nhắc nâng cấp nếu:

```txt
- Có hơn vài nghìn pattern.
- Search bắt đầu lag.
- Cần index nội dung full-text dài.
- Cần search offline tối ưu hơn.
- Cần ranking phức tạp hơn.
```

Lựa chọn nâng cấp nhưng vẫn static:

```txt
Pagefind
Orama
MiniSearch
Web Worker search
```

Không vội dùng backend search.

---

## 17. Kết luận

Search nên được thiết kế như một tính năng trung tâm, không phải ô input phụ.

Công thức đúng cho dự án này:

```txt
Compact search index
+ Fuse.js fuzzy search
+ Synonyms tiếng Việt/tiếng Anh
+ Weighted keys
+ Instant suggestions
+ No backend
+ No database
```
