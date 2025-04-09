from pydantic import BaseModel


class MatchPost(BaseModel):
    player1_username: str
    player2_username: str
    winner: str


class Match(BaseModel):
    id: int
    created_at: str
    player1_username: str
    player2_username: str
    winner_username: str


class User(BaseModel):
    id: int
    created_at: str
    username: str
    elo: int
