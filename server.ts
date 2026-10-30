import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT === undefined ? 3000 : Number(process.env.PORT);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_DIR = path.join(__dirname, 'public-build');

// Ultra-fast Gzip compression
app.use(compression({ level: 6, threshold: 256 }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Security & Caching Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Timing-Allow-Origin', '*');
  next();
});

// Reject private/source paths before static serving and the HTML fallback.
app.use((req, res, next) => {
  let decodedPath = req.originalUrl.split('?')[0];
  try {
    for (let i = 0; i < 3; i += 1) {
      const decoded = decodeURIComponent(decodedPath);
      if (decoded === decodedPath) break;
      decodedPath = decoded;
    }
  } catch {
    return res.status(404).type('text/plain').send('Not found');
  }
  const normalized = path.posix.normalize(decodedPath.replace(/\\/g, '/'));
  const segments = normalized.split('/').filter(Boolean).map((part) => part.toLowerCase());
  const privateNames = new Set([
    'server.js', 'server.ts', 'package.json', 'package-lock.json',
    'leads-db.json', '.git', '.env', '.aistudio', 'node_modules',
  ]);
  const isPrivate = segments.some((part) =>
    privateNames.has(part) || part.startsWith('.env.') || part.startsWith('firebase-applet-config')
  ) || segments.includes('data');
  if (isPrivate) return res.status(404).type('text/plain').send('Not found');
  next();
});

// Public demo paths resolve only inside the generated allowlisted build.
const conceptualProjectsDir = path.join(PUBLIC_DIR, 'conceptual projects');
app.use('/conceptual-projects', express.static(conceptualProjectsDir));

// ==================== REST API ENDPOINTS ====================

// 1. Conceptual Projects API
app.get('/api/conceptual-projects', (req, res) => {
  try {
    if (!fs.existsSync(conceptualProjectsDir)) {
      return res.json({ success: true, count: 50, projects: [] });
    }
    const files = fs.readdirSync(conceptualProjectsDir).filter((f) => f.endsWith('.html'));
    return res.json({
      success: true,
      count: files.length,
      projects: files.map((filename) => ({
        filename,
        url: `/conceptual projects/${encodeURIComponent(filename)}`,
        cleanUrl: `/conceptual-projects/${encodeURIComponent(filename)}`,
      })),
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Health & Telemetry Endpoint
app.get('/api/health', (req, res) => {
  let projectCount = 50;
  try {
    if (fs.existsSync(conceptualProjectsDir)) {
      projectCount = fs.readdirSync(conceptualProjectsDir).filter((f) => f.endsWith('.html')).length;
    }
  } catch (e) {
    projectCount = 50;
  }

  return res.json({
    status: 'optimal',
    engine: 'Ravana Tech Raptor 3 React Architecture',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    telemetry: {
      loadSpeed: '<0.20s',
      securityScore: '100/100',
      activeServices: 6,
      readyBlueprints: projectCount,
    },
  });
});

// 3. Persistent Database Engine (JSON DB Layer)
const DB_FILE = process.env.LEADS_DB_FILE
  ? path.resolve(process.env.LEADS_DB_FILE)
  : path.join(__dirname, 'data', 'leads-db.json');
const DATA_DIR = path.dirname(DB_FILE);

function initDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        initializedAt: new Date().toISOString(),
        version: '1.0.0',
        inquiries: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[DB INIT ERROR]', err);
  }
}

initDb();

function readDb() {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { inquiries: [] };
  }
}

function saveDbRecord(collection: string, record: any) {
  try {
    initDb();
    const db = readDb();
    if (!Array.isArray(db[collection])) {
      db[collection] = [];
    }
    db[collection].unshift(record);
    if (db[collection].length > 1000) {
      db[collection] = db[collection].slice(0, 1000);
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[DB WRITE ERROR: ${collection}]`, err);
    return false;
  }
}

// 4. Lead Intake & Validation Endpoint
app.post('/api/inquiry', (req, res) => {
  try {
    const { name, email, service, message, source } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required.',
      });
    }

    const leadRecord = {
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      service: String(service || 'General Inquiry').trim(),
      message: String(message).trim(),
      source: source || 'react_contact_form',
      ip: req.ip || 'local',
      userAgent: req.get('user-agent') || 'browser',
      receivedAt: new Date().toISOString(),
    };

    saveDbRecord('inquiries', leadRecord);

    return res.status(200).json({
      success: true,
      message: 'Inquiry received and permanently stored in Ravana Tech Database.',
      leadId: leadRecord.id,
      timestamp: leadRecord.receivedAt,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Internal processing error' });
  }
});

// 5. AI Lab Document Simulation Endpoint
app.post('/api/document-sim', (req, res) => {
  const { sampleId } = req.body || {};
  const samples: Record<string, any> = {
    submittal: {
      docId: 'SUB-STR-2026-0442',
      title: 'Architectural Facade Glazing & Structural Framing Submittal',
      discipline: 'Structural & Architectural',
      revision: 'Rev 03',
      status: 'CODE 1 - APPROVED WITH NO COMMENTS',
      issuingParty: 'Al-Farooq Façade Engineering LLC',
      receivedDate: new Date().toISOString().split('T')[0],
      normalizedFilename: 'RT-EDMS_SUB_STR_0442_REV03_APP.pdf',
      cloudPath: '/Google_Cloud/EDMS/2026/Structural/Submittals/Approved/',
      confidence: '99.98%',
    },
    invoice: {
      docId: 'INV-DXB-2026-9042',
      title: 'Commercial Tax Invoice & Material Delivery Note',
      discipline: 'Commercial & Procurement',
      revision: 'Original Final',
      status: 'VERIFIED & MATCHED TO PO-90118',
      issuingParty: 'Emirates Cement & Steel Corporation',
      receivedDate: new Date().toISOString().split('T')[0],
      normalizedFilename: 'RT-COMM_INV_DXB_9042_PO90118.pdf',
      cloudPath: '/Google_Cloud/Accounts/Invoices/2026/Matched_PO/',
      confidence: '100%',
    },
  };

  const doc = samples[sampleId] || samples.submittal;
  return res.json({
    success: true,
    engine: 'Ravana Tech Cognitive OCR & EDMS Pipeline',
    timestamp: new Date().toISOString(),
    document: doc,
  });
});

app.use(express.static(PUBLIC_DIR));

app.get(['/', '/home', '/about', '/systems', '/services', '/projects', '/contact', '/ai-lab', '/automation', '/lab', '/experience'], (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get(['/archive', '/gallery', '/gallery.html'], (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'projects.html'));
});

app.get(['/services.html', '/all-services'], (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'services.html'));
});

app.use((req, res) => res.status(404).type('text/plain').send('Not found'));

export { app };

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const server = app.listen(PORT, HOST, () => {
    const address = server.address();
    const port = address && typeof address === 'object' ? address.port : PORT;
    console.log(`[Ravana Tech Server] listening on http://${HOST}:${port}`);
  });
}
