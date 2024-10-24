# Weather Application

## Frontend

1. Navigate to the frontend folder:
    ```bash
    cd frontend-weather-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm run serve
    ```

## Backend

1. Navigate to the backend folder:
    ```bash
    cd backend-weather-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node server
    ```

## Curl Requests

### 1. Historical Data Sample API
Fetch historical weather data for Moscow between two dates:
```bash
curl --location 'http://localhost:8080/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query {\r\n  getHistoricalWeather(city: \"Moscow\", fromDate: \"2024-10-23\", toDate: \"2024-10-24\") {\r\n    city\r\n    temperature\r\n    description\r\n    icon\r\n    queriedAt\r\n    date\r\n  }\r\n}\r\n","variables":{}}'
```

### 2. GetWeather Data Sample API
```bash
curl --location 'http://localhost:8080/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query {\r\n  getWeather(city: \"Moscow\") {\r\n    city\r\n    temperature\r\n    description\r\n    icon\r\n  }\r\n}\r\n\r\n","variables":{}}'
```