# IB DP Study Planner

A sleek single-page IB Diploma study planner with:
- Personalized login via code (saved to browser localStorage)
- Subject + HL/SL profile selection
- Auto-filtered syllabus topics
- Daily mini-checklist (up to 3 focus topics)
- Full checklist with cross-out completion
- Progress tracking overall, by course, and by unit
- Built-in study timer
- Defensive startup/error handling so the UI still reports issues instead of silently failing

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## GitHub Pages notes

- This repo includes `.nojekyll` to avoid asset processing surprises.
- If you still see a blank page, hard refresh and check browser console for status/error text shown in the app header.
