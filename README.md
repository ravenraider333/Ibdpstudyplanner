# IB DP Study Planner

Updated planner includes:
- Shared backend profile storage by code (`/api/profile/:code`) so typing the same code on any computer opens the same account
- Automatic fallback cloud backend attempt when your own `/api` backend is not reachable
- First-time-only subject setup (locked after save)
- English removed from selectable course options
- Left-side subject browser + right-side syllabus point panel
- Completed syllabus points shown with strike-through in selector
- Full Economics syllabus list restored (including missing 2.8–2.12 and 4.7–4.10 points)
- Daily 3-topic selector that auto-resets each new day
- Timer presets/custom input, pause/start/reset, and color state feedback

## Run

```bash
node server.js
```

Open `http://localhost:4173/`.

> If you only host the static files (for example plain GitHub Pages), the shared backend endpoint will not exist. Deploy with `server.js` (or equivalent backend) for cross-computer syncing by code.


## Account reset in this release

- Existing stored accounts are cleared once when this server version boots (requested reset).
- After that one-time reset, accounts save normally and sync across devices by code.
