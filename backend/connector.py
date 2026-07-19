import psycopg2
import json

class Connector: 

    def __init__(self, config_path="config.json"):
        with open(config_path) as f:
            config = json.load(f)

        db = config["database"]
        self.conn = psycopg2.connect(
            dbname=db["name"],
            user=db["user"],
            password=db["password"],
            host=db["host"],
            port=db["port"]
        )

    def fetchYears(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT DISTINCT season_year FROM seasons ORDER BY season_year")
        rows = cursor.fetchall()
        cursor.close()
        return rows
    
    def fetchTeams(self, year):
        cursor = self.conn.cursor()
        cursor.execute("SELECT team_name FROM teams WHERE season_year = %s ORDER BY team_name", (year,))
        rows = cursor.fetchall()
        cursor.close()
        return rows
    
    def fetchResult(self, year, home, away):
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT home_goals, away_goals FROM results WHERE season_year = %s AND home_team = %s AND away_team = %s",
            (year, home, away)
        )
        row = cursor.fetchone()
        cursor.close()
        return row