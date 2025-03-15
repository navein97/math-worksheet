import React from "react";
import "./Question.css"; // We'll create this file shortly

function Question({ questionData, selectedAnswer, onSelect, disabled }) {
  const { id, text, options } = questionData;

  const handleChange = (optionId) => {
    if (!disabled) {
      onSelect(optionId);
    }
  };

  return (
    <div className="question">
      <p className="question-text">{text}</p>
      <div className="options">
        {options.map((option) => (
          <div key={option.id} className="option">
            <label>
              <input
                type="radio"
                name={`question-${id}`}
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => handleChange(option.id)}
                disabled={disabled}
              />
              <span className="option-label">{option.id}. </span>
              <span className="option-value">{option.value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
