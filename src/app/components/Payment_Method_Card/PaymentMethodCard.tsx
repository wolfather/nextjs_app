import { memo, useMemo } from "react";
import { Card } from "../Card/Card";
import { HasCategoryAndPayments, PaymentMehodProps } from "./entities";
import { getPaymentMethodController } from "./getPaymentMethodController";

export function PaymentMehodCardComponent<T extends HasCategoryAndPayments>({data}: PaymentMehodProps<T>) {
    const paymentMethods = useMemo(() => getPaymentMethodController({data}), [data]);

    return (
        <Card title='Payment Methods' type='none'>
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
        </Card>
    );
}

export const PaymentMehodCard = memo(PaymentMehodCardComponent) as typeof PaymentMehodCardComponent;
