import { SalesData } from '@/app/(logged)/sales/entities/sales.interface';
import { faker } from '@faker-js/faker';

function generateSales(): SalesData {
    const units_sold = faker.number.int({ min: 1, max: 100 });
    const unit_cost = Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 }));
    const unit_price = Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 }));
    const total_cost = units_sold * unit_cost;
    const total_revenue = units_sold * unit_price;
    const gross_margin = total_revenue - total_cost;

    const credit_card = faker.number.int({ min: 0, max: units_sold });
    const pix = faker.number.int({ min: 0, max: units_sold - credit_card });
    const cash = units_sold - credit_card - pix;

    const dateObj = faker.date.past();
    const dateStr = dateObj.toISOString().split('T')[0];
    const month = dateObj.getMonth() + 1;

    return {
        id: faker.string.uuid(),
        year: dateStr.split('-')[0],
        date: dateStr,
        region: faker.helpers.arrayElement(["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"]),
        store: faker.company.name(),
        category: faker.helpers.arrayElement(["Eletrônicos", "Eletrodomésticos", "Móveis", "Roupas", "Brinquedos"]),
        product: faker.commerce.productName(),
        units_sold,
        unit_cost,
        unit_price,
        total_revenue,
        total_cost,
        gross_margin,
        payment_methods: { credit_card, pix, cash },
        sales_channel: faker.helpers.arrayElement(["Loja Física", "E-commerce", "Marketplace"]),
        customer_satisfaction: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
        returns: faker.number.int({ min: 0, max: 5 }),
        delivery_time_avg_days: Number(faker.number.float({ min: 0, max: 10, fractionDigits: 1 })),
        month,
    };
}

export const data: SalesData[] = Array.from({ length: 40 }).map(generateSales);