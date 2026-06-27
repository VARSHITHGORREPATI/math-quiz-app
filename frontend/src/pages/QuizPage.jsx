import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import { fetchQuiz, submitAnswers } from '../services/quizApi';

const QUIZ_SECONDS = 10 * 60;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q) {
  const orig = [
    { key: 'A', text: q.optionA },
    { key: 'B', text: q.optionB },
    { key: 'C', text: q.optionC },
    { key: 'D', text: q.optionD },
  ];
  const sh = shuffle(orig);
  return {
    ...q,
    optionA: sh[0].text, optionB: sh[1].text,
    optionC: sh[2].text, optionD: sh[3].text,
    _optionMap: { A: sh[0].key, B: sh[1].key, C: sh[2].key, D: sh[3].key },
  };
}

function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions]     = useState([]);
  const [current, setCurrent]         = useState(0);
  const [answers, setAnswers]         = useState({});
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const submitRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchQuiz();
        setQuestions(shuffle(data.questions).map(shuffleOptions));
        setTimerActive(true);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load questions. Is the backend running?');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = useCallback((id, key) => {
    setAnswers(p => ({ ...p, [id]: key }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (submitRef.current) return;
    submitRef.current = true;
    setTimerActive(false);
    setSubmitting(true);
    try {
      const payload = questions.map(q => ({
        questionId: q.id,
        selected: answers[q.id] ? q._optionMap[answers[q.id]] : 'A',
      }));
      const result = await submitAnswers(payload);
      navigate('/results', { state: { result } });
    } catch (err) {
      setError(err?.response?.data?.error || 'Submission failed. Please try again.');
      submitRef.current = false;
    } finally {
      setSubmitting(false);
    }
  }, [questions, answers, navigate]);

  const handleExpire = useCallback(() => handleSubmit(), [handleSubmit]);

  if (loading) {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="page">
          <div className="loading-state">
            <div className="spinner" />
            <p>Preparing your quiz…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="page">
          <div className="error-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <p style={{ color: '#f87171', marginBottom: '1.25rem' }}>{error}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="app-wrapper">
      <Header />

      <main className="page">
        <div className="container">

          {/* ── Top bar ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <ProgressBar current={current + 1} total={questions.length} />
            </div>
            <Timer totalSeconds={QUIZ_SECONDS} onExpire={handleExpire} active={timerActive} />
          </div>

          {/* ── Question ── */}
          <QuestionCard
            question={q}
            questionNumber={current + 1}
            totalQuestions={questions.length}
            selected={answers[q.id] || null}
            onSelect={key => handleSelect(q.id, key)}
          />

          {/* ── Dot navigator ── */}
          <div className="dot-nav">
            {questions.map((qq, idx) => (
              <button
                key={qq.id}
                className={`dot-btn ${idx === current ? 'dot-active' : ''} ${answers[qq.id] ? 'dot-answered' : ''}`}
                onClick={() => setCurrent(idx)}
                title={`Question ${idx + 1}${answers[qq.id] ? ' ✓' : ''}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* ── Navigation ── */}
          <div className="quiz-nav">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
            >
              ← Previous
            </button>

            <span className="answered-count">
              {answeredCount} / {questions.length} answered
            </span>

            {current < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
              >
                Next →
              </button>
            ) : (
              <button
                className={`btn ${allAnswered ? 'btn-success' : 'btn-accent'}`}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? '⏳ Submitting…' : allAnswered ? '✅ Submit Quiz' : '⚠️ Submit Anyway'}
              </button>
            )}
          </div>

          {/* Floating submit if all answered and not on last question */}
          {allAnswered && current < questions.length - 1 && (
            <div className="text-center mt-3">
              <button className="btn btn-success" onClick={handleSubmit} disabled={submitting}>
                {submitting ? '⏳ Submitting…' : '✅ Submit Quiz'}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default QuizPage;
