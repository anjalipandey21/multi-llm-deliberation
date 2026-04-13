"use client";

import { useState } from "react";
import { runDeliberation } from "@/lib/api";
import type { DeliberationResponse } from "@/types/deliberation";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<DeliberationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await runDeliberation(prompt);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to run deliberation. Check backend is running on port 8001.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Multi-LLM Deliberation</h1>
          <p className="text-slate-300">
            Compare multiple model responses, score them, and return the strongest answer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-200">
            Enter your prompt
          </label>

          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Explain the difference between Kafka and RabbitMQ"
            className="min-h-[140px] w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-500 disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Deliberation"}
          </button>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="space-y-6">
            <section className="rounded-2xl border border-emerald-700/30 bg-emerald-500/10 p-6">
              <h2 className="text-2xl font-semibold text-emerald-300">Winner</h2>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Provider:</span> {result.winner.provider}
                </p>
                <p>
                  <span className="font-semibold">Model:</span> {result.winner.model}
                </p>
                <p>
                  <span className="font-semibold">Total Score:</span>{" "}
                  {result.winner.score.total}
                </p>
                <p className="text-slate-200">{result.winner.response_text}</p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-semibold">Why this answer won</h2>
              <p className="mt-3 text-slate-300">{result.rationale}</p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-semibold">All Candidates</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {result.candidates.map((candidate) => (
                  <div
                    key={`${candidate.provider}-${candidate.model}`}
                    className="rounded-xl border border-slate-700 bg-slate-950 p-4"
                  >
                    <div className="mb-3 space-y-1">
                      <p>
                        <span className="font-semibold">Provider:</span> {candidate.provider}
                      </p>
                      <p>
                        <span className="font-semibold">Model:</span> {candidate.model}
                      </p>
                    </div>

                    <p className="mb-4 text-slate-300">{candidate.response_text}</p>

                    <div className="space-y-1 text-sm text-slate-300">
                      <p>Relevance: {candidate.score.relevance}</p>
                      <p>Completeness: {candidate.score.completeness}</p>
                      <p>Clarity: {candidate.score.clarity}</p>
                      <p>Structure: {candidate.score.structure}</p>
                      <p className="font-semibold text-white">
                        Total: {candidate.score.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}