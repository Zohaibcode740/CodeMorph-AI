from pydantic import BaseModel


class ConvertRequest(BaseModel):
    source_language: str
    target_language: str
    code: str