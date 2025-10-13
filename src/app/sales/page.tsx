import { fetchData } from "../services/client/fetch_data";
import { SalesData } from "./entities/sales.interface";

import { Chart } from "@/components/custom/Chart/Chart";

export default async function Sales() {
    const { data: salesData } = await fetchData<SalesData[]>({
        url: 'getSales',
        method: 'GET',
    });

    const chartData = salesData.map(sale => ({
        name: sale.category,
        sales: sale.units_sold,
    }));
    
    return (
        <div>
            <h1>Sales</h1>
            <div>
                {chartData.length > 0 && <Chart data={chartData} />}
            </div>

            <div>
                {salesData.map((sale) => (
                    <div key={sale.id}>
                        <h2>{sale.product}</h2>
                        <p>{sale.category}</p>
                        <p>{sale.units_sold} - {sale.unit_price}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}