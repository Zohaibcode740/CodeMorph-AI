from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import convert


app = FastAPI(
    title="CodeMorph AI",
    version="1.0.0",
    description="Convert code between programming languages using AI."
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
   
        allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API Routes
app.include_router(
    convert.router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "status": "success",
        "message": "CodeMorph AI Backend Running 🚀"
    }