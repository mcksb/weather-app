import { useEffect, useState, useCallback, useContext, createContext } from 'react';
import { useGeolocated } from 'react-geolocated';
import { fetchWeatherApi } from 'openmeteo';
import type { WeatherData } from '@/types';

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

const toNumberArray = (arr: Float32Array | null | undefined): number[] | null =>
    arr ? Array.from(arr) : null;

const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [latitude, setLatitude] = useState<number>(53.3498);
    const [longitude, setLongitude] = useState<number>(-6.2603);
    
    // Weather data states
    const [weatherData, setWeatherData] = useState<WeatherData | null>({
        current: {
            temperature: null,
            relativeHumidity: null,
            apparentTemperature: null,
            isDay: null,
            windSpeed: null,
            windDirection: null,
            windGusts: null,
            precipitation: null,
            rain: null,
            showers: null,
            weatherCode: null,
            surfacePressure: null,
            snowfall: null,
            cloudCover: null,
            time: null,
        },
        hourly: {
            temperature: null,
            humidity: null,
            windSpeed: null,
            windDirection: null,
            windGusts: null,
            surfacePressure: null,
            precipitationProbability: null,
            weatherCode: null,
            time: null,
        },
        daily: {
            temperatureMax: null,
            temperatureMin: null,
            weatherCode: null,
            sunrise: null,
            sunset: null,
            windSpeedMax: null,
            windGustsMax: null,
            windDirectionDom: null,
            precipitationProbabilityMax: null,
            daylightDuration: null,
            time: null,
        },
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
            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "apparent_temperature",
                "is_day",
                "wind_speed_10m",
                "wind_direction_10m",
                "wind_gusts_10m",
                "precipitation",
                "rain",
                "showers",
                "weather_code",
                "surface_pressure",
                "snowfall",
                "cloud_cover"
            ],
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
            daily: [
                "temperature_2m_max",
                "temperature_2m_min",
                "weather_code",
                "sunrise",
                "sunset",
                "wind_speed_10m_max",
                "wind_gusts_10m_max",
                "wind_direction_10m_dominant",
                "precipitation_probability_max",
                "daylight_duration"
            ],
            timeformat: "unixtime",
        }
        const responses = await fetchWeatherApi(url, params)
        const response = responses[0];

        const latitudeRes = response.latitude();
        const longitudeRes = response.longitude();
        const elevationRes = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        const sunrise = daily.variables(3)!;
        const sunset = daily.variables(4)!;

        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0)!.value(),
                relative_humidity_2m: current.variables(1)!.value(),
                apparent_temperature: current.variables(2)!.value(),
                is_day: current.variables(3)!.value(),
                wind_speed_10m: current.variables(4)!.value(),
                wind_direction_10m: current.variables(5)!.value(),
                wind_gusts_10m: current.variables(6)!.value(),
                precipitation: current.variables(7)!.value(),
                rain: current.variables(8)!.value(),
                showers: current.variables(9)!.value(),
                weather_code: current.variables(10)!.value(),
                surface_pressure: current.variables(11)!.value(),
                snowfall: current.variables(12)!.value(),
                cloud_cover: current.variables(13)!.value(),
            },        
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
            daily: {
                time: Array.from(
                    { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
                    (_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m_max: daily.variables(0)!.valuesArray(),
                temperature_2m_min: daily.variables(1)!.valuesArray(),
                weather_code: daily.variables(2)!.valuesArray(),
                // Map Int64 values to according structure
                sunrise: [...Array(sunrise.valuesInt64Length())].map(
                    (_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
                ),
                // Map Int64 values to according structure
                sunset: [...Array(sunset.valuesInt64Length())].map(
                    (_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
                ),
                wind_speed_10m_max: daily.variables(5)!.valuesArray(),
                wind_gusts_10m_max: daily.variables(6)!.valuesArray(),
                wind_direction_10m_dominant: daily.variables(7)!.valuesArray(),
                precipitation_probability_max: daily.variables(8)!.valuesArray(),
                daylight_duration: daily.variables(9)!.valuesArray(),
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

        const current = data.weatherData.current;
        const hourly = data.weatherData.hourly;
        const daily = data.weatherData.daily;

        setWeatherData({
            current: {
                temperature: Math.floor(current.temperature_2m),
                relativeHumidity: Math.floor(current.relative_humidity_2m),
                apparentTemperature: Math.floor(current.apparent_temperature),
                isDay: current.is_day,
                windSpeed: Math.floor(current.wind_speed_10m),
                windDirection: current.wind_direction_10m,
                windGusts: Math.floor(current.wind_gusts_10m),
                precipitation: current.precipitation.toFixed(2),
                rain: current.rain.toFixed(2),
                showers: current.showers.toFixed(2),
                weatherCode: current.weather_code,
                surfacePressure: Math.floor(current.surface_pressure),
                snowfall: current.snowfall,
                cloudCover: current.cloud_cover,
                time: current.time,
            },
            hourly: {
                temperature: toNumberArray(hourly.temperature_2m),
                humidity: toNumberArray(hourly.relative_humidity_2m),
                windSpeed: toNumberArray(hourly.wind_speed_10m),
                windDirection: toNumberArray(hourly.wind_direction_10m),
                windGusts: toNumberArray(hourly.wind_gusts_10m),
                surfacePressure: toNumberArray(hourly.surface_pressure),
                precipitationProbability: toNumberArray(hourly.precipitation_probability),
                weatherCode: toNumberArray(hourly.weather_code),
                time: hourly.time,
            },
            daily: {
                temperatureMax: toNumberArray(daily.temperature_2m_max),
                temperatureMin: toNumberArray(daily.temperature_2m_min),
                weatherCode: toNumberArray(daily.weather_code),
                sunrise: daily.sunrise,
                sunset: daily.sunset,
                windSpeedMax: toNumberArray(daily.wind_speed_10m_max),
                windGustsMax: toNumberArray(daily.wind_gusts_10m_max),
                windDirectionDom: toNumberArray(daily.wind_direction_10m_dominant),
                precipitationProbabilityMax: toNumberArray(daily.precipitation_probability_max),
                daylightDuration: toNumberArray(daily.daylight_duration),
                time: daily.time,
            },
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