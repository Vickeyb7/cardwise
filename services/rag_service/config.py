import os
from dotenv import load_dotenv

# Load variables from root .env or local .env
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
HUGGINGFACE_EMBEDDING_MODEL = os.getenv("HUGGINGFACE_EMBEDDING_MODEL", "BAAI/bge-base-en-v1.5")
CHROMA_PATH = os.getenv("CHROMA_PATH", "./data/chroma")
PORT = int(os.getenv("FASTAPI_PORT", "8000"))
HOST = os.getenv("FASTAPI_HOST", "0.0.0.0")
