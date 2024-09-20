import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/Store";

const API_KEY = '032a4051191e2e162e4ba00caba4765e';
const REQUEST_TOKEN_URL = 'https://api.themoviedb.org/3/authentication/token/new';
const SESSION_ID_URL = 'https://api.themoviedb.org/3/authentication/session/new';
const ACCOUNT_URL = 'https://api.themoviedb.org/3/account';

interface UserState {
    username: string;
    sessionId: string | null;
    accountId: string | null;
    error: string | null;
    isLoading: boolean;
}

const loadState = (): UserState => {
    try {
        const serializedState = localStorage.getItem('userState');
        if (serializedState === null) {
            return {
                username: '',
                sessionId: null,
                accountId: null,
                error: null,
                isLoading: false
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            username: '',
            sessionId: null,
            accountId: null,
            error: null,
            isLoading: false
        };
    }
};

const saveState = (state: UserState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userState', serializedState);
    } catch {
        // Ignore write errors
    }
};

const initialState: UserState = loadState();

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
            const { data: { id: accountId } } = await axios.get(ACCOUNT_URL, {
                params: { api_key: API_KEY, session_id }
            });

            return { username, sessionId: session_id, accountId };
        } catch (error) {
            return rejectWithValue("Login Failed. Please check your credentials.");
        }
    }
);

export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
    'user/logoutUser',
    async (_, { getState, rejectWithValue }) => {
      try {
        const { user: { sessionId } } = getState();
        if (sessionId) {
          await axios.delete('https://api.themoviedb.org/3/authentication/session', {
            params: { api_key: API_KEY },
            data: { session_id: sessionId }
          });
        }
      } catch (error) {
        return rejectWithValue("Logout Failed.");
      }
    }
  );

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ username: string; sessionId: string; accountId: string }>) => {
                state.username = action.payload.username;
                state.sessionId = action.payload.sessionId;
                state.accountId = action.payload.accountId;
                state.error = null;
                state.isLoading = false;
                saveState(state);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.username = '';
                state.sessionId = null;
                state.accountId = null;
                state.error = null;
                state.isLoading = false;
                saveState(state);
              })
              .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
              });
    }
});

export const { clearError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsLoggedIn = (state: RootState) => !!state.user.sessionId;
export const selectUsername = (state: RootState) => state.user.username;
export const selectError = (state: RootState) => state.user.error;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;