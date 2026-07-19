import psycopg2
import json

class Connector:

    def __init__(self, config_path="config.json"):
        with open(config_path) as f:
            config = json.load(f)
        self.db_config = config["database"]

    def get_connection(self):
        return psycopg2.connect(
            dbname=self.db_config["name"],
            user=self.db_config["user"],
            password=self.db_config["password"],
            host=self.db_config["host"],
            port=self.db_config["port"]
        )

    def fetchYears(self):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT DISTINCT season_year FROM seasons ORDER BY season_year"
        )
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows

    def fetchTeams(self, year):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT team_name FROM seasons WHERE season_year = %s ORDER BY team_name",
            (year,)
        )
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows

    def fetchResult(self, year, home, away):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT home_goals, away_goals FROM results WHERE season_year = %s AND home_team = %s AND away_team = %s",
            (year, home, away)
        )
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return row