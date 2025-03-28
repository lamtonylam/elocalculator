from fastapi import FastAPI
from pydantic import BaseModel

# import supabase
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

# import elo_calculator
from elo_calculator import calculate_elo

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()


class Match_post(BaseModel):
    player1_username: str
    player2_username: str
    winner: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users")
async def get_users():
    users = supabase.table("users").select("*").execute()
    return users.data


@app.get("/matches")
async def get_matches():
    matches = supabase.table("matches").select("*").execute()
    return matches.data


@app.post("/elo")
async def process_elo(match_data: Match_post):
    player1_username = match_data.player1_username
    player2_username = match_data.player2_username
    winner = match_data.winner

    # check if user exists, if not create user
    player1 = (
        supabase.table("users").select("*").eq("username", player1_username).execute()
    )
    if player1.data == []:
        supabase.table("users").insert(
            {"username": player1_username, "elo": 1400}
        ).execute()
        player1 = (
            supabase.table("users")
            .select("*")
            .eq("username", player1_username)
            .execute()
        )

    player2 = (
        supabase.table("users").select("*").eq("username", player2_username).execute()
    )
    if player2.data == []:
        supabase.table("users").insert(
            {"username": player2_username, "elo": 1400}
        ).execute()
        player2 = (
            supabase.table("users")
            .select("*")
            .eq("username", player2_username)
            .execute()
        )

    # check that winners are not the same
    if player1_username == player2_username:
        return {"error": "Players cannot be the same"}

    # calculate elo
    player1_elo = player1.data[0]["elo"]
    player2_elo = player2.data[0]["elo"]
    new_player1_elo, new_player2_elo = calculate_elo(
        player1_username, player2_username, player1_elo, player2_elo, winner
    )

    # update elo in database
    supabase.table("users").update({"elo": int(new_player1_elo)}).eq(
        "username", player1_username
    ).execute()
    supabase.table("users").update({"elo": int(new_player2_elo)}).eq(
        "username", player2_username
    ).execute()

    # record match
    supabase.table("matches").insert(
        {
            "player1_username": player1_username,
            "player2_username": player2_username,
            "winner_username": winner,
        }
    ).execute()

    return {
        "player1_username": player1_username,
        "player2_username": player2_username,
        "winner_username": winner,
        "new_player1_elo": float(new_player1_elo),
        "new_player2_elo": float(new_player2_elo),
    }
