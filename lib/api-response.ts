import { ZodError } from "zod";

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export function zodErrorResponse(error: ZodError) {
  const message = error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    })
    .join("; ");

  return jsonError(message, 400);
}

export function rateLimitResponse(retryAfterMs: number) {
  return Response.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(retryAfterMs / 1000)),
      },
    },
  );
}