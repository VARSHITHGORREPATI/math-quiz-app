import React from 'react';

function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div>
      <div className="flex-between mb-1" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <span style={{ fontWeight: 600 }}>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
