import { useEffect, useState, useMemo } from 'react';
import { WiDirectionUp } from 'react-icons/wi'
import { getCardinal } from '../../utils/weather';
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
    
    const code = weatherData?.weatherCode!;
    const Icon = weatherIcons(code);
    const status = weatherStatus(code);

    const loadingPhrase = useMemo(() => {
        return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
    }, []);

    return (
                <div className="border border-white rounded-xl">
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
                                <p className="text-white">{weatherData.temperature}°C</p>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-white">{time}</p>
                            <p>{date}</p>
                        </div>
                    </div>
                    { weatherLoading ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 px-4">
                                {Icon && <Icon className="text-white text-[28px]"/>}
                                <p>{status}</p>
                            </div>                           
                            <div className="flex justify-between p-4">
                                <div className="flex flex-col items-start text-[14px]">
                                    <p>Precipitation: {weatherData.precipitationProbability}%</p>
                                    <p>Humidity: {weatherData.humidity}%</p>
                                    <p>Pressure: {weatherData.surfacePressure} hPa</p>                                   
                                </div>
                                <div className="flex items-center gap-2 text-[14px]">
                                    <WiDirectionUp className="text-[36px]" style={{
                                        transform: `rotate(${(weatherData.windDirection ?? 0) + 180}deg)`
                                    }} />
                                    <div className="flex flex-col items-start">
                                        <p className="text-white text-[18px]">{weatherData.windSpeed} km/h</p>
                                        <p className="text-[12px]">Gusts {weatherData.windGusts} km/h · {getCardinal(weatherData.windDirection ?? 0)}</p>      
                                    </div>
                                </div>
                            </div>
                        </>            
                    )}
                </div>
    )
}