import { useWeather } from "../../context/WeatherContext";
import { weatherIcons } from "../../utils/weather"
import ForecastCard from "./components/ForecastCard";

export default function ForecastStrip() {
    const days = [
        {id: 0, dayIndex: 0},
        {id: 1, dayIndex: 1},
        {id: 2, dayIndex: 2},
        {id: 3, dayIndex: 3},
        {id: 4, dayIndex: 4},
        {id: 5, dayIndex: 5},
        {id: 6, dayIndex: 6},
    ];
    
    return (
        <div className="border border-white rounded-xl px-4 pt-1 pb-2">
            <div className="justify-start">
                <p className="text-grey text-[11px]">Daily forecast</p>
            </div>
            <div className="flex justify-between gap-4">
                {days.map(day => 
                    <ForecastCard key={day.id} dayIndex={day.dayIndex} />
                )}
            </div>
        </div>
    )
}