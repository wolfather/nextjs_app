'use client';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

export function CustomPieChart({data}: any) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    const COLORS = [
        "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF4444", "#AA66CC", "#99CC00", "#FFEB3B", "#FF9800"
    ];
    return (
        <div className="h-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart width={330} height={180} accessibilityLayer data={data}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Pie data={data} dataKey="sales" nameKey="name" outerRadius={120}>
                        {data.map((_ : any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#ccc'} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    )
}