'use client';
export function LoadingComponent() {
    return (
        <div className="flex items-center min-h-[400px] h-full w-full justify-center">
            <div className="animate-spin w-[120px] h-[120px] border-10 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    )
}