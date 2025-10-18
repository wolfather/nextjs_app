import { getServerSession } from "next-auth";
import { PromptForm } from "../components/PromptForm/PromptForm";
import { fetchData } from "../services/client/fetch_data";
import { formatCurrency } from "../services/client/format_currency";
import type { SalesData, SalesPageParams } from "./entities/sales.interface";

import { CustomBarChart, CustomPieChart } from "@/components/custom/Chart/Charts.ts";
import { SalesFilter } from "@/components/SalesFilter/SalesFilter";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Sales({searchParams}: SalesPageParams) {
    const session = await getServerSession(authOptions);
    const resolvedParams = await searchParams;

    const qs = Object
                .entries(resolvedParams ?? {})
                .map(([k, v]) => {
                    return v !== undefined ? {[k]: v} : {}
                })


    const { data: salesData } = await fetchData<SalesData[]>({
        url: 'getSales',
        method: 'GET',
        queryString: qs,
    });

    const anualSales = salesData.slice(0, 12);

    const dryData = salesData.map(sale => ({
        id: sale.id,
        year: sale.year,
        product: sale.product,
        category: sale.category,
        units_sold: sale.units_sold,
        unit_price: formatCurrency(sale.unit_price),
        month: sale.month,
    }))
    .filter(item => item.year === '2025')
    .sort((a, b) => a.month - b.month);


    if (session === null) {
        return (
            <div>Não autorizado</div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl from-neutral-800 font-semibold">Sales</h1>

            <SalesFilter />
            <section className="flex grid-cols-2 gap-4 h-[300px]">
                <div className="min-h-[300px] min-w-[45%]">
                    <CustomBarChart data={anualSales} />
                </div>
                <div className="min-h-[300px] min-w-[45%]">
                    <CustomPieChart data={anualSales} />
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
