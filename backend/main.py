from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from connector import Connector
import json

# Load config
with open("config.json") as f:
    config = json.load(f)

# Create the FastAPI app
app = FastAPI()

# Allow the React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=config["cors"]["origins"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inject the connector 
connector = Connector()

@app.get("/years")
def get_years():
    return {"years": connector.fetchYears()}
            
@app.get("/{year}/teams")
def get_teams(year: int):
    return {"teams": connector.fetchTeams(year)}

@app.get("/{year}/results")
def get_results(year: int, home: str, away: str):
    row = connector.fetchResult(year, home, away)
    if row is None:
        return {"message": "No result found"}
    return {
        "season_year": year,
        "home_team": home,
        "away_team": away,
        "home_goals": row[0],
        "away_goals": row[1]
    }