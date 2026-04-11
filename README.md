# Weather App

A minimal, location-aware weather app built with React and TypeScript. Displays real-time weather conditions based on the user's device location, with a clean monospace aesthetic.

## Features

- Automatic geolocation via browser API
- Real-time weather data including temperature, humidity, wind speed, wind direction, gusts, surface pressure, and precipitation probability
- Reverse geocoding to display the user's current city and country
- Live clock synced to the device's local time
- 16-point compass cardinal direction derived from wind bearing
- Dublin, Ireland as a default fallback when geolocation is unavailable

## Tech Stack

| Purpose | Library |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Weather data | [Open-Meteo](https://open-meteo.com/) |
| Reverse geocoding | [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) |
| Geolocation | [react-geolocated](https://github.com/no23reason/react-geolocated) |
| Icons | react-icons |

## Getting Started

### Prerequisites

- Node.js 18+
- A Mapbox account and access token

### Installation

```bash
git clone https://github.com/mcksb/weather-app.git
cd weather-app
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_MAPBOX_ACCESS_TOKEN=your_token_here
```

### Running Locally

```bash
npm run dev
```

## Roadmap

- Weather condition codes with descriptive labels and icons
- Hourly forecast strip
- 7-day forecast with high/low temperature chart (Recharts)
- Location search with timezone-aware clock
- Skeleton loading states
- localStorage caching
- PWA support

## Notes

Open-Meteo is used for weather data and requires no API key. The Mapbox Geocoding API is used for reverse geocoding and requires a free account.