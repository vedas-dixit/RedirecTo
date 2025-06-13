from fastapi import APIRouter, HTTPException, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from utils.verifyJWT import verify_supabase_token

router = APIRouter()
security = HTTPBearer()
load_dotenv()

# Pydantic models
class CreateUrlRequest(BaseModel):
    long_url: str

class CreateUrlResponse(BaseModel):
    short_url: str
    long_url: str
    user_id: str

@router.post("/create-url", response_model=CreateUrlResponse)
async def create_url(
    request: CreateUrlRequest, 
    user: dict = Depends(verify_supabase_token)
):
    """
    Create a shortened URL - requires valid Supabase authentication
    """
    try:
        # If we reach here, user is verified
        user_id = user.get("id") or user.get("sub")  # 'sub' for JWT, 'id' for API response
        user_email = user.get("email")
        
        print(f"Creating URL for verified user: {user_email}")
        
        # Your URL shortening logic here
        # For now, just return a mock response
        short_url = f"https://redirecto/{hash(request.long_url) % 100000}" #dummy fo now dont worry about this
        
        return CreateUrlResponse(
            short_url=short_url,
            long_url=request.long_url,
            user_id=user_id
        )
        
    except Exception as e:
        print(f"Error creating URL: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create URL")