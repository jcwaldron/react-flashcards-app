# react-flashcards-app

NPM:
    "start": "concurrently \"npm run start:server\" \"npm run start:react\"",
    "start:react": "react-scripts start",
    "start:server": "json-server --no-cors ./data/db.json"
