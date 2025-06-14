from fastapi import APIRouter, HTTPException, Request, Depends,BackgroundTasks
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import uuid4
from datetime import datetime, timezone
from utils.geoip import get_country_and_flag
from models.models import URL, Click
from database.db import async_session_maker,get_session  # your session dependency

router = APIRouter()

@router.get("/{short_code}")
async def handle_redirect(
    short_code: str,
    request: Request,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
):
    # Find URL
    stmt = select(URL).where(URL.short_code == short_code)
    result = await session.execute(stmt)
    url = result.scalars().first()
    if not url:
        raise HTTPException(status_code=404, detail="Short URL not found.")

    # Launch background task for click tracking
    background_tasks.add_task(record_click, url.id, request)

    # Redirect instantly
    return RedirectResponse(url=url.destination, status_code=307)

async def record_click(url_id: str, request: Request):
    async with async_session_maker() as session:  # fresh session
        country, flag = await get_country_and_flag(request)
        click = Click(
            id=uuid4(),
            url_id=url_id,
            country=country,
            flag=flag,
            timestamp=datetime.now(timezone.utc),
        )
        session.add(click)
        await session.commit()