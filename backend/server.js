/**
 * server.js – Express application entry point.
 * Initialises the database, mounts routes, and starts the HTTP server.
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const { initializeDatabase } = require('./db/database');
const quizRoutes = require('./routes/quizRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api', quizRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Math Quiz API is running' });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// ── Boot ──────────────────────────────────────────────────────────────────────
(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`✅  Math Quiz API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌  Failed to start server:', err);
    process.exit(1);
  }
})();
