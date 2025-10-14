import { useMemo } from "react";
import { PromptForm } from "../components/PromptForm/PromptForm";
import { fetchData } from "../services/client/fetch_data";
import { formatCurrency } from "../services/client/format_currency";
import { SalesData } from "./entities/sales.interface";

import { CustomBarChart, CustomPieChart } from "@/components/custom/Chart/Charts.ts";

export default async function Sales() {
    const { data: salesData } = await fetchData<SalesData[]>({
        url: 'getSales',
        method: 'GET',
    });
    const anualSales = salesData.slice(0, 12);

    const dryData = anualSales.map(sale => ({
        //product: sale.product,
        category: sale.category,
        units_sold: sale.units_sold,
        unit_price: formatCurrency(sale.unit_price),
        month: sale.month,
    }));

    const barData = anualSales.map(sale => ({
        name: sale.category,
        sales: sale.units_sold,
        month: sale.month,
    }));

    const pieData = anualSales.reduce((acc, sale) => {
        const existingCategory = acc.find(item => item.name === sale.category);
        if (existingCategory) {
            existingCategory.sales += sale.units_sold;
        } else {
            acc.push({ name: sale.category, sales: sale.units_sold });
        }
        return acc;
    }, [] as { name: string; sales: number }[]);

    return (
        <div>
            <h1 className="text-3xl from-neutral-800 font-semibold">Sales</h1>
            <section className="flex grid-cols-2 gap-4 h-[300px]">
                <div className="min-h-[300px] min-w-[40%]">
                    {barData.length > 0 && <CustomBarChart data={barData} />}
                </div>
                
                <div className="min-h-[300px] min-w-[40%]">
                    {pieData.length > 0 && <CustomPieChart data={pieData} />}
                </div>
            </section>

            {/* <div className="p-20 grid grid-cols-2 grid-rows-1 gap-21 gap-y-0.5">
                {anualSales.map((sale) => (
                    <div key={sale.id} className=" mb-3 to-blue-200 from-purple-200 bg-gradient-to-tr p-4 rounded-lg shadow-md">
                        <h2>{sale.product}</h2>
                        <p>{sale.category}</p>
                        <p>{sale.units_sold} - {formatCurrency(sale.unit_price)}</p>
                    </div>
                ))}
            </div> */}
            <PromptForm data={dryData} />
        </div>
    )
}