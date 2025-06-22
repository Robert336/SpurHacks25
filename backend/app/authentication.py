import os

import gotrue
from gotrue.errors import AuthApiError
from supabase import create_client, Client
from typing import Optional
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase_cl: Client = create_client(url, key)

# GLOBAL VARIABLE TO REPRESENT THE CURRENTLY-LOGGED-IN USER
uid = None


def login(email: str, password: str) -> Optional[gotrue.AuthResponse]:
    """
    A function to authenticate a user logging into an existing account.
    :param email: the email the user wants to log in with.
    :param password: the password to the account registered under this email.
    :return: user on successful login, None on bad credentials
    """
    global uid
    try:
        user = supabase_cl.auth.sign_in_with_password({"email": email, "password": password})
        if user and user.user:
            uid = user.user.id
        print(uid)
        return user
    except AuthApiError:
        return None


def logout():
    """
    A function to log a user out of QuestFlat
    :return:
    """
    global uid
    uid = None
    supabase_cl.auth.sign_out()


def signup(email: str, password: str) -> Optional[gotrue.AuthResponse]:
    """
    A function to sign this user up for this application.
    :param email: the email the user wants themselves to get registered with.
    :param password: the password to this new account.
    :return: user on success, None on already-existing-account
    """
    global uid
    try:
        user = supabase_cl.auth.sign_up({"email": email, "password": password})
        if user and user.user:
            uid = user.user.id
        return user
    except AuthApiError:
        return None


def get_uid() -> Optional[str]:
    """
    Gets the id of the user currently logged in.
    :return: the userid.
    """
    user = supabase_cl.auth.get_user()
    if user and user.user:
        return user.user.id
    return None
