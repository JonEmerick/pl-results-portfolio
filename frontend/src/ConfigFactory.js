import config from "./config.json"
import APIConnector from "./APIConnector"
import TestAPIConnector from "./TestAPIConnector"

class ConfigFactory {

    getConnector() {
        if (config.mode === "real") {
            return new APIConnector()
        } else if (config.mode === "test") {
            return new TestAPIConnector()
        } else {
            throw new Error(`Invalid mode in config.json: "${config.mode}". Must be "real" or "test".`)
        }
    }
}

export default ConfigFactory