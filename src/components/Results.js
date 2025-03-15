import React, { useState } from "react";
import "./Results.css";

function Results({ score, totalQuestions, onReset, name, onScoreSaved }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

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

  const saveHighScore = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch("/netlify/functions/highscores/highscores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        // Still mark as saved if status is OK, even if JSON parsing failed
        if (response.ok) {
          setSaved(true);
          if (onScoreSaved) onScoreSaved();
          return;
        } else {
          throw new Error("Server returned an error");
        }
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to save score");
      }

      setSaved(true);

      // Call the callback to fetch updated high scores
      if (onScoreSaved) {
        onScoreSaved();
      }
    } catch (err) {
      console.error("Error saving high score:", err);
      setError(err.message || "Failed to save your score");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="results">
      <h2>Your Results</h2>
      <div className="score-circle">
        <span className="score-number">{score}</span>
        <span className="total">/{totalQuestions}</span>
      </div>
      <p className="result-message">{message}</p>

      {!saved && !error && (
        <button
          className="save-score-button"
          onClick={saveHighScore}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save to High Scores"}
        </button>
      )}

      {saved && (
        <div className="success-message">Your score has been saved!</div>
      )}

      {error && <div className="error-message">{error}</div>}

      <button className="try-again-button" onClick={onReset}>
        Try Again
      </button>
    </div>
  );
}

export default Results;
