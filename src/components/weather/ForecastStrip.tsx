import ForecastCard from "@/components/weather/ForecastCard";

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
        <div className="relative w-full">
            <div className="flex flex-row overflow-x-auto gap-4 pb-2">
                {days.map(day => 
                    <ForecastCard key={day.id} dayIndex={day.dayIndex} />
                )}
            </div>
        </div>
    )
}