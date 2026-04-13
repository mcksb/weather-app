import type React from "react";

import {
    WiDaySunny,
    WiCloud,
    WiCloudy,
    WiFog,
    WiRainMix,
    WiSleet,
    WiShowers,
    WiRain,
    WiSnow,
    WiThunderstorm,
} from 'react-icons/wi'

const WEATHER_CODES: Record<number, string> = {
    0:  'Clear',
    1:  'Clear',
    2:  'Cloudy',
    3:  'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Drizzle',
    53: 'Drizzle',
    55: 'Drizzle',
    56: 'Freezing drizzle',
    57: 'Freezing drizzle',
    61: 'Rain',
    63: 'Rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow',
    80: 'Showers',
    81: 'Showers',
    82: 'Heavy showers',
    85: 'Snow showers',
    86: 'Snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',
    99: 'Thunderstorm',
};

const WEATHER_ICONS: Record<number, React.ComponentType<{ className?: string}>> = {
    0:  WiDaySunny,
    1:  WiDaySunny,
    2:  WiCloud,
    3:  WiCloudy,
    45: WiFog,
    48: WiFog,
    51: WiRainMix,
    53: WiRainMix,
    55: WiRainMix,
    56: WiRainMix,
    57: WiRainMix,
    61: WiRain,
    63: WiRain,
    65: WiRain,
    66: WiSleet,
    67: WiSleet,
    71: WiSnow,
    73: WiSnow,
    75: WiSnow,
    77: WiSnow,
    80: WiShowers,
    81: WiShowers,
    82: WiShowers,
    85: WiSnow,
    86: WiSnow,
    95: WiThunderstorm,
    96: WiThunderstorm,
    99: WiThunderstorm,
};

export const LOADING_PHRASES = [
    'Loading weather',
    'Checking the skies',
    'Reading the clouds',
    'Consulting the forecast',
    'Asking the weatherman',
    'Peering through the clouds',
    'Checking for rainbows',
    'Dusting off the barometer',
    'Watching the wind',
    'Sniffing the air',
    'Gazing at the horizon',
    'Checking the radar',
    'Looking out the window',
    'Waiting for the fog to clear',
    'Bribing the weatherman',
    'Feeling the breeze',
];

export function weatherStatus(weatherCode: number): string {
    return WEATHER_CODES[weatherCode] ?? 'Clear';
};

export function weatherIcons(weatherCode: number): React.ComponentType<{ className?: string}> {
    return WEATHER_ICONS[weatherCode] ?? WiDaySunny;
};

export const getCardinal = (deg: number): string => {
  if (deg >= 348.75 || deg < 11.25) return 'N';
  if (deg < 33.75) return 'NNE';
  if (deg < 56.25) return 'NE';
  if (deg < 78.75) return 'ENE';
  if (deg < 101.25) return 'E';
  if (deg < 123.75) return 'ESE';
  if (deg < 146.25) return 'SE';
  if (deg < 168.75) return 'SSE';
  if (deg < 191.25) return 'S';
  if (deg < 213.75) return 'SSW';
  if (deg < 236.25) return 'SW';
  if (deg < 258.75) return 'WSW';
  if (deg < 281.25) return 'W';
  if (deg < 303.75) return 'WNW';
  if (deg < 326.25) return 'NW';
  return 'NNW';
};