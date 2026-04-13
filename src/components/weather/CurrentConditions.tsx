import { useWeather } from "../../context/WeatherContext"
import { weatherIcons, weatherStatus } from "../../utils/weather";

export default function CurrentConditions() {
    const { weatherData } = useWeather();

    const code = weatherData?.current.weatherCode!;
    const Icon = weatherIcons(code);
    const status = weatherStatus(code);

    let sunrise;
    let sunset;
    const locale = navigator.language;

    if (!weatherData?.daily.sunrise) {
        sunrise = '-'
    } else {
        sunrise = weatherData.daily.sunrise[0].toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    }

    if (!weatherData?.daily.sunset) {
        sunrise = '-'
    } else {
        sunset = weatherData.daily.sunset[0].toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    }
    
    console.log(sunrise, sunset)

    return (
        <div className="flex flex-col gap-4 border border-white rounded-xl h-full p-4">
            <div className="flex flex-col gap-1">
                <p className="text-[14px]">Current conditions</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-white text-[28px]">{weatherData?.current.temperature}</p>
                    <p className="text-[14px]">°C</p>
                </div>
                <p>{status}</p>
            </div>
            <hr className="grey opacity-25"></hr>
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-white text-[28px]"/>}
                <p className="text-[16px]">Feels like {weatherData?.current.apparentTemperature}°C</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 justify-center gap-2">
                <div className="flex flex-col leading-4 border border-white rounded-xl px-3 py-2">
                    <p className="text-white text-[14px]">{weatherData?.current.relativeHumidity}%</p>
                    <p className="text-grey text-[11px]">Humidity</p>
                </div>
                <div className="flex flex-col leading-4 border border-white rounded-xl px-3 py-2">
                    <p className="text-white text-[14px]">{weatherData?.current.windSpeed} km/h</p>
                    <p className="text-grey text-[11px]">Wind</p>
                </div>
                <div className="flex flex-col leading-4 border border-white rounded-xl px-3 py-2">
                    <p className="text-white text-[14px]">{weatherData?.current.surfacePressure} hPa</p>
                    <p className="text-grey text-[11px]">Pressure</p>
                </div>
                <div className="flex flex-col leading-4 border border-white rounded-xl px-3 py-2">
                    <p className="text-white text-[14px]">{weatherData?.current.precipitation}%</p>
                    <p className="text-grey text-[11px]">Rain</p>
                </div>
            </div>
            <hr className="grey opacity-25"></hr>
            <div className="flex justify-between">
                <div className="flex flex-col leading-4 items-start">
                    <p className="text-grey text-[11px]">Sunrise</p>
                    <p className="text-white text-[14px]">{sunrise}</p>
                </div>
                <div className="flex flex-col leading-4 items-end">
                    <p className="text-grey text-[11px]">Sunset</p>
                    <p className="text-white text-[14px]">{sunset}</p>
                </div>
            </div>
        </div>
    )
}