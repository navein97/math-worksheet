import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import Results from "./components/Results";
import questionsData from "./questionsData";

function App() {
  // Initialize state from localStorage if available
  const [name, setName] = useState(() => {
    return localStorage.getItem("worksheet-name") || "";
  });

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("worksheet-answers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem("worksheet-submitted") === "true";
  });

  // Save to localStorage whenever these values change
  useEffect(() => {
    localStorage.setItem("worksheet-name", name);
    localStorage.setItem("worksheet-answers", JSON.stringify(answers));
    localStorage.setItem("worksheet-submitted", submitted.toString());

    // If we have a score and submitted is true, save the score
    if (score !== null && submitted) {
      localStorage.setItem("worksheet-score", score.toString());
    }
  }, [name, answers, submitted, score]);

  // Load score from localStorage if submitted
  useEffect(() => {
    if (submitted) {
      const savedScore = localStorage.getItem("worksheet-score");
      if (savedScore) {
        setScore(parseInt(savedScore, 10));
      }
    }
  }, [submitted]);

  // Calculate score based on selected answers
  const calculateScore = () => {
    if (!name.trim()) {
      alert("Please enter your name before submitting");
      return;
    }

    let correctCount = 0;
    questionsData.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
  };

  // Reset the worksheet
  const resetWorksheet = () => {
    setAnswers({});
    setScore(null);
    setSubmitted(false);

    // Clear localStorage items
    localStorage.removeItem("worksheet-answers");
    localStorage.removeItem("worksheet-submitted");
    localStorage.removeItem("worksheet-score");
    // Don't clear the name to keep it convenient for the user
  };

  // Handle selecting an answer
  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="app">
      <div className="worksheet">
        <Header name={name} setName={setName} score={score} />

        {submitted ? (
          <Results
            score={score}
            totalQuestions={questionsData.length}
            onReset={resetWorksheet}
          />
        ) : (
          <>
            <div className="questions-container">
              {questionsData.map((question) => (
                <Question
                  key={question.id}
                  questionData={question}
                  selectedAnswer={answers[question.id]}
                  onSelect={(optionId) =>
                    handleSelectAnswer(question.id, optionId)
                  }
                  disabled={submitted}
                />
              ))}
            </div>

            <div className="action-buttons">
              <button className="reset-button" onClick={resetWorksheet}>
                Reset
              </button>

              <button className="submit-button" onClick={calculateScore}>
                Submit
              </button>
            </div>
          </>
        )}

        <footer className="footer">
          <p>copyright: www.mathinenglish.com</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
