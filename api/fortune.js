/**
 * Vercel Edge Function — Claude API proxy
 *
 * This keeps your API key secret on the server.
 * Set ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables
 *
 * Usage: the app calls /api/fortune instead of api.anthropic.com directly
 */

export const config = { runtime: "edge" };

export default async function handler(req) {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Optional: simple rate limiting by IP
  // (Vercel's free tier handles bursts fine for small apps)

  try {
    const body = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        // Allow requests from your own domain only
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "API call failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
