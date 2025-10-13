import { apiDict } from "@/app/dictionaries/api";

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface FetchDataParams {
    url: keyof typeof apiDict;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
}

export async function fetchData<T>(params: FetchDataParams): Promise<ApiResponse<T>> {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    };

    let initProps: RequestInit = {
        cache: 'no-store',
        method: params.method,
        headers,
    };

    if (params.method !== 'GET' && params.body) {
        initProps = {...initProps, body: JSON.stringify(params.body)};
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${apiDict[params.url]}`,
        initProps
    );

    const data: T = await response.json();

    return {
        data,
        status: response.status,
        statusText: response.statusText,
    };
}
