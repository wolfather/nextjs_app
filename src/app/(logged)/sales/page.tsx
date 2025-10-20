import { getServerSession } from "next-auth";
import { PromptForm } from "../../components/PromptForm/PromptForm";
import { fetchData } from "../../services/client/fetch_data";
import { formatCurrency } from "../../services/client/format_currency";
import type { SalesData, SalesPageParams } from "./entities/sales.interface";

import { SalesFilter } from "@/app/components/SalesFilter/SalesFilter";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { CustomBarChart, CustomPieChart } from "@/app/components/custom/Chart/Charts";
import { getTranslations } from 'next-intl/server';

export default async function SalesPage({searchParams}: SalesPageParams) {
    const session = await getServerSession(authOptions);
    const t = await getTranslations ('SalesPage');
    const resolvedParams = await searchParams;

    const queryString = Object
            .entries(resolvedParams ?? {})
            .map(([k, v]) => {
                return v !== undefined ? {[k]: v} : {}
            });


    const { data: salesData } = await fetchData<SalesData[]>({
        url: 'getSales',
        method: 'GET',
        queryString,
    });

    const anualSales = salesData.slice(-12);

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
        redirect('/login');
    }

    return (
        <div className="flex-1">
            <h1 className="text-3xl from-neutral-800 font-semibold">{t('title')}</h1>

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
    );
}
