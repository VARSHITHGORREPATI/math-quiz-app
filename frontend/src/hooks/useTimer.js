/**
 * useTimer.js – Custom hook for a countdown timer.
 *
 * @param {number} initialSeconds  - Total seconds to count down from.
 * @param {function} onExpire      - Callback fired when the timer reaches 0.
 * @param {boolean} active         - Whether the timer should be ticking.
 */

import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds, onExpire, active = true) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const onExpireRef = useRef(onExpire);

  // Keep the callback ref fresh without restarting the effect
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  /** Format seconds as MM:SS */
  function formatted() {
    const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const s = (secondsLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return { secondsLeft, formatted };
}
