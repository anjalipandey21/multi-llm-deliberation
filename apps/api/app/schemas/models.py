from pydantic import BaseModel, Field
from typing import List


class PromptRequest(BaseModel):
    prompt: str = Field(..., min_length=1, description="User input prompt")


class ScoreBreakdown(BaseModel):
    relevance: float
    completeness: float
    clarity: float
    structure: float
    total: float


class CandidateResponse(BaseModel):
    provider: str
    model: str
    response_text: str
    score: ScoreBreakdown


class DeliberationResponse(BaseModel):
    prompt: str
    winner: CandidateResponse
    candidates: List[CandidateResponse]
    rationale: str