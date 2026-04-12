import { useEffect, useState, useCallback, useContext, createContext } from 'react';
import { useGeolocated } from 'react-geolocated';
import { fetchWeatherApi } from 'openmeteo';
import type { WeatherData } from '../types';

interface WeatherContextType {
    city: string | null;
    weatherData: WeatherData | null;
    weatherError: string | null;
    locationError: string | null;
};

interface MapboxFeature {
    properties: {
        feature_type: string;
        name: string
    }
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [latitude, setLatitude] = useState<number>(53.3498);
    const [longitude, setLongitude] = useState<number>(-6.2603);
    
    // Weather data states
    const [weatherData, setWeatherData] = useState<WeatherData | null>({
        temperature: null,
        humidity: null,
        windSpeed: null,
        windDirection: null,
        windGusts: null,
        surfacePressure: null,
        precipitationProbability: null,
        weatherCode: null,
    });
    
    // Display data states
    const [city, setCity] = useState<string | null>(null);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const { coords } = useGeolocated({
        positionOptions: {
        enableHighAccuracy: false,
        },
        watchPosition: true,
        userDecisionTimeout: 5000,
    })

    const weatherFetch = useCallback(async () => {
        const url = 'https://api.open-meteo.com/v1/forecast';
        const params = {
        latitude: latitude,
        longitude: longitude,
        hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
            "surface_pressure",
            "precipitation_probability",
            "weather_code",
        ],
        forecast_days: 1,
        }
        const responses = await fetchWeatherApi(url, params)
        const response = responses[0];

        const latitudeRes = response.latitude();
        const longitudeRes = response.longitude();
        const elevationRes = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const hourly = response.hourly()!;

        const weatherData = {
        hourly: {
            time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
            (_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            relative_humidity_2m: hourly.variables(1)!.valuesArray(),
            wind_speed_10m: hourly.variables(2)!.valuesArray(),
            wind_direction_10m: hourly.variables(3)!.valuesArray(),
            wind_gusts_10m: hourly.variables(4)!.valuesArray(),
            surface_pressure: hourly.variables(5)!.valuesArray(),
            precipitation_probability: hourly.variables(6)!.valuesArray(),
            weather_code: hourly.variables(7)!.valuesArray(),
        },
        };

        return {
        weatherData: weatherData,
        latitude: latitudeRes,
        longitude: longitudeRes,
        elevation: elevationRes,
        utcOffsetSeconds: utcOffsetSeconds,
        }
    }, [latitude, longitude]);

    const dataHandler = useCallback(async () => {
        try {
        const data = await weatherFetch();
        if (!data) return
        
        const now = new Date();
        now.setMinutes(0, 0, 0);
        
        const index = data.weatherData.hourly.time.findIndex(
            (entry) => entry.getTime() === now.getTime()
        );
        
        if (index === -1) {
            setWeatherError('Failed to fetch weather data')
            return
        }
        
        const values = [
            data.weatherData.hourly.temperature_2m,
            data.weatherData.hourly.relative_humidity_2m,
            data.weatherData.hourly.wind_speed_10m,
            data.weatherData.hourly.wind_direction_10m,
            data.weatherData.hourly.wind_gusts_10m,
            data.weatherData.hourly.surface_pressure,
            data.weatherData.hourly.precipitation_probability,
            data.weatherData.hourly.weather_code,
        ];

        for (const value of values) {
            if (!value) {
            setWeatherError('Failed to fetch weather data')
            return
            }
        };

        const hourly = data.weatherData.hourly;
        const temperature = Math.floor(hourly.temperature_2m![index]);
        const humidity = hourly.relative_humidity_2m![index];
        const windSpeed = Math.floor(hourly.wind_speed_10m![index]);
        const windDirection = hourly.wind_direction_10m![index];
        const windGusts = Math.floor(hourly.wind_gusts_10m![index]);
        const surfacePressure = Math.floor(hourly.surface_pressure![index]);
        const precipitationProbability = hourly.precipitation_probability![index];
        const weatherCode = hourly.weather_code![index];

        setWeatherData({
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            windDirection: windDirection,
            windGusts: windGusts,
            surfacePressure: surfacePressure,
            precipitationProbability: precipitationProbability,
            weatherCode: weatherCode,
        })
        setWeatherError(null);
        } catch (err) {
        setWeatherError('Failed to fetch weather data');
        };
    }, [weatherFetch]);

    const reverseGeocode = useCallback(async () => {
        const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${accessToken}`;
        try {
        const res = await fetch(url);
        const data = await res.json();
        const features = data.features;

        if (features.length) {
            const country = features.find((f: MapboxFeature) => f.properties.feature_type === 'country')?.properties.name;
            const place = features.find((f: MapboxFeature) => f.properties.feature_type === 'place')?.properties.name;
            setCity(`${place}, ${country}`)
            setLocationError(null);
        }
        } catch (err) {
        setLocationError('Failed to fetch location data');
        }
    }, [latitude, longitude]);

    useEffect(() => {
        reverseGeocode()
    }, [reverseGeocode])

    useEffect(() => {
        dataHandler();
        const weatherUpdate = setInterval(() => {
        dataHandler();
        }, 60000)

        return () => clearInterval(weatherUpdate)
    }, [dataHandler]);

    useEffect(() => {
        if (coords?.latitude && coords?.longitude) {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        }
    }, [coords]);

    return (
        <WeatherContext.Provider value={{ city, weatherData, weatherError, locationError }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context
}