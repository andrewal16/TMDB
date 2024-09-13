import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Pagination from "./Pagination";
import avatarDefault from '../../public/avatar-defatult.jpg'

const MovieReviewCard: React.FC = () => {
  const { reviews } = useSelector((state: RootState) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4; 
  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="w-full max-w-6xl mt-10 font-semibold">
        <h2 className="text-center text-2xl font-bold mb-4">Reviews:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentReviews.map((review) => (
            <div key={review.id} className="card bg-blue-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                        : avatarDefault
                    }
                    alt={`${review.author} Avatar`}
                    className="w-16 h-16 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <h3 className="text-center text-base font-semibold">
                      {review.author}
                    </h3>

                    {review.author_details.rating && (
                      <p className="text-sm text-gray-600">
                        Rating: {review.author_details.rating}/10
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 overflow-hidden">
                  {review.content.slice(0, 150)}...
                </p>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-active btn-link"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default MovieReviewCard;
