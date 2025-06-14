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

router = APIRouter()
security = HTTPBearer()
load_dotenv()


# Pydantic models
class UserPayload(BaseModel):
    id: str  # <-- Guest UUID (primary key now)
    is_guest: bool
    email: str
    name: str
    avatar_url: str
    provider: str
    provider_id: Optional[str] = None


class CreateUrlRequest(BaseModel):
    long_url: str
    user: UserPayload


class CreateUrlResponse(BaseModel):
    short_url: str
    long_url: str
    user_id: str


@router.post("/create-url", response_model=CreateUrlResponse)
async def create_url(
    request: CreateUrlRequest,
    user: dict = Depends(verify_supabase_token),
    session: AsyncSession = Depends(get_session),
):
    """
    Create a shortened URL - requires valid Supabase authentication
    """
    payload = request.user
    try:
        # Transform JWT payload to match your create_user_if_not_exists expectations
        user_payload = {
            "id": payload.id,
            "is_guest": False,  # Since this is an authenticated user
            "email": payload.email,
            "name": payload.name,
            "avatar_url": payload.avatar_url,
            "provider": payload.provider,
            "provider_id": payload.provider_id,  # This is the key fix
        }

        db_user = await create_user_if_not_exists(user_payload, session)
        new_url = await add_url_for_user(
            session=session,
            user_id=db_user.id,
            long_url=request.long_url,
            is_guest=True,
        )
        return CreateUrlResponse(
            short_url=new_url.short_code,
            long_url=new_url.destination,
            user_id=str(db_user.id),
        )

    except Exception as e:
        print(f"Error creating URL: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create URL")
