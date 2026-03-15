# IB DP Study Planner

## Production mode for your setup

You are using split deployment:
- Frontend: GitHub Pages (`/docs`)
- Backend: separate hosted Node API (`server.js`)

## Required frontend config

Set backend URL in `docs/index.html`:

```html
<meta name="ibdp-backend-base-url" content="https://ibdp-backend.onrender.com" />
```

Replace with your real backend URL.

## Backend run

```bash
node server.js
```

## CORS

Set `CORS_ORIGINS` on backend to include your Pages origin exactly:

```bash
CORS_ORIGINS="https://ravenraider333.github.io"
```

You can also include local dev origins as comma-separated values.
