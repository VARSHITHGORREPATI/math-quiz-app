import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

/**
 * App.jsx – Root component with React Router routes.
 *
 * Routes:
 *   /          → Home page (chapter info + Start Quiz)
 *   /quiz      → Quiz page (10 questions one-by-one)
 *   /results   → Result page (score + explanations)
 */
function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultPage />} />
        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
