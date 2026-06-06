import { Pattern } from '../../types';
import { pattern } from '../patternUtils';

export const CONCURRENCY_ML_STREAMING_PATTERNS: Pattern[] = [
  pattern({
    id: 'litestar-async-api',
    title: 'Litestar Async Web API',
    vietnameseTitle: 'API bất đồng bộ với Litestar',
    shortDescription: 'Xây dựng API bất đồng bộ hiệu năng cao sử dụng Litestar, thay thế FastAPI với cấu trúc Dependency Injection tối ưu và DTO validation.',
    category: 'api-basics',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['Litestar', 'Pydantic', 'SQLAlchemy'],
    whyUse: [
      'Cần hiệu năng xử lý HTTP routing và validation nhanh hơn FastAPI nhờ cơ chế DTO.',
      'Muốn sử dụng Dependency Injection cấu hình chặt chẽ hơn ở mức controller/app.'
    ],
    whyNotUse: [
      'Đội ngũ phát triển đã quen thuộc với FastAPI và thư viện bên thứ ba chỉ hỗ trợ FastAPI.',
      'Dự án đơn giản không cần quản lý cấu trúc code phức tạp.'
    ],
    installCommand: 'pip install litestar pydantic sqlalchemy uvicorn',
    folderStructure: `app/
├── controllers/
│   └── user_controller.py
├── schemas/
│   └── user_schema.py
└── main.py`,
    codeTemplates: [
      {
        filename: 'app/controllers/user_controller.py',
        language: 'python',
        description: 'Litestar Controller với Dependency Injection và validation qua DTO.',
        code: `from litestar import Controller, get, post
from litestar.di import Provide
from app.schemas.user_schema import UserCreateDTO, UserReadDTO
from app.services.user_service import UserService

class UserController(Controller):
    path = "/users"
    dependencies = {"service": Provide(UserService)}

    @post(dto=UserCreateDTO, return_dto=UserReadDTO)
    async def create_user(self, data: dict, service: UserService) -> dict:
        return await service.create(data)

    @get("/{user_id:int}", return_dto=UserReadDTO)
    async def get_user(self, user_id: int, service: UserService) -> dict:
        return await service.get_by_id(user_id)`
      }
    ],
    relatedPatterns: ['fastapi-crud-api']
  }),
  
  pattern({
    id: 'kafka-stream-processing-faust',
    title: 'Kafka & Faust Stream Processing',
    vietnameseTitle: 'Xử lý luồng sự kiện Kafka bằng Faust',
    shortDescription: 'Xử lý stream dữ liệu hướng sự kiện thời gian thực quy mô lớn bằng Faust và Apache Kafka.',
    category: 'distributed-systems',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['Faust-streaming', 'Kafka-python', 'Redis'],
    whyUse: [
      'Cần xử lý luồng sự kiện liên tục với throughput siêu lớn từ Kafka.',
      'Muốn tích hợp mô hình State Store thời gian thực trong Python.'
    ],
    whyNotUse: [
      'Hạ tầng không sử dụng Kafka làm event broker.',
      'Chỉ cần xử lý hàng đợi tác vụ thông thường (hãy dùng Celery).'
    ],
    installCommand: 'pip install faust-streaming redis',
    folderStructure: `app/
├── worker.py
└── schemas.py`,
    codeTemplates: [
      {
        filename: 'app/worker.py',
        language: 'python',
        description: 'Faust Agent đọc stream sự kiện từ Kafka và xử lý lưu trạng thái vào Faust Table.',
        code: `import faust

app = faust.App('event-processor', broker='kafka://localhost:9092')

class OrderEvent(faust.Record):
    order_id: str
    amount: float
    status: str

orders_topic = app.topic('orders', value_type=OrderEvent)
order_summary = app.Table('order_summary', default=float)

@app.agent(orders_topic)
async def process_orders(orders):
    async for order in orders:
        if order.status == 'completed':
            order_summary[order.order_id] += order.amount
            print(f"Updated order {order.order_id}: Total accumulated = {order_summary[order.order_id]}")`
      }
    ],
    relatedPatterns: ['celery-worker-setup']
  }),

  pattern({
    id: 'terraform-python-serverless',
    title: 'FastAPI Serverless IaC (Terraform)',
    vietnameseTitle: 'Triển khai FastAPI Serverless bằng Terraform',
    shortDescription: 'Mẫu hạ tầng đám mây dạng mã (IaC) để đóng gói và triển khai ứng dụng FastAPI chạy serverless trên AWS Lambda qua API Gateway.',
    category: 'devops-cloud',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['Terraform', 'Mangum', 'AWS Lambda'],
    whyUse: [
      'Muốn triển khai FastAPI lên AWS Lambda để tối ưu chi phí hạ tầng (pay-per-request).',
      'Cần tự động hóa cấu hình IAM, API Gateway và Lambda bằng Terraform.'
    ],
    whyNotUse: [
      'Ứng dụng có lượng request đều đặn liên tục (dùng ECS/EC2 sẽ rẻ hơn).',
      'Ứng dụng có tác vụ xử lý kéo dài hơn 15 phút (giới hạn của Lambda).'
    ],
    installCommand: 'pip install mangum fastapi',
    folderStructure: `iac/
├── main.tf
├── variables.tf
└── outputs.tf
app/
└── handler.py`,
    codeTemplates: [
      {
        filename: 'iac/main.tf',
        language: 'terraform',
        description: 'Cấu hình Terraform cho AWS Lambda và API Gateway proxy để chuyển tiếp request đến FastAPI.',
        code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_iam_role" "lambda_role" {
  name = "fastapi-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_lambda_function" "fastapi_app" {
  filename      = "app.zip"
  function_name = "fastapi-serverless"
  role          = aws_iam_role.lambda_role.arn
  handler       = "app.handler.handler"
  runtime       = "python3.11"
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "fastapi-http-api"
  protocol_type = "HTTP"
  target        = aws_lambda_function.fastapi_app.arn
}`
      },
      {
        filename: 'app/handler.py',
        language: 'python',
        description: 'Mangum adapter bọc FastAPI ứng dụng để tương thích với API Gateway/Lambda.',
        code: `from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from Serverless FastAPI!"}

handler = Mangum(app)`
      }
    ],
    relatedPatterns: ['docker-deploy-fastapi']
  }),

  pattern({
    id: 'fastapi-model-serving-bentoml',
    title: 'Model Serving with BentoML & FastAPI',
    vietnameseTitle: 'Phục vụ AI model bằng BentoML & FastAPI',
    shortDescription: 'Tích hợp BentoML Service vào FastAPI để phục vụ mô hình Machine Learning, tối ưu hóa phần cứng bằng batching tự động.',
    category: 'ai-rag',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['BentoML', 'FastAPI', 'PyTorch'],
    whyUse: [
      'Cần phục vụ (serving) AI model hiệu năng cao, tự động gom nhóm request (adaptive batching).',
      'Muốn đóng gói mô hình thành một container chạy độc lập dễ mở rộng.'
    ],
    whyNotUse: [
      'Chỉ cần tích hợp API của OpenAI/Gemini (hãy gọi trực tiếp API).',
      'Ứng dụng không sử dụng mô hình học máy tự host.'
    ],
    installCommand: 'pip install bentoml fastapi',
    folderStructure: `app/
├── service.py
└── main.py`,
    codeTemplates: [
      {
        filename: 'app/service.py',
        language: 'python',
        description: 'BentoML Service bọc mô hình học máy với tính năng adaptive batching.',
        code: `import bentoml
from PIL import Image
import numpy as np

# Giả sử ta có một model runner đã được lưu trong bentoml store
classifier_runner = bentoml.models.get("image_classifier:latest").to_runner()

svc = bentoml.Service("image_classifier_service", runners=[classifier_runner])

@svc.api(input=bentoml.io.Image(), output=bentoml.io.JSON())
async def classify(image: Image.Image) -> dict:
    img_arr = np.array(image) / 255.0
    result = await classifier_runner.predict.async_run(img_arr)
    return {"class": result[0], "score": float(result[1])}`
      },
      {
        filename: 'app/main.py',
        language: 'python',
        description: 'FastAPI đóng vai trò Gateway giao tiếp với BentoML Service.',
        code: `from fastapi import FastAPI, UploadFile, File
import httpx

app = FastAPI()
BENTO_SERVICE_URL = "http://localhost:3000/classify"

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    async with httpx.AsyncClient() as client:
        files = {"file": (file.filename, await file.read(), file.content_type)}
        response = await client.post(BENTO_SERVICE_URL, files=files)
    return response.json()`
      }
    ],
    relatedPatterns: ['image-ocr-api']
  }),

  pattern({
    id: 'asyncio-lowlevel-concurrency',
    title: 'Low-Level Asyncio Concurrency & Executors',
    vietnameseTitle: 'Điều phối Executor và Concurrency trong Asyncio',
    shortDescription: 'Tối ưu hóa các tác vụ tính toán nặng (CPU-bound) trong web server async bằng cách sử dụng Custom ProcessPoolExecutor và ThreadPoolExecutor.',
    category: 'fastapi-internals',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ['FastAPI', 'asyncio', 'concurrent.futures'],
    whyUse: [
      'Cần chạy các tác vụ nặng (như tính toán ma trận, xử lý ảnh lớn, hash dữ liệu) mà không làm nghẽn event loop async chính.',
      'Muốn điều phối giới hạn tài nguyên CPU sử dụng ProcessPoolExecutor.'
    ],
    whyNotUse: [
      'Các tác vụ hoàn toàn là I-O bound (chỉ cần async/await thông thường).',
      'Đã đưa các tác vụ nặng này vào Celery worker xử lý ngoại tuyến.'
    ],
    installCommand: 'pip install fastapi',
    folderStructure: `app/
├── executors.py
└── main.py`,
    codeTemplates: [
      {
        filename: 'app/executors.py',
        language: 'python',
        description: 'Khởi tạo và quản lý process/thread executors toàn cục để chạy tác vụ CPU-bound.',
        code: `from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import multiprocessing

# Sử dụng tối đa số lượng CPU core hiện có cho các tác vụ nặng
cpu_count = multiprocessing.cpu_count()
process_executor = ProcessPoolExecutor(max_workers=max(1, cpu_count - 1))
thread_executor = ThreadPoolExecutor(max_workers=20)

def cpu_heavy_computation(data: int) -> int:
    # Giả lập tính toán CPU nặng
    result = 0
    for i in range(10000000):
        result += i * data
    return result`
      },
      {
        filename: 'app/main.py',
        language: 'python',
        description: 'FastAPI route sử dụng loop.run_in_executor để chạy hàm đồng bộ trên Pool riêng biệt.',
        code: `import asyncio
from fastapi import FastAPI, Depends
from app.executors import process_executor, cpu_heavy_computation

app = FastAPI()

@app.post("/compute")
async def run_computation(input_val: int):
    loop = asyncio.get_running_loop()
    # Chạy hàm cpu_heavy_computation trong ProcessPoolExecutor để không block event loop
    result = await loop.run_in_executor(process_executor, cpu_heavy_computation, input_val)
    return {"result": result}`
      }
    ],
    relatedPatterns: ['fastapi-lifespan-resources']
  })
];
