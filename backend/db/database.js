/**
 * database.js – SQLite database layer using sql.js (pure JavaScript / WASM).
 *
 * sql.js runs entirely in-process without native bindings, so it works on any
 * platform without Python / node-gyp compilation.
 *
 * The database is persisted to a binary file on disk. It is read once at startup
 * and written back to disk after every write operation.
 */

const path = require('path');
const fs   = require('fs');

// Resolve DB file path from env or default
const DB_PATH = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, 'quiz.db');

// Ensure the db/ directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

/** Singleton sql.js Database instance */
let _db = null;

/**
 * Initialise sql.js, load the database from disk (or create a new one),
 * create required tables, and flush to disk.
 *
 * Safe to call multiple times – idempotent after first call.
 */
async function initializeDatabase() {
  if (_db) return _db; // already initialised

  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _db = new SQL.Database(fileBuffer);
  } else {
    _db = new SQL.Database(); // brand-new in-memory DB
  }

  // Create table
  _db.run(`
    CREATE TABLE IF NOT EXISTS questions (
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
    )
  `);

  // Flush schema to disk
  _saveSync();

  console.log('✅  Database initialised – Questions table ready.');
  return _db;
}

/**
 * Synchronously flush the current in-memory database to disk.
 * Called internally after every write.
 */
function _saveSync() {
  if (!_db) return;
  const data = _db.export();           // Uint8Array
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

/**
 * Return the active database instance.
 * Throws if initializeDatabase() has not been called yet.
 */
function getDb() {
  if (!_db) throw new Error('Database not initialised. Call initializeDatabase() first.');
  return _db;
}

/**
 * Flush the database to disk (public export for use by model layer).
 */
function saveDb() {
  _saveSync();
}

module.exports = { getDb, saveDb, initializeDatabase };
