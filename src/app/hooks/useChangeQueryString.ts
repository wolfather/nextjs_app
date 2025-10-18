import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, FormEvent } from "react";
import { SalesFilterProps } from "../sales/entities/sales.interface";

export function useChangeQueryString<T>() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [filters, setFilters] = useState<SalesFilterProps>({year: '', category: ''});
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
        setFilters({year: '', category: ''});
        router.push(pathName);
    };

    useEffect(() => {
        const filtersValues: SalesFilterProps = {year: '', category: ''};

        params.current
            .forEach((value, key) => {
                filtersValues[key as keyof SalesFilterProps] = value;
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