'use client';

import { fetchExternalData } from "@/app/services/client/fetch_data";
import { ChangeEvent, useState } from "react";

interface PromptProps {
    data: any;
}

export function PromptForm({ data }: PromptProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        try {
            const response = await fetchExternalData({
                externalUrl: process.env.NEXT_PUBLIC_PROMPT_API_URL as string,
                url: 'postApiGenerate', 
                method: 'POST',
                body: JSON.stringify({prompt: inputValue, data}),
            });

            const result = await response.data;
            console.log('Response from API:', result);
        } catch (error) {
            console.error('Error fetching prompt response:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your prompt here..."
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}>
                </textarea>
                <button
                    disabled={!inputValue.trim() || data === null}
                    type="submit" 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Submit
                </button>
            </form>
        </div>
    );
}