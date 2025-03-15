import React, { useState, useEffect } from "react";
import "./HighScores.css";

function HighScores() {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch high scores whenever the component is displayed
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/netlify/functions/highscores/highscores"
        );
        const data = await response.json();

        if (data.highScores) {
          setHighScores(data.highScores);
        }
      } catch (err) {
        console.error("Error fetching high scores:", err);
        setError("Failed to load high scores");
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, []); // Empty dependency array means this runs once when component mounts

  if (loading)
    return <div className="high-scores-loading">Loading high scores...</div>;
  if (error) return <div className="high-scores-error">{error}</div>;

  return (
    <div className="high-scores">
      <h2>High Scores</h2>
      {highScores.length === 0 ? (
        <p>No high scores yet. Be the first!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HighScores;
