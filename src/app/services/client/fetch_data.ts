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

    const body = {
        model: "llama3",
        prompt: `analise os dados de vendas: ${JSON.stringify((params.body as any).data)}, e me diga qual é o produto que melhor vendeu.`,
        stream: false,
        //system: "Instruções do sistema",
        //options: { temperature: 0.8 },
    }
    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json'},
        //cache: 'no-store',
        method: "POST",
        body: JSON.stringify(body),
    });

    const data: T = await response.json();

    return {
        data,
        status: response.status,
        statusText: response.statusText,
    };
}
