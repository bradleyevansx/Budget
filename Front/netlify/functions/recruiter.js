exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      "https://budget-mxxe.onrender.com/api/auth/recruiter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "recruiter" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate JWT");
    }

    const { token } = await response.json();

    const redirectUrl = `https://budget.bradleyevans.dev/dashboard?jwt=${token}`;

    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl,
      },
    };
  } catch (error) {
    console.error("Error generating JWT:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
