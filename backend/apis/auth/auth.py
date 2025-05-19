
from utils.auth.session import decode_access_token
from fastapi import APIRouter
from dataTypes.auth.authTypes import SignInForm, SignUpForm, Token
from utils.auth.isAdmin import isAdmin
from utils.auth.signInAdmin import signInAdmin
from utils.auth.signInDealer import signInDealer
from utils.auth.registerDealer import registerDealer
router = APIRouter()


@router.post('/signin')
async def signin(form_data: SignInForm):
    if isAdmin(form_data.userID):
        status = signInAdmin(form_data)
        return status
    else:
        status = signInDealer(form_data)
        return status


@router.post('/signup')
async def signup(form_data: SignUpForm):
    status = registerDealer(form_data)
    return status


@router.post('/verify')
async def verify(token: Token):
    print("token is", token)
    userDetails = decode_access_token(token.token)
    return userDetails
