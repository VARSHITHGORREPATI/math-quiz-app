import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TOPICS = [
  'Definition & Notation of Functions',
  'Domain, Codomain & Range',
  'Types: Linear, Quadratic, Constant, Identity',
  'One-to-One, Onto & Inverse Functions',
  'Even, Odd & Composite Functions',
];

const INSTRUCTIONS = [
  'Select one answer per question using the radio buttons.',
  'Navigate freely between questions before submitting.',
  'Timer runs for 10 minutes and auto-submits on expiry.',
  'After submission, explanations are shown for every question.',
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <Header />

      <main className="page">
        <div className="container">

          {/* ── Hero ── */}
          <div className="hero">
            <div className="hero-icon-wrap">📐</div>
            <h2>EAMCET Functions Quiz</h2>
            <p>
              Test your knowledge of Functions with 10 randomly selected
              EAMCET-level questions. Answer, submit, and see detailed explanations.
            </p>
            <span className="chapter-badge">✦ Chapter: Functions</span>
          </div>

          {/* ── Info card ── */}
          <div className="card" style={{ animation: 'fadeUp 0.6s 0.1s ease both' }}>

            {/* Stats tiles */}
            <div className="info-grid">
              {[
                { value: '10', label: 'Questions' },
                { value: '10 min', label: 'Time Limit' },
                { value: 'MCQ', label: 'Format' },
                { value: 'Mixed', label: 'Difficulty' },
              ].map(t => (
                <div className="info-tile" key={t.label}>
                  <div className="value">{t.value}</div>
                  <div className="label">{t.label}</div>
                </div>
              ))}
            </div>

            <div className="divider" />

            {/* Topics & Instructions side by side on desktop */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', alignItems: 'stretch', margin: '1.25rem 0 1.75rem' }}>
              <div className="topics-box">
                <strong>📚 Topics</strong>
                <ul>
                  {TOPICS.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              <div className="instructions-box">
                <strong>📋 Instructions</strong>
                <ul>
                  {INSTRUCTIONS.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            </div>

            <div className="divider" />

            <div className="text-center" style={{ paddingTop: '0.5rem' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/quiz')}
              >
                🚀 &nbsp;Start Quiz
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
