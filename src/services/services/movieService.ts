// import axios from "axios";
// import Movie from "../../model/MovieModel";
// import { PaginatedResponse } from "../../model/PaginatedResponse";

// const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzJhNDA1MTE5MWUyZTE2MmU0YmEwMGNhYmE0NzY1ZSIsIm5iZiI6MTcyNjExMTE3MS40NTMxMjMsInN1YiI6IjY1OGMzNDRhNjcyOGE4NmRkMjI4MDJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.icj8pn6GNBvhGqlz6H5kYzJC4RHdB5yEjKAUWwR6UW4';
// const BASE_URL = 'https://api.themoviedb.org/3';


// export const getNowPlayingMovies = async (): Promise<PaginatedResponse<Movie>> => {
//     const response = await axios.get<PaginatedResponse<Movie>>(`${BASE_URL}/movie/now_playing`, {
//       params: {
//         api_key: API_KEY
//       }
//     });
//     return response.data;
//   };