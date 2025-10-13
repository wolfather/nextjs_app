import { fetchData } from "../services/client/fetch_data";
import { SalesData } from "./entities/sales.interface";

export default async function Sales() {
    const { data: salesData } = await fetchData<SalesData[]>({
        url: 'getSales',
        method: 'GET',
    });

    return (
        <div>
            <h1>Sales</h1>
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