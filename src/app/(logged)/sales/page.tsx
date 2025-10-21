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
import { Card } from "@/app/components/Card/Card";
import { PaymentMehodCard } from "@/app/components/Payment_Method_Card/PaymentMethodCard";
import { TopProductsSellers } from "@/app/components/TopProductsSellers/TopProductsSellers";

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

    const totalSales = anualSales.reduce((prev, current) => {
        const val = prev + current.total_revenue;
        return val;
    }, 0);
    
    const grossMargin = anualSales.reduce((prev, current) => {
        const val = prev + current.gross_margin;
        return val;
    }, 0);
    
    if (session === null) {
        redirect('/contact');
    }

    return (
        <div className="flex-1">
            <h1 className="text-3xl from-neutral-800 font-semibold">{t('title')}</h1>

            <SalesFilter />
            <div className="flex gap-x-3 px-2 max-w-[1024px]">
                <section className="grid grid-cols-2 gap-2 min-h-[300px] w-3/4">
                    <div className="min-h-[300px]">
                        <CustomBarChart data={anualSales} />
                    </div>
                    <div className="min-h-[300px]">
                        <CustomPieChart data={anualSales} />
                    </div>

                    <div className="min-h-[300px]">
                        <TopProductsSellers data={anualSales} quantityRank={3} />
                    </div>
                    
                </section>
                <section className="flex flex-col gap-y-3 w-1/4">
                    <Card title='Total Revenue' type="none">
                        <p>{formatCurrency(totalSales)}</p>
                    </Card>
                    
                    <Card title='Gross Margin' type="none">
                        <p>{formatCurrency(grossMargin)}</p>
                    </Card>

                    <PaymentMehodCard<SalesData> data={anualSales} />
                </section>
            </div>

            <PromptForm data={anualSales} />
        </div>
    );
}
