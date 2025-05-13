from pydantic import BaseModel


class SignInForm(BaseModel):
    userID: str
    password: str
