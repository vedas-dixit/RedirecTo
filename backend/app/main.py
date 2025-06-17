from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.db import get_session
from models.models import User
from api import user_urls, redirect
from api.dashboard import dashboard_overview
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(user_urls.router, tags=["URL Shortener: Guest"])
app.include_router(redirect.router, tags=["URL REDIRECTION"])
app.include_router(dashboard_overview.router, tags=["DASHBOARD SUMMARY"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users")
async def read_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    users = result.scalars().all()
    return users
