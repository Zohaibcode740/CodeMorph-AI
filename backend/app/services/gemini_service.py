import google.generativeai as genai
from app.config.settings import GEMINI_API_KEY


genai.configure(
    api_key=GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.0-flash"
)
def convert_code(code, source, target):

    print("API KEY LOADED:", GEMINI_API_KEY is not None)

    prompt = f"""
Convert this {source} code into {target}.

Rules:
- Return only code.
- No explanation.

Code:

{code}
"""

    response = model.generate_content(prompt)

    return response.text