from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt

SKEY = "RDBDEFOVJSNOVRBFO"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires: Optional[timedelta] = None):
    to_encode = data.copy()
    
    if expires:
        expire = datetime.utcnow() + expires
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded = jwt.encode(to_encode, SKEY, algorithm=ALGORITHM)
    return encoded
    
def decode_token(token: str = Depends(oauth2_scheme)):
    cre_exception = HTTPException(401,detail="Could not validate credential")
    
    try:
        payload = jwt.decode(token, SKEY, algorithms = [ALGORITHM])
    except JWTError:
        payload = cre_exception
    return payload