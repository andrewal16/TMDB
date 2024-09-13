import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-end mt-8">
      <div className="btn-group">
        <button
          className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="btn">{currentPage}</button>
        <button
          className="btn"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
