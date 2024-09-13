import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducer/movieSlicer';
import userReducer from '../reducer/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;