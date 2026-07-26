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
    const data = connector.fetchYears()
    if (data.then) {
      data.then(d => setYears(d.years))
    } else {
      setYears(data.years)
    }
  }, [])

  useEffect(() => {
    if (selectedYear) {
      setHomeTeam("")
      setAwayTeam("")
      setResult(null)
      const data = connector.fetchTeams(selectedYear)
      if (data.then) {
        data.then(d => setTeams(d.teams))
      } else {
        setTeams(data.teams)
      }
    }
  }, [selectedYear])

  useEffect(() => {
    if (homeTeam && awayTeam) {
      const data = connector.fetchResult(selectedYear, homeTeam, awayTeam)
      if (data.then) {
        data.then(d => setResult(d))
      } else {
        setResult(data)
      }
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