import TeamSelector from "./TeamSelector"
import ScoreDisplay from "./ScoreDisplay"

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
            <TeamSelector
                years={years}
                teams={teams}
                selectedYear={selectedYear}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                onYearChange={onYearChange}
                onHomeChange={onHomeChange}
                onAwayChange={onAwayChange}
            />
            <ScoreDisplay result={result} />
        </div>
    )
}

export default ResultsView