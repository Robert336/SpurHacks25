import datetime
import os

from supabase import create_client, Client
from dotenv import load_dotenv
from authentication import supabase_cl
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")


def create_task(title: str, description: str, success_criteria: str, reward: int) -> None:
    """
    A function to create and add a task to the tasklist.
    :param title: the task's title.
    :param description: the task's description.
    :param success_criteria: the task's success criteria.
    :param reward: the reward of the task.
    :return: None.
    """
    uid = supabase_cl.auth.get_user().user.id  # Gets the userid from the auth.users table
    gid = supabase_cl.table("group_members").select("group_id").eq("user_id", uid).execute()  # Gets the group's id
    entry = {"group_id": gid, "created_by": uid, "title": title, "description": description,
             "success_criteria": success_criteria, "reward_amount": reward}
    supabase_cl.table("tasks").insert(entry).execute()


def take_task(tid: str) -> None:
    """
    A function for the current user to select a task to do.
    :param tid: the task id.
    :return: None.
    """
    pass
