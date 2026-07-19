class TestAPIConnector {

    fetchYears() {
        return Promise.resolve({
            years: [1992, 1993, 2022, 2023, 2024]
        })
    }

    fetchTeams(year) {
        return Promise.resolve({
            teams: [
                "Arsenal", "Aston Villa", "Chelsea",
                "Liverpool", "Man City", "Man United",
                "Tottenham", "Everton", "Newcastle", "Wolves"
            ]
        })
    }

    fetchResults(year, home, away) {
        return Promise.resolve({
            season_year: year,
            home_team: home,
            away_team: away,
            home_goals: 2,
            away_goals: 1,
        })
    }
}

export default TestAPIConnector