// filepath: /Users/bradleyevans/Desktop/Budget/Front/api/index.js
// Import necessary rendering components directly from the build output
import {
  CommonEngine,
  APP_BASE_HREF,
  bootstrap,
  indexHtml, // This path must be valid in the Edge environment
  browserDistFolder, // This path must be valid in the Edge environment
} from "../dist/front/server/server.mjs"; // Adjust path relative to Vercel's output structure if needed

// Configure the function to run on the Edge Runtime
export const config = {
  runtime: "edge",
};

// Instantiate the CommonEngine. Consider if it can be instantiated once outside the handler.
// const commonEngine = new CommonEngine();

// Define the Edge Function handler
export default async function handler(request) {
  // Create a new CommonEngine instance per request for safety, unless state/caching is understood.
  const commonEngine = new CommonEngine();
  try {
    const url = new URL(request.url);
    const protocol = url.protocol.replace(":", "");
    // Get host from header or fallback to URL host
    const hostHeader = request.headers.get("host") || url.host;
    const originalUrl = url.pathname + url.search;
    // Adjust baseUrl if your app isn't served from the root
    const baseUrl = "/";

    // Log parameters for debugging path issues in Vercel logs
    console.log("Rendering params:", {
      bootstrap: typeof bootstrap, // Check if bootstrap function is loaded
      documentFilePath: indexHtml, // Check the path resolved
      url: `${protocol}://${hostHeader}${originalUrl}`,
      publicPath: browserDistFolder, // Check the path resolved
      providers: `APP_BASE_HREF: ${baseUrl}`,
    });

    // Perform SSR rendering
    const html = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml, // Critical: Ensure this file is bundled/accessible
      url: `${protocol}://${hostHeader}${originalUrl}`,
      publicPath: browserDistFolder, // Critical: Ensure this path is correct/relevant
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    });

    // Return the rendered HTML as a standard Response
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    // Log detailed error information
    console.error("Edge Function Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("Error details:", errorMessage, errorStack);

    // Return an error response
    return new Response(`Internal Server Error: ${errorMessage}`, {
      status: 500,
    });
  }
}
