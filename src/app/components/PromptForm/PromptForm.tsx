'use client';

import { clearString } from "@/app/services/client/clear_string";
import { fetchExternalData } from "@/app/services/client/fetch_data";
import { type ChangeEvent, memo, useCallback, useState } from "react";
import { IAResponse, type PromptProps } from "./prompt.interface";
import { useTranslations } from "next-intl";

function PromptFormComponent({ data }: PromptProps) {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string>('');
    const t = useTranslations('common');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!inputValue.trim()) return;

        try {
            const {data: resultData} = await fetchExternalData<IAResponse>({
                externalUrl: process.env.NEXT_PUBLIC_IA_PROMPT_API_URL as string,
                url: 'postApiGenerate', 
                method: 'POST',
                body: { data },
            });

            const cleanedResponse = clearString(resultData.response);

            setResponse(cleanedResponse);
            setInputValue('');
        } catch (error) {
            console.error('Error fetching prompt response:', error);
        } finally {
            setLoading(false);
        }
    }, [inputValue, data]);

    return (
        <div className="max-w-[360px]">
            <div className="h-[120px] overflow-y-auto font-normal text-[1rem]">{response}</div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Qual insight você gostaria de obter dos dados de vendas?"
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}>
                </textarea>
                <button
                    disabled={!inputValue.trim() || data === null || loading}
                    type="submit" 
                    className="place-self-end mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    {t(`button.${loading ? 'loading' : 'submit'}`)}
                </button>
            </form>
        </div>
    );
}

export const PromptForm = memo(PromptFormComponent);
