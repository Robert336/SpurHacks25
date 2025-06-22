from authentication import *
from groupmanager import *

login("abcd@gmail.com", "George_123")
print(f"uid = {get_uid()}")

start_group("a", "b", "ccccccccc")
print("sample script completed")
