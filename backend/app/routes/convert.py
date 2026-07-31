from fastapi import APIRouter, HTTPException


from app.services.gemini_service import convert_code
from app.schemas.convert import ConvertRequest

router = APIRouter()


@router.post("/convert")
def convert(request: ConvertRequest):

    try:
        result = convert_code(
            request.code,
            request.source_language,
            request.target_language
        )

        return {
            "source": request.source_language,
            "target": request.target_language,
            "converted_code": result
        }

    except Exception as e:
        print("ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )