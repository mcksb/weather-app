import { useMemo } from "react";
import { useWeather } from "@context/WeatherContext";
import { weatherIcons } from "@utils/weather";
import { setSelectedHook } from "@context/ForecastContext";
import { useSelected } from "@context/ForecastContext";

interface Props {
    dayIndex: number;
}

export default function ForecastCard({ dayIndex }: Props) {
    const { weatherData } = useWeather();
    const { selected } = useSelected();

    const day = useMemo(() => {
        const locale = navigator.language;
        if (dayIndex === 0) {
            return 'Today'
        } else {
            const date = weatherData?.daily?.time?.[dayIndex];
            const weekday = date?.toLocaleDateString(locale, { weekday: 'short' })
            return weekday
        }
    }, [weatherData])

    const temperatureMax = useMemo(() => {
        let temperature = weatherData?.daily?.temperatureMax?.[dayIndex];
        if (!temperature) {
            temperature = 0
        };

        return Math.floor(temperature)
    }, [weatherData]);

    const temperatureMin = useMemo(() => {
        let temperature = weatherData?.daily?.temperatureMin?.[dayIndex];
        if (!temperature) {
            temperature = 0
        };

        return Math.floor(temperature)
    }, [weatherData]);

    const precipitationProbability = useMemo(() => {
        let precipitation = weatherData?.daily?.precipitationProbabilityMax?.[dayIndex];
        if (!precipitation) {
            precipitation = 0
        };

        return Math.floor(precipitation)
    }, [weatherData]);

    const Code = useMemo(() => {
        let weatherCode = weatherData?.daily?.weatherCode?.[dayIndex];
        if (!weatherCode) {
            weatherCode = 1;
        }
        const Icon = weatherIcons(weatherCode);
        return Icon
    }, [weatherData]);

    const handleClick = () => {
        setSelectedHook(dayIndex)
        return
    };

    return (
        <button onClick={handleClick} className="shrink-0">
            {selected === dayIndex ? (
                <div className="flex flex-col items-center gap-1 border border-weather-slate-600 rounded-xl py-1 px-4 bg-weather-slate-800">
                    <p className="text-white text-[11px]">{day}</p>
                    {Code && <Code className="text-[28px]"/>}
                    <div className="flex gap-3">
                        <div className="flex items-baseline">
                            <p className="text-white text-[14px]">{temperatureMax}</p>
                            <p className="text-grey text-[11px]">°C</p>
                        </div>
                        <div className="flex items-baseline">
                            <p className="text-grey text-[14px]">{temperatureMin}</p>
                            <p className="text-grey text-[11px]">°C</p>
                        </div>
                    </div>
                    <p className="text-grey text-[14px]">{precipitationProbability}%</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-1 border border-weather-slate-600 rounded-xl py-1 px-4 bg-weather-slate-900 transition-colors duration-300 hover:bg-weather-slate-800">
                    <p className="text-white text-[11px]">{day}</p>
                    {Code && <Code className="text-[28px]"/>}
                    <div className="flex gap-3">
                        <div className="flex items-baseline">
                            <p className="text-white text-[14px]">{temperatureMax}</p>
                            <p className="text-grey text-[11px]">°C</p>
                        </div>
                        <div className="flex items-baseline">
                            <p className="text-grey text-[14px]">{temperatureMin}</p>
                            <p className="text-grey text-[11px]">°C</p>
                        </div>
                    </div>
                    <p className="text-grey text-[14px]">{precipitationProbability}%</p>
                </div>                
            )}
        </button>
    )
}