'use client';

import { useForm } from "react-hook-form";
import { type Login } from "./types/login";
import { loginFormFieldsFactory } from "../services/client/login_form_fields_factory";
import { FormComponent } from "../components/form/formComponent";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Login>();

    const loginFormFields = loginFormFieldsFactory<Login>();

    return (<div className="flex bg-gray-50 p-3">
        <FormComponent<Login>
            legend='Login'
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}>
            <>
            {loginFormFields.map(({name, type, placeHolder, validation}) => (
                <div
                    key={String(name)}
                    className="bg-sky-50 p-4 mb-4 border-1 border-sky-300 rounded-lg">
                    <input
                        type={type}
                        placeholder={placeHolder}
                        {...register(name as keyof Login, validation)}
                    />
                </div>
            ))}
            </>
        </FormComponent>
    </div>);
}
