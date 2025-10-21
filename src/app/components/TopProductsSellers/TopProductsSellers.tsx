import { SalesData } from "@/app/(logged)/sales/entities/sales.interface";
import { formatCurrency } from "@/app/services/client/format_currency";

type TopProductsSellersProps = {
    data: SalesData[],
    quantityRank: number,
}
export function TopProductsSellers({data, quantityRank}: TopProductsSellersProps) {
    const dryData = data.map(sale => ({
        id: sale.id,
        year: sale.year,
        product: sale.product,
        category: sale.category,
        units_sold: sale.units_sold,
        unit_price: formatCurrency(sale.unit_price),
        month: sale.month,
    }))
    .slice(0, quantityRank)
    .sort((a, b) => b.units_sold - a.units_sold);

    return (
        <div>
            <h3 className="font-bold text-xl mb-2">Top {quantityRank} most sold</h3>
            <div className="grid p-2 grid-cols-1 grid-rows-1 gap-2">
                {dryData.map((sale) => (
                    <div key={sale.id} className=" mb-3 to-blue-200 from-purple-200 bg-gradient-to-tr p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{sale.product}</h3>
                        <p className="text-sm font-medium">{sale.category}</p>
                        <div>
                            <p className="text-sm font-semibold">
                                <span className="text-sm font-bold mr-1">{sale.units_sold}</span>
                                <span className="text-sm">Units sold</span>
                            </p>
                            <p className="align-middle">
                                <span className="text-sm mr-1">Unit price</span>
                                <span className="text-sm font-medium">{sale.unit_price}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
