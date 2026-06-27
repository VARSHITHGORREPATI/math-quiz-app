/**
 * questionModel.js – Database operations for the Questions table (sql.js).
 *
 * All functions are async to allow the server to call them uniformly,
 * but the underlying sql.js operations are synchronous.
 */

const { getDb, saveDb } = require('../db/database');

/**
 * Insert multiple questions in a single transaction.
 * @param {Object[]} questions
 */
async function insertManyQuestions(questions) {
  const db = getDb();

  db.run('BEGIN TRANSACTION');
  for (const q of questions) {
    db.run(
      `INSERT INTO questions
         (chapter, question, optionA, optionB, optionC, optionD, correctAnswer, difficulty, explanation)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        q.chapter, q.question,
        q.optionA, q.optionB, q.optionC, q.optionD,
        q.correctAnswer, q.difficulty, q.explanation,
      ]
    );
  }
  db.run('COMMIT');

  // Persist to disk immediately after the transaction
  saveDb();
}

/**
 * Fetch 10 random questions (correctAnswer excluded).
 * @returns {Promise<Object[]>}
 */
async function getRandomQuestions() {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT id, chapter, question, optionA, optionB, optionC, optionD, difficulty
    FROM questions
    ORDER BY RANDOM()
    LIMIT 10
  `);

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

/**
 * Fetch full question details (including correct answer) for a list of IDs.
 * @param {number[]} ids
 * @returns {Promise<Object[]>}
 */
async function getQuestionsByIds(ids) {
  const db = getDb();

  const placeholders = ids.map(() => '?').join(',');
  const stmt = db.prepare(
    `SELECT * FROM questions WHERE id IN (${placeholders})`
  );
  stmt.bind(ids);

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

/**
 * Count total questions in the database.
 * @returns {Promise<number>}
 */
async function countQuestions() {
  const db = getDb();

  const stmt = db.prepare('SELECT COUNT(*) AS cnt FROM questions');
  stmt.step();
  const row = stmt.getAsObject();
  stmt.free();
  return row.cnt || 0;
}

module.exports = {
  insertManyQuestions,
  getRandomQuestions,
  getQuestionsByIds,
  countQuestions,
};
