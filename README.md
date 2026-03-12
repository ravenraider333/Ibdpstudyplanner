# IB DP Study Planner

A sleek IB Diploma study planner with:
- Profile-code login
- First-run subject selection modal (HL/SL per subject)
- Auto-built syllabus reservoir from selected subjects
- 3 daily focus picks + mini checklist
- Progress tracking by total, subject, and unit badges
- Exam countdown + study timer
- Cloud-first sync (JSONBlob API) with automatic local fallback

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173` (root) or `http://localhost:4173/docs/`.

## GitHub Pages

Set Pages source to **Deploy from branch** → `main` + `/docs`.
