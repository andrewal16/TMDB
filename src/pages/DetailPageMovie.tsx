import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { fetchMovieDetail, fetchMovieReviews } from "../reducer/movieSlicer";
import MovieReviewCard from "../components/MovieReviewCard";

const DetailPageMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { movie, status, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
      dispatch(fetchMovieReviews(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') return <span className="flex justify-center items-center loading loading-dots loading-lg"></span>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!movie) return <div className="flex justify-center items-center h-screen">No movie data available</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary mb-4 self-start"
      >
        Back
      </button>
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
        <div className="flex-shrink-0 w-full lg:w-1/3 bg-gray-200">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg font-semibold mb-2">
            Producer: {movie.production_companies.map(company => company.name).join(', ')}
          </p>
          <p className="mb-2">Release Date: {movie.release_date}</p>
          <p className="mb-2">Runtime: {movie.runtime} minutes</p>
          <p className="mb-2">Rating: {movie.vote_average}/10 ({movie.vote_count} votes)</p>
          <h2 className="text-xl font-semibold mb-2">Synopsis:</h2>
          <p className="mb-4">{movie.overview}</p>
          <h2 className="text-xl font-semibold mb-2">Genres:</h2>
          <p className="mb-4">{movie.genres.map(genre => genre.name).join(', ')}</p>
          <h2 className="text-xl font-semibold mb-2">Tagline:</h2>
          <p className="mb-4 italic">"{movie.tagline}"</p>
        </div>
      </div>
      <div>
        <MovieReviewCard/>
      </div>
    </div>
  );
};

export default DetailPageMovie;
