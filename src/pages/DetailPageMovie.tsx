import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; name: string; origin_country: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

const DetailPageMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '032a4051191e2e162e4ba00caba4765e';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <span className="flex justify-center display-center items-center   loading loading-dots loading-lg"></span>;
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
    </div>
  );
};

export default DetailPageMovie;