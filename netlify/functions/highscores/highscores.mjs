// Simple in-memory database (will reset on serverless function cold start)
let highScores = [
  { name: "Test User", score: 10, date: new Date().toISOString() },
];

exports.handler = async function (event) {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    // Handle OPTIONS request (CORS preflight)
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
      };
    }

    // Handle GET request
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ highScores }),
      };
    }

    // Handle POST request
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);

      if (!body.name || body.score === undefined) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Name and score are required" }),
        };
      }

      // Add new score
      highScores.push({
        name: body.name,
        score: Number(body.score),
        date: new Date().toISOString(),
      });

      // Sort by score (highest first)
      highScores.sort((a, b) => b.score - a.score);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, highScores }),
      };
    }

    // Handle unsupported HTTP methods
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server error: " + error.message }),
    };
  }
};
