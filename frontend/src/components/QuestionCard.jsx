import React from 'react';
import DifficultyBadge from './DifficultyBadge';

function QuestionCard({ question, questionNumber, totalQuestions, selected, onSelect }) {
  const options = [
    { key: 'A', text: question.optionA },
    { key: 'B', text: question.optionB },
    { key: 'C', text: question.optionC },
    { key: 'D', text: question.optionD },
  ];

  return (
    <div className="card question-card">
      {/* Header row */}
      <div className="flex-between">
        <span className="question-number-pill">
          Q{questionNumber} / {totalQuestions}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Question text */}
      <p className="question-text">{question.question}</p>

      <div className="divider" />

      {/* Options */}
      <div className="options-list" role="radiogroup" aria-label="Answer options">
        {options.map(({ key, text }) => (
          <label
            key={key}
            className={`option-label ${selected === key ? 'selected' : ''}`}
            htmlFor={`opt-${question.id}-${key}`}
          >
            <input
              type="radio"
              id={`opt-${question.id}-${key}`}
              name={`q-${question.id}`}
              value={key}
              checked={selected === key}
              onChange={() => onSelect(key)}
            />
            <span className="option-key">{key}</span>
            <span>{text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
