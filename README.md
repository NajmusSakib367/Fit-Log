# 💪 FitLog

**FitLog** is a dark, no-nonsense workout library and session tracker. Browse a library of lifts, drop them into today's plan or save them for later, and watch your minutes and calories add up as you go — everything persists locally, so your plan survives a reload.

## 🛠️ Technologies Used

- **Next.js 14** (App Router) — routing and rendering
- **React 18** — UI and state
- **Tailwind CSS** — styling and responsive layout
- **Next Font (Oswald + Inter)** — typography
- Public FitLog REST API for workout data
- `localStorage` for persisting the plan/saved lists

## ✨ 5 Key Features

1. **Responsive workout library** — a 3×4 grid of lift cards on desktop that collapses gracefully to a single column on mobile, each showing an image, category tags, equipment, and a duration/calories/rating stats row, with a live Sort By dropdown (Duration, Calories, Rating).
2. **Detailed workout pages** — a two-column layout with a full specs table (equipment, difficulty, sets, reps, duration, calories, rating) and numbered step-by-step instructions for every lift.
3. **Today's Plan builder** — add a lift to today's plan directly from its card or detail page, capped at 5 lifts, with instant toast confirmations and live badge counts in the navbar.
4. **Save for later** — bookmark any workout into a separate Saved tab so you can build a backlog without committing it to today's session.
5. **Plan management & metrics** — mark a planned lift as done or remove it, track live totals for exercises/minutes/calories, and land on a friendly empty state (or custom 404) whenever there's nothing to show.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build & Deploy

```bash
npm run build
npm run start
```

## 🔌 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## 📬 Submission

- Live Link: https://fitlog-ecru-tau.vercel.app/
- GitHub Repository Link: https://github.com/NajmusSakib367/Fit-Log