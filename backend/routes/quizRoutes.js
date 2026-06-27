/**
 * quizRoutes.js - Express router for quiz endpoints.
 */

const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../controllers/quizController');

// GET  /api/quiz    → return 10 random questions (no answers)
router.get('/quiz', getQuiz);

// POST /api/submit  → grade submitted answers
router.post('/submit', submitQuiz);

module.exports = router;
