export const projects = [
  {
    id: 'invosure',
    name: 'InvoSure',
    tagline: 'AI-powered invoice verification system',
    description:
      'Built an AI-powered invoice verification system using Groq LLM for vendor and GST entity extraction, automated GST verification via Playwright and 2Captcha, with a Dockerized FastAPI backend and React frontend.',
    stack: ['Python', 'FastAPI', 'Groq LLM', 'OCR', 'Playwright', 'Redis', 'MongoDB', 'React'],
    status: 'Personal Project',
    statusColor: 'teal' as const,
    category: 'AI Pipeline',
    github: 'https://github.com/SahilSohani27/Invosure-Smart-GST-Invoice-verifier',
    researchPaper: 'https://drive.google.com/file/d/1Q-z6Wz1XEkZsfQT6mxIc2uf60Udm0lij/view?usp=sharing',
  },
  {
    id: 'pi-eva',
    name: 'PI-EVA — MA-RAG',
    tagline: 'Uncertainty-aware multi-agent RAG pipeline',
    description:
      'Production-style Multi-Agent RAG pipeline on HotpotQA using FAISS vector retrieval, Groq LLM orchestration, and Paraphrase-Induced Epistemic Variance (PI-EVA) for uncertainty quantification. EM: 44.0 | F1: 54.29.',
    stack: ['Python', 'FAISS', 'Sentence-Transformers', 'Groq', 'HotpotQA'],
    status: 'Research',
    statusColor: 'teal' as const,
    category: 'AI Agent / RAG',
    github: 'https://github.com/SahilSohani27/PI-EVA-MA-RAG',
    researchPaper: 'https://drive.google.com/file/d/1aW3qRVE1Naz7InGCSXwV0IHbVYFyDLqi/view?usp=sharing',
  },
  {
    id: 'resq-vision',
    name: 'ResQ Vision',
    tagline: 'Real-time CCTV accident detection system',
    description:
      'Real-time CCTV accident detection using YOLOv8. FastAPI backend, Streamlit dashboard, accident evidence clip generation, SOS alerts via Telegram, and GPT-4o Mini for contextual descriptions. Deployed on LeapSwitch via Cloudflare Tunnel.',
    stack: ['YOLOv8', 'FastAPI', 'React', 'OpenCV', 'Docker', 'Cloudflare Tunnel'],
    status: 'Personal Project',
    statusColor: 'amber' as const,
    category: 'Computer Vision',
    github: 'https://github.com/SahilSohani27/accident-detection-ai',
    researchPaper: null,
  },
  {
    id: 'sentiment-analyzer',
    name: 'Feedback Sentiment Analyzer',
    tagline: 'Offline NLP feedback classification for DRDO ERP',
    description:
      'Fully offline real-time sentiment analysis system using DistilBERT. Classifies feedback into complaints, queries, suggestions, and appreciation. Integrated into DRDO internal ERP portal, reducing manual processing by over 70%.',
    stack: ['Python', 'DistilBERT', 'FastAPI', 'Streamlit', 'OracleDB', 'Docker'],
    status: 'Deployed',
    statusColor: 'teal' as const,
    category: 'NLP',
    github: 'https://github.com/SahilSohani27/feedback_sentiment_analysis',
    researchPaper: null,
  },
]

export const projectDetails: Record<string, ProjectDetail> = {
  invosure: {
    id: 'invosure',
    name: 'InvoSure',
    tagline: 'AI-powered invoice verification system',
    category: 'AI Pipeline',
    status: 'Personal Project',
    statusColor: 'teal',
    github: 'https://github.com/SahilSohani27/Invosure-Smart-GST-Invoice-verifier',
    researchPaper: 'https://drive.google.com/file/d/1Q-z6Wz1XEkZsfQT6mxIc2uf60Udm0lij/view?usp=sharing',
    problem:
      'GST invoice verification is a manual, repetitive, and error-prone process. Businesses receive hundreds of invoices with varying vendor formats and must cross-check GST registrations against the government portal. Doing this by hand is slow and inconsistent. The goal: build a system that automatically extracts vendor and GST entities from invoices using an LLM, then verifies those entities against the GST portal without human intervention.',
    architecture: [
      { label: 'Invoice Upload', tag: 'Entry', detail: 'User uploads invoice document via React frontend. Accepts PDF and image formats.' },
      { label: 'FastAPI Backend', tag: 'API Layer', detail: 'Dockerized FastAPI server handles file ingestion, routes to processing pipeline, and returns structured results.' },
      { label: 'OCR Extraction', tag: 'Processing', detail: 'OCR pipeline extracts raw text from uploaded invoice documents before LLM processing.' },
      { label: 'Groq LLM', tag: 'Entity Extraction', detail: 'Groq LLM extracts vendor name, GST number, invoice number, date, and line items from raw OCR text.' },
      { label: 'Playwright + 2Captcha', tag: 'GST Verification', detail: 'Automated browser workflow navigates the GST portal, solves captchas via 2Captcha API, and verifies extracted GST entities.' },
      { label: 'Redis + MongoDB', tag: 'Storage', detail: 'Redis for session and task caching. MongoDB for storing verification results and invoice metadata.' },
    ],
    requestFlow: [
      'User uploads invoice via React frontend',
      'FastAPI receives file, queues processing task',
      'OCR pipeline extracts raw text from invoice',
      'Groq LLM parses extracted text to structured entities (vendor, GST number, amounts)',
      'Playwright automation opens GST portal and submits extracted GST number',
      '2Captcha solves captcha challenge automatically',
      'Portal response parsed — verification result (valid/invalid/not-found) stored',
      'Result returned to frontend with entity breakdown and verification status',
    ],
    stack: [
      { name: 'Groq LLM', role: 'Entity extraction from OCR text', why: 'Fast inference, handles variable invoice formats without custom training' },
      { name: 'OCR', role: 'Text extraction from invoice documents', why: 'Converts PDF/image invoices to raw text for LLM processing' },
      { name: 'Playwright', role: 'Automated GST portal verification', why: 'Handles dynamic web UI; supports headless browser automation' },
      { name: 'FastAPI', role: 'Backend API and orchestration', why: 'Async, lightweight, Dockerized cleanly for deployment' },
      { name: 'Redis', role: 'Session and task caching', why: 'Fast ephemeral storage for task state and session data' },
      { name: 'MongoDB', role: 'Result persistence', why: 'Flexible document model for variable invoice schemas' },
      { name: 'React', role: 'Frontend interface', why: 'Responsive UI for upload, status tracking, and result display' },
    ],
  },

  'pi-eva': {
    id: 'pi-eva',
    name: 'PI-EVA — MA-RAG',
    tagline: 'Uncertainty-aware multi-agent RAG pipeline',
    category: 'AI Agent / RAG',
    status: 'Research',
    statusColor: 'teal',
    github: 'https://github.com/SahilSohani27/PI-EVA-MA-RAG',
    researchPaper: 'https://drive.google.com/file/d/1aW3qRVE1Naz7InGCSXwV0IHbVYFyDLqi/view?usp=sharing',
    problem:
      'Standard RAG systems retrieve context and generate answers, but they provide no signal about how confident the system actually is. Hallucination is especially dangerous in multi-hop reasoning tasks where multiple evidence steps are chained together. The goal: build a Multi-Agent RAG pipeline that quantifies uncertainty through paraphrase variance (PI-EVA), so the system can distinguish reliable answers from speculative ones — and communicate that distinction explicitly.',
    architecture: [
      { label: 'HotpotQA Dataset', tag: 'Data', detail: '200 sampled queries from HotpotQA dev-distractor split. 2,000 embedded supporting documents indexed in FAISS.' },
      { label: 'Sentence Transformers', tag: 'Embedding', detail: 'Dense embeddings generated for all documents and queries using sentence-transformers for semantic similarity search.' },
      { label: 'FAISS Vector Index', tag: 'Retrieval', detail: 'Approximate nearest-neighbor search over 2,000 embedded documents. Top-k chunks retrieved per query.' },
      { label: 'Groq LLM', tag: 'Generation', detail: 'Retrieved context passed to Groq LLM for answer generation. Multiple paraphrases of each query generated to measure variance.' },
      { label: 'PI-EVA Module', tag: 'Uncertainty', detail: 'Paraphrase-Induced Epistemic Variance Analysis — computes variance across LLM outputs for paraphrased versions of the same query to quantify uncertainty.' },
      { label: 'Evidence Verification', tag: 'Grounding', detail: 'Grounded answer generation with citation to source documents. Enables verification of reasoning chains.' },
    ],
    requestFlow: [
      'Query sampled from HotpotQA dev-distractor split',
      'Query embedded via sentence-transformers',
      'FAISS retrieves top-k semantically similar documents',
      'Retrieved context passed to Groq LLM for initial answer generation',
      'Query paraphrased N times; LLM regenerates answers for each paraphrase',
      'PI-EVA module computes variance across paraphrased outputs',
      'High-variance answers flagged as uncertain; low-variance treated as reliable',
      'Final answer returned with confidence signal and source citations',
    ],
    stack: [
      { name: 'FAISS', role: 'Vector index for dense retrieval', why: 'Efficient approximate nearest-neighbor search for 2,000+ document embeddings' },
      { name: 'Sentence-Transformers', role: 'Query and document embedding', why: 'High-quality dense embeddings for semantic similarity matching' },
      { name: 'Groq', role: 'LLM inference', why: 'Fast inference for multi-turn generation and paraphrase experiments' },
      { name: 'HotpotQA', role: 'Multi-hop QA benchmark dataset', why: 'Standard benchmark for multi-hop reasoning evaluation; provides dev-distractor split' },
      { name: 'Python', role: 'Pipeline orchestration', why: 'Core language for the full pipeline implementation and experiment scripts' },
    ],
  },

  'resq-vision': {
    id: 'resq-vision',
    name: 'ResQ Vision',
    tagline: 'Real-time CCTV accident detection system',
    category: 'Computer Vision',
    status: 'Personal Project',
    statusColor: 'amber',
    github: 'https://github.com/SahilSohani27/accident-detection-ai',
    researchPaper: null,
    problem:
      'Accidents go undetected on CCTV footage for minutes because human operators cannot monitor every feed simultaneously. By the time an operator notices and triggers emergency services, critical response time has been lost. The goal: build a system that automatically detects accidents in CCTV footage in real time, generates evidence clips, and sends SOS alerts with contextual descriptions — eliminating the need for manual monitoring.',
    architecture: [
      { label: 'CCTV Feed Input', tag: 'Source', detail: 'Live or recorded video stream ingested by the detection pipeline.' },
      { label: 'YOLOv8 Detector', tag: 'Detection', detail: 'Real-time accident detection on video frames. Custom-trained for accident scenario classification.' },
      { label: 'Evidence Clip Generator', tag: 'Processing', detail: 'On detection event, captures and stores a clip of the incident for evidence and review.' },
      { label: 'GPT-4o Mini', tag: 'Description', detail: 'Generates contextual accident description from the evidence clip for inclusion in the SOS alert.' },
      { label: 'FastAPI Backend', tag: 'API', detail: 'Orchestrates detection pipeline, clip storage, description generation, and alert dispatch.' },
      { label: 'Telegram SOS Alert', tag: 'Output', detail: 'Alert with clip and description sent via Telegram Bot API to configured emergency contacts.' },
    ],
    requestFlow: [
      'CCTV stream fed to YOLOv8 detection pipeline',
      'YOLOv8 processes frames for accident event detection',
      'Accident event triggers evidence clip capture around the timestamp',
      'Clip passed to GPT-4o Mini for contextual description generation',
      'FastAPI backend dispatches SOS alert via Telegram Bot API',
      'Alert includes evidence clip link and generated description',
      'Streamlit dashboard displays live detection status and alert history',
    ],
    stack: [
      { name: 'YOLOv8', role: 'Real-time accident detection', why: 'State-of-the-art object detection with strong speed/accuracy tradeoff for live video' },
      { name: 'FastAPI', role: 'Backend orchestration', why: 'Async server for handling detection events, clip storage, and alert dispatch' },
      { name: 'GPT-4o Mini', role: 'Accident description generation', why: 'Generates readable contextual description of detected incidents for SOS alerts' },
      { name: 'OpenCV', role: 'Video frame processing and clip capture', why: 'Frame-level video manipulation for clip extraction around detected events' },
      { name: 'React + Streamlit', role: 'Frontend and dashboard', why: 'React for main UI; Streamlit for live detection monitoring dashboard' },
      { name: 'Cloudflare Tunnel + ngrok', role: 'Production deployment', why: 'Exposed backend securely over public internet without static IP via LeapSwitch VMs' },
    ],
  },

  'sentiment-analyzer': {
    id: 'sentiment-analyzer',
    name: 'Feedback Sentiment Analyzer',
    tagline: 'Offline NLP feedback classification for DRDO ERP',
    category: 'NLP',
    status: 'Deployed',
    statusColor: 'teal',
    github: 'https://github.com/SahilSohani27/feedback_sentiment_analysis',
    researchPaper: null,
    problem:
      'DRDO\'s internal ERP portal collected textual feedback from employees and visitors that required manual categorization — a slow, inconsistent, and unscalable process. The goal: build a fully offline sentiment analysis system that automatically classifies feedback into meaningful categories, integrates directly into the ERP portal, and eliminates manual category selection and star ratings entirely.',
    architecture: [
      { label: 'ERP Feedback Input', tag: 'Entry', detail: 'Feedback submitted via DRDO internal ERP portal. Text input captured and sent to analysis backend.' },
      { label: 'FastAPI Backend', tag: 'API Layer', detail: 'Receives feedback text, passes to DistilBERT classifier, returns structured classification result.' },
      { label: 'DistilBERT Classifier', tag: 'Model', detail: 'Fine-tuned DistilBERT model classifies feedback into: complaints, queries, suggestions, appreciation.' },
      { label: 'OracleDB', tag: 'Storage', detail: 'Classified feedback stored in DRDO\'s OracleDB instance with category label, timestamp, and confidence score.' },
      { label: 'Streamlit Dashboard', tag: 'Output', detail: 'Internal dashboard for reviewing classified feedback, category distributions, and flagged items.' },
    ],
    requestFlow: [
      'User submits feedback text via DRDO ERP portal',
      'FastAPI backend receives text payload',
      'DistilBERT model runs inference — classifies into complaint, query, suggestion, or appreciation',
      'Classification result and confidence score returned to ERP portal',
      'Result stored in OracleDB with metadata',
      'Streamlit dashboard reflects updated category counts in real time',
    ],
    stack: [
      { name: 'DistilBERT', role: 'Sentiment and category classification', why: 'Lightweight transformer that runs fully offline — required for DRDO\'s air-gapped environment' },
      { name: 'FastAPI', role: 'Backend API', why: 'Fast, async API for handling inference requests from ERP portal integration' },
      { name: 'OracleDB', role: 'Persistent storage', why: 'DRDO internal infrastructure requirement — all data stored in existing OracleDB instance' },
      { name: 'Streamlit', role: 'Internal analytics dashboard', why: 'Rapid dashboard development for internal stakeholder review of classified feedback' },
      { name: 'Docker', role: 'Containerized deployment', why: 'Reproducible deployment on DRDO internal servers' },
    ],
  },
}

export type ProjectDetail = {
  id: string
  name: string
  tagline: string
  category: string
  status: string
  statusColor: 'teal' | 'amber'
  github: string
  researchPaper: string | null
  problem: string
  architecture: { label: string; tag: string; detail: string }[]
  requestFlow: string[]
  stack: { name: string; role: string; why: string }[]
}

export const experience = [
  {
    id: 'advarisk',
    role: 'Backend Development Intern',
    company: 'AdvaRisk, Baner, Pune',
    period: 'March 2025 – June 2025',
    mission:
      'Built and maintained RESTful APIs, async task pipelines, and scraper orchestration systems for a financial risk intelligence platform.',
    technologies: ['FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'MongoDB', 'MySQL', 'ClickHouse', 'SQLite', 'SQLAlchemy', 'Web Scraping', 'Jira'],
    impact: [
      'Developed and maintained RESTful APIs using FastAPI and SQLAlchemy for scalable web scraping and data ingestion pipelines.',
      'Automated VMN services and scraper orchestration, improving data reliability while reducing manual intervention.',
      'Implemented asynchronous task queues using Celery, RabbitMQ, and Redis to improve scraping throughput and backend performance.',
      'Worked on cloud deployment and virtual machines using LeapSwitch.',
      'Provided production support in an Agile environment using Jira.',
    ],
  },
  {
    id: 'drdo',
    role: 'Research & Development Intern',
    company: 'DRDO – Defence Research & Development Organisation, Dighi, Pune',
    period: 'September 2024 – December 2024',
    mission:
      'Developed a fully offline real-time feedback sentiment analysis system integrated into DRDO\'s internal ERP portal.',
    technologies: ['Python', 'DistilBERT', 'NLP', 'FastAPI', 'Streamlit', 'OracleDB', 'Docker'],
    impact: [
      'Built a fully offline real-time feedback sentiment analysis system using DistilBERT.',
      'Classified textual feedback into complaints, queries, suggestions, and appreciation.',
      'Integrated the solution into DRDO\'s internal ERP portal.',
      'Eliminated manual category selection and star ratings, reducing processing time by over 70%.',
      'Developed a scalable FastAPI backend with OracleDB and a Streamlit frontend.',
    ],
  },
]

export const research = [
  {
    id: 'pi-eva-paper',
    title: 'Uncertainty Aware Multi-Agent RAG Using Paraphrase-Induced Epistemic Variance Analysis',
    conference: 'IEEE',
    year: '2026',
    venue: 'IEEE International Conference on Intelligent and Sustainable Electronics & Computing Technologies',
    summary:
      'Designed an uncertainty-aware Multi-Agent RAG framework that quantifies epistemic uncertainty using paraphrase variance. Improves response reliability through confidence-aware reasoning on multi-hop QA benchmarks.',
    contribution:
      'Introduced Paraphrase-Induced Epistemic Variance (PI-EVA) as a method to detect hallucination risk in RAG outputs. Achieved Exact Match of 44.0 and F1 of 54.29 on HotpotQA dev-distractor.',
    tags: ['RAG', 'Multi-Agent', 'Uncertainty Quantification', 'LLM', 'NLP'],
  },
  {
    id: 'invosure-paper',
    title: 'InvoSure: Smart GST Invoice Verification System',
    conference: 'IEEE',
    year: '2026',
    venue: 'International Conference on Contemporary Engineering & Technology (ICCET) · IEEE I2ITCON 2026',
    summary:
      'Proposed an AI-driven invoice validation framework combining OCR, LLM-based entity extraction, and automated GST verification. Designed a scalable backend architecture for end-to-end invoice processing.',
    contribution:
      'Combined OCR text extraction, Groq LLM entity parsing, and Playwright-based automated GST portal verification into a single pipeline — eliminating manual invoice validation entirely.',
    tags: ['OCR', 'LLM', 'GST Verification', 'FastAPI', 'Automation'],
  },
]

export const principles = [
  {
    number: '01',
    title: 'Build for observability.',
    description:
      'Logs, metrics, and traces from day one. If you cannot measure it, you cannot debug it in production.',
  },
  {
    number: '02',
    title: 'Automate the repetitive.',
    description:
      'Every manual step is a future outage. Infrastructure-as-code, CI/CD, and self-healing systems reduce human error.',
  },
  {
    number: '03',
    title: 'Measure before optimizing.',
    description:
      'Profile first. Premature optimization creates complexity without evidence of bottlenecks.',
  },
  {
    number: '04',
    title: 'Prefer simple architectures.',
    description:
      'A well-designed monolith often outperforms a poorly-designed microservice mesh. Complexity must be justified.',
  },
  {
    number: '05',
    title: 'Fail gracefully.',
    description:
      'Dead-letter queues, retries with backoff, circuit breakers. Systems fail — design so they degrade, not collapse.',
  },
  {
    number: '06',
    title: 'Design systems that scale.',
    description:
      'Stateless services, horizontal partitioning, async task distribution. Build for 10x before you need it.',
  },
]

export const navLinks = [
  { href: '#home', label: 'Home', external: false },
  { href: '#projects', label: 'Projects', external: false },
  { href: '#experience', label: 'Experience', external: false },
  { href: '#research', label: 'Research', external: false },
  { href: '#contact', label: 'Contact', external: false },
]

export const resumeLink = 'https://drive.google.com/file/d/1tWIEdPv0FiZLh-cEkFv3rgWozNHFKba8/view?usp=sharing'
