
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, _: NextResponse) {
    const { prompt, data: promptData } = await req.json();

    let parsedPromptData = promptData;
    if (typeof promptData === "string") {
      try {
        parsedPromptData = JSON.parse(promptData);
      } catch {
        console.warn("⚠️ promptData já é uma string JSON válida, não foi parseada novamente.");
      }
    }
    const parsedData = JSON.stringify(parsedPromptData, null, 2);

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
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in POST /api/prompt:', error);
        return NextResponse.json({ error: ((error as Error).message || 'Internal Server Error') }, { status: 500 });
    }
};
