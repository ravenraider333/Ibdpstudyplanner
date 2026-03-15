const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DB_PATH = path.join(DATA_DIR, 'profiles.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '{}');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const sanitize = (code) => String(code || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);

const DEFAULT_ALLOWED_ORIGINS = [
  'https://ravenraider333.github.io',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8010',
  'http://127.0.0.1:8010',
];
const ALLOWED_ORIGINS = new Set((process.env.CORS_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean));

function resolveCorsOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return null;
  return ALLOWED_ORIGINS.has(origin) ? origin : null;
}

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '{}');
  } catch {
    return {};
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}


function send(req, res, status, body, type = 'application/json; charset=utf-8') {
  const corsOrigin = resolveCorsOrigin(req);
  const headers = {
    'Content-Type': type,
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
  if (corsOrigin) headers['Access-Control-Allow-Origin'] = corsOrigin;
  res.writeHead(status, headers);
  res.end(body);
}

function serveFile(req, reqPath, res) {
  const clean = reqPath === '/' ? '/index.html' : reqPath;
  const full = path.normalize(path.join(ROOT, clean));
  if (!full.startsWith(ROOT)) return send(req, res, 403, 'Forbidden', 'text/plain; charset=utf-8');
  fs.readFile(full, (err, data) => {
    if (err) return send(req, res, 404, 'Not found', 'text/plain; charset=utf-8');
    send(req, res, 200, data, MIME[path.extname(full)] || 'application/octet-stream');
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(req, res, 204, '');

  const url = new URL(req.url, `http://${req.headers.host}`);
  const m = url.pathname.match(/^\/api\/profile\/([^/]+)$/);
  if (m) {
    const code = sanitize(decodeURIComponent(m[1] || ''));
    if (!code) return send(req, res, 400, JSON.stringify({ error: 'Invalid code' }));

    if (req.method === 'GET') {
      const db = readDb();
      return send(req, res, 200, JSON.stringify({ profile: db[code] || null }));
    }

    if (req.method === 'PUT') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 5_000_000) req.destroy();
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const profile = parsed.profile;
          if (!profile || typeof profile !== 'object') return send(req, res, 400, JSON.stringify({ error: 'Missing profile' }));
          const db = readDb();
          db[code] = profile;
          writeDb(db);
          return send(req, res, 200, JSON.stringify({ ok: true }));
        } catch {
          return send(req, res, 400, JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    return send(req, res, 405, JSON.stringify({ error: 'Method not allowed' }));
  }

  serveFile(req, url.pathname, res);
});

server.listen(PORT, () => {
  console.log(`IBDP planner server running on http://localhost:${PORT}`);
});
