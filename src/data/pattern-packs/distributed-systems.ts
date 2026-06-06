import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DISTRIBUTED_SYSTEMS_PATTERNS: Pattern[] = [
  pattern({
      id: 'idempotent-consumer-pattern',
      title: 'Idempotent Consumer Pattern',
      vietnameseTitle: 'Consumer idempotent khi xử lý event',
      shortDescription: 'Thiết kế consumer để event xử lý nhiều lần vẫn cho kết quả đúng, đặc biệt với payment, webhook và queue retry.',
      category: 'distributed-systems',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['Redis', 'SQLAlchemy'],
      whyUse: ['Queue retry có thể chạy lại task.', 'Webhook provider gửi event nhiều lần.', 'Payment/order không được cộng tiền/trừ hàng trùng.'],
      whyNotUse: ['Task thuần read-only.', 'Xử lý trùng không gây hại.'],
      installCommand: 'pip install redis sqlalchemy',
      folderStructure: `app/services/idempotency.py`,
      codeTemplates: [
        { filename: 'app/services/idempotency.py', language: 'python', variant: 'production', description: 'Dùng idempotency key để chỉ xử lý một lần.', code: `def run_once(key: str, store, handler):\n    if store.exists(key):\n        return store.get_result(key)\n\n    result = handler()\n    store.save_result(key, result)\n    return result` },
        { filename: 'tests/test_idempotent_consumer.py', language: 'python', variant: 'test', description: 'Đảm bảo handler không chạy lần hai với cùng key.', code: `def test_run_once_calls_handler_once(fake_store):\n    calls = 0\n    def handler():\n        nonlocal calls\n        calls += 1\n        return {"ok": True}\n\n    run_once("event-1", fake_store, handler)\n    run_once("event-1", fake_store, handler)\n    assert calls == 1` }
      ],
      relatedPatterns: ['inbox-pattern', 'payment-webhook-handler'],
      searchKeywords: ['idempotent consumer', 'idempotency', 'duplicate event']
    }),
  pattern({
      id: 'saga-pattern-basics',
      title: 'Saga Pattern Basics',
      vietnameseTitle: 'Saga pattern cho workflow nhiều bước',
      shortDescription: 'Chia transaction phân tán thành nhiều bước có compensating action khi một bước thất bại.',
      category: 'distributed-systems',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['Celery', 'SQLAlchemy'],
      whyUse: ['Workflow order-payment-shipping nhiều bước.', 'Không thể dùng một DB transaction.', 'Cần rollback logic bằng compensating action.'],
      whyNotUse: ['Một database transaction là đủ.', 'Team chưa có observability/retry.'],
      installCommand: 'pip install celery sqlalchemy',
      folderStructure: `app/sagas/order_saga.py`,
      codeTemplates: [
        { filename: 'app/sagas/order_saga.py', language: 'python', variant: 'minimal', description: 'Saga orchestration đơn giản với compensate.', code: `class OrderSaga:\n    def run(self, order_id: int):\n        try:\n            reserve_inventory(order_id)\n            charge_payment(order_id)\n            create_shipment(order_id)\n        except PaymentFailed:\n            release_inventory(order_id)\n            mark_order_failed(order_id)\n            raise\n        except ShipmentFailed:\n            refund_payment(order_id)\n            release_inventory(order_id)\n            raise` }
      ],
      relatedPatterns: ['outbox-pattern', 'retry-backoff-policy'],
      searchKeywords: ['saga', 'compensating transaction', 'distributed transaction']
    }),
  pattern({
      id: 'retry-backoff-policy',
      title: 'Retry with Exponential Backoff',
      vietnameseTitle: 'Retry với exponential backoff',
      shortDescription: 'Retry external API hoặc queue task an toàn bằng backoff, jitter, max attempts và timeout.',
      category: 'distributed-systems',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['tenacity', 'httpx', 'Celery'],
      whyUse: ['External API lỗi tạm thời.', 'Webhook publish fail.', 'Task cần retry nhưng không spam provider.'],
      whyNotUse: ['Lỗi validation không thể tự hồi phục.', 'Không có timeout/idempotency.'],
      installCommand: 'pip install tenacity httpx',
      folderStructure: `app/clients/payment_client.py`,
      codeTemplates: [
        { filename: 'app/clients/payment_client.py', language: 'python', variant: 'production', description: 'HTTP client retry có backoff và timeout.', code: `import httpx\nfrom tenacity import retry, stop_after_attempt, wait_exponential_jitter\n\n@retry(stop=stop_after_attempt(3), wait=wait_exponential_jitter(initial=1, max=8))\ndef call_payment_api(payload: dict) -> dict:\n    with httpx.Client(timeout=5) as client:\n        res = client.post("https://payment.example/api", json=payload)\n        res.raise_for_status()\n        return res.json()` }
      ],
      relatedPatterns: ['circuit-breaker-pattern', 'idempotent-consumer-pattern'],
      searchKeywords: ['retry', 'backoff', 'jitter', 'tenacity']
    }),
  pattern({
      id: 'timeout-strategy',
      title: 'Timeout Strategy for External APIs',
      vietnameseTitle: 'Chiến lược timeout khi gọi API ngoài',
      shortDescription: 'Luôn đặt connect/read/write timeout để request không treo worker và làm nghẽn toàn hệ thống.',
      category: 'distributed-systems',
      difficulty: 'Medium',
      productionLevel: 'Production-ready',
      libraries: ['httpx', 'FastAPI'],
      whyUse: ['Gọi payment/OCR/LLM/vector DB bên ngoài.', 'Worker bị treo do API chậm.', 'Cần fail fast và retry có kiểm soát.'],
      whyNotUse: ['Không gọi external API.', 'Task batch có timeout riêng cấp worker.'],
      installCommand: 'pip install httpx',
      folderStructure: `app/clients/http.py`,
      codeTemplates: [
        { filename: 'app/clients/http.py', language: 'python', variant: 'minimal', description: 'HTTPX client có timeout rõ ràng.', code: `import httpx\n\ntimeout = httpx.Timeout(connect=2.0, read=5.0, write=5.0, pool=2.0)\nclient = httpx.Client(timeout=timeout)\n\ndef get_json(url: str) -> dict:\n    response = client.get(url)\n    response.raise_for_status()\n    return response.json()` }
      ],
      relatedPatterns: ['retry-backoff-policy', 'circuit-breaker-pattern'],
      searchKeywords: ['timeout', 'external api', 'httpx timeout']
    }),
  pattern({
      id: 'circuit-breaker-pattern',
      title: 'Circuit Breaker Pattern',
      vietnameseTitle: 'Circuit breaker khi service ngoài lỗi liên tục',
      shortDescription: 'Tạm ngừng gọi provider đang lỗi để bảo vệ hệ thống và trả fallback nhanh hơn.',
      category: 'distributed-systems',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['Redis', 'httpx'],
      whyUse: ['Provider ngoài lỗi liên tục.', 'Retry làm hệ thống chậm thêm.', 'Cần fallback hoặc degrade gracefully.'],
      whyNotUse: ['Chưa có monitoring/fallback.', 'External call không quan trọng hoặc rất hiếm.'],
      installCommand: 'pip install redis httpx',
      folderStructure: `app/resilience/circuit_breaker.py`,
      codeTemplates: [
        { filename: 'app/resilience/circuit_breaker.py', language: 'python', variant: 'minimal', description: 'Circuit breaker đơn giản dùng counter lỗi.', code: `class CircuitOpenError(RuntimeError):\n    pass\n\nclass CircuitBreaker:\n    def __init__(self, failure_threshold: int = 5):\n        self.failures = 0\n        self.failure_threshold = failure_threshold\n\n    def call(self, fn):\n        if self.failures >= self.failure_threshold:\n            raise CircuitOpenError("Circuit is open")\n        try:\n            result = fn()\n            self.failures = 0\n            return result\n        except Exception:\n            self.failures += 1\n            raise` }
      ],
      relatedPatterns: ['timeout-strategy', 'retry-backoff-policy'],
      searchKeywords: ['circuit breaker', 'resilience', 'fallback']
    }),
  pattern({
      id: 'bulkhead-pattern',
      title: 'Bulkhead Pattern for Workers',
      vietnameseTitle: 'Bulkhead pattern để cô lập tài nguyên',
      shortDescription: 'Tách pool worker/queue/connection cho tác vụ nặng để một nhóm lỗi không kéo sập toàn bộ app.',
      category: 'distributed-systems',
      difficulty: 'Advanced',
      productionLevel: 'Advanced',
      libraries: ['Celery', 'Redis'],
      whyUse: ['OCR/export nặng làm chậm email/webhook.', 'Cần tách queue theo workload.', 'Cần scale worker độc lập.'],
      whyNotUse: ['Chỉ có vài task nhỏ.', 'Không vận hành nhiều worker.'],
      installCommand: 'pip install celery redis',
      folderStructure: `app/tasks/ocr.py\napp/tasks/email.py\nceleryconfig.py`,
      codeTemplates: [
        { filename: 'celeryconfig.py', language: 'python', variant: 'production', description: 'Route task vào queue riêng.', code: `task_routes = {\n    "tasks.ocr.*": {"queue": "ocr"},\n    "tasks.email.*": {"queue": "email"},\n    "tasks.webhook.*": {"queue": "webhook"},\n}\n\nworker_prefetch_multiplier = 1\ntask_acks_late = True` }
      ],
      relatedPatterns: ['celery-worker-setup', 'pdf-ocr-api'],
      searchKeywords: ['bulkhead', 'queue isolation', 'worker pool']
    })
];
