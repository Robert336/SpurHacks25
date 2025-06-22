import os

from datetime import datetime, timezone
from dotenv import load_dotenv
from authentication import supabase_cl, uid

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")


def create_task(title: str, description: str, success_criteria: str, reward: int) -> None:
    """
    A function to create and add a task to the open task table.
    :param title: the title of the task.
    :param description: the task's description.
    :param success_criteria: the task's success criteria (essentially checkpoints)
    :param reward: the reward of the task (XP or $)
    :return: None.
    """
    gid = supabase_cl.table("group_members").select("group_id").eq("user_id", uid).execute()  # Gets the group's id
    entry = {"group_id": gid, "created_by": uid, "title": title, "description": description,
             "success_criteria": success_criteria, "reward_amount": reward}
    supabase_cl.table("tasks").insert(entry).execute()


def take_task(tid: str) -> None:
    """
    A function for the current user to select a task to do.
    :param tid: the id of the task the user is going to do.
    :return: None.
    """
    current_time_utc = datetime.now(timezone.utc)  # Gets the current time

    supabase_cl.table("tasks").update({"assigned_to": uid, "assigned_at": current_time_utc.isoformat(),
                                       "status": "assigned"}).eq("id", tid).execute()  # updates the table with new info


def complete_task(tid: str) -> None:
    """
    A function for the current user to indicate task completion.
    :param tid: the id of the task the user has completed and wants to be reviewed.
    :return: None.
    """
    supabase_cl.table("tasks").delete().eq("id", tid).execute()  # DELETES THE ROW FROM THE OPEN TASKS
    supabase_cl.table("task_submissions").insert({"task_id": tid, "submitted_by": uid}).execute()
    # ADDS TASK TO REVIEW TABLE
