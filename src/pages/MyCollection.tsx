import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCollections } from "../reducer/collectionSlice";
import MovieCard from "../components/MovieCard";

const CollectionPage: React.FC = () => {
  const collections = useSelector(selectCollections);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Collections</h1>
      {collections.map((collection) => (
        <div key={collection.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{collection.name}</h2>
          {collection.movies.length === 0 ? (
            <p className="text-gray-500">No movies in this collection yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collection.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      ))}
      <Link to="/movie" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
};

export default CollectionPage;