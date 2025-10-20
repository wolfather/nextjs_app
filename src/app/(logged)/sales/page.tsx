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
    const resolvedParams = await searchParams;
    const t = await getTranslations ('SalesPage');

    const queryString = Object
            .entries(resolvedParams ?? {})
            .map(([k, v]) => v !== undefined ? {[k]: v} : {});

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
    //.filter(item => item.year === '2025')
    .sort((a, b) => a.month - b.month);

    const totalSales = anualSales.reduce((prev, current) => {
        const val = prev + current.total_revenue;
        return val;
    }, 0);
    
    const grossMargin = anualSales.reduce((prev, current) => {
        const val = prev + current.gross_margin;
        return val;
    }, 0);

    const paymentMethods = anualSales.reduce((acc, item: SalesData) => {
        const { category, payment_methods } = item;
        const cat = category
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '')
                    .toLowerCase();
        if (!acc[cat]) {
            acc[cat] = {
                category: cat,
                label: category,
                payment_methods: {
                    credit_card: 0,
                    pix: 0,
                    cash: 0
                }
            };
        }

        acc[cat].payment_methods.credit_card += payment_methods.credit_card || 0;
        acc[cat].payment_methods.pix += payment_methods.pix || 0;
        acc[cat].payment_methods.cash += payment_methods.cash || 0;

        return acc;
    }, {});
    console.log({paymentMethods})
    
    if (session === null) {
        redirect('/login');
    }

    return (
        <div className="flex-1">
            <h1 className="text-3xl from-neutral-800 font-semibold">{t('title')}</h1>

            <SalesFilter />

            <div className="flex justify-between gap-2">
                <div className="w-1/3 rounded-l border-l-4 border-green-300 bg-green-100 py-2 px-4">
                    <h3 className="font-bold text-xl mb-2">Total Revenues</h3>
                    <p>{formatCurrency(totalSales)}</p>
                </div>
                
                <div className="w-1/3 rounded-l border-l-4 border-green-300 bg-green-100 py-2 px-4">
                    <h3 className="font-bold text-xl mb-2">Gross margin</h3>
                    <p>{formatCurrency(grossMargin)}</p>
                </div>

                <div className="w-1/3 rounded-l border-l-4 border-green-300 bg-green-100 py-2 px-4">
                    <h3 className="font-bold text-xl mb-2">Payment Methods</h3>
                    {Object.values(paymentMethods).map(p => (
                        <div
                            className="mb-2" 
                            key={p.category}>
                            <p className="font-semibold text-lg">{p.label}</p>
                            <div className="flex justify-between">
                                {Object.entries(p.payment_methods).map(([k, v]) => (
                                    <span className="justify-between" key={k}>
                                        {k.replaceAll('_', ' ')}: {String(v)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
