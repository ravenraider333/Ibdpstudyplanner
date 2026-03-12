# IB DP Study Planner

Updated planner includes:
- Cross-device account sync by profile code using a cloud JSON backend (`api.jsonstorage.net`) + local fallback
- Timestamp-based conflict resolution (latest profile version wins on login)
- First-time-only subject setup (locked after save)
- **English removed** from selectable course options
- Compact dashboard layout similar to your reference screenshots
- Task selector in the large left workspace
- Daily 3-topic focus, unit badges, progress bars, countdown, and timer

## Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/` or `http://localhost:4173/docs/`.
