import { useState, useEffect } from "react"
import "./App.css"
import ResultsView from "./ResultsView"

function App({ connector }) {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState("")
  const [teams, setTeams] = useState([])
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [result, setResult] = useState(null)

  useEffect(() => {
    connector.fetchYears()
      .then(data => setYears(data.years))
  }, [])

  useEffect(() => {
    if (selectedYear) {
      setHomeTeam("")
      setAwayTeam("")
      setResult(null)
      connector.fetchTeams(selectedYear)
        .then(data => setTeams(data.teams))
    }
  }, [selectedYear])

  useEffect(() => {
    if (homeTeam && awayTeam) {
      connector.fetchResult(selectedYear, homeTeam, awayTeam)
        .then(data => setResult(data))
    }
  }, [homeTeam, awayTeam])

  return (
    <ResultsView
      years={years}
      teams={teams}
      selectedYear={selectedYear}
      homeTeam={homeTeam}
      awayTeam={awayTeam}
      result={result}
      onYearChange={setSelectedYear}
      onHomeChange={setHomeTeam}
      onAwayChange={setAwayTeam}
    />
  )
}

export default App