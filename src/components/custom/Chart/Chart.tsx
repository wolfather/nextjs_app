'use client';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";

export function Chart({data}: any) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    return (
        <div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={data}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill={chartConfig.sales.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}