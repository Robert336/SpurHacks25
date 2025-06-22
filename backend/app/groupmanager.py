import os

from dotenv import load_dotenv
import authentication as ac

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

uid = None


def create_group(name: str, description: str, invitation_code: str) -> None:
    """
    Creates a new invite-only group, with the current user as admin.
    :param name: the group's name.
    :param description: the description of this group.
    :param invitation_code: the invitation code to join this group.
    :return: None
    """
    global uid
    uid = ac.get_uid()
    entry = {"name": name, "description": description, "invitation_code": invitation_code, "created_by": ac.uid}

    ac.supabase_cl.table("groups").insert(entry).execute()  # Inserts new group into table
    gid = ac.supabase_cl.table("groups").select("id").eq("created_by", uid).execute().data[0]["id"]  # Gets the group ID

    entry = {"group_id": gid, "user_id": uid, "role": "admin"}
    ac.supabase_cl.table("group_members").insert(entry).execute()


def add_roommate(email: str) -> None:
    """
    Adds a roommate to the group.
    :param email: the roommate's email.
    :return: None.
    """
    gid = ac.supabase_cl.table("group_members").select("group_id").eq("user_id", uid).execute()  # Gets the group's id

    new_uid = ac.supabase_cl.from_("users").select("id").eq("email", email).execute()  # Gets the new user's id

    entry = {"group_id": gid, "user_id": new_uid}
    ac.supabase_cl.table("group_members").insert(entry).execute()


def kick_roommate(email: str) -> None:
    """
    Kicks a roommate out of the QuestFlat group.
    :param email: the email of the member-to-be-kicked.
    :return: None
    """
    kickee_id = ac.supabase_cl.from_("users").select("id").eq("email", email).execute()
    ac.supabase_cl.table("group_members").delete("group_id").eq("user_id", kickee_id).execute()
