// Import the express app instance from the server bundle
import appPromise from "../dist/front/server/server.mjs";

// Vercel expects a function that handles the request,
// or it can directly handle common framework instances like Express.
// We resolve the promise and export the app instance.
// Vercel's runtime will handle invoking the Express app correctly.
export default async (req, res) => {
  try {
    const app = await appPromise;
    // Let the Express app instance handle the request
    return app(req, res);
  } catch (error) {
    console.error("Failed to load or run server module:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }
};
