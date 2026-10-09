# EAMCET Math Quiz — Functions 🧮

A full-stack quiz application for EAMCET aspirants to practise the mathematics topic **Functions** through timed multiple-choice questions with instant feedback and explanations.

## ✨ Features

- 10 randomly selected questions per session
- 10-minute countdown with automatic submission
- Randomized questions and answer options
- Question navigation and progress tracking
- Score and percentage summary
- Correct/incorrect answer review with explanations
- Difficulty labels
- Responsive design
- No account required

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router |
| Backend | Node.js, Express |
| Database | SQLite via sql.js |
| Styling | Custom CSS |

## 📁 Structure

```text
math-quiz-app/
├── backend/   # Express API, database, models and seed data
└── frontend/  # React quiz interface
```

## 🚀 Run Locally

### Backend

```bash
cd backend
npm install
npm run seed
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Check the `package.json` files for the current ports and scripts.

## 🎯 What It Demonstrates

Quiz state management, REST API integration, timed interactions, randomized content, scoring logic, and learning-focused UX.

## 👨‍💻 Author

[Varshith Gorrepati](https://github.com/VARSHITHGORREPATI)
