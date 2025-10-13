export interface PaymentMethods {
    credit_card: number;
    pix: number;
    cash: number;
}
export interface SalesData {
    id: string;
    date: string;
    region: string;
    store: string;
    category: string;
    product: string;
    units_sold: number;
    unit_cost: number;
    unit_price: number;
    total_revenue: number;
    total_cost: number;
    gross_margin: number;
    payment_methods: PaymentMethods;
    sales_channel: string;
    customer_satisfaction: number;
    returns: number;
    delivery_time_avg_days: number;
    month: number;
}