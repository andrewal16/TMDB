import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "../model/MovieModel";
import { RootState } from "../store/Store";

interface Collection {
  id: number;
  name: string;
  movies: Movie[];
}

interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
}

const initialState: CollectionState = {
  collections: [
    { id: 0, name: "My Favorites", movies: [] },
    { id: 1, name: "Watch Later", movies: [] },
  ],
  loading: false,
  error: null,
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "032a4051191e2e162e4ba00caba4765e"; 

export const addMovieToCollection = createAsyncThunk<
  { movie: Movie; collectionId: number },
  { movieId: number; collectionId: number },
  { state: RootState; rejectValue: string }
>(
  "collections/addMovieToCollection",
  async ({ movieId, collectionId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accountId = state.user.accountId;
      const sessionId = state.user.sessionId;
      
      if (!accountId || !sessionId) {
        console.error("Missing accountId or sessionId", { accountId, sessionId });
        throw new Error("Account ID or Session ID is missing");
      }

      const url = collectionId === 0 
        ? `${BASE_URL}/account/${accountId}/favorite`  
        : `${BASE_URL}/account/${accountId}/watchlist`; 

      console.log("Sending request to:", url);

      const requestBody = {
        media_type: "movie",
        media_id: movieId,
        favorite: collectionId === 0, 
        watchlist: collectionId === 1, 
      };

      console.log("Request payload:", requestBody);

      const response = await axios.post(url, requestBody, {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });

      console.log("API Response:", response.data);

      if (response.status !== 201 || !response.data.success) {
        throw new Error(response.data.status_message || "Failed to add movie to collection");
      }

      const movieResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });

      const movie: Movie = movieResponse.data;
      return { movie, collectionId };
    } catch (error) {
      console.error("Error in addMovieToCollection:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.status_message || error.message;
        console.error("Axios error details:", errorMessage);
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("An unexpected error occurred. Please check console for details.");
    }
  }
);

export const fetchCollections = createAsyncThunk<
  Collection[],
  void,
  { state: RootState; rejectValue: string }
>(
  "collections/fetchCollections",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accountId = state.user.accountId;
      const sessionId = state.user.sessionId;

      if (!accountId || !sessionId) {
        throw new Error("Account ID or Session ID is missing");
      }

      const favoritesResponse = await axios.get(`${BASE_URL}/account/${accountId}/favorite/movies`, {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });

      const watchlistResponse = await axios.get(`${BASE_URL}/account/${accountId}/watchlist/movies`, {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      });

      return [
        { id: 0, name: "My Favorites", movies: favoritesResponse.data.results },
        { id: 1, name: "Watch Later", movies: watchlistResponse.data.results },
      ];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.status_message || error.message);
      }
      return rejectWithValue("An unexpected error occurred while fetching collections");
    }
  }
);

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    clearCollectionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMovieToCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovieToCollection.fulfilled, (state, action: PayloadAction<{ movie: Movie; collectionId: number }>) => {
        state.loading = false;
        const { movie, collectionId } = action.payload;
        const collection = state.collections.find(
          (collection) => collection.id === collectionId
        );
        if (collection) {
          const movieIndex = collection.movies.findIndex((m) => m.id === movie.id);
          if (movieIndex === -1) {
            collection.movies.push(movie);
          } else {
            collection.movies[movieIndex] = movie; 
          }
        }
      })
      .addCase(addMovieToCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while adding the movie to the collection";
      })
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while fetching collections";
      });
  },
});

export const { clearCollectionError } = collectionSlice.actions;

export const selectCollections = (state: RootState) => state.collection.collections;
export const selectCollectionLoading = (state: RootState) => state.collection.loading;
export const selectCollectionError = (state: RootState) => state.collection.error;

export default collectionSlice.reducer;