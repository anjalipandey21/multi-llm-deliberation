from app.schemas.models import DeliberationResponse
from app.providers.mock_providers import (
    get_openai_mock_response,
    get_anthropic_mock_response,
)
from app.scoring.engine import compute_total_score


def run_mock_deliberation(prompt: str) -> DeliberationResponse:
    candidate_1 = compute_total_score(get_openai_mock_response(prompt))
    candidate_2 = compute_total_score(get_anthropic_mock_response(prompt))

    candidates = [candidate_1, candidate_2]
    winner = max(candidates, key=lambda c: c.score.total)

    return DeliberationResponse(
        prompt=prompt,
        winner=winner,
        candidates=candidates,
        rationale=(
            f"{winner.provider} won because it achieved the highest total score "
            "across relevance, completeness, clarity, and structure."
        ),
    )