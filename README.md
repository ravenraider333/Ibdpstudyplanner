# IB DP Study Planner

Updated planner includes:
- Cross-device account sync by profile code using `api.jsonstorage.net` cloud storage + local fallback
- Timestamp conflict resolution (latest profile wins on login)
- First-time-only subject setup (locked after save)
- English removed from selectable course options
- Left-side subject browser + right-side syllabus point panel
- Completed syllabus points shown with strike-through in selector
- Full Economics syllabus list restored (including missing 2.8–2.12 and 4.7–4.10 points)
- Daily 3-topic selector that auto-resets each new day
- Timer presets/custom input, pause/start/reset, and color state feedback

## Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/` or `http://localhost:4173/docs/`.
