/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, DecisionCard, Pattern, LibraryGuide } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'api-basics',
    name: 'API Basics',
    icon: 'Terminal',
    accentColor: 'text-slate-400 bg-slate-500/10 hover:bg-slate-500/20',
    borderColor: 'border-slate-500/30',
    accentHex: '#94a3b8',
    description: 'Nền tảng xây dựng Web API, HTTP Method, RESTful Guidelines.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    icon: 'Zap',
    accentColor: 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    accentHex: '#f59e0b',
    description: 'High-performance API framework với type hints, Pydantic & async support.'
  },
  {
    id: 'django',
    name: 'Django',
    icon: 'Feather',
    accentColor: 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20',
    borderColor: 'border-emerald-500/30',
    accentHex: '#10b981',
    description: 'Khung ứng dụng "batteries-included" hoàn thiện cho hệ thống lớn.'
  },
  {
    id: 'database',
    name: 'Database',
    icon: 'Database',
    accentColor: 'text-green-500 bg-green-500/10 hover:bg-green-500/20',
    borderColor: 'border-green-500/30',
    accentHex: '#22c55e',
    description: 'ORM, SQLAlchemy Async, Alembic migrations và thiết kế database.'
  },
  {
    id: 'auth-security',
    name: 'Auth & Security',
    icon: 'KeyRound',
    accentColor: 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20',
    borderColor: 'border-rose-500/30',
    accentHex: '#f43f5e',
    description: 'Xác thực OAuth2, JWT tokens, hashes mật khẩu và bảo mật OWASP.'
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    icon: 'Upload',
    accentColor: 'text-sky-500 bg-sky-500/10 hover:bg-sky-500/20',
    borderColor: 'border-sky-500/30',
    accentHex: '#0ea5e9',
    description: 'Truyền tải file lớn, lưu trữ S3/MinIO, validate MIME type an toàn.'
  },
  {
    id: 'ocr-docs',
    name: 'OCR / Documents',
    icon: 'FileText',
    accentColor: 'text-violet-500 bg-violet-500/10 hover:bg-violet-500/20',
    borderColor: 'border-violet-500/30',
    accentHex: '#8b5cf6',
    description: 'Xử lý hóa đơn, PDF scan, OCR lấy text, trích xuất thông tin ảnh.'
  },
  {
    id: 'background-jobs',
    name: 'Background Jobs',
    icon: 'Clock',
    accentColor: 'text-orange-500 bg-orange-500/10 hover:bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    accentHex: '#f97316',
    description: 'Xử lý tác vụ nặng không đồng bộ với Celery, Redis, RQ.'
  },
  {
    id: 'cache-redis',
    name: 'Cache / Redis',
    icon: 'Layers',
    accentColor: 'text-green-600 bg-green-600/10 hover:bg-green-600/20',
    borderColor: 'border-green-600/30',
    accentHex: '#16a34a',
    description: 'Caching API, API Rate limiting, thiết lập pub/sub tốc độ siêu nhanh.'
  },
  {
    id: 'webhook-payment',
    name: 'Webhook / Payment',
    icon: 'CreditCard',
    accentColor: 'text-red-500 bg-red-500/10 hover:bg-red-500/20',
    borderColor: 'border-red-500/30',
    accentHex: '#ef4444',
    description: 'Gọi API thanh toán Stripe, cổng MoMo, verify webhook signature.'
  },
  {
    id: 'testing',
    name: 'Testing',
    icon: 'CheckSquare',
    accentColor: 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20',
    borderColor: 'border-indigo-500/30',
    accentHex: '#818cf8',
    description: 'Viết Unit test & Integration test chuyên sâu với Pytest và AsyncMock.'
  },
  {
    id: 'deployment',
    name: 'Deployment / DevOps',
    icon: 'Cpu',
    accentColor: 'text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    accentHex: '#06b6d4',
    description: 'Container hóa Docker, Docker Compose, bảo mật build & deploy đa nền tảng.'
  },
  {
    id: 'ai-rag',
    name: 'AI Backend / RAG',
    icon: 'Sparkles',
    accentColor: 'text-fuchsia-500 bg-fuchsia-500/10 hover:bg-fuchsia-500/20',
    borderColor: 'border-fuchsia-500/30',
    accentHex: '#d946ef',
    description: 'Semantic search, embeddings, vector database pgvector/Qdrant cho AI agent.'
  }
];

export const DECISION_CARDS: DecisionCard[] = [
  {
    id: 'ocr-card',
    title: 'Chụp ảnh OCR',
    khiNaoDung: [
      'Người dùng chụp ảnh và cần lấy text',
      'Đọc hóa đơn, tài liệu, phiếu điểm từ file ảnh/PDF',
      'Cần tích hợp OCR cục bộ hoặc đám mây không lo timeout'
    ],
    stack: ['FastAPI', 'UploadFile', 'Pillow', 'OpenCV', 'PaddleOCR'],
    ctaText: 'Xem OCR template',
    categoryAccent: 'violet',
    patternId: 'image-ocr-api',
    patternCountLabel: '1 Template lớn + 2 Biến thể'
  },
  {
    id: 'auth-jwt-card',
    title: 'Login / Register JWT',
    khiNaoDung: [
      'Ứng dụng cần cơ chế tạo tài khoản và đăng nhập',
      'Cần bảo vệ thông tin API một cách an toàn',
      'Cần access token và refresh token để tối ưu bảo mật'
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'PyJWT', 'Bcrypt-py', 'Pydantic'],
    ctaText: 'Xem Auth template',
    categoryAccent: 'rose',
    patternId: 'jwt-auth-api',
    patternCountLabel: '2 Templates thiết lập nhanh'
  },
  {
    id: 'large-file-card',
    title: 'Xử lý file lớn / Task nền',
    khiNaoDung: [
      'Upload, xử lý ảnh lớn, sinh report excel tốn quá 5 giây',
      'Request từ client dễ bị timeout nếu chạy đồng bộ',
      'Cần có cơ chế tự động thử lại (retry) khi worker lỗi'
    ],
    stack: ['FastAPI', 'Celery', 'Redis', 'Flower', 'Pillow'],
    ctaText: 'Xem Celery Worker template',
    categoryAccent: 'orange',
    patternId: 'celery-worker-setup',
    patternCountLabel: '1 Production-Ready Pipeline'
  },
  {
    id: 'cache-redis-card',
    title: 'Tăng tốc API / Caching',
    khiNaoDung: [
      'API đọc dữ liệu (Read) liên tục ít thay đổi',
      'Muốn giảm tải áp lực query trực tiếp cho Postgres/MySQL',
      'Cần phản hồi kết quả trong khoảng từ 1-5ms'
    ],
    stack: ['Redis', 'Cache-aside Pattern', 'FastAPI-cache', 'Aioredis'],
    ctaText: 'Xem Caching template',
    categoryAccent: 'green',
    patternId: 'redis-rate-limiter',
    patternCountLabel: '2 Cache Patterns tiêu chuẩn'
  },
  {
    id: 'webhook-signature-card',
    title: 'Nhận Webhook thanh toán',
    khiNaoDung: [
      'Nhận sự kiện tức thời phát sinh từ Stripe, GitHub, PayOS, MoMo',
      'Cần verify signature HMAC bảo mật tránh Request giả mạo',
      'Cần đảm bảo tính Idempotency tránh ghi nhận trùng lặp'
    ],
    stack: ['FastAPI', 'HMAC verification', 'Idempotency Cache'],
    ctaText: 'Xem Webhook template',
    categoryAccent: 'warm-red',
    patternId: 'webhook-signature-verification',
    patternCountLabel: '1 Bảo mật Template chuyên sâu'
  },
  {
    id: 'rag-embedding-card',
    title: 'RAG Backend / AI Search',
    khiNaoDung: [
      'Người dùng cần chat hỏi đáp trực tiếp với tài liệu PDF',
      'Cần tìm kiếm thông tin theo ngữ nghĩa (Semantic Search)',
      'Cần kết nối dữ liệu cấu trúc và dữ liệu vector database'
    ],
    stack: ['FastAPI', 'Qdrant / pgvector', 'SentenceTransformers', 'Gemini SDK'],
    ctaText: 'Xem RAG template',
    categoryAccent: 'muted-purple',
    patternId: 'rag-query-backend',
    patternCountLabel: '1 Pipeline RAG hoàn chỉnh'
  }
];

export const PATTERNS: Pattern[] = [
  {
    id: 'image-ocr-api',
    title: 'Image OCR API with PaddleOCR & OpenCV',
    vietnameseTitle: 'API Chụp ảnh OCR & Xử lý Ảnh',
    shortDescription: 'Nhận diện văn bản, hóa đơn, giấy tờ từ file ảnh tải lên. Tích hợp tiền xử lý ảnh bằng OpenCV để tăng độ chính xác của OCR kết hợp PaddleOCR/EasyOCR.',
    category: 'ocr-docs',
    difficulty: 'Medium',
    difficultyVi: 'Trung bình',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'UploadFile', 'Pillow', 'OpenCV', 'PaddleOCR'],
    updatedAt: 'Cập nhật 2 ngày trước',
    whyUse: [
      'Cần đọc hóa đơn, chữ viết tay hoặc giấy tờ hành chính từ ảnh người dùng tải lên.',
      'Muốn triển khai OCR tự chủ (On-Premises) mà không tốn chi phí gọi API đám mây.',
      'Sử dụng các bước tiền xử lý ảnh như xoay thẳng (deskew), tăng độ tương phản để cải thiện độ nhận diện.',
      'Hỗ trợ nhiều định dạng ảnh (.png, .jpg, .jpeg, hã trợ cả PDF scan).'
    ],
    whyNotUse: [
      'Tác vụ OCR cần phản hồi dưới 100ms (OCR của PaddleOCR thường tốn 300ms - 1.5s tùy kích thước).',
      'Kích thước file ảnh quá lớn (trên 20MB) được tải lên và xử lý trực tiếp lỗi Gateway Timeout. Hãy dùng Background Jobs (Celery).',
      'Hệ thống chạy trên server không có GPU và có lượng tải đồng thời cực kì lớn (PaddleOCR tiêu tốn nhiều CPU).'
    ],
    quickDecision: {
      bestFor: [
        'Trích xuất text từ ảnh hóa đơn (Invoices), chứng minh nhân dân',
        'Xử lý biểu mẫu có cấu trúc định sẵn',
        'Offline OCR tự quản lý dữ liệu bảo mật'
      ],
      avoidWhen: [
        'Xử lý file PDF dài hàng trăm trang trực tiếp trong một HTTP Request (gây nghẽn server)',
        'Server RAM dưới 2GB (PaddleOCR cần bộ nhớ tối thiểu để load model)'
      ],
      productionLevel: 'Trung bình đến Cao (Có xử lý exception hoàn chỉnh, validate định dạng tệp)'
    },
    installCommand: 'pip install fastapi uvicorn python-multipart pillow opencv-python paddleocr',
    requestFlow: [
      'Client: Gửi HTTP POST Request kèm file ảnh qua form multipart/form-data',
      'FastAPI: Route upload_file_ocr nhận file dưới dạng UploadFile',
      'Validation: Kiểm tra kích thước (<5MB) và MIME type (.jpg, .jpeg, .png)',
      'Preprocess: Dùng OpenCV đọc nhị phân, chuyển grayscale, khử nhiễu & chỉnh góc nghiêng',
      'OCR Engine: PaddleOCR load mô hình ngôn ngữ, quét vùng và trích xuất text',
      'Post-Process: Chuẩn hóa khoảng trắng, lọc nhiễu các ký tự đặc biệt',
      'Response: Trả về JSON chứa text trọn vẹn và thông tin tọa độ chi tiết của từng khối chữ'
    ],
    folderStructure: `app/
├── routers/
│   └── ocr_router.py          # Chứa Endpoint nhận file & điều hướng
├── services/
│   ├── ocr_service.py         # Chứa logic kết nối PaddleOCR
│   └── image_preprocess.py    # Tiền xử lý ảnh (OpenCV, Contrast, Deskew)
├── schemas/
│   └── ocr_schema.py          # Pydantic models validate output trả về
├── core/
│   └── exceptions.py          # Custom HTTP exceptions chuyên lỗi file/OCR
└── main.py                    # Khởi tạo FastAPI app và mount routers`,
    codeTemplates: [
      {
        filename: 'app/routers/ocr_router.py',
        language: 'python',
        description: 'Router FastAPI định nghĩa API endpoint nhận file tải lên, thực hiện tiền xử lý ảnh và trả kết quả text OCR.',
        code: `from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.image_preprocess import preprocess_image
from app.services.ocr_service import ocr_extract_text
from app.schemas.ocr_schema import OCRResponse
import io

router = APIRouter(prefix="/api/v1/ocr", tags=["OCR Processing"])

MAX_FILE_SIZE = 5 * 1024 * 1024  # Hạn chế tối đa 5MB file ảnh
ALLOWED_EXTENSIONS = {"image/jpeg", "image/png", "image/jpg"}

@router.post("/process", response_model=OCRResponse, status_code=200)
async def process_image_ocr(file: UploadFile = File(...)):
    """
    Endpoint tiếp nhận file ảnh từ Client, thực hiện tiền xử lý ảnh nâng cao
    bằng OpenCV và trích xuất ký tự văn bản thông qua mô hình PaddleOCR.
    """
    # 1. Kiểm tra MIME type file
    if file.content_type not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Định dạng {file.content_type} không được hỗ trợ. Hãy tải ảnh JPG/PNG."
        )

    # 2. Đọc nhị phân ảnh và kiểm tra độ lớn file
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Kích thước tệp vượt quá giới hạn 5MB cho phép."
        )

    try:
        # 3. Chuyển đổi mã nhị phân sang luồng ảnh thô
        image_bytes = io.BytesIO(contents)
        
        # 4. Tiền xử lý ảnh nâng cao (chuyển grayscale, khử nhiễu) qua OpenCV
        processed_img_np = preprocess_image(image_bytes)
        
        # 5. Đưa ảnh đã tối ưu qua core OCR Engine trích xuất text
        ocr_result = ocr_extract_text(processed_img_np)
        
        return {
            "filename": file.filename,
            "detected_text": ocr_result["full_text"],
            "blocks": ocr_result["blocks"],
            "confidence_score": ocr_result["confidence"]
        }
        
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Không thể xử lý định dạng tệp: {str(val_err)}"
        )
    except Exception as e:
        # Đảm bảo ghi log lỗi hệ thống thực tế tại đây
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi hệ thống trong quá trình OCR: {str(e)}"
        )`
      },
      {
        filename: 'app/services/image_preprocess.py',
        language: 'python',
        description: 'Tối ưu hóa ảnh thô bằng OpenCV. Giúp loại bỏ nhiễu, tăng độ tương phản để công cụ OCR đọc chữ dễ dàng hơn.',
        code: `import cv2
import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes: io.BytesIO) -> np.ndarray:
    """
    Sử dụng OpenCV thực hiện các bước tiền xử lý ảnh chuyên sâu:
    - Load ảnh gốc từ luồng byte nhị phân.
    - Đưa ảnh về GrayScale màu xám để giảm kênh dữ liệu không cần thiết.
    - Áp dụng Adaptive Thresholding hoặc làm sắc nét bộ viền nét.
    """
    # Đọc luồng Byte nhị phân sang đối tượng ảnh PIL
    pil_image = Image.open(image_bytes).convert("RGB")
    
    # Chuyển đổi ảnh PIL sang Numpy Array định dạng chuẩn của OpenCV (BGR)
    open_cv_image = np.array(pil_image)
    open_cv_image = open_cv_image[:, :, ::-1].copy() # Chuyển RGB sang BGR
    
    # 1. Chuyển ảnh màu sang dạng trắng xám (Grayscale conversion)
    gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
    
    # 2. Khử nhiễu ảnh hạt (Denoising) bằng phương pháp Gaussian Bilateral
    denoised = cv2.bilateralFilter(gray, 9, 75, 75)
    
    # 3. Tăng cường độ tương phản tự động (CLAHE)
    # Tác dụng: Làm sáng chữ bị mờ, cân bằng vùng sáng tối bất thường
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(denoised)
    
    # Ở phiên bản cao cấp bạn có thể deskew xoay ảnh nghiêng tại đây
    return enhanced`
      },
      {
        filename: 'app/services/ocr_service.py',
        language: 'python',
        description: 'Core Service khởi tạo PaddleOCR dạng Singleton để tránh load lại mô hình trên mỗi request, giúp tối ưu hiệu năng và RAM.',
        code: `from paddleocr import PaddleOCR
import numpy as np

# Khởi tạo biến lưu trữ Singleton Model nhằm tránh khởi động lại làm nghẽn RAM
_ocr_instance = None

def get_ocr_model():
    """
    Nhận Singleton của PaddleOCR để tối ưu năng lực tính toán.
    Sẽ tải mô hình ngôn ngữ tiếng Anh và tiếng Việt trong lần chạy đầu tiên.
    """
    global _ocr_instance
    if _ocr_instance is None:
        # Khởi tạo PaddleOCR hỗ trợ nhận diện chữ tiếng Việt & tiếng Anh
        # rec=True: kích hoạt module nhận dạng chữ
        # det=True: kích hoạt module phát hiện vùng chứa chữ
        _ocr_instance = PaddleOCR(use_angle_cls=True, lang="vi", show_log=False)
    return _ocr_instance

def ocr_extract_text(img_np: np.ndarray) -> dict:
    """
    Sử dụng ảnh numpy thô truyền qua PaddleOCR lấy text.
    Trả về cấu trúc chuẩn hóa cho API Router.
    """
    ocr_model = get_ocr_model()
    
    # Chạy mô hình OCR trên ảnh numpy
    results = ocr_model.ocr(img_np, cls=True)
    
    full_text_list = []
    blocks = []
    total_confidence = 0.0
    counter = 0

    if results and results[0]:
        for line in results[0]:
            # line dạng: [ [[x1,y1],[x2,y2],[x3,y3],[x4,y4]], (text, confidence) ]
            box = line[0]
            text, confidence = line[1]
            
            full_text_list.append(text)
            blocks.append({
                "text": text,
                "confidence": float(confidence),
                "box": box
            })
            
            total_confidence += confidence
            counter += 1

    mean_confidence = (total_confidence / counter) if counter > 0 else 1.0
    
    return {
        "full_text": " ".join(full_text_list),
        "blocks": blocks,
        "confidence": round(mean_confidence, 2)
    }`
      }
    ],
    commonErrors: [
      {
        error: 'AttributeError: \'NoneType\' object has no attribute \'ocr\'',
        cause: 'Do PaddleOCR không thể tìm thấy mô hình weight ở local hoặc tải mô hình từ CDN bị ngắt quãng giữa chừng.',
        fix: 'Xóa thư mục cache mô hình gốc (ví dụ ~/.paddleocr/) và chạy lại dự án để tải lại hoàn chỉnh mô hình ngôn ngữ.'
      },
      {
        error: 'OSError: symbol not found / libGL.so.1 missing',
        cause: 'Thiếu thư viện liên kết đồ họa hệ thống OpenGL trên môi trường Linux Ubuntu/Docker mỏng.',
        fix: 'Thêm dòng cài đặt thư viện hệ thống trước pip: `apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0` vào tệp tin Dockerfile.'
      },
      {
        error: 'MemoryError/RuntimeError out of memory',
        cause: 'Ảnh tải lên quá lớn hoặc chạy quá nhiều luồng xử lý OCR đồng thời mà không có GPU gia tốc.',
        fix: 'Triển khai Queue System như Celery để kiểm soát hàng đợi OCR chỉ chạy tối đa 2 tác vụ song song trên môi trường CPU thế hệ hạn chế.'
      }
    ],
    productionChecklist: [
      { task: 'Giới hạn kích thước File nhận từ Client', detail: 'Đảm bảo check length bytes nội dung của UploadFile trước khi load vào bộ nhớ Pillow và OpenCV tránh Crash hệ thống vì tràn dung lượng RAM.', checked: true },
      { task: 'Bảo mật thông tin dữ liệu nhạy cảm', detail: 'Nếu hệ thống OCR cần quét hóa đơn ngân hàng, thông tin cá nhân (CCCD), tuyệt đối cấu hình Logger không ghi vết nội dung thô (Detected Text) ra bảng điều khiển Console hoặc File log công khai.', checked: true },
      { task: 'Quản lý Singleton cho các mô hình AI lớn', detail: 'Tuyệt đối không khởi tạo mới lớp PaddleOCR() trong thân hàm xử lý Request. Mô hình cần được khởi dựng Singleton một lần duy nhất lúc khởi tạo dự án để tránh rò rỉ RAM bộ nhớ đệm.', checked: true },
      { task: 'Sử dụng Dockerfile Multi-stage tối ưu dung lượng', detail: 'PaddleOCR tải rất nhiều dependencies cồng kềnh, khuyến nghị tối ưu cache lớp Docker nhằm tránh build lại thư viện OpenCV mất 20-30 phút không cần thiết.', checked: false }
    ],
    relatedPatterns: ['celery-worker-setup', 'image-upload-to-s3', 'jwt-auth-api']
  },
  {
    id: 'jwt-auth-api',
    title: 'FastAPI REST API Authentication using JWT Tokens',
    vietnameseTitle: 'JWT Authentication - Xác thực người dùng chuẩn bảo mật',
    shortDescription: 'Cơ chế tạo tài khoản, mã hóa mật khẩu bcrypt dồn token bảo vệ Endpoint API. Thiết lập Middleware quản lý phân quyền và Refresh Token.',
    category: 'auth-security',
    difficulty: 'Medium',
    difficultyVi: 'Trung bình',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'SQLAlchemy', 'PyJWT', 'Bcrypt', 'Pydantic'],
    updatedAt: 'Cập nhật 1 ngày trước',
    whyUse: [
      'Cần tạo cơ chế đăng nhập và đăng ký chuẩn xác cho Mobile App hoặc Single Page App (Vite/React).',
      'Muốn bảo vệ các tuyến API Endpoint nhạy cảm khỏi truy cập khách vãng lai không có thẩm quyền.',
      'Định hình phân quyền theo Role (quyền Admin, Editor, User).'
    ],
    whyNotUse: [
      'Cho các website chạy Server Side Rendering truyền thống thì sử dụng Cookie session-based an toàn và chống CSRF tốt hơn lưu JWT ở LocalStorage.',
      'Hệ thống microservices quy mô khổng lồ cần SSO tập trung thì nên tích hợp Keycloak hoặc Auth0 hơn là tự build cục bộ.'
    ],
    quickDecision: {
      bestFor: [
        'API Token xác thực Client-Server gọn nhẹ',
        'Bảo mật Header Bearer Token',
        'Ứng dụng Mobile, React, Vue, Next.js'
      ],
      avoidWhen: [
        'Ứng dụng doanh nghiệp lớn có sẵn Identity Provider quốc tế',
        'Không cấu hình HTTPS ở môi trường production khiến token dễ lộ qua mạng'
      ],
      productionLevel: 'Sẵn sàng triển khai thực tế (Có băm muối mật khẩu bcrypt, access token thọ ngắn 15 phút, refresh token lưu DB)'
    },
    installCommand: 'pip install fastapi uvicorn "pyjwt[crypto]" bcrypt cryptography sqlalchemy',
    requestFlow: [
      'Client gửi thông tin đăng nhập POST /api/auth/login kèm credentials',
      'Backend truy quét Email người dùng trong Postgres/MySQL DB',
      'So sánh Hash mật khẩu bcrypt người dùng nhập với bản ghi trong DB',
      'Nếu khớp, sinh chuỗi Access Token thọ 15-30 phút mang theo User ID và Role',
      'Trả về Access Token dạt dạng Bearer Token cho Client lưu trữ',
      'Client đính kèm Header Authorization: Bearer <Token> cho mọi request an toàn sau đó'
    ],
    folderStructure: `app/
├── core/
│   ├── security.py            # Mã hóa mật khẩu bcrypt & sinh JWT
│   └── config.py              # Đọc SECRET_KEY từ biến môi trường .env
├── db/
│   └── models.py              # SQLAlchemy DB Model lưu thông tin User
├── routers/
│   └── auth_router.py         # Endpoints login, signup, refresh token
└── dependencies.py            # Hàm get_current_user lấy user đang login`,
    codeTemplates: [
      {
        filename: 'app/core/security.py',
        language: 'python',
        description: 'Tập hợp các helpers thực hiện băm mật khẩu bảo mật (Bcrypt) và giải mã JWT token kèm cơ chế xác thực thời gian hữu hiệu.',
        code: `import jwt
from datetime import datetime, timedelta, timezone
from bcrypt import hashpw, gensalt, checkpw
from typing import Union, Any

SECRET_KEY = "SUPER_SECRET_COMPASS_KEY_CHANGE_ME_IN_PRODUCTION"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    """Mã hóa mật khẩu bằng thuật toán Bcrypt kèm muối tự sinh"""
    return hashpw(password.encode("utf-8"), gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """So khớp mật khẩu thô và chuỗi mã hóa trong Database"""
    return checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(subject: Union[str, Any], expires_delta: timezone = None) -> str:
    """Tạo chuỗi Access Token truyền tải định danh người dùng an toàn"""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt`
      }
    ],
    commonErrors: [
      {
        error: 'jwt.exceptions.DecodeError: Signature verification failed',
        cause: 'Mã SECRET_KEY dùng để verify token khác với khoá dùng để mã hoá sinh ra token trước đó.',
        fix: 'Đồng bộ duy nhất một biến môi trường SECRET_KEY trên tất cả các cụm backend app chạy song song.'
      },
      {
        error: 'bcrypt.TypeError: Unicode-objects must be encoded before hashing',
        cause: 'Mật khẩu chuỗi string chưa được encode thành byte thô (.encode("utf-8")) trước khi dạt vào bcrypt.',
        fix: 'Sử dụng phương thức string.encode("utf-8") trước khi gọi hàm băm hoặc so khớp mật khẩu.'
      }
    ],
    productionChecklist: [
      { task: 'Xử lý Expired Token đúng cách ở Front-End', detail: 'Access token chỉ nên tồn tại tối đa 15-30 phút. Phía Client cần thiết lập Interceptor để tự động gọi API Refresh Token gia hạ hạn thời gian mà không bắt user đăng nhập lại.', checked: true },
      { task: 'Thay đổi Secret_Key mặc định tại Production', detail: 'Tải biến môi trường thực tế từ ENV thay vì hardcode giá trị bảo mật trong codebase dự án.', checked: true }
    ],
    relatedPatterns: ['image-ocr-api', 'redis-rate-limiter']
  },
  {
    id: 'celery-worker-setup',
    title: 'Celery & Redis Background Worker Setup',
    vietnameseTitle: 'Celery & Redis - Hàng đợi Tác vụ Nền bất đồng bộ',
    shortDescription: 'Xử lý các tiến trình nặng như gửi thư, xuất báo cáo dữ liệu, thu hẹp ảnh hoặc phân tích tệp tin ngoài luồng chính Request nhằm chống Timeout API.',
    category: 'background-jobs',
    difficulty: 'Advanced',
    difficultyVi: 'Nâng cao',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'Celery', 'Redis', 'Flower'],
    updatedAt: 'Cập nhật 3 ngày trước',
    whyUse: [
      'Gửi email xác thực hàng loạt tốn hàng chục giây không chặn luồng xử lý HTTP API.',
      'Thực hiện các tác vụ định kỳ định giờ (Celery Beat) như dọn rác DB lúc 2h sáng hằng ngày.',
      'Cần scale độc lập năng lực xử lý (Worker xử lý heavy task có thể nằm trên server GPU, trong khi API Web ở server cấu hình thấp hơn).'
    ],
    whyNotUse: [
      'Cho các tác vụ quá nhẹ (ví dụ ghi log file đơn giản), có thể sử dụng ngay BackgroundTasks dựng sẵn của FastAPI mà không cần dựng cụm Celery-Redis cồng kềnh.'
    ],
    quickDecision: {
      bestFor: [
        'Xử lý file nén, xuất nhập file Excel hàng chục ngàn dòng',
        'Cron Job định kỳ hàng ngày, hàng tuần',
        'Xử lý dồn nén/phân tích video, âm thanh'
      ],
      avoidWhen: [
        'Tác vụ đồng bộ có kết quả bắt buộc trả thẳng tức thì lên giao diện người dùng'
      ],
      productionLevel: 'Hệ thống doanh nghiệp (Có cấu hình kiểm soát rate-limit worker, cơ chế retry thông minh với exponential backoff)'
    },
    installCommand: 'pip install celery redis fastapi flower',
    requestFlow: [
      'Client gửi yêu cầu API xuất báo cáo tài chính hàng năm',
      'FastAPI tiếp nhận và đẩy task ID "export_report" vào Redis Queue bằng Celery',
      'FastAPI nhanh chóng trả về 202 Accepted cùng Task ID cho Client',
      'Worker Celery chạy nền độc lập nghe thấy task mới từ Redis và lôi ra thực thi xử lý',
      'Client sử dụng Task ID thỉnh thoảng gọi API check trạng thái (Polling) xem báo cáo đã xong chưa'
    ],
    folderStructure: `app/
├── tasks/
│   ├── __init__.py
│   └── email_tasks.py         # Chứa task gửi email hay xử lý file nền
├── core/
│   └── celery_app.py          # Cấu hình Celery Broker, Backend & Beat
└── main.py                    # API trigger task nền`,
    codeTemplates: [
      {
        filename: 'app/core/celery_app.py',
        language: 'python',
        description: 'Định nghĩa tệp tin cấu hình Celery liên kết tới Redis làm message broker lưu chuyển hàng đợi tác vụ.',
        code: `from celery import Celery
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Khởi dựng thực thể Celery quản lý Task
celery_app = Celery(
    "backend_compass_tasks",
    broker=REDIS_URL,
    backend=REDIS_URL
)

# Cấu hình tối ưu vận hành Celery
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Ho_Chi_Minh",
    enable_utc=True,
    # Ngăn Worker lấy gom dữ liệu gây nghẽn ko công bằng (Prefetch optimization)
    worker_prefetch_multiplier=1,
    task_acks_late=True, # Xác thực đã xử lý thành công mới gỡ bỏ task khỏi hàng đợi
)`
      }
    ],
    commonErrors: [
      {
        error: 'kombu.exceptions.OperationalError: Connection to redis refused',
        cause: 'Redis server chưa khởi động hoặc sai cổng kết nối Redis URL trong file ENVs.',
        fix: 'Kiểm tra xem service redis có đang chạy cục bộ không qua lệnh CLI: `redis-cli ping` hoặc bật container bằng docker run -d -p 6379:6379 redis.'
      }
    ],
    productionChecklist: [
      { task: 'Cấu hình Acks Late và Prefetch hợp lý', detail: 'Giúp hàng đợi ổn định, không lo rớt task giữa chừng khi Worker đột ngột tắt nguồn.', checked: true }
    ],
    relatedPatterns: ['image-ocr-api', 'redis-rate-limiter']
  },
  {
    id: 'redis-rate-limiter',
    title: 'API Rate Limiting with Redis & FastAPI Dependencies',
    vietnameseTitle: 'Redis Rate Limiter - Chặn spam và giới hạn cuộc gọi API',
    shortDescription: 'Cài đặt bộ chặn IP/User spam API, lưu lịch sử cuộc gọi cực nhanh trên ram Redis. Tránh tấn công BOT DDoS hạ gục máy chủ cơ sở dữ liệu.',
    category: 'cache-redis',
    difficulty: 'Easy',
    difficultyVi: 'Dễ',
    productionLevel: 'Production-ready',
    libraries: ['Redis', 'FastAPI', 'Aioredis'],
    updatedAt: 'Cập nhật 4 ngày trước',
    whyUse: [
      'Endpoint gửi mã OTP xác nhận đăng ký dễ bị spam tiêu tốn tiền SMS của công ty.',
      'Endpoint tìm kiếm, scraping dữ liệu cần hạn chế mỗi máy tính chỉ được gọi tối đa 60 lần/phút.'
    ],
    whyNotUse: [
      'Nếu cả hệ thống được bảo vệ qua hệ quản trị API Gateway chuyên nghiệp như Kong, Cloudflare, AWS API Gateway thì không cần viết thêm middleware chặn ở code app.'
    ],
    quickDecision: {
      bestFor: [
        'Hạn chế quota gọi API cho tài khoản miễn phí',
        'Bảo vệ API đăng ký tài khoản, gửi OTP',
        'Hạn chế tool crawler tự động cào dữ liệu'
      ],
      avoidWhen: [
        'Hệ thống đang chạy đơn lẻ không có máy chủ Redis hỗ trợ'
      ],
      productionLevel: 'Rất cao (Sử dụng lệnh nguyên tử INCR và EXPIRE trong Redis tránh lỗi tranh chấp đồng thời - Race Condition)'
    },
    installCommand: 'pip install redis fastapi aioredis',
    requestFlow: [
      'Client gọi API Endpoint có gán Rate Limiter Dependency',
      'Hàm middleware lấy địa chỉ IP của Client hoặc User ID từ Token',
      'Kiểm thử Key trong Redis (ví dụ: rate:192.168.1.1:minute)',
      'Nếu số lượng cuộc gọi vượt quá hạn định (ví dụ 10/phút), quăng lỗi HTTP 429 Too Many Requests',
      'Nếu còn trong quota, tăng biến đếm lên 1 đơn vị và cho phép tiếp cận API thực thụ'
    ],
    folderStructure: `app/
├── core/
│   └── database_redis.py      # Kết nối và dọn dẹp Redis connection pool
├── dependencies/
│   └── rate_limiter.py        # Thư mục chứa Dependency kìm hãm quota
└── main.py                    # Khởi động và gán trực tiếp chặn cho Route`,
    codeTemplates: [
      {
        filename: 'app/dependencies/rate_limiter.py',
        language: 'python',
        description: 'Tạo class Dependency giúp nhanh chóng cấu hình hạn mức cuộc gọi khác nhau cho từng Endpoint cụ thể.',
        code: `from fastapi import Request, HTTPException, status
import redis.asyncio as aioredis
import time

# Khởi tạo instance kết nối redis asyncio
redis_client = aioredis.from_url("redis://localhost:6379", encoding="utf-8", decode_responses=True)

class RateLimiter:
    def __init__(self, times: int, seconds: int):
      self.times = times
      self.seconds = seconds

    async def __call__(self, request: Request):
      """Xử lý chặn request khi gọi vượt quota định biên"""
      client_ip = request.client.host
      route_path = request.url.path
      redis_key = f"rate:{client_ip}:{route_path}"
      
      # Dùng Redis Multi/Pipeline để đảm bảo tính nguyên tử (atomic)
      async with redis_client.pipeline(transaction=True) as pipe:
          # Lấy lượng request hiện tại của IP trong window
          await pipe.get(redis_key)
          await pipe.ttl(redis_key)
          results = await pipe.execute()
          
          current_val = results[0]
          ttl = results[1]
          
          if current_val is not None and int(current_val) >= self.times:
              raise HTTPException(
                  status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                  detail=f"Quá tải số lượng cuộc gọi cho phép. Thử lại sau {ttl} giây.",
                  headers={"Retry-After": str(ttl)}
              )
              
          # Thực hiện lưu lượt truy vết mới
          async with redis_client.pipeline(transaction=True) as write_pipe:
              if current_val is None:
                  await write_pipe.set(redis_key, 1, ex=self.seconds)
              else:
                  await write_pipe.incr(redis_key)
              await write_pipe.execute()`
      }
    ],
    commonErrors: [
      {
        error: 'ConnectionError: Error 111 connecting to localhost:6379. Connection refused.',
        cause: 'Chưa có Redis server chạy cục bộ phục vụ lưu trữ đệm.',
        fix: 'Chạy docker start redis hoặc kiểm tra kết nối mạng nội bộ giữa container backend và container redis.'
      }
    ],
    productionChecklist: [
      { task: 'Tránh lỗi Race Condition bằng Lua Script hoặc Transation', detail: 'Khi nhiều request đẩy vào cùng một mili-giây, code kiểm tra thông thường dễ bị bypass, cấu hình pipeline multi để Redis chạy tuần tự nguyên tử.', checked: true }
    ],
    relatedPatterns: ['jwt-auth-api', 'celery-worker-setup']
  },
  {
    id: 'webhook-signature-verification',
    title: 'Stripe Webhook Signature Verification in Python',
    vietnameseTitle: 'Xác thực Signature Webhook khi nhận thông tin thanh toán',
    shortDescription: 'Nhận sự kiện thanh toán hóa đơn tự động từ Stripe, kiểm tra mã ký bảo mật bằng chữ ký SHA256 thô tránh rò rỉ dữ liệu giả danh thanh toán thành công.',
    category: 'webhook-payment',
    difficulty: 'Medium',
    difficultyVi: 'Trung bình',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'Stripe', 'HMAC'],
    updatedAt: 'Cập nhật 6 ngày trước',
    whyUse: [
      'Cần mở khóa gói khóa học, dịch vụ pro ngay khi người dùng trả tiền thành công qua ngân hàng hay cổng quốc tế.',
      'Bảo vệ API nhận thông báo hoàn tiền tránh kẻ gian mò được endpoint tự kích hoạt vô căn cứ.'
    ],
    whyNotUse: [
      'Cho mục đích thử nghiệm phi thương mại hoặc không can hệ đến tài chính, do việc verify signature đòi hỏi config webhook secret phức tạp.'
    ],
    quickDecision: {
      bestFor: [
        'Cổng thanh toán MoMo, Stripe, PayOS, PayPal',
        'Tự động tích hợp trạng thái đơn hàng khi đối tác báo tin',
        'Verify SHA256 mã hóa gói tin tuyệt mật'
      ],
      avoidWhen: [
        'API nội bộ gọi lẫn nhau có chung mạng Private bảo mật cao (Hữu ích hơn khi dùng JWT API key nội bộ)'
      ],
      productionLevel: 'Cực kỳ quan trọng (Thiếu bước verify chữ ký, bất kỳ ai biết được Endpoint URL của bạn đều tự giả mạo thanh toán gửi request lừa gạt tiền bạc)'
    },
    installCommand: 'pip install stripe fastapi uvicorn',
    requestFlow: [
      'Stripe kích hoạt sự kiện "Thanh toán thành công"',
      'Stripe gửi HTTP POST payload kèm chữ ký bí mật trong header Stripe-Signature',
      'FastAPI nhận gói raw body nhị phân tuyệt đối không qua phân tích JSON trước',
      'Ứng dụng Python dùng stripe.Webhook.construct_event kết hợp raw_body và Webhook_Secret',
      'Nếu chữ ký hợp lệ, giải nén JSON lấy ID đơn hàng mở gói premium',
      'Nếu không trùng chữ ký, trả về lỗi 400 Bad Request chặn ngay lập tức'
    ],
    folderStructure: `app/
├── routers/
│   └── webhook_stripe.py      # Nhận sự kiện thô và verify signature
└── main.py                    # Tổng hợp router khởi chạy`,
    codeTemplates: [
      {
        filename: 'app/routers/webhook_stripe.py',
        language: 'python',
        description: 'Tuyến API tiếp nhận webhook đặc thù, giữ nguyên raw body phục vụ kiểm chứng chữ ký crypto SHA256.',
        code: `from fastapi import APIRouter, Request, Header, HTTPException, status
import stripe

router = APIRouter(prefix="/api/webhook", tags=["Webhook Payments"])

# Khóa bí mật lấy về từ trang điều khiển Stripe Developers
STRIPE_WEBHOOK_SECRET = "whsec_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"

@router.post("/stripe")
async def handle_stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None)
):
    """
    Tiếp nhận body nguyên thô dạng bytes từ Stripe. 
    Tuyệt đối KHÔNG dùng request.json() trước khi verify signature vì sẽ làm sai khớp băm SHA256.
    """
    if not stripe_signature:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Thiếu tiêu đề Stripe-Signature xác thực."
        )

    # Đọc body thô nguyên vẹn phục vụ băm crypto
    payload = await request.body()
    
    try:
        # Sử dụng SDK Stripe kiểm định chữ ký tự động
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Payload không hợp lệ
        raise HTTPException(status_code=400, detail="Payload thông tin thô bị biến đổi hoặc không hợp lệ.")
    except stripe.error.SignatureVerificationError as e:
        # Chữ ký không trùng khớp bảo mật
        raise HTTPException(status_code=400, detail="Chữ ký Webhook Signature sai lệch, chặn truy cập giả mạo.")

    # Phân loại và xử lý sự kiện
    event_type = event["type"]
    if event_type == "checkout.session.completed":
        session = event["data"]["object"]
        # Lấy ID hóa đơn và lưu trạng thái thành công cho tài khoản
        payment_intent_id = session.get("payment_intent")
        user_email = session.get("customer_details", {}).get("email")
        print(f"Thanh toán thành công đơn hàng Stripe: {payment_intent_id} cho User: {user_email}")
        # Thực hiện cập nhật Database nạp Pro cho user tại đây
        
    return {"status": "success", "event_processed": event_type}`
      }
    ],
    commonErrors: [
      {
        error: 'SignatureVerificationError: No elegant signature found matching',
        cause: 'Webhook Secret bị điền sai hoặc đang chạy thử mà chưa khởi động Stripe CLI proxy.',
        fix: 'Dùng lệnh Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook/stripe` và copy chuỗi whsec_ chính xác dán vào ENV.'
      }
    ],
    productionChecklist: [
      { task: 'Nhận Raw Body chứ không nhận JSON', detail: 'Xác thực băm SHA-256 yêu cầu chuỗi ký tự nhị phân thô không thay đổi dẫu chỉ 1 dấu cách cách thụt đầu dòng.', checked: true },
      { task: 'Tránh lỗi xử lý lặp sự kiện (Idempotency)', detail: 'Tính tiền và cộng Pro đôi khi bị nhà mạng Stripe gọi lại gửi 2-3 lần do lỗi timeout kết nối. Hãy lưu log ID event đã xử lý thành công vào Redis cache để từ chối xử lý đè bản ghi có sẵn.', checked: true }
    ],
    relatedPatterns: ['jwt-auth-api', 'redis-rate-limiter']
  },
  {
    id: 'rag-query-backend',
    title: 'RAG Prompt Query Backend with Qdrant Vector DB',
    vietnameseTitle: 'RAG Backend - Chat hỏi đáp tài liệu thông minh',
    shortDescription: 'Xây dựng đường ống (Pipeline) Semantic Search, chuyển hóa câu hỏi user sang dạng vectơ embeddings kết hợp QdrantDB và lấy ngữ cảnh trả về Gemini LLM.',
    category: 'ai-rag',
    difficulty: 'Advanced',
    difficultyVi: 'Nâng cao',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'Qdrant-Client', 'SentenceTransformers', 'GoogleGenAI'],
    updatedAt: 'Cập nhật 1 ngày trước',
    whyUse: [
      'Xây dựng trợ lý ảo tư vấn khách hàng dựa hoàn toàn trên cẩm nang PDF nội bộ của doanh nghiệp.',
      'Tìm kiếm tài liệu thông minh vượt xa tìm từ khóa SQL LIKE, định hướng chuẩn văn phong ngữ nghĩa.'
    ],
    whyNotUse: [
      'Cho các nghiệp vụ tìm kiếm dữ liệu có cấu trúc chính xác tuyệt đối (ví dụ tìm xem hóa đơn còn nợ bao nhiêu tiền). Nghiệp vụ này hãy dùng SQL query truyền thống.'
    ],
    quickDecision: {
      bestFor: [
        'Chatbot AI nội bộ doanh nghiệp',
        'Hệ thống AI search hỗ trợ kỹ thuật',
        'Giải mã tự động và tóm tắt rà soát PDF'
      ],
      avoidWhen: [
        'Chỉ cần tìm kiếm chuỗi văn bản đơn giản (Search gõ đúng từ là ra, hãy dùng PostgreSQL Full-text Search hoặc Elasticsearch cho đơn giản).'
      ],
      productionLevel: 'Phát triển nâng cao (Có phân tích đoạn văn - Chunking, sinh vectơ hóa, truy quét k-lân cận gần nhất và Reranking tối ưu)'
    },
    installCommand: 'pip install fastapi qdrant-client sentence-transformers google-genai',
    requestFlow: [
      'Người dùng gửi thắc mắc: "Cách cấu hình CORS trên FastAPI như thế nào?"',
      'Hệ thống dùng SentenceTransformers sinh vector biểu diễn câu hỏi (ví dụ mảng số thực 384 chiều)',
      'Truy vấn Qdrant Vector DB quét lấy 3-5 phân đoạn tài liệu có độ tương đồng Cosine cao nhất',
      'Xây dựng Prompt dâng context: "Thông tin ngữ cảnh: ... Hãy dựa vào đó trả lời câu hỏi: CORS...',
      'Đẩy Prompt hoàn chỉnh qua Google Gemini API server-side lấy phản hồi văn bản thông thái',
      'Trả câu chữ hoàn chỉnh đầy rẫy nguồn gốc dẫn chứng về màn hình UI của người dùng'
    ],
    folderStructure: `app/
├── services/
│   ├── vector_db.py           # Kết nối Qdrant/pgvector, truy xuất văn bản tương đồng
│   ├── embedding_service.py   # Chuyển văn bản sang vector embeddings thô
│   └── gemini_ai.py           # Gọi API Gemini sinh câu trả lời server-side
├── routers/
│   └── chat_router.py         # Endpoints hỏi đáp dạng RAG
└── main.py`,
    codeTemplates: [
      {
        filename: 'app/services/vector_db.py',
        language: 'python',
        description: 'Tập hợp helpers liên kết với Qdrant Client nhằm thực hiện tìm kiếm vectơ tương thích.',
        code: `from qdrant_client import QdrantClient
from app.services.embedding_service import get_text_embedding

# Khởi tạo Client Qdrant Vector Database
qdrant_client = QdrantClient(url="http://localhost:6333")
COLLECTION_NAME = "knowledge_base"

def query_relevant_milieu(query_text: str, limit: int = 3) -> list:
    """
    Vectơ hóa câu hỏi của người dùng và tìm kiếm ngữ cảnh
    có độ tương đồng nội dung cao nhất trong Qdrant Vector DB.
    """
    # 1. Biến đổi câu hỏi dạng text sang vecto 384 số thực
    query_vector = get_text_embedding(query_text)
    
    # 2. Tìm kiếm top k-ngáng lân cận gần nhất
    search_results = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit
    )
    
    contexts = []
    for result in search_results:
        # Lấy phân đoạn tài liệu thô được lưu trong payload của điểm vector
        text_chunk = result.payload.get("text_content", "")
        contexts.append(text_chunk)
        
    return contexts`
      }
    ],
    commonErrors: [
      {
        error: 'QdrantClient connection failed: Cannot connect to Qdrant at localhost:6333',
        cause: 'Môi trường chưa khởi chạy server Qdrant.',
        fix: 'Chạy docker container Qdrant bằng lệnh: `docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage:z qdrant/qdrant`'
      }
    ],
    productionChecklist: [
      { task: 'Chọn độ dài chunking văn bản phù hợp', detail: 'Tối ưu hóa độ dài đoạn cắt (ví dụ: chunk 500 ký tự có độ gối đầu overlap 50 ký tự) để đảm bảo không mất ngữ nghĩa giữa các đoạn cắt.', checked: true }
    ],
    relatedPatterns: ['celery-worker-setup', 'jwt-auth-api']
  }
];

export const LIBRARIES: LibraryGuide[] = [
  {
    name: 'FastAPI',
    slug: 'fastapi',
    description: 'Framework xây dựng API hiện đại, hiệu năng cực cao dựa trên Python type hints, Pydantic & Asyncio.',
    whenToUse: 'Cần xây dựng máy chủ API RESTful tốc độ phản hồi cực nhanh, tự động sinh tài liệu Swagger/OpenAPI hoàn toàn miễn phí.',
    category: 'fastapi',
    relatedPatternCount: 4,
    installCommand: 'pip install fastapi uvicorn',
    websiteUrl: 'https://fastapi.tiangolo.com/'
  },
  {
    name: 'SQLAlchemy',
    slug: 'sqlalchemy',
    description: 'Thư viện ORM (Object Relational Mapper) linh hoạt và mạnh mẽ bậc nhất giúp giao tiếp PostgreSQL, MySQL, SQLite dạng Python Class.',
    whenToUse: 'Khi cần tạo database, quản lý bảng, thao tác CRUD dữ liệu mượt mà, hỗ trợ tốt cú pháp Asyncio không đồng bộ hiện đại.',
    category: 'database',
    relatedPatternCount: 3,
    installCommand: 'pip install sqlalchemy asyncpg psycogp2-binary',
    websiteUrl: 'https://www.sqlalchemy.org/'
  },
  {
    name: 'Redis',
    slug: 'redis',
    description: 'Hệ thống lưu trữ cấu trúc dữ liệu trên bộ nhớ RAM siêu tốc, thường làm bộ nhớ đệm (Cache), giới hạn tần suất API hoặc Broker tin nhắn Celery.',
    whenToUse: 'Khi muốn phản hồi API dưới 5ms, lưu trữ session đăng nhập tạm thời hoặc kìm hãm quota spam API.',
    category: 'cache-redis',
    relatedPatternCount: 4,
    installCommand: 'pip install redis',
    websiteUrl: 'https://redis.io/'
  },
  {
    name: 'Celery',
    slug: 'celery',
    description: 'Trình quản lý hàng đợi tác vụ nền (Distributed Task Queue) kinh điển của Python, chạy các việc tốn tài nguyên ngoài luồng Response.',
    whenToUse: 'Tần suất gửi email lớn, nén ảnh, nhận diện OCR mất nhiều thời gian, chạy backup dữ liệu tự động hằng ngày.',
    category: 'background-jobs',
    relatedPatternCount: 2,
    installCommand: 'pip install celery',
    websiteUrl: 'https://docs.celeryq.dev/'
  },
  {
    name: 'PaddleOCR',
    slug: 'paddleocr',
    description: 'Công cụ nhận diện ký tự quang học siêu nhẹ, chính xác hàng đầu cho tiếng Việt, tiếng Anh và 80+ ngôn ngữ quốc tế khác.',
    whenToUse: 'Cần số hóa văn bản từ ảnh chụp, hóa đơn, nhận diện biển số xe mà không phụ thuộc hạ tầng Cloud ngoài.',
    category: 'ocr-docs',
    relatedPatternCount: 2,
    installCommand: 'pip install paddleocr pillow opencv-python',
    websiteUrl: 'https://github.com/PaddlePaddle/PaddleOCR'
  },
  {
    name: 'Pytest',
    slug: 'pytest',
    description: 'Khung kiểm thử (Testing framework) trực quan, gọn đẹp nhất Python hỗ trợ viết test suite từ cơ bản đến phức tạp.',
    whenToUse: 'Viết unit test, api test tự động chạy trước khi CI/CD tích hợp dọn đường triển khai sản xuất.',
    category: 'testing',
    relatedPatternCount: 1,
    installCommand: 'pip install pytest pytest-asyncio HTTPX',
    websiteUrl: 'https://docs.pytest.org/'
  },
  {
    name: 'Pydantic',
    slug: 'pydantic',
    description: 'Thư viện dữ liệu mạnh mẽ kiểm thử kiểu định nghĩa schema của tham số API dọn an toàn đầu vào backend.',
    whenToUse: 'Validate thông số JSON gửi lên từ client, parse config từ file .env sang Python types bảo mật.',
    category: 'fastapi',
    relatedPatternCount: 3,
    installCommand: 'pip install pydantic pydantic-settings',
    websiteUrl: 'https://docs.pydantic.dev/'
  },
  {
    name: 'Docker',
    slug: 'docker',
    description: 'Đóng gói mã ứng dụng python thành các container thống nhất chạy không sợ xung đột môi trường.',
    whenToUse: 'Đóng gói sản phẩm chuyển giao cho đội ngũ DevOps hoặc chạy đồng đều giữa máy làm việc cá nhân và server production.',
    category: 'deployment',
    relatedPatternCount: 2,
    installCommand: 'Môi trường Engine Docker Desktop',
    websiteUrl: 'https://www.docker.com/'
  }
];

export const SUGGESTED_SEARCH_CHIPS = [
  'FastAPI CRUD',
  'Login JWT',
  'Upload ảnh',
  'Chụp ảnh OCR',
  'Redis cache',
  'Celery worker',
  'Webhook payment',
  'RAG backend',
  'Docker deploy',
  'SQLAlchemy async'
];
