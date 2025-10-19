'use client';

import { SalesData } from "@/app/(logged)/sales/entities/sales.interface";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";

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

    const pieData = useMemo(() => data.reduce((acc, sale) => {
        const existingCategory = acc.find(item => item.name === sale.category);
        if (existingCategory) {
            existingCategory.sales += sale.units_sold;
        } else {
            acc.push({ name: sale.category, sales: sale.units_sold });
        }
        return acc;
    }, [] as { name: string; sales: number }[]), [data]);

    function ChartLegendContent() {
        return (
            <div className="flex gap-4 justify-center mt-2">
            {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
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
        <div className="h-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart width={330} height={180} accessibilityLayer data={data}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Pie data={pieData} dataKey="sales" nameKey="name" outerRadius={120}>
                        {pieData.map((_, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#ccc'} />
                        ))}
                    </Pie>
                    <ChartLegendContent />
                </PieChart>
            </ChartContainer>
        </div>
    )
}