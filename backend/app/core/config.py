from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("Redirecto", "FastAPI App")

settings = Settings()
