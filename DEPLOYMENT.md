# Publishing this planner to GitHub

If you don't see changes on GitHub, the local branch usually has no configured remote.

## 1) Connect your GitHub repository as `origin`

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

If `origin` already exists, update it:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo>.git
```

## 2) Push the current branch

```bash
git push -u origin work
```

(Replace `work` with your branch name if needed.)

## 3) Deploy with backend (recommended for shared accounts)

Shared accounts by code require the API routes in `server.js`.
Deploy to a Node-capable host (Render/Railway/Fly/VM/etc.) and run:

```bash
node server.js
```

This single-origin mode needs no frontend config.

## 4) Enable GitHub Pages (static-only frontend)

1. Open **Settings → Pages** in your GitHub repo.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** (or your preferred branch) and folder **/docs** (recommended) or **/(root)**.
4. Save and wait for deployment.

If using Pages + separate backend, set backend base URL in `docs/index.html`:

```html
<meta name="ibdp-backend-base-url" content="https://your-backend.example.com" />
```

or set:

```html
<script>window.IBDP_BACKEND_BASE_URL = "https://your-backend.example.com";</script>
```

Trailing slashes are normalized by frontend runtime.

## 5) CORS for split hosting

When frontend and backend are on different origins, backend must allow CORS from your frontend origin (and allow `GET`, `PUT`, `OPTIONS` + `Content-Type` header).

## 6) Merge PR branch

If your changes are in a PR branch, merge it into your Pages branch (usually `main`) so the site updates.
