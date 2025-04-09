from pydantic import BaseModel


class MatchPost(BaseModel):
    player1_username: str
    player2_username: str
    winner: str

