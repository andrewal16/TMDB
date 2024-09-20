import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../model/MovieModel";
import {
  addMovieToCollection,
  selectCollections,
  selectCollectionLoading,
  selectCollectionError,
} from "../reducer/collectionSlice";
import { AppDispatch } from "../store/Store";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const collections = useSelector(selectCollections);
  const loading = useSelector(selectCollectionLoading);
  const error = useSelector(selectCollectionError);
  const location = useLocation();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleAddToCollection = () => {
    (
      document.getElementById(`modal_${movie.id}`) as HTMLDialogElement
    )?.showModal();
  };

  const handleAddToFavorite = async (collectionId: number) => {
    try {
      await dispatch(addMovieToCollection({ movieId: movie.id, collectionId }));
      (
        document.getElementById(`modal_${movie.id}`) as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Failed to add movie to collection", error);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col min-h-[450px]">
      <img
        src={posterUrl}
        alt={movie.title || "Movie poster"}
        className="w-full h-64 object-cover cursor-pointer"
        onClick={handleClick}
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-2">
            {movie.title || "Untitled"}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Release Date: {movie.release_date || "Unknown"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Rating:{" "}
            {movie.vote_average ? `${movie.vote_average}/10` : "Not rated"}
          </p>
          <p className="text-sm mb-4">{movie.adult ? "Adult" : "All Ages"}</p>
          </div>
          {location.pathname === "/movie" && (
            <button
              className="btn btn-primary w-full mt-4"
              onClick={handleAddToCollection}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Collection"}
            </button>
          )}
        
      </div>

      <dialog id={`modal_${movie.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select Collection</h3>
          <div className="py-4">
            {collections.map((collection) => (
              <button
                key={collection.id}
                className="btn btn-primary w-full mb-2"
                onClick={() => handleAddToFavorite(collection.id)}
                disabled={loading}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MovieCard;
