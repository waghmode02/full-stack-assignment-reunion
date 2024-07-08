
import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: pageNumbers }).map((_, index) => (
        <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
