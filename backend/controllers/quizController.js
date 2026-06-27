/**
 * quizController.js – Handles quiz-related HTTP request logic.
 */

const { getRandomQuestions, getQuestionsByIds, countQuestions } = require('../models/questionModel');

/**
 * GET /api/quiz
 * Returns 10 random questions without the correctAnswer field.
 */
async function getQuiz(req, res, next) {
  try {
    const total = await countQuestions();
    if (total === 0) {
      return res.status(503).json({
        error: 'No questions found. Please run the seed script first: npm run seed',
      });
    }

    const questions = await getRandomQuestions();
    res.json({ questions, total: questions.length });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/submit
 * Accepts an array of { questionId, selected } and returns the graded result.
 *
 * Body: { answers: [{ questionId: number, selected: string }] }
 */
async function submitQuiz(req, res, next) {
  try {
    const { answers } = req.body;

    // ── Input Validation ────────────────────────────────────────────────────
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'answers must be a non-empty array.' });
    }

    for (const ans of answers) {
      if (ans.questionId === undefined || ans.questionId === null) {
        return res.status(400).json({ error: 'Each answer must have a questionId.' });
      }
      if (!ans.selected || typeof ans.selected !== 'string') {
        return res.status(400).json({ error: 'Each answer must have a selected option string.' });
      }
    }

    // ── Fetch Full Question Data ────────────────────────────────────────────
    const ids = answers.map((a) => Number(a.questionId));
    const questionsFromDb = await getQuestionsByIds(ids);

    // Build a lookup map by id
    const questionMap = {};
    for (const q of questionsFromDb) {
      questionMap[q.id] = q;
    }

    // ── Grade Each Answer ──────────────────────────────────────────────────
    let score = 0;
    const results = answers.map((ans) => {
      const q = questionMap[Number(ans.questionId)];
      if (!q) {
        return {
          questionId: ans.questionId,
          question: 'Question not found',
          selected: ans.selected,
          correct: null,
          isCorrect: false,
          explanation: '',
          difficulty: '',
        };
      }

      const isCorrect =
        ans.selected.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();
      if (isCorrect) score++;

      return {
        questionId: q.id,
        question:    q.question,
        optionA:     q.optionA,
        optionB:     q.optionB,
        optionC:     q.optionC,
        optionD:     q.optionD,
        selected:    ans.selected,
        correct:     q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        difficulty:  q.difficulty,
      };
    });

    res.json({
      score,
      total:      answers.length,
      percentage: Math.round((score / answers.length) * 100),
      results,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getQuiz, submitQuiz };
