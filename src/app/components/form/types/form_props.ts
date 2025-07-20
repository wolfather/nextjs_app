
import { type ReactNode } from "react";
import { UseFormHandleSubmit, Path, RegisterOptions } from "react-hook-form";

export interface FormComponentProps<T extends Record<string, any>> {
    legend?: string;
    isSubmitting: boolean;
    handleSubmit: UseFormHandleSubmit<T>;
    children: ReactNode;
}

export interface FormInputFieldType<T extends Record<string, any>> {
    name: keyof T;
    label: string;
    type: string;
    placeHolder: string;
    validation: RegisterOptions<T, Path<T>>;
}
