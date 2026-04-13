import { useWeather } from "../../context/WeatherContext"
import { ThreeDots } from "react-loader-spinner";

export default function AtmosphereCard() {
    const { weatherData } = useWeather();
    const weatherLoading = !weatherData || Object.values(weatherData).some(value => value === null);

    return (
        <div className="border border-white rounded-xl p-4">
            { weatherLoading ? (
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
            ) : (
                <div className="flex justify-between">
                    <div className="flex flex-col items-start text-[14px]">
                        <p>Precipitation: {weatherData.current.precipitation}%</p>
                        <p>Humidity: {weatherData.current.relativeHumidity}%</p>
                        <p>Pressure: {weatherData.current.surfacePressure} hPa</p>                                   
                    </div>
                </div>
            )}
        </div>
    )
}