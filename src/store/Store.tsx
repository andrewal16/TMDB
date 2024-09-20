import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../reducer/movieSlice";
import userReducer from "../reducer/userSlice"
import collectionReducer from "../reducer/collectionSlice"
export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    user: userReducer,
    movies: movieReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getState = () => store.getState();

export default store