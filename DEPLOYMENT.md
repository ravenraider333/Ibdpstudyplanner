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

Shared accounts by code (`suki` from any device) require the API routes in `server.js`.
Deploy to a Node-capable host (Render/Railway/Fly/VM/etc.) and run:

```bash
node server.js
```

## 4) Enable GitHub Pages (static-only, optional)

1. Open **Settings → Pages** in your GitHub repo.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** (or your preferred branch) and folder **/docs** (recommended) or **/(root)**.
4. Save and wait for deployment.

## 5) Merge PR branch

If your changes are in a PR branch, merge it into your Pages branch (usually `main`) so the site updates.


## 6) Pages source included

This repo now includes a `docs/` copy of the app so GitHub Pages works immediately when source is set to `/docs`.


## Shared login requirement

All devices must use the same backend deployment URL (the same running `server.js` service) to share account data by code.
