import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = '032a4051191e2e162e4ba00caba4765e'; 
const REQUEST_TOKEN_URL = 'https://api.themoviedb.org/3/authentication/token/new';
const SESSION_ID_URL = 'https://api.themoviedb.org/3/authentication/session/new';
interface user {
    username: string, 
    sessionId: string,
    error: string | null
}

interface initialState{
    username: '',
    sessionId: null,
    error: string | null
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async({username, password}: { username: string; password: string}, {rejectWithValue}) => {
        try {
            const{data: {request_token}} = await axios.get(REQUEST_TOKEN_URL, {
                params: {
                    api_key: API_KEY
                }
            });

            await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
                api_key : API_KEY,
                request_token,
                username,
                password
            })
            const {data: {session_id} } = await axios.post(SESSION_ID_URL, {
                api_key: API_KEY,
                request_token
            })

            return {username, sessionId: session_id}
        } catch (error) {
            return rejectWithValue("Login Failed. Please Check your credentials")
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.username = action.payload.username
                state.sessionId = action.payload.sessionId
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
})

export default userSlice.reducer
