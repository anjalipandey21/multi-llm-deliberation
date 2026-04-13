from fastapi import FastAPI
from app.schemas.models import PromptRequest, DeliberationResponse
from app.orchestration.service import run_mock_deliberation

app = FastAPI(
    title="Multi-LLM Deliberation API",
    version="0.1.0",
    description="Backend service for orchestrating and evaluating multiple LLM responses.",
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "api",
        "version": "0.1.0",
    }


@app.post("/api/deliberations/run", response_model=DeliberationResponse)
def run_deliberation(request: PromptRequest):
    return run_mock_deliberation(request.prompt)