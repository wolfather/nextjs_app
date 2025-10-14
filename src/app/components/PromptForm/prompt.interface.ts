
export interface PromptProps {
    data: any;
}

export interface IAResponse {
    context: number[];
    created_at: string;
    done: boolean;
    done_reason: string;
    eval_count: number;
    eval_duration: number;
    load_duration: number;
    model: string;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    response: string;
    total_duration: number;
}