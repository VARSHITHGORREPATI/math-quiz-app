import React, { useState } from 'react';
import DifficultyBadge from './DifficultyBadge';

function ReviewItem({ result, index }) {
  const [open, setOpen] = useState(false);
  const { question, selected, correct, isCorrect, explanation, difficulty,
          optionA, optionB, optionC, optionD } = result;
  const map = { A: optionA, B: optionB, C: optionC, D: optionD };

  return (
    <div className={`review-item ${isCorrect ? 'correct-item' : 'incorrect-item'}`}>
      <div className="flex-between mb-1">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Q{index + 1}
        </span>
        <div className="flex" style={{ gap: '0.5rem', alignItems: 'center' }}>
          <DifficultyBadge difficulty={difficulty} />
          <span>{isCorrect ? '✅' : '❌'}</span>
        </div>
      </div>

      <p className="review-question">{question}</p>

      <div className="review-meta">
        <span>
          Your answer:{' '}
          <span className={isCorrect ? 'correct-ans' : 'incorrect-ans'}>
            {selected} — {map[selected] || selected}
          </span>
        </span>
        {!isCorrect && (
          <span>
            Correct: <span className="correct-ans">{correct} — {map[correct] || correct}</span>
          </span>
        )}
      </div>

      <button
        className="btn btn-ghost mt-2"
        style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', borderRadius: 8 }}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {open ? '▲ Hide' : '▼ Show'} Explanation
      </button>

      {open && (
        <div className="explanation-box">
          <strong>💡 </strong>{explanation}
        </div>
      )}
    </div>
  );
}

export default ReviewItem;
