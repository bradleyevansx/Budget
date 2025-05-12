import { environment } from "../../src/environments/environment.prod";
exports.handler = async (event, context) => {
  try {
    const response = await fetch(environment.apiUrl + "/recruiter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "recruiter" }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate JWT");
    }

    const { jwt } = await response.json();

    const redirectUrl = `https://budget.bradleyevans.dev/dashboard?jwt=${jwt}`;

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
