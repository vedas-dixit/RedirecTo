from fastapi import FastAPI
from app.api import ping
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Register routes
app.include_router(ping.router)
