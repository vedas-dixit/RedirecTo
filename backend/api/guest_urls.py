from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from database.db import get_session
from models.models import User, URL
from utils.generateUrl import generate_short_code
from sqlalchemy.exc import SQLAlchemyError
import datetime
from api.users import create_user_if_not_exists

router = APIRouter()

# Pydantic models
class GuestUserPayload(BaseModel):
    id: str                          # <-- Guest UUID (primary key now)
    is_guest: bool
    email: Optional[str] = None
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    provider: Optional[str] = None
    provider_id: Optional[str] = None  # Not used for guests anymore

class CreateGuestUrlRequest(BaseModel):
    long_url: str
    user: GuestUserPayload

class CreateUrlResponse(BaseModel):
    short_url: str
    long_url: str
    user_id: str

@router.post("/create-url-guest", response_model=CreateUrlResponse)
async def create_url_guest(
    request: CreateGuestUrlRequest,
    session: AsyncSession = Depends(get_session)
):
    """
    Create a shortened URL for guest users — Max 5 per guest
    """
    payload = request.user
    try:
        # Transform JWT payload to match your create_user_if_not_exists expectations
        user_payload = {
            "id": payload.id,
            "is_guest": True,  # Since this is an authenticated user
            "email": payload.email,
            "name": payload.name,
            "avatar_url": payload.avatar_url,
            "provider": payload.provider,
            "provider_id": payload.provider_id  # This is the key fix
        }
        
        db_user = await create_user_if_not_exists(user_payload, session)

        # # Step 2: Count how many URLs they’ve already created
        # count_stmt = select(URL).where(URL.user_id == user.id)
        # result = await session.execute(count_stmt)
        # existing_urls = result.scalars().all()

        # if len(existing_urls) >= 5:
        #     raise HTTPException(status_code=403, detail="Guest user limit exceeded (max 5 URLs)")

        # Step 3: Generate a short code using user.id + index
        short_code = generate_short_code(str(payload.id), 11)

        # Step 4: Save the URL
        # new_url = URL(
        #     user_id=user.id,
        #     short_code=short_code,
        #     destination=request.long_url,
        #     is_protected=False,
        #     expires_at=None,
        #     click_limit=None,
        #     created_at=datetime.datetime.utcnow()
        # )

        # session.add(new_url)
        # await session.commit()
        # await session.refresh(new_url)

        return CreateUrlResponse(
            short_url=f"https://redirecto/{short_code}",
            long_url=request.long_url,
            user_id=str(payload.id)
        )

    except SQLAlchemyError as e:
        print(f"DB error in create_url_guest: {str(e)}")
        await session.rollback()
        raise HTTPException(status_code=500, detail="Database error")

    except Exception as e:
        print(f"Error in guest URL creation: {str(e)}")
        raise HTTPException(status_code=500, detail="Something went wrong")
