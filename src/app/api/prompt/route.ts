
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt, data: promptData } = await req.json();

    const parsedData = JSON.stringify(promptData);

    const body = {
        prompt: `Analisando os seguintes dados de vendas (em formato JSON):\n\n${parsedData}\n\nAgora, ${prompt}`,
        model: "llama3",
        system: "Você é um assistente útil que fornece insights com base nos dados de vendas.",
        options: { temperature: 0.7 },
        stream: false,
    };
    try {
        const response = await fetch(
            process.env.PROMPT_API_URL as string,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            }
        );
    
        const data = await response.json();
        console.log('Response from external API:', data);
        return NextResponse.json({debug: 'log', data});
    } catch (error) {
        console.error('Error in POST /api/prompt:', error);
        return NextResponse.json({ error: ((error as Error).message || 'Internal Server Error') }, { status: 500 });
    }
};
