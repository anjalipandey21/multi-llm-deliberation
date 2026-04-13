from app.schemas.models import CandidateResponse, ScoreBreakdown


def get_openai_mock_response(prompt: str) -> CandidateResponse:
    return CandidateResponse(
        provider="openai",
        model="gpt-mock",
        response_text=f"Mock answer from OpenAI-style provider for: {prompt}",
        score=ScoreBreakdown(
            relevance=8.5,
            completeness=8.0,
            clarity=8.2,
            structure=7.8,
            total=0.0,
        ),
    )


def get_anthropic_mock_response(prompt: str) -> CandidateResponse:
    return CandidateResponse(
        provider="anthropic",
        model="claude-mock",
        response_text=f"Mock answer from Anthropic-style provider for: {prompt}",
        score=ScoreBreakdown(
            relevance=8.2,
            completeness=8.4,
            clarity=8.3,
            structure=8.1,
            total=0.0,
        ),
    )