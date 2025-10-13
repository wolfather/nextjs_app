import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    email: string;
    session: string;
}

export interface SessionValues {
    user: User;
}

const sessionValues = {
    user: {} as User,
}

const sessionSlice = createSlice({
    name: 'sessionValues',
    initialState: sessionValues,
    reducers: {
        setSessionValues(state: SessionValues, action: PayloadAction<SessionValues>) {
            if (action.payload.user.session !== '') {
                return {
                    ...state,
                    user: action.payload.user,
                };
            }
        }
    }
})

const { reducer, actions } = sessionSlice;

export const { setSessionValues } = actions;
export const sessionReducer = reducer;