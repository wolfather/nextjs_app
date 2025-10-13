import { apiDict } from "@/app/dictionaries/api";

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface FetchDataParams {
    externalUrl?: string;
    url: keyof typeof apiDict;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
}

const getInitProps = async(params: FetchDataParams): Promise<RequestInit> => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN as string}`,
    };

    let initProps: RequestInit = {
        cache: 'no-store',
        method: params.method || 'GET',
        headers,
    };

    if (params.method !== 'GET' && params.body) {
        initProps = {...initProps, body: JSON.stringify(params.body)};
    }

    return initProps;
}

const getExternalInitProps = async(params: FetchDataParams): Promise<RequestInit> => {
    const headers = {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${process.env.API_TOKEN as string}`,
    };

    let initProps: RequestInit = {
        cache: 'no-store',
        method: params.method || 'GET',
        headers,
    };

    if (params.method !== 'GET' && params.body) {
        initProps = {...initProps, body: JSON.stringify(params.body)};
    }

    return initProps;
}

export async function fetchData<T>(params: FetchDataParams): Promise<ApiResponse<T>> {
    const initProps = await getInitProps(params);
    const url = `${process.env.BASE_URL as string}/${apiDict[params.url]}`;
    console.log('Fetching URL:', url);
    if (!url) {
        throw new Error('URL is required');
    }

    const response = await fetch(url, initProps);

    const data: T = await response.json();

    return {
        data,
        status: response.status,
        statusText: response.statusText,
    };
}

export async function fetchExternalData<T>(params: FetchDataParams): Promise<ApiResponse<T>> {
    const initProps = await getInitProps(params);
    const url = params.externalUrl!;
    console.log('Fetching URL:', url);
    if (!url) {
        throw new Error('URL is required');
    }

    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json'},
        cache: 'no-store',
        method: "POST",
        body: JSON.stringify({
            prompt: JSON.parse(params.body as string).prompt,
            data: JSON.parse(params.body as string).data,
            system: "Instruções do sistema",
            model: "llama3",
            options: { temperature: 0.8 },
        }),
    });

    const data: T = await response.json();

    return {
        data,
        status: response.status,
        statusText: response.statusText,
    };
}
