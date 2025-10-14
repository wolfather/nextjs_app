export function clearString(input: string): string {
    return input
        //.replace(/<\s*\/?\s*p\s*>/gi, '\n')
        .replace(/<\s*br\s*\/?\s*>/gi, '\n')
        .replace(/\n{2,}/g, '\n')
        .replace(/\n\*/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/^\n+/, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
