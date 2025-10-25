# Quiz App

A full‑stack quiz platform built with React (Vite) on the frontend and Express + MongoDB on the backend. This single README merges the previous Quick Start and README—organized, concise, and without repetition.

## Features at a Glance

- Username-based entry (no auth account needed)
- 10 categories: Movies, Music, Technology, Medicine, History, Science, Sports, Geography, Literature, General Knowledge
- Optional Randomize category for mixed questions
- Question types: MCQ, True/False, Fill in the Blank, Select All That Apply
- 100 quiz sets per category (10 questions per set)
- Scoring with detailed answer review and grading
- Persistent user statistics: totals, accuracy, history

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS 4
- Backend: Node.js, Express.js, MongoDB (Mongoose)

## Quick Start (Local)

1. Ensure MongoDB is running

```powershell
mongod
```

2. Start the backend

```powershell
cd backend
pnpm install
pnpm run seed   # populates the database with quiz sets
pnpm run dev    # starts the API at http://localhost:5000
```

3. Start the frontend (in a second terminal)

```powershell
cd frontend
pnpm install
pnpm run dev    # serves the app at http://localhost:5173
```

Then open http://localhost:5173 in your browser.

## How It Works

1. Enter a username (3–20 chars)
2. Review your stats (if any) pulled from the backend
3. Pick a category or Randomize to mix topics
4. Answer 10 questions (navigate freely, progress shown)
5. Submit to see your score, per‑question review, and grade
6. Your stats update and persist for next sessions

## API Endpoints

Quiz

- GET `/api/quiz/categories` – list all categories
- GET `/api/quiz/random/:category` – fetch a random quiz set
- POST `/api/quiz/submit` – submit answers and receive results

User Stats

- GET `/api/stats/:username` – fetch user statistics
- POST `/api/stats/update` – update statistics after a quiz
- GET `/api/stats/check/:username` – verify username existence

## Data Model (Overview)

QuizSet

- category, setNumber, difficulty
- questions[]: questionText, questionType, options, correctAnswer, points

UserStats

- username, totalQuestions, correctAnswers, incorrectAnswers
- quizHistory[] (latest attempts with results)

## Database & Seeding

- The seed script creates 1000 quiz sets (100 per category), each with 10 questions across difficulty tiers.
- Run from the backend directory:

```powershell
pnpm run seed
```

## Grading Scale

- A+ (≥ 90%): Outstanding
- A (80–89%): Excellent
- B (70–79%): Strong
- C (60–69%): Solid
- D (50–59%): Needs follow‑up
- F (< 50%): Review recommended

## Troubleshooting

- Backend not starting: confirm MongoDB is running and port 5000 is free
- Frontend cannot reach API: ensure backend is running at http://localhost:5000
- Empty database: re‑run `pnpm run seed` in `backend/`

## License

ISC
