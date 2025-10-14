'use client';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, XAxis, Bar } from "recharts";

export function CustomBarChart({data}: any) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    return (
        <div className="h-full">
            <ChartContainer config={chartConfig} className="min-h-[200px] h-full w-full">
                <BarChart accessibilityLayer data={data}>
                    <XAxis dataKey="month" tickFormatter={(month: number) => monthNames[month - 1]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill={chartConfig.sales.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}