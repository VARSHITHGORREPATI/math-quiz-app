import React from 'react';
import { useTimer } from '../hooks/useTimer';

function Timer({ totalSeconds, onExpire, active }) {
  const { secondsLeft, formatted } = useTimer(totalSeconds, onExpire, active);
  const isWarning = secondsLeft <= 60;

  return (
    <div className={`timer-wrap ${isWarning ? 'warning' : ''}`} aria-live="polite">
      <span style={{ fontSize: '1rem' }}>{isWarning ? '🔥' : '⏱'}</span>
      <span>{formatted()}</span>
    </div>
  );
}

export default Timer;
