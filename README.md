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

## Run

```bash
node server.js
```

Open `http://localhost:4173/`.

> Cross-device login works only when both devices use the same running `server.js` backend URL (not a static-only Pages URL).


## Shared login requirement

- Both devices must open the planner against the same backend deployment URL for shared code accounts to match.
- If you open one device on GitHub Pages static URL and another on a Node backend URL, they will not share the same account store.
