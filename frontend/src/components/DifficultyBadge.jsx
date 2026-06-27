import React from 'react';

const ICONS = { easy: '🟢', medium: '🟡', hard: '🔴' };

function DifficultyBadge({ difficulty }) {
  const level = difficulty?.toLowerCase() || 'easy';
  return (
    <span className={`badge badge-${level}`}>
      {ICONS[level]} {difficulty}
    </span>
  );
}

export default DifficultyBadge;
