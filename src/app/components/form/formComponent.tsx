'use client';

import { appendFormdata } from "./services/append_formdata";
import { submitLogin } from "@/app/services/server/submit_login";
import { FormComponentProps } from "./types/form_props";

export function FormComponent<T extends Record<string, any>>({
    legend, isSubmitting, children, handleSubmit}: FormComponentProps<T>
) {
    const onSubmit = handleSubmit(async (data: T) => {
        const formData = appendFormdata<T>(data);

        const result = await submitLogin<T>(formData);
        console.log({result});
    });

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                {legend !== '' ? <legend>{legend}</legend> : <></>}

                {children}

                <div className="flex justify-end">
                    <input
                        className="bg-green-200 p-3 text-2 rounded-lg"
                        disabled={isSubmitting}
                        type='submit'
                        value='Submit'
                    />
                </div>
            </fieldset>
        </form>
    );
}
