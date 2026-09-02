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

    def execute_query(self, sql, params=None, isList=True):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, params)
        result = cursor.fetchall() if isList else cursor.fetchone()
        cursor.close()
        conn.close()
        return result

    def execute_queryList(self, sql, params=None):
        return self.execute_query(sql, params, isList=True)

    def execute_queryOne(self, sql, params=None):
        return self.execute_query(sql, params, isList=False)

    def fetchYears(self):
        rows = self.execute_queryList(
            "SELECT DISTINCT season_year FROM seasons ORDER BY season_year"
        )
        return [row[0] for row in rows]

    def fetchTeams(self, year):
        rows = self.execute_queryList(
            "SELECT team_name FROM seasons WHERE season_year = %s ORDER BY team_name",
            (year,)
        )
        return [row[0] for row in rows]

    def fetchResult(self, year, home, away):
        return self.execute_queryOne(
            "SELECT home_goals, away_goals FROM results WHERE season_year = %s AND home_team = %s AND away_team = %s",
            (year, home, away)
        )
