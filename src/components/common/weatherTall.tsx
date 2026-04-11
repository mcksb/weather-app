import { useEffect, useState } from 'react';
import type { WeatherData } from "../../types";
import { GoArrowUp } from "react-icons/go";
import { getCardinal } from '../../utils/getCardinal';

interface Props {
    weatherData: WeatherData,
    city: string | null,
}

export default function WeatherTall({ weatherData, city }: Props) {
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    
    useEffect(() => {
        const updateClock = () => {
            const locale = navigator.language;
            setDate(new Date().toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
            setTime(new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }));
        };
        updateClock();
        const clock = setInterval(() => {
            updateClock();
        }, 5000)
        return () => clearInterval(clock)
    }, []);

    return (
        <div className="border border-white rounded-xl min-w-[50%]">
            <div className="flex items-start justify-between p-4">
                <div className="flex flex-col items-start">
                    <p className="text-white">{city}</p>
                    <p className="text-white">{weatherData.temperature}°C</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-white">{time}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div className="flex justify-between p-4">
                <div className="flex flex-col items-start text-[14px]">
                    <p>Precipitation: {weatherData.precipitationProbability}%</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Pressure: {weatherData.surfacePressure} hPa</p>
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                    <GoArrowUp className="text-[36px]" style={{
                        transform: `rotate(${(weatherData.windDirection ?? 0) + 180}deg)`
                    }} />
                    <div className="flex flex-col items-start">
                        <p className="text-white text-[18px]">{weatherData.windSpeed} km/h</p>
                        <p className="text-[12px]">Gusts {weatherData.windGusts} km/h · {getCardinal(weatherData.windDirection ?? 0)}</p>                    
                    </div>
                </div>
            </div>
        </div>
    )
}