from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

# initialize Supabase client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# user related operations
def get_all_users():
    return supabase.table("users").select("*").execute().data

def get_user_by_username(username):
    return supabase.table("users").select("*").eq("username", username).execute()

def create_user(username, elo=1400):
    return supabase.table("users").insert({"username": username, "elo": elo}).execute()

def update_user_elo(username, new_elo):
    return supabase.table("users").update({"elo": int(new_elo)}).eq("username", username).execute()

# match related operations
def get_all_matches():
    return supabase.table("matches").select("*").execute().data

def record_match(player1_username, player2_username, winner_username):
    return supabase.table("matches").insert({
        "player1_username": player1_username,
        "player2_username": player2_username,
        "winner_username": winner_username,
    }).execute()