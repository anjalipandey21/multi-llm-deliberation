export type ScoreBreakdown = {
  relevance: number;
  completeness: number;
  clarity: number;
  structure: number;
  total: number;
};

export type CandidateResponse = {
  provider: string;
  model: string;
  response_text: string;
  score: ScoreBreakdown;
};

export type DeliberationResponse = {
  prompt: string;
  winner: CandidateResponse;
  candidates: CandidateResponse[];
  rationale: string;
};