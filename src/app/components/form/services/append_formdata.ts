import { validateNonEmpty } from "@/app/services/client/validate_non_empty";

export function appendFormdata<T extends Record<string, any>>(data: T): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if(validateNonEmpty(value)) {
            formData.append(key, value);
        }
    });

    return formData;
}
