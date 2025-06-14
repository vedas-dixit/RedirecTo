from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.db import get_session
from models.models import User
from api import guest_urls, user_urls, redirect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(user_urls.router, tags=["URL Shortener: Guest"])
app.include_router(guest_urls.router, tags=["URL Shortener: Guest"])
app.include_router(redirect.router, tags=["URL Shortener: Guest"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users")
async def read_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    users = result.scalars().all()
    return users
