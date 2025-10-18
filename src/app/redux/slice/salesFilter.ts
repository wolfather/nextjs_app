import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SalesFilterProps = {
    selectedYear?: string,
    selectedCategory?: string,
    selectedOrderBy?: string,
}
const initialState: SalesFilterProps = {
    selectedYear: '',
    selectedCategory: '',
    selectedOrderBy: '',
};

const salesFilterSlice = createSlice({
    name: 'salesFilter',
    initialState,
    reducers: {
        setSalesFilter(state: SalesFilterProps, action: PayloadAction<SalesFilterProps>) {
            return {
                ...state, 
                selectedYear: action.payload.selectedYear,
                selectedCategory: action.payload.selectedCategory,
                selectedOrderBy: action.payload.selectedOrderBy,
            };
        }
    }
});

const { reducer, actions } = salesFilterSlice;
export const { setSalesFilter } = actions;
export const salesFilterReducer = reducer;