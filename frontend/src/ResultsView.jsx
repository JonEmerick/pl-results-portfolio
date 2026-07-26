function ResultsView({ 
    years, 
    teams, 
    selectedYear, 
    homeTeam, 
    awayTeam, 
    result,
    onYearChange,
    onHomeChange,
    onAwayChange
}) {
    return (
        <div className="app">
            <h1>Premier League Historic Results</h1>
            <p className="subtitle">Select a season and two teams to see the result</p>

            <div className="selectors">

                <div className="selector">
                    <label>Season</label>
                    <select value={selectedYear} onChange={e => onYearChange(e.target.value)}>
                        <option value="">Select a Season</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}/{year + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="selector">
                    <label>Home Team</label>
                    <select value={homeTeam} onChange={e => onHomeChange(e.target.value)} disabled={!selectedYear}>
                        <option value="">Select home team</option>
                        {teams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>

                <div className="selector">
                    <label>Away Team</label>
                    <select value={awayTeam} onChange={e => onAwayChange(e.target.value)} disabled={!homeTeam}>
                        <option value="">Select away team</option>
                        {teams.filter(team => team !== homeTeam).map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>

            </div>

            {result && (
                <div className="result">
                    {result.message ? (
                        <p>{result.message}</p>
                    ) : (
                        <div className="scoreline">
                            <span className="team">{result.home_team}</span>
                            <span className="score">{result.home_goals} - {result.away_goals}</span>
                            <span className="team">{result.away_team}</span>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default ResultsView