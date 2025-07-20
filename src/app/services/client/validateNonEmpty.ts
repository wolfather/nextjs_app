
export function validateNonEmpty(value: string): boolean {
    if(value.trim() !== '') {
        return true;
    }
    return false;
}