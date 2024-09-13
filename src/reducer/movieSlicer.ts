import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from '../model/MovieModel';
export type { Movie };

interface MovieState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  error: null,
};

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '032a4051191e2e162e4ba00caba4765e';

export const fetchNowPlayingMovies = createAsyncThunk('movies/fetchNowPlayingMovies', async (page: number, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: page
      }
    });
    return response.data.results.slice(0,10);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.status_message || 'An error occurred while fetching movies.');
    }
    return rejectWithValue('An unexpected error occurred.');
  }
});

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async (page:number, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: page
      }
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.status_message || 'An error occurred while fetching movies.');
    }
    return rejectWithValue('An unexpected error occurred.');
  }
});

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async (page: number, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: page
      }
    });
    return response.data.results.slice(0,10);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.status_message || 'An error occurred while fetching movies.');
    }
    return rejectWithValue('An unexpected error occurred.');
  }
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'An unknown error occurred';
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'An unknown error occurred';
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'An unknown error occurred';
      });
  },
});

export default movieSlice.reducer;