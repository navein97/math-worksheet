import React from "react";
import "./Header.css"; // We'll create this file next

function Header({ name, setName, score }) {
  return (
    <header className="header">
      <h1>Rounding Off to Nearest 10</h1>
      <div className="student-info">
        <div className="name-input">
          <label htmlFor="student-name">Name:</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="score-display">
          Score: <span>{score !== null ? score : "___"}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
