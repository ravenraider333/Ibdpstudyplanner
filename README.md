# IB DP Study Planner

Updated planner includes:
- Shared backend profile storage by code (`/api/profile/:code`) so typing the same code on any computer opens the same account
- First-time-only subject setup (locked after save)
- English removed from selectable course options
- Left-side subject browser + right-side syllabus point panel
- Completed syllabus points shown with strike-through in selector
- Full Economics syllabus list restored (including missing 2.8–2.12 and 4.7–4.10 points)
- Daily 3-topic selector that auto-resets each new day
- Timer presets/custom input, pause/start/reset, and color state feedback

## Run (single-origin local mode)

```bash
node server.js
```

Open `http://localhost:4173/`.

## Backend URL configuration

Frontend API default is same-origin (`/api/profile/:code`), which is correct when using `node server.js`.

For split hosting (static frontend + separately hosted backend), set a backend base URL in either way:

1. In HTML meta (recommended):

```html
<meta name="ibdp-backend-base-url" content="https://your-backend.example.com" />
```

2. Or before `app.js` load:

```html
<script>window.IBDP_BACKEND_BASE_URL = "https://your-backend.example.com";</script>
```

Trailing slashes are normalized automatically.

## Shared login requirement

- Both devices must use the same backend deployment URL for shared code accounts to match.
- If using split frontend/backend hosting, backend must allow CORS for the frontend origin.
