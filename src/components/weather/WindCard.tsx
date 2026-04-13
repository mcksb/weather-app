import { useWeather } from "../../context/WeatherContext"
import { WiDirectionUp } from "react-icons/wi";
import { getCardinal } from "../../utils/weather";
import { ThreeDots } from "react-loader-spinner";

export default function WindCard() {
    const { weatherData } = useWeather();
    const weatherLoading = !weatherData || Object.values(weatherData).some(value => value === null);

    return (
        <div className="flex border border-white items-center justify-center rounded-xl p-4 sm:min-h-[235px] sm:min-w-[175px]">
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
                <>
                    <div>
                        <div className="grid grid-cols-3 grid-rows-3 pb-2">
                            <div className="flex justify-center items-start col-span-3 row-span-1">
                                <p className="text-white">N</p>
                            </div>
                            <div className="flex col-span-3 row-span-1 items-center justify-between p-1">
                                <p>W</p>
                                <div className="flex items-center justify-center gap-2 text-[14px]">
                                    <WiDirectionUp className="text-[36px]" style={{
                                        transform: `rotate(${(weatherData.current.windDirection ?? 0) + 180}deg)`
                                    }} />
                                </div>
                                <p>E</p>
                            </div>
                            <div className="flex justify-center items-end col-span-3 row-span-1 ">
                                <p>S</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-white text-[18px]">{weatherData.current.windSpeed} km/h</p>
                            <p className="text-[12px]">Gusts {weatherData.current.windGusts} km/h · {getCardinal(weatherData.windDirection ?? 0)}</p>      
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}