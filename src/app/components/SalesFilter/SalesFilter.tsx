'use client';

import { useChangeQueryString } from "@/app/hooks/useChangeQueryString";
import { SalesFilterProps } from "@/app/(logged)/sales/entities/sales.interface";
import { fetchData } from "@/app/services/client/fetch_data";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useTranslations } from 'next-intl'

type CategoriesList = string[];

function SalesFilterComponent() {
    const {
        filters, setFilters, onResetHandler, onChangeUrlHandler,
    } = useChangeQueryString<SalesFilterProps>();
    const t = useTranslations();

    const [categories, setCategories] = useState<CategoriesList>([]);
    const [loading, setLoading] = useState(false);
    const fetchSelectValues = useCallback(() => {
        setLoading(true);
        fetchData<CategoriesList>({
            url: 'getSalesCategories',
            method: 'GET',
        }).then(({data}) => {
            setCategories(data)
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchSelectValues();
    }, [fetchSelectValues]);

    if(loading) {
        <span>carregando...</span>
    }

    return (
        <div className="flex justify-between w-[50%] max-w-[600px]">
            <select value={filters.year}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setFilters(prev => (
                        {...prev, year: e.target.value}
                    ));
                }}
                className="border border-gray-300 rounded-md p-2 mr-4">
                <option value="">{t('SalesPage.filter.drop_down.all_period')}</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
            </select>

            <select value={filters.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setFilters(prev => (
                        {...prev, category: e.target.value}
                    ));
                }}
                className="border border-gray-300 rounded-md p-2">
                <option value=''>{t('SalesPage.filter.drop_down.all_categories')}</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <button
                type="submit"
                className="cursor-pointer ease-in bg-green-400 py-2 px-4 hover:bg-green-500 text-white-300 rounded-md" 
                onClick={onChangeUrlHandler}>{t('common.button.filter')}</button>

            <button
                type="reset"
                className="cursor-pointer ease-in bg-gray-400 py-2 px-4 hover:bg-gray-500 text-white-300 rounded-md" 
                onClick={onResetHandler}>{t('common.button.clear')}</button>
        </div>
    );
}

export const SalesFilter = memo(SalesFilterComponent);
