/**
 * quizApi.js – Axios-based API service for the quiz backend.
 */

import axios from 'axios';

// Base URL: uses Vite proxy in dev, or set VITE_API_URL in production
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetch 10 random quiz questions (no answers exposed).
 * @returns {Promise<{ questions: Object[], total: number }>}
 */
export async function fetchQuiz() {
  const { data } = await api.get('/quiz');
  return data;
}

/**
 * Submit answers and receive graded results.
 * @param {Array<{ questionId: number, selected: string }>} answers
 * @returns {Promise<{ score: number, total: number, percentage: number, results: Object[] }>}
 */
export async function submitAnswers(answers) {
  const { data } = await api.post('/submit', { answers });
  return data;
}
