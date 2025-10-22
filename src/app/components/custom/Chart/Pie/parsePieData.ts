import { SalesData } from "@/app/(logged)/sales/entities/sales.interface";

export type ParsePieDataProps = {
    name: string,
    sales: number,
}

export function parsePieData(data: SalesData[]): ParsePieDataProps[] {
    return data.reduce((acc: ParsePieDataProps[], sale) => {
        const existingCategory = acc.find(item => item.name === sale.category);
        if (existingCategory) {
            existingCategory.sales += sale.units_sold;
        } else {
            acc.push({ name: sale.category, sales: sale.units_sold });
        }

        return acc;
    }, []);
}
