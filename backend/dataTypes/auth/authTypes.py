from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class SignInForm(BaseModel):
    userID: str
    password: str


class DealerType(str, Enum):
    bronze = "bronze"
    silver = "silver"
    gold = "gold"
    platinum = "platinum"


class SignUpForm(BaseModel):
    phone: int
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    password: str = "abcdefgh"
    company_name: str
    gst_number: Optional[int] = None
    address: str
    pin_code: int
    dealer_type: DealerType
