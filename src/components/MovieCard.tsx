import React from 'react';
import { Movie } from '../reducer/movieSlicer';  
import { useNavigate } from 'react-router';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  console.log('MovieCard received movie:', movie);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={handleClick} >
      <img 
        src={posterUrl} 
        alt={movie.title || 'Movie poster'} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.title || 'Untitled'}</h2>
        <p className="text-sm text-gray-600 mb-2">
          Release Date: {movie.release_date || 'Unknown'}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Rating: {movie.vote_average ? `${movie.vote_average}/10` : 'Not rated'}
        </p>
        <p className="text-sm">
          {movie.adult ? 'Adult' : 'All Ages'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;