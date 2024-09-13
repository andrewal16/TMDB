import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = '032a4051191e2e162e4ba00caba4765e';
const REQUEST_TOKEN_URL = 'https://api.themoviedb.org/3/authentication/token/new';
const SESSION_ID_URL = 'https://api.themoviedb.org/3/authentication/session/new';

interface UserState {
    username: string;
    sessionId: string | null;
    error: string | null;
}

const initialState: UserState = {
    username: '',
    sessionId: null,
    error: null
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const { data: { request_token } } = await axios.get(REQUEST_TOKEN_URL, {
                params: { api_key: API_KEY }
            });

            await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
                username,
                password,
                request_token
            }, {
                params: { api_key: API_KEY }
            });

            const { data: { session_id } } = await axios.post(SESSION_ID_URL, {
                request_token
            }, {
                params: { api_key: API_KEY }
            });

            return { username, sessionId: session_id };
        } catch (error) {
            return rejectWithValue("Login Failed. Please check your credentials.");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ username: string; sessionId: string }>) => {
                state.username = action.payload.username;
                state.sessionId = action.payload.sessionId;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export default userSlice.reducer;