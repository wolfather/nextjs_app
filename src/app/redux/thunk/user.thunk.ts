import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = 'https://jsonplaceholder.typicode.com';

const repository = async (userId?: string) => {
    let response: Response;
    if(userId) {
        response = await fetch(`${URL}/users/${userId}`)
    } else {
        response = await fetch(`${URL}/users`)
    }

    return { response };
}

export const userThunk = createAsyncThunk(
    'users/fetch',
    async(userId?: string) => {
        
        const { response } = await repository(userId);
        if(response.status === 200) {
            return response.json();
        }

        return {};
    }
)