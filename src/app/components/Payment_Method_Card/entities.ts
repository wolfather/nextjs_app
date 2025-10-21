export type CategoryPaymentsMethods = {
    credit_card: number,
    pix: number,
    cash: number,
}

export type CategoryItem = {
    category: string,
    label: string,
    payment_methods: CategoryPaymentsMethods,
}

export type CategoryGroup = {
    category: string,
    label: string,
    payment_methods: CategoryPaymentsMethods;
}

export type CardCategory = Record<string, CategoryGroup>;

export interface HasCategoryAndPayments {
    category: string;
    payment_methods: CategoryPaymentsMethods;
}
export type PaymentMehodProps<T> = {
    data: T[],
}