import { useMemo } from "react";
import { useWeather } from "@context/WeatherContext";
import { useSelected } from "@context/ForecastContext";
import MiniChart from "@/components/weather/MiniChart";

export default function GraphCard() {
    const { weatherData } = useWeather();
    const { selected } = useSelected();

    const hourly = weatherData?.hourly;
    const temperatureFull = hourly?.temperature;
    const humidityFull = hourly?.humidity;
    const windSpeedFull = hourly?.windSpeed;
    const windDirectionFull = hourly?.windDirection;
    const windGustFull = hourly?.windGusts;
    const surfacePressureFull = hourly?. surfacePressure;
    const precipitationProbabilityFull = hourly?.precipitationProbability;
    const weatherCodeFull = hourly?.weatherCode;
    const timeFull = hourly?.time;

    const locale = navigator.language;

    const dayRanges = [
        [0, 23],
        [23, 47],
        [47, 71],
        [71, 95],
        [95, 119],
        [119, 143],
        [143, 167],
    ];

    const graphData = useMemo(() => {
        let range;
        if (!selected) {
            range = dayRanges[0];
        } else {
            range = dayRanges[selected];
        };
        
        if (!temperatureFull) return

        // Translating the data into an object[] format for Rechart
        const graphSource = {
            temperature: temperatureFull!.slice(range[0], range[1]),
            humidity: humidityFull!.slice(range[0], range[1]),
            windSpeed: windSpeedFull!.slice(range[0], range[1]),
            windDirection: windDirectionFull!.slice(range[0], range[1]),
            windGust: windGustFull!.slice(range[0], range[1]),
            surfacePressure: surfacePressureFull!.slice(range[0], range[1]),
            precipitationProbability: precipitationProbabilityFull!.slice(range[0], range[1]),
            weatherCode: weatherCodeFull!.slice(range[0], range[1]),
            time: timeFull!.slice(range[0], range[1]),
        };

        const graphData = Array.from({ length: 24 }, (_, i) => ({
            id: i,
            temperature: Math.floor(graphSource.temperature![i]),
            humidity: Math.floor(graphSource.humidity![i]),
            windSpeed: Math.floor(graphSource.windSpeed![i]),
            windDirection: graphSource.windDirection![i],
            windGust: Math.floor(graphSource.windGust![i]),
            surfacePressure: Math.floor(graphSource.surfacePressure![i]),
            precipitationProbability: Math.floor(graphSource.precipitationProbability![i]),
            weatherCode: graphSource.weatherCode![i],
            time: graphSource.time![i],
        }));

        return graphData
    }, [selected, weatherData])

    return (
        <div className="h-full flex flex-col border border-weather-slate-600 bg-weather-slate-900 rounded-xl px-4 py-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <p className="text-[14px] py-1 text-weather-slate-200">Hourly forecast</p>
                {!graphData ? (
                    <p className="text-[14px] py-1 text-weather-slate-200">Loading...</p>
                ) : (
                    <p className="text-[14px] py-1 text-weather-slate-200">{graphData[0].time.toLocaleDateString(locale, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 py-2">
                <MiniChart data={graphData} dataKey="temperature" title="Temperature" colour="#ff7300" tooltipTitle="Temperature" tooltipUnit="°C" />
                <MiniChart data={graphData} dataKey="humidity" title="Humidity" colour="#0088fe" tooltipTitle="Humidity" tooltipUnit="%" />
                <MiniChart data={graphData} dataKey="windSpeed" title="Wind Speed" colour="#00C49F" tooltipTitle="Wind Speed" tooltipUnit=" km/h"/>
                <MiniChart data={graphData} dataKey="windGust" title="Wind Gust" colour="#ffbb28" tooltipTitle="Wind Gusts" tooltipUnit=" km/h" />
                <MiniChart data={graphData} dataKey="precipitationProbability" title="Precipitation" colour="#38bdf8" tooltipTitle="Precipitation" tooltipUnit="%" />
                <MiniChart data={graphData} dataKey="surfacePressure" title="Pressure" colour="#a855f7" tooltipTitle="Pressure" tooltipUnit=" hPa" />
            </div>
        </div>
    )
}