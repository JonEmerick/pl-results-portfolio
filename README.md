# Premier League Historic Results

A full-stack web application that allows users to look up the result of any Premier League match from any season in the competition's history, spanning from the inaugural 1992/93 season through to the 2025/26 season.

The user selects a season from a dropdown, which dynamically populates a home and away team selector with the clubs that played in that particular year. On selecting both teams, the application instantly retrieves and displays the final score from that fixture.

The application covers all 34 seasons of Premier League history, comprising over 13,000 match results across more than 50 clubs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Front-end | React.js (Vite) |
| Styling | CSS |
| Back-end | Python + FastAPI |
| Database | PostgreSQL |
| Version Control | Git + GitHub |

---

## Architecture

This project was built with a focus on clean software architecture and industry-standard design patterns.

### Front-end

The front-end follows an **MVC pattern**, separating concerns across multiple layers:

- **`main.jsx`** — Entry point. Uses a **Factory pattern** (`ConfigFactory`) to decide which connector to inject into the application, enabling true **Dependency Injection**.
- **`App.jsx`** — Controller. Manages application state and data fetching via the injected connector.
- **`ResultsView.jsx`** — Composes the two presentation components.
- **`TeamSelector.jsx`** — Presentation component for the season and team dropdowns.
- **`ScoreDisplay.jsx`** — Presentation component for the result display.
- **`APIConnector.js`** — Wraps all real `fetch()` calls to the back-end API.
- **`TestAPIConnector.js`** — A mock connector returning fake data, allowing the front-end to be developed and tested independently of the back-end.
- **`ConfigFactory.js`** — Factory class that reads `config.json` and returns the appropriate connector.

### Back-end

The back-end follows an **interface/implementation separation** pattern:

- **`main.py`** — Clean, readable business logic. Endpoint functions are deliberately concise so the intent is immediately clear.
- **`connector.py`** — Hides all SQL and database logic behind clearly named methods (`fetchYears`, `fetchTeams`, `fetchResult`). Uses a shared `execute_query` helper to avoid repeating connection/cursor/close logic (**DRY principle**).
- **`config.json`** — Holds all environment-specific configuration (database credentials, CORS origins) outside of the codebase, following the principle that **business code should never contain configuration details**.

### Key Design Patterns Implemented

- **Dependency Injection** — `App.jsx` receives its connector from `main.jsx` via props, with no knowledge of whether it is real or a test mock.
- **Factory Pattern** — `ConfigFactory` is the single point of responsibility for deciding which connector to instantiate.
- **MVC Separation** — Controller (`App.jsx`), View (`ResultsView`, `TeamSelector`, `ScoreDisplay`) and Model (connector layer) are clearly separated.
- **DRY Principle** — Repeated database connection logic extracted into shared helper methods.
- **Configuration over Code** — All environment-specific details live in config files, never in source code.
- **Single Responsibility Principle** — Each class and component has one clearly defined job.

---

## Data

Match result data was sourced from [football-data.co.uk](https://www.football-data.co.uk), which provides free CSV downloads for every Premier League season. A Python import script (`import_data.py`) was written to automatically download and parse all available seasons (1993/94 onwards) and insert them into the PostgreSQL database. The 1992/93 inaugural season was added manually from verified historical records.

---

## Running the Project Locally

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL

### Back-end Setup

1. Clone the repository:
```bash
git clone https://github.com/JonEmerick/pl-results.git
cd pl-results
```

2. Install Python dependencies:
```bash
pip install fastapi uvicorn psycopg2-binary
```

3. Create a PostgreSQL database called `pl_results` and run the schema from `db/seed.sql`.

4. Create `backend/config.json` with your database credentials:
```json
{
    "database": {
        "name": "pl_results",
        "user": "postgres",
        "password": "your_password_here",
        "host": "localhost",
        "port": "5432"
    },
    "cors": {
        "origins": ["http://localhost:5173"]
    }
}
```

5. Start the back-end server:
```bash
cd backend
uvicorn main:app --reload
```

### Front-end Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set the mode in `frontend/src/config.json`:
```json
{
    "mode": "real",
    "base_url": "http://127.0.0.1:8000"
}
```

3. Start the front-end:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

---

## Test Mode

The application supports a **test mode** that runs the front-end completely independently of the back-end — no database or server required. Simply change `frontend/src/config.json` to:

```json
{
    "mode": "test",
    "base_url": "http://127.0.0.1:8000"
}
```

The `TestAPIConnector` will serve a small set of fake data, allowing front-end development and testing without any back-end dependency.

---

## Project Structure

```
pl-results/
├── backend/
│   ├── main.py            # FastAPI application and endpoints
│   ├── connector.py       # Database connector class
│   └── import_data.py     # Data import script
├── frontend/
│   └── src/
│       ├── main.jsx           # Entry point and dependency injection
│       ├── App.jsx            # Controller
│       ├── ResultsView.jsx    # View composition
│       ├── TeamSelector.jsx   # Dropdown presentation component
│       ├── ScoreDisplay.jsx   # Result display component
│       ├── APIConnector.js    # Real API connector
│       ├── TestAPIConnector.js# Mock test connector
│       ├── ConfigFactory.js   # Factory for connector selection
│       └── config.json        # Front-end configuration
└── db/
    └── seed.sql           # Database schema
```
