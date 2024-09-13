import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { Movie, fetchPopularMovies } from '../reducer/movieSlicer';

const MoviePopular: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error } = useSelector((state: RootState) => state.movies);
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(fetchPopularMovies(currentPage)); 
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);  
  };

  if (status === 'failed') {
    return <div className="text-center text-red-500 text-xl mt-10">Error: {error}</div>;
  }

  if (status === 'loading') {
    return <div className='flex justify-center items-center h-screen'><span className="loading loading-spinner loading-lg "></span></div>

  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        
      />
    </div>
  );
};

export default MoviePopular;
