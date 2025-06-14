from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from database.db import get_session
from models.models import User, URL
from sqlalchemy.exc import SQLAlchemyError
import datetime
from api.users import create_user_if_not_exists
from utils.addUrl import add_url_for_user
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
        # 1. Transform payload into expected format
        user_payload = {
            "id": payload.id,
            "is_guest": True,
            "email": payload.email,
            "name": payload.name,
            "avatar_url": payload.avatar_url,
            "provider": payload.provider,
            "provider_id": payload.provider_id
        }

        # 2. Create or retrieve the user
        db_user = await create_user_if_not_exists(user_payload, session)

        # 3. Add URL and enforce guest limit inside that function
        new_url = await add_url_for_user(
            session=session,
            user_id=db_user.id,
            long_url=request.long_url,
            is_guest=True
        )

        # 4. Return the response
        return CreateUrlResponse(
            short_url=new_url.short_code,
            long_url=new_url.destination,
            user_id=str(db_user.id)
        )

    except SQLAlchemyError as e:
        print(f"DB error in create_url_guest: {str(e)}")
        await session.rollback()
        raise HTTPException(status_code=500, detail="Database error")

    except HTTPException as e:
        raise e  # Re-raise known HTTP errors like 403 or 409

    except Exception as e:
        print(f"Unexpected error in guest URL creation: {str(e)}")
        raise HTTPException(status_code=500, detail="Something went wrong")