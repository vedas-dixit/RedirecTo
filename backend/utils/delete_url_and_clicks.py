from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete
from models.models import Click, URL  # adjust import paths based on your project
from fastapi import HTTPException


async def delete_url_and_clicks(session: AsyncSession, url_id: str) -> None:
    # First, delete all clicks for this URL
    await session.execute(delete(Click).where(Click.url_id == url_id))

    # Then, delete the URL itself
    result = await session.execute(delete(URL).where(URL.id == url_id))

    # Check if a row was actually deleted
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="URL not found")

    await session.commit()