import { useMemo } from "react";
import { useWeather } from "@context/WeatherContext";
import { LOADING_PHRASES } from "@utils/weather";
import { ThreeDots } from "react-loader-spinner";
import { WiDirectionUp } from "react-icons/wi";
import { getCardinal } from "@utils/weather";

export default function Wind() {
    const { weatherData } = useWeather();
    const weatherLoading = !weatherData || Object.values(weatherData).some(value => value === null);

    const loadingPhrase = useMemo(() => {
        return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
    }, []);

    return (
        <div className="border border-white rounded-xl p-4">
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
                <>
                    <div>
                        <div className="flex items-center justify-center gap-2 py-6 text-[14px]">
                            <WiDirectionUp className="text-[36px]" style={{
                                transform: `rotate(${(weatherData.current.windDirection ?? 0) + 180}deg)`
                            }} />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-white text-[18px]">{weatherData.current.windSpeed} km/h</p>
                            <p className="text-[12px]">Gusts {weatherData.current.windGusts} km/h · {getCardinal(weatherData.current.windDirection ?? 0)}</p>      
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}