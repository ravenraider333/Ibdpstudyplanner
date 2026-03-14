const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DB_PATH = path.join(DATA_DIR, 'profiles.json');
const RESET_MARKER = 'reset-accounts-2026-03-14';

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

function ensureResetApplied() {
  const db = readDb();
  if (db.__resetMarker === RESET_MARKER) return;
  writeDb({ __resetMarker: RESET_MARKER });
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function serveFile(reqPath, res) {
  const clean = reqPath === '/' ? '/index.html' : reqPath;
  const full = path.normalize(path.join(ROOT, clean));
  if (!full.startsWith(ROOT)) return send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
  fs.readFile(full, (err, data) => {
    if (err) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    send(res, 200, data, MIME[path.extname(full)] || 'application/octet-stream');
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, '');

  const url = new URL(req.url, `http://${req.headers.host}`);
  const m = url.pathname.match(/^\/api\/profile\/([^/]+)$/);
  if (m) {
    const code = sanitize(decodeURIComponent(m[1] || ''));
    if (!code) return send(res, 400, JSON.stringify({ error: 'Invalid code' }));

    if (req.method === 'GET') {
      const db = readDb();
      return send(res, 200, JSON.stringify({ profile: db[code] || null }));
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
          if (!profile || typeof profile !== 'object') return send(res, 400, JSON.stringify({ error: 'Missing profile' }));
          const db = readDb();
          db[code] = profile;
          db.__resetMarker = RESET_MARKER;
          writeDb(db);
          return send(res, 200, JSON.stringify({ ok: true }));
        } catch {
          return send(res, 400, JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    return send(res, 405, JSON.stringify({ error: 'Method not allowed' }));
  }

  serveFile(url.pathname, res);
});

ensureResetApplied();
server.listen(PORT, () => {
  console.log(`IBDP planner server running on http://localhost:${PORT}`);
});
