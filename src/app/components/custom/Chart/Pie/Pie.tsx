'use client';

import { SalesData } from "@/app/(logged)/sales/entities/sales.interface";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { parsePieData } from "./parsePieData";

type PieChartData = {
    data: SalesData[];
}
export function CustomPieChart({data}: PieChartData) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    const COLORS = [
        "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF4444", "#AA66CC", "#99CC00", "#FFEB3B", "#FF9800"
    ];

    const pieData = useMemo(() => parsePieData(data), [data]);

    function ChartLegendContent() {
        return (
            <div className="flex flex-col h-full">
            {pieData.map((entry, index) => (
                <div key={entry.name} className="flex gap-1">
                    <span
                        style={{
                        backgroundColor: COLORS[index % COLORS.length],
                        width: 12,
                        height: 12,
                        display: 'inline-block',
                        borderRadius: '50%',
                        }}
                    />
                    <span>{entry.name}</span>
                </div>
            ))}
            </div>
        );
    }

    return (
        <div className="h-full w-full max-sm:w-fit items-center max-sm:flex max-sm:justify-between">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart width={330} height={180} accessibilityLayer data={data}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie data={pieData} dataKey="sales" nameKey="name" outerRadius={120}>
                        {pieData.map((_, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#ccc'} />
                        ))}
                    </Pie>
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{ paddingLeft: 25 }}
                        content={<ChartLegendContent />}
                    />
                </PieChart>
            </ChartContainer>
        </div>
    );
}
