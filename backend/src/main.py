from fastapi import FastAPI
from pydantic import BaseModel

# import functions from our supabase module
from lib.supabase import (
    get_all_users,
    get_all_matches,
    get_user_by_username,
    create_user,
    update_user_elo,
    record_match
)

# import elo_calculator
from elo_calculator import calculate_elo

app = FastAPI()


class MatchPost(BaseModel):
    player1_username: str
    player2_username: str
    winner: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users")
async def get_users():
    users = get_all_users()
    return users


@app.get("/matches")
async def get_matches():
    matches = get_all_matches()
    return matches


@app.post("/elo")
async def process_elo(match_data: MatchPost):
    player1_username = match_data.player1_username
    player2_username = match_data.player2_username
    winner = match_data.winner

    # check if user exists, if not create user
    player1 = get_user_by_username(player1_username)
    if player1.data == []:
        create_user(player1_username)
        player1 = get_user_by_username(player1_username)

    player2 = get_user_by_username(player2_username)
    if player2.data == []:
        create_user(player2_username)
        player2 = get_user_by_username(player2_username)

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
    update_user_elo(player1_username, new_player1_elo)
    update_user_elo(player2_username, new_player2_elo)

    # record match
    record_match(player1_username, player2_username, winner)

    return {
        "player1_username": player1_username,
        "player2_username": player2_username,
        "winner_username": winner,
        "new_player1_elo": float(new_player1_elo),
        "new_player2_elo": float(new_player2_elo),
    }
