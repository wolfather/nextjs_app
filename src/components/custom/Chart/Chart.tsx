'use client';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell } from "recharts";

export function CustomBarChart({data}: any) {
    const chartConfig: ChartConfig = {
        sales: {
            label: 'Sales',
            color: '#8884d8',
        }
    };
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    return (
        <div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
        <div>
            <ChartContainer config={chartConfig} className=" w-full">
                <PieChart width={730} height={250} accessibilityLayer data={data}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Pie data={data} dataKey="sales" nameKey="name" outerRadius={120}>
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || '#ccc'} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    )
}