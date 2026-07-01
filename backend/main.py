from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

# Create the FastAPI app
app = FastAPI()

# Allow the React front-end to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection details
DB_NAME = "pl_results"
DB_USER = "postgres"
DB_PASSWORD = "Neil_Project"
DB_HOST = "localhost"
DB_PORT = "5432"

def get_db_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )

@app.get("/years")
def get_years():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT DISTINCT season_year FROM seasons ORDER BY season_year")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"years": [row[0] for row in rows]}

@app.get("/{year}/results")
def get_results(year: int, home: str, away: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT home_goals, away_goals FROM results WHERE season_year = %s AND home_team = %s AND away_team = %s",
        (year, home, away)
    )
    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if row is None:
        return {"message": "No result found"}

    return {
        "season_year": year,
        "home_team": home,
        "away_team": away,
        "home_goals": row[0],
        "away_goals": row[1]
    }