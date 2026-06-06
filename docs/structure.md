# structure.md — Recommended Static Project Structure

## 1. Mục tiêu

Cấu trúc dự án phải phục vụ 4 việc:

```txt
1. Dễ deploy lên Vercel.
2. Dễ thêm nội dung backend pattern.
3. Dễ search nhanh.
4. Dễ copy template.
```

Không thiết kế theo hướng backend/database/admin ở giai đoạn đầu.

---

## 2. Cấu trúc tổng thể

```txt
python-backend-compass/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── patterns/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── decision-guide/
│   │   └── page.tsx
│   ├── libraries/
│   │   └── page.tsx
│   ├── architecture/
│   │   └── page.tsx
│   └── search/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── AppHeader.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── AppShell.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── search/
│   │   ├── SearchBox.tsx
│   │   ├── SearchSuggestions.tsx
│   │   ├── SearchResultCard.tsx
│   │   ├── SearchFilters.tsx
│   │   └── EmptySearchState.tsx
│   │
│   ├── pattern/
│   │   ├── PatternCard.tsx
│   │   ├── PatternList.tsx
│   │   ├── PatternDetail.tsx
│   │   ├── PatternMeta.tsx
│   │   ├── PatternChecklist.tsx
│   │   ├── RelatedPatterns.tsx
│   │   └── RecommendedStack.tsx
│   │
│   ├── code/
│   │   ├── CodeBlock.tsx
│   │   ├── CopyButton.tsx
│   │   ├── CopyAllTemplatesButton.tsx
│   │   ├── FolderTree.tsx
│   │   ├── InstallCommandBlock.tsx
│   │   └── EnvExampleBlock.tsx
│   │
│   ├── decision/
│   │   ├── DecisionCard.tsx
│   │   ├── DecisionMatrix.tsx
│   │   └── DecisionDetail.tsx
│   │
│   ├── library/
│   │   ├── LibraryCard.tsx
│   │   ├── LibraryBadge.tsx
│   │   └── LibraryComparisonTable.tsx
│   │
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Tabs.tsx
│       └── Section.tsx
│
├── content/
│   ├── patterns/
│   │   ├── fastapi-project-structure.json
│   │   ├── fastapi-crud-api.json
│   │   ├── jwt-auth.json
│   │   ├── upload-file.json
│   │   └── image-ocr-api.json
│   │
│   ├── libraries/
│   │   ├── fastapi.json
│   │   ├── django.json
│   │   ├── sqlalchemy.json
│   │   ├── pydantic.json
│   │   └── celery.json
│   │
│   ├── decisions/
│   │   ├── build-rest-api.json
│   │   ├── build-auth.json
│   │   ├── build-ocr.json
│   │   └── build-background-job.json
│   │
│   ├── search/
│   │   ├── synonyms.json
│   │   └── suggested-queries.json
│   │
│   └── categories.json
│
├── lib/
│   ├── content.ts
│   ├── patterns.ts
│   ├── libraries.ts
│   ├── decisions.ts
│   ├── search.ts
│   ├── search-index.ts
│   ├── slug.ts
│   ├── copy.ts
│   └── validate-content.ts
│
├── types/
│   ├── pattern.ts
│   ├── library.ts
│   ├── decision.ts
│   ├── template.ts
│   └── search.ts
│
├── public/
│   ├── icons/
│   └── images/
│
├── docs/
│   ├── prd.md
│   ├── rules.md
│   ├── agent.md
│   ├── goal.md
│   ├── content-roadmap.md
│   ├── README.md
│   ├── install.md
│   ├── structure.md
│   ├── search-spec.md
│   └── vercel-static-plan.md
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 3. Vì sao không dùng database?

Dự án chỉ cần hiển thị nội dung và search.

Với mục tiêu hiện tại, database sẽ làm phức tạp thêm:

```txt
- Phải có backend API.
- Phải có schema DB.
- Phải có auth admin.
- Phải backup database.
- Phải vận hành server.
- Deploy Vercel phức tạp hơn.
```

Trong khi content dạng file đã đủ:

```txt
- Dễ version control.
- Dễ review bằng Git.
- Dễ deploy static.
- Dễ rollback.
- Dễ build search index.
```

---

## 4. Content structure

## 4.1. Pattern JSON

Ví dụ:

```json
{
  "id": "image-ocr-api",
  "slug": "image-ocr-api",
  "title": "Image OCR API",
  "category": "OCR / Document Processing",
  "summary": "Nhận ảnh từ client, xử lý OCR và trả text.",
  "useCases": [
    "Đọc hóa đơn",
    "Đọc ảnh tài liệu",
    "Đọc phiếu điểm",
    "Chụp ảnh lấy chữ"
  ],
  "whenToUse": [
    "Khi cần trích xuất chữ từ ảnh.",
    "Khi người dùng chụp ảnh bằng điện thoại rồi gửi lên backend."
  ],
  "whenNotToUse": [
    "Không dùng trực tiếp trong request nếu ảnh/PDF lớn.",
    "Không lưu ảnh giấy tờ nhạy cảm nếu không có lý do rõ."
  ],
  "recommendedLibraries": [
    "FastAPI",
    "UploadFile",
    "Pillow",
    "OpenCV",
    "PaddleOCR",
    "pytesseract"
  ],
  "installCommands": [
    "pip install fastapi uvicorn pillow opencv-python pytesseract"
  ],
  "folderStructure": [
    "app/routers/ocr_router.py",
    "app/services/ocr_service.py",
    "app/services/image_preprocess_service.py",
    "app/schemas/ocr_schema.py"
  ],
  "flow": [
    "Client upload ảnh",
    "Backend validate file",
    "Tiền xử lý ảnh",
    "OCR engine trích xuất text",
    "Trả JSON response"
  ],
  "templates": [
    {
      "filename": "app/routers/ocr_router.py",
      "language": "python",
      "description": "OCR upload endpoint",
      "variant": "minimal",
      "code": "..."
    }
  ],
  "envVars": [],
  "commonErrors": [
    "Không cài Tesseract binary.",
    "OCR file lớn trực tiếp trong request gây timeout."
  ],
  "productionChecklist": [
    "Giới hạn file size.",
    "Validate MIME type.",
    "Không log dữ liệu nhạy cảm.",
    "Dùng background job cho PDF lớn."
  ],
  "relatedPatterns": [
    "upload-file",
    "pdf-ocr-api",
    "background-job-celery"
  ],
  "tags": [
    "ocr",
    "image",
    "upload",
    "fastapi",
    "document"
  ],
  "difficulty": "medium",
  "productionLevel": "medium",
  "updatedAt": "2026-06-04",
  "deprecated": false
}
```

---

## 5. TypeScript types

## 5.1. Pattern type

```ts
export type Difficulty = "easy" | "medium" | "hard";
export type ProductionLevel = "basic" | "medium" | "advanced";
export type TemplateVariant = "minimal" | "production" | "test" | "config";

export type CodeTemplate = {
  filename: string;
  language: string;
  description: string;
  variant: TemplateVariant;
  code: string;
};

export type Pattern = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  useCases: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  recommendedLibraries: string[];
  installCommands: string[];
  folderStructure: string[];
  flow: string[];
  templates: CodeTemplate[];
  envVars: string[];
  commonErrors: string[];
  productionChecklist: string[];
  relatedPatterns: string[];
  tags: string[];
  difficulty: Difficulty;
  productionLevel: ProductionLevel;
  updatedAt: string;
  deprecated: boolean;
};
```

---

## 6. Static route strategy

Routes:

```txt
/
/patterns
/patterns/[slug]
/decision-guide
/libraries
/architecture
/search
```

Với static export, route `/patterns/[slug]` cần generate static params từ content.

Ví dụ:

```ts
export function generateStaticParams() {
  return getAllPatterns().map((pattern) => ({
    slug: pattern.slug
  }));
}
```

---

## 7. Content loading strategy

Không fetch runtime từ API.

Nên import/read content ở build time.

Flow:

```txt
content/*.json
→ lib/content.ts
→ getAllPatterns()
→ build search index
→ render pages
```

Nếu content nằm trong JSON và được bundle vào client search:

```txt
patterns data
→ compact search index
→ SearchBox client component
```

---

## 8. Search index structure

Không đưa toàn bộ code template vào search index vì sẽ nặng.

Search index nên chứa:

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
  synonyms: string[];
  templateFilenames: string[];
  difficulty: Difficulty;
  productionLevel: ProductionLevel;
};
```

Code template chỉ load ở pattern detail.

---

## 9. Component responsibilities

## SearchBox

Chịu trách nhiệm:

```txt
- Nhận input.
- Debounce nhẹ.
- Gọi search function.
- Hiển thị suggestions.
- Keyboard navigation.
```

Không chịu trách nhiệm parse content.

## PatternDetail

Chịu trách nhiệm render pattern.

Không chứa logic search.

## CodeBlock

Chịu trách nhiệm:

```txt
- Render code.
- Copy code.
- Hiển thị filename nếu có.
```

Không chứa logic pattern.

## CopyAllTemplatesButton

Chịu trách nhiệm:

```txt
- Nhận danh sách templates.
- Format thành một chuỗi.
- Copy vào clipboard.
```

---

## 10. File naming rules

Content file:

```txt
lowercase-kebab-case.json
```

Ví dụ:

```txt
jwt-auth.json
image-ocr-api.json
fastapi-crud-api.json
```

Component file:

```txt
PascalCase.tsx
```

Ví dụ:

```txt
SearchBox.tsx
PatternCard.tsx
CodeBlock.tsx
```

Lib file:

```txt
lowercase-kebab hoặc camelCase
```

Nên thống nhất:

```txt
search.ts
content.ts
patterns.ts
```

---

## 11. Vercel-friendly rules

Không dùng trong MVP:

```txt
API routes
Server Actions
Database clients
Prisma
NextAuth
Runtime file write
Node fs trong client component
Long-running server functions
```

Được dùng:

```txt
Static pages
Build-time content loading
Client-side search
Client-side copy
Static JSON imports
```

---

## 12. Khi nào mới cần backend sau này?

Chỉ cân nhắc backend nếu có một trong các nhu cầu:

```txt
- Có admin editor online.
- Có nhiều người cùng sửa content.
- Có user bookmark/note cá nhân.
- Có analytics search phức tạp.
- Có project generator chạy server-side.
- Có AI chatbot/generate template.
```

Hiện tại chưa cần.

---

## 13. Kết luận

Cấu trúc tốt nhất cho dự án hiện tại:

```txt
Next.js static content app
Content as files
Client-side search
Copy-first template UI
Deploy Vercel
No database
No backend
```

Đây là cấu trúc đủ đơn giản để build ổn định, nhưng vẫn đủ mở rộng để sau này thành thư viện backend Python rất lớn.
