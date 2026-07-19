import config from "./config.json"
import TestAPIConnector from "./TestAPIConnector"

const BASE_URL = "http://127.0.0.1:8000"

class APIConnector {

    constructor() {
        if (config.mode === "test") {
            this.connector = new TestAPIConnector()
        } else {
            this.connector = null
        }
    }

    fetchYears() {
        if (this.connector) {
            return this.connector.fetchYears()
        }
        return fetch(`${BASE_URL}/years`)
            .then(res => res.json())
    }

    fetchTeams(year) {
        if (this.connector) {
            return this.connector.fetchTeams(year)
        }
        return fetch(`${BASE_URL}/${year}/teams`)
            .then(res => res.json())
    }

    fetchResult(year, home, away) {
        if (this.connector) {
            return this.connector.fetchResults(year, home, away)
        }
        return fetch(`${BASE_URL}/${year}/results?home=${home}&away=${away}`)
            .then(res => res.json())
    }
}

export default APIConnector