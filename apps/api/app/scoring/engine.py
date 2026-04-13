from app.schemas.models import CandidateResponse


def compute_total_score(candidate: CandidateResponse) -> CandidateResponse:
    total = round(
        (
            candidate.score.relevance
            + candidate.score.completeness
            + candidate.score.clarity
            + candidate.score.structure
        )
        / 4,
        2,
    )
    candidate.score.total = total
    return candidate