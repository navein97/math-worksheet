import React from "react";
import "./Results.css";

function Results({ score, totalQuestions, onReset }) {
  const percentage = (score / totalQuestions) * 100;

  let message = "";
  if (percentage >= 90) {
    message = "Excellent work!";
  } else if (percentage >= 70) {
    message = "Good job!";
  } else if (percentage >= 50) {
    message = "Nice effort!";
  } else {
    message = "Keep practicing!";
  }

  return (
    <div className="results">
      <h2>Your Results</h2>
      <div className="score-circle">
        <span className="score-number">{score}</span>
        <span className="total">/{totalQuestions}</span>
      </div>
      <p className="result-message">{message}</p>
      <button className="try-again-button" onClick={onReset}>
        Try Again
      </button>
    </div>
  );
}

export default Results;
