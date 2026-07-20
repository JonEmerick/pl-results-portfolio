import config from "./config.json"

class APIConnector {

    fetchYears() {
        return fetch(`${config.base_url}/years`)
            .then(res => res.json())
    }

    fetchTeams(year) {
        return fetch(`${config.base_url}/${year}/teams`)
            .then(res => res.json())
    }

    fetchResult(year, home, away) {
        return fetch(`${config.base_url}/${year}/results?home=${home}&away=${away}`)
            .then(res => res.json())
    }
}

export default APIConnector