import type { DeliberationResponse } from "@/types/deliberation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8001";

export async function runDeliberation(
  prompt: string
): Promise<DeliberationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/deliberations/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}