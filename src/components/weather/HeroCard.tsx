import { useEffect, useState, useMemo } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { weatherStatus, weatherIcons } from '../../utils/weather';
import { useWeather } from '../../context/WeatherContext';
import { LOADING_PHRASES } from '../../utils/weather';

export default function HeroCard() {
    const { city, weatherData } = useWeather();
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);

    const locationLoading = !city;
    const weatherLoading = !weatherData || Object.values(weatherData).some(value => value === null);

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
    
    const code = weatherData?.current.weatherCode!;
    const Icon = weatherIcons(code);
    const status = weatherStatus(code);

    const loadingPhrase = useMemo(() => {
        return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
    }, []);

    return (
                <div className="border border-white rounded-xl sm:min-w-[440px]">
                    <div className="flex items-start justify-between p-4">
                        <div className="flex flex-col items-start">
                            { locationLoading ? (
                                <p className="text-white">Finding location...</p>
                            ) : (
                                <p className="text-white">{city}</p>
                            )}
                            { weatherLoading ? (
                                <p className="text-white">... °C</p>
                            ) : (
                                <>
                                    <p className="text-white">{weatherData.current.temperature}°C</p>
                                    <p className="text-grey text-[14px]">Feels like {weatherData.current.apparentTemperature}°C</p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-white">{time}</p>
                            <p>{date}</p>
                        </div>
                    </div>
                    { weatherLoading ? (
                        <div className="flex items-center justify-center p-4 gap-4">
                            <p>{loadingPhrase}</p>
                            <ThreeDots
                                visible={true}
                                height="40"
                                width="40"
                                color="#9ca3af"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=''
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 px-4 pb-4">
                            {Icon && <Icon className="text-white text-[28px]"/>}
                            <p>{status}</p>
                        </div>      
                    )}
                </div>
    )
}