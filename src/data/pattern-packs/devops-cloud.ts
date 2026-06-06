import { Pattern } from '../../types';
import { pattern, checklist, errors } from '../patternUtils';

export const DEVOPS_CLOUD_PATTERNS: Pattern[] = [
  pattern({
    id: 'docker-compose-prod-like',
    title: 'Docker Compose Production-like Local Stack',
    vietnameseTitle: 'Docker Compose local giống production',
    shortDescription: 'Dựng Postgres, Redis, worker, API để dev/test gần production hơn.',
    category: 'devops-cloud',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["Docker Compose"],
    whyUse: ["Backend có DB/Redis/worker", "Muốn onboarding dev nhanh", "Cần test integration local"],
    whyNotUse: ["App static-only", "Dự án cực nhỏ không service ngoài"],
    installCommand: 'docker compose up',
    folderStructure: `docker-compose.yml`,
    codeTemplates: [
      { filename: 'docker-compose.yml', language: 'python', variant: 'production', description: 'Dựng Postgres, Redis, worker, API để dev/test gần production hơn.', code: `services:\n  api:\n    build: .\n    depends_on: [postgres, redis]\n  postgres:\n    image: postgres:16\n  redis:\n    image: redis:7` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["docker-deploy-fastapi"],
    searchKeywords: ["docker compose"]
  }),
  pattern({
    id: 'kubernetes-basics-fastapi',
    title: 'Kubernetes Basics for FastAPI',
    vietnameseTitle: 'Kubernetes basics cho FastAPI',
    shortDescription: 'Deployment, Service, ConfigMap, Secret và readiness/liveness probe tối thiểu.',
    category: 'devops-cloud',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Kubernetes"],
    whyUse: ["Cần deploy container lên cluster", "Cần rolling update/scale", "Team dùng Kubernetes"],
    whyNotUse: ["Deploy Vercel/static app", "Small app dùng Render/Fly/Cloud Run là đủ"],
    installCommand: 'kubectl apply -f k8s/',
    folderStructure: `k8s/deployment.yaml`,
    codeTemplates: [
      { filename: 'k8s/deployment.yaml', language: 'python', variant: 'production', description: 'Deployment, Service, ConfigMap, Secret và readiness/liveness probe tối thiểu.', code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend-api\nspec:\n  replicas: 2` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["docker-deploy-fastapi"],
    searchKeywords: ["kubernetes", "deployment"]
  }),
  pattern({
    id: 'cloud-run-fastapi-deploy',
    title: 'Cloud Run FastAPI Deploy',
    vietnameseTitle: 'Deploy FastAPI lên Cloud Run',
    shortDescription: 'Checklist container hóa FastAPI cho Google Cloud Run với env, port, health và concurrency.',
    category: 'devops-cloud',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["Cloud Run", "Docker"],
    whyUse: ["Muốn serverless container backend", "Traffic thay đổi thất thường", "Không muốn quản lý VM"],
    whyNotUse: ["App static frontend", "Cần long-lived websocket phức tạp"],
    installCommand: 'gcloud run deploy',
    folderStructure: `docs/deploy/cloud-run.md`,
    codeTemplates: [
      { filename: 'docs/deploy/cloud-run.md', language: 'python', variant: 'production', description: 'Checklist container hóa FastAPI cho Google Cloud Run với env, port, health và concurrency.', code: `Dockerfile uses PORT env. App exposes /health. Secrets use Secret Manager. Configure min/max instances.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["docker-deploy-fastapi"],
    searchKeywords: ["cloud run"]
  }),
  pattern({
    id: 'nginx-reverse-proxy',
    title: 'Nginx Reverse Proxy',
    vietnameseTitle: 'Nginx reverse proxy cho backend',
    shortDescription: 'Cấu hình proxy, timeout, upload size, headers và gzip/brotli cho API.',
    category: 'devops-cloud',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["Nginx"],
    whyUse: ["Deploy VM/VPS", "Cần TLS/reverse proxy", "Upload file/API timeout cần chỉnh"],
    whyNotUse: ["Deploy PaaS đã có proxy", "Static Vercel app"],
    installCommand: 'nginx -t',
    folderStructure: `nginx/backend.conf`,
    codeTemplates: [
      { filename: 'nginx/backend.conf', language: 'python', variant: 'production', description: 'Cấu hình proxy, timeout, upload size, headers và gzip/brotli cho API.', code: `location /api/ {\n  proxy_pass http://backend:8000;\n  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  client_max_body_size 20m;\n}` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["file-validation-security"],
    searchKeywords: ["nginx", "reverse proxy"]
  }),
  pattern({
    id: 'tls-ssl-checklist',
    title: 'TLS/SSL Checklist',
    vietnameseTitle: 'Checklist TLS/SSL',
    shortDescription: 'Checklist HTTPS, HSTS, secure cookies, redirect và certificate renewal.',
    category: 'devops-cloud',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["TLS", "Nginx"],
    whyUse: ["Deploy production domain", "Có auth/cookie/API traffic", "Cần tránh mixed content"],
    whyNotUse: ["Local only", "Vercel tự quản TLS nhưng vẫn cần kiểm tra"],
    installCommand: 'no install required',
    folderStructure: `docs/security/tls-checklist.md`,
    codeTemplates: [
      { filename: 'docs/security/tls-checklist.md', language: 'python', variant: 'production', description: 'Checklist HTTPS, HSTS, secure cookies, redirect và certificate renewal.', code: `# TLS Checklist\n\n- Force HTTPS\n- HSTS enabled\n- Secure cookies\n- Cert auto-renew\n- No mixed content\n- Check SSL Labs grade` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["security-headers-middleware"],
    searchKeywords: ["tls", "ssl", "https"]
  }),
  pattern({
    id: 'blue-green-deployment',
    title: 'Blue/Green Deployment',
    vietnameseTitle: 'Blue/green deployment',
    shortDescription: 'Triển khai phiên bản mới song song, chuyển traffic khi smoke test pass để giảm rủi ro.',
    category: 'devops-cloud',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Load Balancer", "Docker"],
    whyUse: ["Production critical", "Cần rollback nhanh", "Không muốn downtime deploy"],
    whyNotUse: ["Static Vercel preview đủ dùng", "App nhỏ ít user"],
    installCommand: 'no install required',
    folderStructure: `docs/deploy/blue-green.md`,
    codeTemplates: [
      { filename: 'docs/deploy/blue-green.md', language: 'python', variant: 'production', description: 'Triển khai phiên bản mới song song, chuyển traffic khi smoke test pass để giảm rủi ro.', code: `# Blue/Green\n\n1. Deploy green.\n2. Smoke test green.\n3. Switch traffic.\n4. Monitor.\n5. Keep blue for rollback window.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["rollback-strategy"],
    searchKeywords: ["blue green"]
  }),
  pattern({
    id: 'terraform-basics-backend',
    title: 'Terraform Basics for Backend',
    vietnameseTitle: 'Terraform basics cho backend',
    shortDescription: 'Quản lý database, bucket, secrets và service bằng Infrastructure as Code.',
    category: 'devops-cloud',
    difficulty: 'Advanced',
    productionLevel: 'Production-ready',
    libraries: ["Terraform"],
    whyUse: ["Cloud resources cần repeatable", "Muốn review infra changes", "Có nhiều env dev/staging/prod"],
    whyNotUse: ["Chỉ deploy Vercel static", "Không có cloud infra"],
    installCommand: 'terraform init && terraform plan',
    folderStructure: `infra/main.tf`,
    codeTemplates: [
      { filename: 'infra/main.tf', language: 'python', variant: 'production', description: 'Quản lý database, bucket, secrets và service bằng Infrastructure as Code.', code: `resource "aws_s3_bucket" "uploads" {\n  bucket = var.upload_bucket\n}` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["secure-file-storage-access"],
    searchKeywords: ["terraform", "iac"]
  }),
  pattern({
    id: 'log-aggregation-playbook',
    title: 'Log Aggregation Playbook',
    vietnameseTitle: 'Playbook gom log production',
    shortDescription: 'Chuẩn hóa JSON logs, correlation ID và gửi log tới provider để debug incident.',
    category: 'devops-cloud',
    difficulty: 'Medium',
    productionLevel: 'Production-ready',
    libraries: ["structlog", "OpenTelemetry"],
    whyUse: ["Nhiều service/worker", "Cần debug production", "Log local không đủ"],
    whyNotUse: ["App static không có server logs", "Prototype"],
    installCommand: 'pip install structlog',
    folderStructure: `docs/ops/log-aggregation.md`,
    codeTemplates: [
      { filename: 'docs/ops/log-aggregation.md', language: 'python', variant: 'production', description: 'Chuẩn hóa JSON logs, correlation ID và gửi log tới provider để debug incident.', code: `Use JSON logs with request_id, tenant_id, user_id hash, route, status, duration_ms. Never log tokens or PII.` }
    ],
    commonErrors: errors(['Thiếu test edge cases', 'Chưa đo performance/rollback impact', 'Cấu hình production chưa rõ']),
    productionChecklist: checklist(['Có test chính và test lỗi', 'Có logging/metrics cần thiết', 'Không hard-code secret', 'Có tài liệu vận hành hoặc rollback']),
    relatedPatterns: ["structured-json-logging"],
    searchKeywords: ["log aggregation"]
  })
];
