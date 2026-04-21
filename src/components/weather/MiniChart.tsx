import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";

interface ChartProps {
    data: object[] | undefined;
    dataKey: string;
    title: string;
    colour: string;
    tooltipTitle: string;
    tooltipUnit: string;
};

interface TooltipProps {
    title: string;
    unit: string;
    active?: boolean;
    payload?: readonly any[];
    label?: string | number;
};

function CustomTooltip({ title, unit, active, payload, label }: TooltipProps) {
    if (!active || !payload?.length) {
        return null
    };

    return (
        <div className="leading-4">
            <p className="text-[11px] text-weather-slate-50 font-400 text-shadow-2xs">{label}:00</p>
            <p className="text-[11px] text-weather-slate-50 font-400 text-shadow-2xs">{title}: {payload[0].value}{unit}</p>
        </div>
    )
}

export default function MiniChart({ data, dataKey, title, colour='#ffffff', tooltipTitle, tooltipUnit }: ChartProps) {
    return (
        <div className="flex flex-col bg-weather-slate-800 border border-weather-slate-600 rounded-xl px-2 py-1 min-h-[80px]">
            <span className="text-weather-slate-300 text-[11px]">{title}</span>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colour}
                            dot={false}
                            strokeWidth={1.5}
                        />
                        <Tooltip
                            content={(props) => <CustomTooltip title={tooltipTitle} unit={tooltipUnit} {...props} />}
                            contentStyle={{ backgroundColor: "#1a1a1a", border: "none"}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}