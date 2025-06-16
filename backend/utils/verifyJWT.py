from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import APIRouter, HTTPException, Depends
import os
import jwt
from jwt import PyJWTError

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
security = HTTPBearer()


async def verify_supabase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Verify Supabase JWT token and return user info
    """
    token = credentials.credentials

    try:
        if SUPABASE_JWT_SECRET:
            try:
                payload = jwt.decode(
                    token,
                    SUPABASE_JWT_SECRET,
                    algorithms=["HS256"],
                    audience="authenticated",
                )
                print(f"Welcome user: {payload.get('email', 'Unknown')}")
                return payload
            except PyJWTError as e:
                print(f"JWT verification failed: {e}")
                return None

    except Exception as e:
        print(f"Unverified user - Error: {str(e)}")
        raise HTTPException(status_code=401, detail="Authentication failed")
