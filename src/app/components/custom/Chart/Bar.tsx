'use client';

import { SalesData } from "@/app/(logged)/sales/entities/sales.interface";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import { useMemo } from "react";
import { BarChart, XAxis, Bar } from "recharts";

type BarChartProps = {
    data: SalesData[];
}
export function CustomBarChart({data}: BarChartProps) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    const barData = useMemo(() => data.map(sale => ({
        name: sale.category,
        sales: sale.units_sold,
        month: sale.month,
    })), [data]);

    return (
        <div className="h-full">
            <ChartContainer config={chartConfig} className="min-h-[200px] h-full w-full">
                <BarChart accessibilityLayer data={barData}>
                    <XAxis 
                        dataKey="month" 
                        tickFormatter={(month: number) => monthNames[month - 1]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill={chartConfig.sales.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}