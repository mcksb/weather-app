import { useWeather } from "../../context/WeatherContext"
import { weatherIcons, weatherStatus } from "../../utils/weather";

export default function CurrentConditions() {
    const { weatherData } = useWeather();

    const code = weatherData?.current.weatherCode!;
    const Icon = weatherIcons(code);
    const status = weatherStatus(code);

    return (
        <div className="flex flex-col gap-2 border border-white rounded-xl h-full p-4">
            <div className="flex flex-col gap-2">
                <p>Current conditions</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-white text-[28px]">{weatherData?.current.temperature}</p>
                    <p className="text-[14px]">°C</p>
                </div>
                <p>{status}</p>
            </div>
            <hr className="grey"></hr>
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-white text-[28px]"/>}
                <p>Feels like {weatherData?.current.apparentTemperature}°C</p>
            </div>
        </div>
    )
}