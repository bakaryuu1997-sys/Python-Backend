import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const CACHE_REDIS_PATTERNS: Pattern[] = [
  pattern({ id: 'redis-cache-aside', title: 'Redis Cache-Aside Pattern', vietnameseTitle: 'Cache-aside Redis', shortDescription: 'Pattern cache thủ công: đọc Redis trước, miss thì query DB và set TTL.', category: 'cache-redis', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['Redis', 'FastAPI'], whyUse: ['Endpoint đọc nhiều.', 'Dữ liệu ít đổi.', 'Muốn giảm tải database.'], whyNotUse: ['Dữ liệu thay đổi liên tục khó invalidation.', 'Response chứa dữ liệu user nhạy cảm chưa có cache key an toàn.'], installCommand: 'pip install redis', folderStructure: `app/services/cache_service.py`, codeTemplates: [{ filename: 'app/services/cache_service.py', language: 'python', description: 'Cache-aside helper.', code: `import json\nfrom redis import Redis\n\nredis = Redis.from_url("redis://localhost:6379/0", decode_responses=True)\n\ndef get_or_set_json(key: str, loader, ttl: int = 300):\n    cached = redis.get(key)\n    if cached:\n        return json.loads(cached)\n    value = loader()\n    redis.setex(key, ttl, json.dumps(value))\n    return value` }], relatedPatterns: ['rate-limit-login'] }),
  pattern({ id: 'rate-limit-login', title: 'Redis-backed API Rate Limiter', vietnameseTitle: 'Chống spam API/login bằng Redis', shortDescription: 'Giới hạn request theo IP/user để chống brute-force và spam endpoint.', category: 'cache-redis', difficulty: 'Medium', productionLevel: 'Production-ready', libraries: ['Redis', 'FastAPI'], whyUse: ['Login endpoint cần chống brute-force.', 'API public có nguy cơ spam.', 'Cần limit theo IP hoặc user.'], whyNotUse: ['API nội bộ không public.', 'Không có Redis hoặc gateway đã xử lý rate limit.'], installCommand: 'pip install redis', folderStructure: `app/core/rate_limit.py`, codeTemplates: [{ filename: 'app/core/rate_limit.py', language: 'python', description: 'Fixed-window rate limit.', code: `from fastapi import HTTPException\nfrom redis import Redis\n\nr = Redis.from_url("redis://localhost:6379/0", decode_responses=True)\n\ndef check_rate_limit(key: str, limit: int = 5, window: int = 60):\n    current = r.incr(key)\n    if current == 1:\n        r.expire(key, window)\n    if current > limit:\n        raise HTTPException(429, "Too many requests")` }], relatedPatterns: ['jwt-auth-api'] }),
  pattern({
    "id": "cache-stampede-lock",
    "title": "Cache Stampede Prevention",
    "vietnameseTitle": "Chống cache stampede",
    "shortDescription": "Dùng distributed lock/soft TTL để tránh nhiều request cùng rebuild cache khi key hết hạn.",
    "category": "cache-redis",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis"
    ],
    "whyUse": [
      "Endpoint đọc nhiều và rebuild cache tốn kém.",
      "Cache key hot hay expire cùng lúc.",
      "Muốn giảm tải DB khi traffic cao."
    ],
    "whyNotUse": [
      "Cache đơn giản ít traffic.",
      "Rebuild cache rất rẻ."
    ],
    "installCommand": "pip install redis",
    "folderStructure": "app/services/cache_stampede.py",
    "codeTemplates": [
      {
        "filename": "app/services/cache_stampede.py",
        "language": "python",
        "description": "Lock khi rebuild cache.",
        "code": "import time\n\ndef get_or_rebuild(redis, key: str, rebuild, ttl: int = 300):\n    cached = redis.get(key)\n    if cached:\n        return cached\n    lock_key = f\"lock:{key}\"\n    if redis.set(lock_key, \"1\", nx=True, ex=30):\n        try:\n            value = rebuild()\n            redis.setex(key, ttl, value)\n            return value\n        finally:\n            redis.delete(lock_key)\n    time.sleep(0.1)\n    return redis.get(key) or rebuild()",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_cache_stampede.py",
        "language": "python",
        "description": "Rebuild chỉ gọi khi cache miss.",
        "code": "def test_cache_rebuild_called_on_miss(fake_redis):\n    calls = []\n    get_or_rebuild(fake_redis, \"k\", lambda: calls.append(1) or \"v\")\n    assert calls == [1]",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "redis-cache-aside"
    ],
    "searchKeywords": [
      "cache stampede",
      "distributed lock",
      "hot key"
    ]
  }),
  pattern({
    "id": "distributed-lock-redis",
    "title": "Distributed Lock with Redis",
    "vietnameseTitle": "Distributed lock Redis",
    "shortDescription": "Khóa tác vụ chạy đồng thời như export, sync, webhook retry bằng Redis lock có TTL.",
    "category": "cache-redis",
    "difficulty": "Advanced",
    "productionLevel": "Production-ready",
    "libraries": [
      "Redis"
    ],
    "whyUse": [
      "Cần đảm bảo một job chỉ chạy một instance.",
      "Có nhiều worker replica.",
      "Task idempotency vẫn cần nhưng muốn giảm duplicate."
    ],
    "whyNotUse": [
      "Task pure/idempotent hoàn toàn và duplicate không tốn kém.",
      "Chỉ một process chạy local."
    ],
    "installCommand": "pip install redis",
    "folderStructure": "app/core/distributed_lock.py",
    "codeTemplates": [
      {
        "filename": "app/core/distributed_lock.py",
        "language": "python",
        "description": "Redis lock có token owner.",
        "code": "from uuid import uuid4\n\nclass RedisLock:\n    def __init__(self, redis, key: str, ttl: int = 60):\n        self.redis = redis\n        self.key = key\n        self.token = uuid4().hex\n        self.ttl = ttl\n\n    def acquire(self) -> bool:\n        return bool(self.redis.set(self.key, self.token, nx=True, ex=self.ttl))\n\n    def release(self) -> None:\n        if self.redis.get(self.key) == self.token.encode():\n            self.redis.delete(self.key)",
        "variant": "minimal"
      },
      {
        "filename": "tests/test_redis_lock.py",
        "language": "python",
        "description": "Chỉ một lock acquire thành công.",
        "code": "def test_only_one_lock_owner(fake_redis):\n    a = RedisLock(fake_redis, \"job:1\")\n    b = RedisLock(fake_redis, \"job:1\")\n    assert a.acquire() is True\n    assert b.acquire() is False",
        "variant": "test"
      }
    ],
    "relatedPatterns": [
      "cache-stampede-lock",
      "celery-worker-setup"
    ],
    "searchKeywords": [
      "redis lock",
      "distributed lock"
    ]
  })
];
