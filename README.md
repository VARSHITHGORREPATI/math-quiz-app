# EAMCET Math Quiz – Functions

A full-stack web application for EAMCET students to practice **Functions** (Mathematics) through a 10-question multiple-choice quiz with instant feedback and explanations.

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, React Router v6   |
| Backend  | Node.js, Express.js               |
| Database | SQLite via sql.js (pure JS/WASM)  |
| Styling  | Custom CSS (no external UI lib)   |

---

## Features

- 10 randomly selected questions per quiz session
- 10-minute countdown timer (auto-submits on expiry)
- Question shuffling + option shuffling each session
- Navigate freely between questions before submitting
- Dot-navigator to jump to any question
- Score, percentage, and motivational feedback on results page
- Per-question review with collapsible explanations
- Filter results by All / Correct / Incorrect
- Difficulty badges (Easy / Medium / Hard)
- Fully responsive design
- No login or account required

---

## Project Structure

```
math-quiz-app/
├── backend/
│   ├── controllers/
│   │   └── quizController.js   # Request handlers for quiz & submit
│   ├── db/
│   │   ├── database.js         # sql.js DB init & persistence
│   │   └── quiz.db             # Generated SQLite file (after seed)
│   ├── models/
│   │   └── questionModel.js    # DB queries (insert, fetch, count)
│   ├── routes/
│   │   └── quizRoutes.js       # Express router
│   ├── seed/
│   │   └── seedQuestions.js    # 50 hand-curated Functions questions
│   ├── .env.example
│   ├── package.json
│   └── server.js               # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DifficultyBadge.jsx
    │   │   ├── Header.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── QuestionCard.jsx
    │   │   ├── ReviewItem.jsx
    │   │   └── Timer.jsx
    │   ├── hooks/
    │   │   └── useTimer.js
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── QuizPage.jsx
    │   │   └── ResultPage.jsx
    │   ├── services/
    │   │   └── quizApi.js      # Axios API calls
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Setup Instructions

### Prerequisites
- Node.js v18 or later
- npm v9 or later

---

### Backend

```bash
cd backend
npm install
npm run seed    # Populates the DB with 50 Functions questions (run once)
npm start       # Starts the API server on http://localhost:5000
```

> To reseed from scratch, delete `backend/db/quiz.db` and run `npm run seed` again.

---

### Frontend

```bash
cd frontend
npm install
npm run dev     # Starts the dev server on http://localhost:3000
```

Open your browser at **http://localhost:3000**

---

## API Reference

### `GET /api/quiz`
Returns 10 randomly selected questions. Correct answers are **not** included.

**Response:**
```json
{
  "questions": [
    {
      "id": 3,
      "chapter": "Functions",
      "question": "The set of all input values of a function is called:",
      "optionA": "Range",
      "optionB": "Domain",
      "optionC": "Codomain",
      "optionD": "Image",
      "difficulty": "Easy"
    }
  ],
  "total": 10
}
```

---

### `POST /api/submit`
Submits answers and returns the graded result.

**Request body:**
```json
{
  "answers": [
    { "questionId": 3, "selected": "B" }
  ]
}
```

**Response:**
```json
{
  "score": 8,
  "total": 10,
  "percentage": 80,
  "results": [
    {
      "questionId": 3,
      "question": "The set of all input values...",
      "optionA": "Range",
      "optionB": "Domain",
      "optionC": "Codomain",
      "optionD": "Image",
      "selected": "B",
      "correct": "B",
      "isCorrect": true,
      "explanation": "The domain is the complete set of possible input values.",
      "difficulty": "Easy"
    }
  ]
}
```

---

## Database Schema

```sql
CREATE TABLE questions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter       TEXT    NOT NULL,
  question      TEXT    NOT NULL,
  optionA       TEXT    NOT NULL,
  optionB       TEXT    NOT NULL,
  optionC       TEXT    NOT NULL,
  optionD       TEXT    NOT NULL,
  correctAnswer TEXT    NOT NULL,
  difficulty    TEXT    NOT NULL,
  explanation   TEXT    NOT NULL
);
```

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
DB_PATH=./db/quiz.db
```

---

## Notes

- The database uses **sql.js** (pure JavaScript/WASM SQLite) — no native compilation or Python required.
- The seed script is **idempotent**: running it again when questions already exist does nothing.
- The frontend Vite dev server proxies `/api` requests to `http://localhost:5000` automatically.
