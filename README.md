# IB DP Study Planner

Updated planner includes:
- Cross-device account sync by profile code using a cloud JSON backend (`api.jsonstorage.net`) + local fallback
- Timestamp conflict resolution (latest profile wins on login)
- First-time-only subject setup (locked after save)
- English removed from selectable course options
- Compact dashboard with styled task cards
- Daily 3-topic selector that **auto-resets each new day**
- Timer presets (20/40/60), custom time, pause/start/reset, and color state feedback
- Progress bars with percentage values, unit badges, countdown, and timer

## Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/` or `http://localhost:4173/docs/`.
