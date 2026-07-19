from fastapi import FastAPI
from fastapi.middlerware.cors import CORSMiddleware
from connector import Connector

# Create FastAPI app
app = FastAPI()

# Allow the React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:6173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inject the connector - this is dependancy injection
connector = Connector()

@app.get("/years")
def get_years():
    rows = connector.fetchYears()
    return {"years": [row[0] for row in rows]}

@app.get("/{year}/teams")
def get_teams(year: int):
    rows = connector.fetchTeams(year)
    return {"teams": [row[0] for row in rows]}

@app.get("/{year}/result")
def get_result(year: int, home: str, away: str):
    row = connector.fetchResult(year, home, away)
    if row is None:
        return {"message": "Result not found"}
    return {
        "season_year": year,
        "home_team": home,
        "away_team": away,
        "home_goals": row[0],
        "away_goals": row[1]
    }