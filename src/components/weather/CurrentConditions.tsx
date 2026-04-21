import { useWeather } from "@context/WeatherContext"
import { weatherIcons, weatherStatus } from "@utils/weather";

export default function CurrentConditions() {
    const { city, weatherData } = useWeather();

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

    return (
        <div className="flex flex-col justify-between bg-weather-slate-900 border border-weather-slate-600 rounded-xl h-full px-4 pb-4 pt-2">
            <div className="flex flex-col gap-1">
                <p className="text-weather-slate-200 truncate text-[14px] pb-2">{city}</p>
                <div className="flex justify-between items-baseline">
                    <div className="flex items-baseline gap-1">
                        <p className="text-weather-slate-50 text-[28px]">{weatherData?.current.temperature}</p>
                        <p className="text-weather-slate-400 text-[14px]">°C</p>
                    </div>
                    <div className="flex items-baseline">
                        <p className="text-weather-slate-400 text-[14px]">Feels like {weatherData?.current.apparentTemperature}</p>
                        <p className="text-weather-slate-400 text-[11px]">°C</p>
                    </div>
                </div>
            </div>
            <hr className="weather-slate-800 opacity-25"></hr>
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-weather-slate-50 text-[36px]"/>}
                <p className="text-weather-slate-200">{status}</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 justify-center gap-2 p-4 sm:p-0">
                <div className="flex flex-col leading-4 bg-weather-slate-800 border border-weather-slate-600 rounded-xl px-3 py-2">
                    <p className="text-weather-slate-50 text-[14px]">{weatherData?.current.relativeHumidity}%</p>
                    <p className="text-weather-slate-300 text-[11px]">Humidity</p>
                </div>
                <div className="flex flex-col leading-4 bg-weather-slate-800 border border-weather-slate-600 rounded-xl px-3 py-2">
                    <p className="text-weather-slate-50 text-[14px]">{weatherData?.current.windSpeed} km/h</p>
                    <p className="text-weather-slate-300 text-[11px]">Wind</p>
                </div>
                <div className="flex flex-col leading-4 bg-weather-slate-800 border border-weather-slate-600 rounded-xl px-3 py-2">
                    <p className="text-weather-slate-50 text-[14px]">{weatherData?.current.surfacePressure} hPa</p>
                    <p className="text-weather-slate-300 text-[11px]">Pressure</p>
                </div>
                <div className="flex flex-col leading-4 bg-weather-slate-800 border border-weather-slate-600 rounded-xl px-3 py-2">
                    <p className="text-weather-slate-50 text-[14px]">{weatherData?.current.precipitation} mm</p>
                    <p className="text-weather-slate-300 text-[11px]">Rain</p>
                </div>
            </div>
            <hr className="weather-slate-800 opacity-25"></hr>
            <div className="flex justify-between">
                <div className="flex flex-col leading-4 items-start">
                    <p className="text-weather-slate-300 text-[11px]">Sunrise</p>
                    <p className="text-weather-slate-50 text-[14px]">{sunrise}</p>
                </div>
                <div className="flex flex-col leading-4 items-end">
                    <p className="text-weather-slate-300 text-[11px]">Sunset</p>
                    <p className="text-weather-slate-50 text-[14px]">{sunset}</p>
                </div>
            </div>
        </div>
    )
}