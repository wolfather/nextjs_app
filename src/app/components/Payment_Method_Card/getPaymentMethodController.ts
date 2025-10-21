import type { HasCategoryAndPayments, PaymentMehodProps, CardCategory } from "./entities";


export function getPaymentMethodController<T extends HasCategoryAndPayments>({data}: PaymentMehodProps<T>) {
    const paymentMethods = data.reduce((acc: CardCategory, item: T) => {
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
    }, {} as CardCategory);

    return paymentMethods
}