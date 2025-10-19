import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, FormEvent } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useChangeQueryString<T extends Record<string, any>>() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [filters, setFilters] = useState<T>({} as T);
    const params = useRef<URLSearchParams>(new URLSearchParams(searchParams.toString()));

    const onChangeUrlHandler = (e: FormEvent) => {
        e.preventDefault();
        
        Object.entries(filters).forEach(([k, v]) => {
            if(v) {
                params.current.set(k, v);
            } else {
                params.current.delete(k)
            }
        });

        const query = params.current.toString();

        router.push((query ? `${pathName}?${query}` : pathName));
    };

    const onResetHandler = () => {
        setFilters({} as T);
        router.push(pathName);
    };

    useEffect(() => {
        const filtersValues = {} as T;

        params.current
            .forEach((value, key) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (filtersValues as any)[key] = value;
            });
        setFilters(filtersValues);
    }, []);

    return {
        onChangeUrlHandler,
        onResetHandler,
        filters,
        setFilters,
    }
}