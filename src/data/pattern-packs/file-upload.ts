import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const FILE_UPLOAD_PATTERNS: Pattern[] = [
  pattern({ id: 'image-upload-validation', title: 'Secure Image Upload Validation', vietnameseTitle: 'Upload ảnh an toàn', shortDescription: 'Nhận ảnh qua multipart, giới hạn dung lượng, kiểm tra MIME và đổi tên file an toàn.', category: 'file-upload', difficulty: 'Easy', productionLevel: 'Production-ready', libraries: ['FastAPI', 'python-multipart', 'Pillow', 'filetype'], whyUse: ['User upload ảnh avatar/product/document.', 'Cần tránh file độc hại hoặc quá lớn.', 'Cần lưu metadata file.'], whyNotUse: ['File upload trực tiếp lên S3 bằng presigned URL.', 'Không nhận file từ user.'], installCommand: 'pip install python-multipart pillow filetype', folderStructure: `app/routers/upload_router.py\napp/core/file_validation.py`, codeTemplates: [{ filename: 'app/core/file_validation.py', language: 'python', description: 'Validate image upload.', code: `from fastapi import UploadFile, HTTPException\n\nALLOWED = {"image/jpeg", "image/png", "image/webp"}\nMAX_SIZE = 5 * 1024 * 1024\n\nasync def validate_image(file: UploadFile) -> bytes:\n    if file.content_type not in ALLOWED:\n        raise HTTPException(415, "Unsupported image type")\n    data = await file.read()\n    if len(data) > MAX_SIZE:\n        raise HTTPException(413, "File too large")\n    return data` }], relatedPatterns: ['image-ocr-api', 's3-presigned-upload'] }),
  pattern({ id: 's3-presigned-upload', title: 'S3 Presigned Upload URL', vietnameseTitle: 'Upload file lên S3 bằng presigned URL', shortDescription: 'Backend tạo presigned URL để client upload trực tiếp lên S3/MinIO, giảm tải server.', category: 'file-upload', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['boto3', 'FastAPI', 'S3/MinIO'], whyUse: ['File lớn không nên đi qua backend.', 'Cần private bucket và URL upload có hạn.', 'Muốn scale upload tốt.'], whyNotUse: ['File nhỏ cần backend xử lý ngay.', 'Không dùng object storage.'], installCommand: 'pip install boto3', folderStructure: `app/services/storage_service.py`, codeTemplates: [{ filename: 'app/services/storage_service.py', language: 'python', description: 'Tạo presigned upload URL.', code: `import boto3\n\ns3 = boto3.client("s3")\n\ndef create_presigned_upload(bucket: str, key: str, content_type: str) -> str:\n    return s3.generate_presigned_url(\n        "put_object",\n        Params={"Bucket": bucket, "Key": key, "ContentType": content_type},\n        ExpiresIn=900,\n    )` }], relatedPatterns: ['image-upload-validation'] }),
  pattern({ id: 'csv-excel-import', title: 'CSV / Excel Import with Row Validation', vietnameseTitle: 'Import CSV/Excel có validate từng dòng', shortDescription: 'Upload file dữ liệu, validate từng dòng, trả error report và bulk insert an toàn.', category: 'file-upload', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['pandas', 'openpyxl', 'Pydantic'], whyUse: ['Admin import danh sách user/product/order.', 'Cần báo lỗi từng dòng.', 'Cần bulk insert sau khi validate.'], whyNotUse: ['File rất lớn cần streaming/chunk job.', 'Dữ liệu nhạy cảm chưa có audit log.'], installCommand: 'pip install pandas openpyxl pydantic', folderStructure: `app/services/import_service.py`, codeTemplates: [{ filename: 'app/services/import_service.py', language: 'python', description: 'Validate Excel rows.', code: `import pandas as pd\nfrom pydantic import BaseModel, ValidationError\n\nclass ProductRow(BaseModel):\n    name: str\n    price: float\n\ndef import_products(path: str):\n    df = pd.read_excel(path)\n    valid, errors = [], []\n    for idx, row in df.iterrows():\n        try:\n            valid.append(ProductRow(**row.to_dict()))\n        except ValidationError as exc:\n            errors.append({"row": int(idx) + 2, "errors": exc.errors()})\n    return valid, errors` }], relatedPatterns: ['celery-worker-setup'] }),
  pattern({
    "id": "file-validation-security",
    "title": "File Upload Validation Security",
    "vietnameseTitle": "Bảo mật upload file",
    "shortDescription": "Validation file size, MIME, extension và safe filename trước khi lưu hoặc xử lý OCR/import.",
    "category": "file-upload",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "python-magic"
    ],
    "whyUse": [
      "Có upload ảnh/PDF/Excel/CSV.",
      "Cần tránh file giả MIME hoặc file quá lớn.",
      "Cần đổi filename để tránh path traversal."
    ],
    "whyNotUse": [
      "Không nhận file từ user.",
      "Chỉ xử lý file nội bộ tin cậy."
    ],
    "installCommand": "pip install python-magic fastapi",
    "folderStructure": "app/core/file_validation.py",
    "codeTemplates": [
      {
        "filename": "app/core/file_validation.py",
        "language": "python",
        "description": "Validation upload an toàn.",
        "code": "from pathlib import Path\nfrom uuid import uuid4\nfrom fastapi import UploadFile, HTTPException\n\nALLOWED_EXT = {\".png\", \".jpg\", \".jpeg\", \".pdf\", \".csv\", \".xlsx\"}\nMAX_BYTES = 10 * 1024 * 1024\n\ndef safe_name(filename: str) -> str:\n    ext = Path(filename).suffix.lower()\n    if ext not in ALLOWED_EXT:\n        raise HTTPException(status_code=415, detail=\"Unsupported extension\")\n    return f\"{uuid4().hex}{ext}\"\n\nasync def read_limited(file: UploadFile) -> bytes:\n    data = await file.read(MAX_BYTES + 1)\n    if len(data) > MAX_BYTES:\n        raise HTTPException(status_code=413, detail=\"File too large\")\n    return data",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_file_validation.py",
        "language": "python",
        "description": "Chặn extension nguy hiểm.",
        "code": "def test_rejects_executable_extension():\n    with pytest.raises(HTTPException):\n        safe_name(\"run.exe\")",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "image-upload-validation",
      "s3-presigned-upload"
    ],
    "searchKeywords": [
      "file security",
      "mime",
      "extension",
      "safe filename"
    ]
  }),
  pattern({
    "id": "large-file-chunked-upload",
    "title": "Large File Chunked Upload",
    "vietnameseTitle": "Upload file lớn theo chunk",
    "shortDescription": "Pattern upload file lớn theo từng chunk, lưu trạng thái và ghép file khi đủ chunks.",
    "category": "file-upload",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "FastAPI",
      "S3",
      "Redis"
    ],
    "whyUse": [
      "File lớn dễ timeout nếu upload một lần.",
      "Cần resume upload.",
      "Cần kiểm soát chunk index/checksum."
    ],
    "whyNotUse": [
      "File nhỏ dưới vài MB.",
      "Có thể dùng presigned S3 multipart trực tiếp."
    ],
    "installCommand": "pip install fastapi redis",
    "folderStructure": "app/routers/chunk_upload_router.py",
    "codeTemplates": [
      {
        "filename": "app/routers/chunk_upload_router.py",
        "language": "python",
        "description": "API nhận chunk và hoàn tất upload.",
        "code": "from fastapi import APIRouter, UploadFile, Form\n\nrouter = APIRouter(prefix=\"/uploads\")\n\n@router.post(\"/{upload_id}/chunks\")\nasync def upload_chunk(upload_id: str, index: int = Form(...), file: UploadFile = None):\n    content = await file.read()\n    # store chunk by upload_id/index and verify checksum if provided\n    return {\"upload_id\": upload_id, \"chunk_index\": index, \"status\": \"received\"}\n\n@router.post(\"/{upload_id}/complete\")\ndef complete_upload(upload_id: str):\n    # verify all chunks exist, merge or compose object storage parts\n    return {\"upload_id\": upload_id, \"status\": \"completed\"}",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_chunk_upload.py",
        "language": "python",
        "description": "Test chunk endpoint trả received.",
        "code": "def test_upload_chunk(client):\n    files = {\"file\": (\"part.bin\", b\"abc\", \"application/octet-stream\")}\n    res = client.post(\"/uploads/u1/chunks\", data={\"index\": 0}, files=files)\n    assert res.status_code == 200",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "s3-presigned-upload",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "chunk upload",
      "large file",
      "resume upload"
    ]
  }),
  pattern({
    "id": "csv-import-validation",
    "title": "CSV Import with Row Validation",
    "vietnameseTitle": "Import CSV có validate từng dòng",
    "shortDescription": "Import CSV/Excel có validation row, trả error report và chỉ bulk insert khi dữ liệu hợp lệ.",
    "category": "file-upload",
    "difficulty": "Medium",
    "productionLevel": "Production-ready",
    "libraries": [
      "pandas",
      "Pydantic"
    ],
    "whyUse": [
      "User upload CSV/Excel.",
      "Cần báo lỗi từng dòng.",
      "Cần tránh insert dữ liệu bẩn."
    ],
    "whyNotUse": [
      "File rất nhỏ nhập thủ công được.",
      "Import chạy hoàn toàn nội bộ."
    ],
    "installCommand": "pip install pandas pydantic openpyxl",
    "folderStructure": "app/services/import_service.py",
    "codeTemplates": [
      {
        "filename": "app/services/import_service.py",
        "language": "python",
        "description": "Validate từng row bằng Pydantic.",
        "code": "import pandas as pd\nfrom pydantic import BaseModel, EmailStr, ValidationError\n\nclass UserRow(BaseModel):\n    email: EmailStr\n    full_name: str\n\ndef validate_csv(path: str) -> tuple[list[UserRow], list[dict]]:\n    df = pd.read_csv(path)\n    valid, errors = [], []\n    for index, row in df.iterrows():\n        try:\n            valid.append(UserRow(**row.to_dict()))\n        except ValidationError as exc:\n            errors.append({\"row\": index + 2, \"errors\": exc.errors()})\n    return valid, errors",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_csv_import.py",
        "language": "python",
        "description": "Invalid row có error report.",
        "code": "def test_csv_validation_reports_row_errors(tmp_path):\n    path = tmp_path / \"users.csv\"\n    path.write_text(\"email,full_name\nnot-email,Long\n\")\n    valid, errors = validate_csv(str(path))\n    assert valid == []\n    assert errors[0][\"row\"] == 2",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "file-validation-security",
      "job-status-api"
    ],
    "searchKeywords": [
      "csv import",
      "excel import",
      "row validation"
    ]
  })
];
