import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReviewItem from '../components/ReviewItem';

function getMessage(pct) {
  if (pct === 100) return { emoji: '🏆', text: 'Perfect Score! Outstanding!' };
  if (pct >= 80)   return { emoji: '🌟', text: 'Great job! Strong grasp of Functions.' };
  if (pct >= 60)   return { emoji: '👍', text: 'Good effort! Keep practising.' };
  if (pct >= 40)   return { emoji: '📖', text: 'Review the explanations carefully.' };
  return             { emoji: '💪', text: "Don't give up — revise and try again!" };
}

/** SVG ring that fills based on percentage */
function ScoreRing({ score, total }) {
  const pct = total > 0 ? (score / total) : 0;
  const R   = 60;
  const C   = 2 * Math.PI * R;
  const offset = C * (1 - pct);

  return (
    <div className="score-ring-wrap">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6366f1" />
            <stop offset="50%"  stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle className="score-ring-bg"   cx="80" cy="80" r={R} />
        <circle
          className="score-ring-fill"
          cx="80" cy="80" r={R}
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring-text">
        <span className="score-ring-num">{score}</span>
        <span className="score-ring-denom">/ {total}</span>
      </div>
    </div>
  );
}

function ResultPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const [filter, setFilter] = useState('all');

  const result = location.state?.result;

  if (!result) {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="page">
          <div className="error-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)' }}>No quiz result found.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const { score, total, percentage, results } = result;
  const msg = getMessage(percentage);

  const filtered = results.filter(r => {
    if (filter === 'correct')   return r.isCorrect;
    if (filter === 'incorrect') return !r.isCorrect;
    return true;
  });

  return (
    <div className="app-wrapper">
      <Header />

      <main className="page">
        <div className="container">

          {/* ── Score card ── */}
          <div className="card text-center mt-2 mb-2" style={{ animation: 'fadeUp 0.5s ease both' }}>
            <ScoreRing score={score} total={total} />

            <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{msg.emoji}</div>
            <h2 style={{
              fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.3rem',
              background: 'linear-gradient(135deg,#e2e8f0,#a5b4fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {percentage}% Score
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {msg.text}
            </p>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-box stat-correct">
                <div className="stat-val">{score}</div>
                <div className="stat-lbl">Correct</div>
              </div>
              <div className="stat-box stat-incorrect">
                <div className="stat-val">{total - score}</div>
                <div className="stat-lbl">Incorrect</div>
              </div>
              <div className="stat-box stat-pct">
                <div className="stat-val">{percentage}%</div>
                <div className="stat-lbl">Accuracy</div>
              </div>
            </div>

            <div className="divider" />

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
                🔄 &nbsp;Try Again
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                🏠 &nbsp;Home
              </button>
            </div>
          </div>

          {/* ── Review ── */}
          <div className="card" style={{ animation: 'fadeUp 0.5s 0.15s ease both' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 700, color: '#e2e8f0', fontSize: '1.05rem' }}>
              📋 Answer Review
            </h3>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {[
                { k: 'all',       label: `All  (${total})` },
                { k: 'correct',   label: `✅  Correct  (${score})` },
                { k: 'incorrect', label: `❌  Incorrect  (${total - score})` },
              ].map(({ k, label }) => (
                <button
                  key={k}
                  className={`btn ${filter === k ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '0.38rem 0.9rem', fontSize: '0.8rem' }}
                  onClick={() => setFilter(k)}
                >
                  {label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted text-center" style={{ padding: '2rem 0' }}>
                No questions in this category.
              </p>
            ) : (
              filtered.map(r => (
                <ReviewItem key={r.questionId} result={r} index={results.indexOf(r)} />
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default ResultPage;
