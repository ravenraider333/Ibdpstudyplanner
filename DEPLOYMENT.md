# Publishing this planner to GitHub

## Split deployment target
Frontend: GitHub Pages (`https://ravenraider333.github.io/Ibdpstudyplanner/`)  
Backend: separately hosted Node service running `server.js`

## 1) Deploy backend (Render, exact steps)

1. Push this repo to GitHub.
2. In Render: **New +** → **Web Service** → connect this repo.
3. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install` (or blank if no package file)
   - **Start Command:** `node server.js`
   - **Instance/Region:** any
4. Environment variables:
   - `PORT` = (leave empty; Render injects this automatically)
   - `CORS_ORIGINS` = `https://ravenraider333.github.io,http://localhost:4173,http://127.0.0.1:4173`
5. Deploy and copy backend URL, e.g. `https://ibdp-backend.onrender.com`.

## 2) Set frontend backend URL (GitHub Pages docs build)

Edit `docs/index.html` and set:

```html
<meta name="ibdp-backend-base-url" content="https://ibdp-backend.onrender.com" />
```

(Use your real Render URL.)

## 3) Commit and push Pages config change

```bash
git add docs/index.html
git commit -m "Configure Pages frontend backend URL"
git push origin main
```

## 4) Enable Pages

1. Repo → **Settings** → **Pages**
2. Source: branch `main`, folder `/docs`
3. Save and wait for deployment

## 5) Verify end-to-end

1. Open `https://ravenraider333.github.io/Ibdpstudyplanner/`
2. Confirm build marker is visible.
3. Open DevTools Console and run:
   ```js
   document.querySelector('meta[name="ibdp-backend-base-url"]').content
   ```
   It must equal your Render backend URL.
4. Try create/login with a code.
5. On backend, verify API responds:
   - `GET https://ibdp-backend.onrender.com/api/profile/aram`

## 6) CORS requirements (must pass)

Backend must return:
- `Access-Control-Allow-Origin: https://ravenraider333.github.io`
- `Access-Control-Allow-Methods: GET,PUT,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

This repo's `server.js` now supports this via `CORS_ORIGINS` allowlist.
