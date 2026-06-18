-- Create seasons table
CREATE TABLE seasons (
    season_year INT NOT NULL,
    team_name   VARCHAR(100) NOT NULL,
    PRIMARY KEY (season_year, team_name)
);

-- Create results table
CREATE TABLE results (
    id          SERIAL PRIMARY KEY,
    season_year INT NOT NULL,
    home_team   VARCHAR(100) NOT NULL,
    away_team   VARCHAR(100) NOT NULL,
    home_goals  INT NOT NULL,
    away_goals  INT NOT NULL