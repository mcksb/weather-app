import { useState, useContext, createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ForecastContextType {
    selected: number | null;
}

let _setSelected: Dispatch<SetStateAction<number | null>> | null = null;

const ForecastContext = createContext<ForecastContextType | null>(null);

export default function ForecastProvider({ children }: { children: React.ReactNode }) {
    const [selected, setSelected] = useState<number | null>(0);

    _setSelected = setSelected;

    return (
        <ForecastContext.Provider value={{ selected }}>
            {children}
        </ForecastContext.Provider >
    )
}

export const useSelected = () => {
    const context = useContext(ForecastContext)
    if (!context) {
        throw new Error('useForecast must be used within a ForecastProvider');
    };
    return context
}

export function setSelectedHook(dayIndex: number | null) {
    if (_setSelected) {
        _setSelected(dayIndex)
    } else {
        console.log("ForecastProvider not mounted yet")
    }
}