from fastapi import APIRouter, HTTPException, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from utils.verifyJWT import verify_supabase_token
from api.users import create_user_if_not_exists
from database.db import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from utils.addUrl import add_url_for_user
from schemas.dashboard import CreateUrlResponse, CreateUrlRequest

router = APIRouter()
security = HTTPBearer()
load_dotenv()


@router.post("/create-url", response_model=CreateUrlResponse)
async def create_url(
    request: CreateUrlRequest,
    session: AsyncSession = Depends(get_session),
):
    """
    Create a shortened URL — supports guests and authenticated users.
    """

    try:
        payload = request.user

        user_payload = {
            "id": payload.id,
            "is_guest": payload.is_guest,
            "email": payload.email,
            "name": payload.name,
            "avatar_url": payload.avatar_url,
            "provider": payload.provider,
            "provider_id": payload.provider_id,
        }

        # Ensre user exists in DBu
        db_user = await create_user_if_not_exists(user_payload, session)

        # Create the shortened URL
        new_url = await add_url_for_user(
            session=session,
            user_id=db_user.id,
            long_url=request.long_url,
            expires_at=request.expires_at,
            click_limit=request.click_limit,
            password=request.password,
            is_guest=payload.is_guest,
            is_protected=request.is_protected,
        )

        return CreateUrlResponse(
            short_url=new_url.short_code,
            long_url=new_url.destination,
            user_id=str(db_user.id),
        )

    except Exception as e:
        print(f"Error creating URL: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create URL")
