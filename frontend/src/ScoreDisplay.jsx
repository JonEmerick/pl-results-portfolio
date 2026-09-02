function ScoreDisplay({ result }) {
    if (!result) return null

    return (
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
    )
}

export default ScoreDisplay