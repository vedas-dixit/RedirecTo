from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.models import URL
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from datetime import datetime, timedelta, timezone
from utils.generateUrl import generate_short_code


async def add_url_for_user(
    *, session: AsyncSession, user_id: str, long_url: str, is_guest: bool
) -> URL:

    print(user_id, long_url, is_guest)
    try:
        # Step 1: Check if this user has already shortened this URL
        stmt = select(URL).where(URL.user_id == user_id, URL.destination == long_url)
        result = await session.execute(stmt)
        existing_url = result.scalars().first()

        if existing_url:
            raise HTTPException(
                status_code=409, detail="URL already shortened by this user."
            )

        # Step 2: Count how many URLs this user has created
        count_stmt = select(URL).where(URL.user_id == user_id)
        result = await session.execute(count_stmt)
        user_urls = result.scalars().all()

        # Step 2.5: Enforce guest URL limit
        if is_guest and len(user_urls) >= 5:
            raise HTTPException(
                status_code=403, detail="Guest user limit exceeded (max 5 URLs)"
            )

        # Step 3: Generate unique short code based on index
        short_code = generate_short_code(user_id, len(user_urls) + 1)

        # Step 4: Create the new URL object
        now_utc = datetime.now(timezone.utc)
        new_url = URL(
            user_id=user_id,
            short_code=short_code,
            destination=long_url,
            is_protected=False,
            expires_at=None if not is_guest else now_utc + timedelta(hours=24),
            click_limit=None,
            created_at=now_utc,
        )

        session.add(new_url)
        await session.commit()
        await session.refresh(new_url)

        return new_url

    except SQLAlchemyError as e:
        await session.rollback()
        print(f"Database error in add_url_for_user: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error")

    except Exception as e:
        await session.rollback()
        print(f"Unexpected error in add_url_for_user: {str(e)}")
        raise
