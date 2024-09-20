import { Movie } from "../model/MovieModel";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieDetail } from "../model/MovieDetail";
import { Review } from "../model/ReviewModel";
export type { Movie };
interface MovieState {
  movies: Movie[];
  movie: MovieDetail | null;
  reviews: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: MovieState = {
  movies: [],
  movie: null,
  reviews: [],
  status: "idle",
  error: null,
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "032a4051191e2e162e4ba00caba4765e";

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlayingMovies",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      });
      return response.data.results.slice(0, 10);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.status_message ||
            "An error occurred while fetching movies."
        );
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      });
      return response.data.results.slice(0, 10);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.status_message ||
            "An error occurred while fetching movies."
        );
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/fetchMovieDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching movie details");
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      });
      return response.data.results.slice(0, 10);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.status_message ||
            "An error occurred while fetching movies."
        );
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const fetchMovieReviews = createAsyncThunk(
  "movie/fetchMovieReviews",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.results.slice(0, 4);
    } catch (error) {
      return rejectWithValue("Error fetching movie reviews");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchNowPlayingMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
        }
      )
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPopularMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
        }
      )
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUpcomingMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
        }
      )
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "An unknown error occurred";
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchMovieDetail.fulfilled,
        (state, action: PayloadAction<MovieDetail>) => {
          state.movie = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
      })
      .addCase(fetchMovieReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMovieReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.reviews = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

export default movieSlice.reducer;
