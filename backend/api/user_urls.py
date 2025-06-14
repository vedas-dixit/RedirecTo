from fastapi import APIRouter, HTTPException, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from utils.verifyJWT import verify_supabase_token
from api.users import create_user_if_not_exists
from database.db import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from utils.generateUrl import generate_short_code

router = APIRouter()
security = HTTPBearer()
load_dotenv()

# Pydantic models
class UserPayload(BaseModel):
    id: str                          # <-- Guest UUID (primary key now)
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
    session: AsyncSession = Depends(get_session) 
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
            "provider_id": payload.provider_id  # This is the key fix
        }
        
        db_user = await create_user_if_not_exists(user_payload, session)
        
        print(f"DBUSER CREATED: {session}")
        print(f"user_id: {user_payload['provider_id']}")
        short_code = "generate_short_code(str(user.id), 11)"
        # Your URL shortening logic here
        short_url = f"https://redirecto/{short_code}"
        
        return CreateUrlResponse(
            short_url=short_url,
            long_url=request.long_url,
            user_id=payload.id
        )
        
    except Exception as e:
        print(f"Error creating URL: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create URL")