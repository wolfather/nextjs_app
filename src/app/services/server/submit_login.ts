type SubmitLoginResponse = {
    success: boolean,
    data: unknown,
}
export async function submitLogin<T extends Record<string, string>>(formData: FormData): Promise<SubmitLoginResponse> {
    const data = Object.fromEntries(formData.entries()) as T;
    const values = [];

    for(const [k, v] of Object.entries(data)) {
        console.log('server', {k, v})
        values.push(v)
    }
    
    if(values.length) {
        return {success: true, data: values};
    }
    return {success: false, data: values};
}