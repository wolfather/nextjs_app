import { type FormInputFieldType } from "@/app/components/form/types/form_props";

export function loginFormFieldsFactory<T extends Record<string, any>>(): FormInputFieldType<T>[] {
    const factory: FormInputFieldType<T>[] = [
        {
            name: 'user',
            label: "E-mail",
            type: "email",
            placeHolder: "e-mail",
            validation: {
                required: true,
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "invalid pattern"
                }
            },
        },
        {
            name: "pass",
            label: "Password",
            type: "text",
            placeHolder: "password",
            validation: {required: true}
        },
    ];

    return factory;
}
