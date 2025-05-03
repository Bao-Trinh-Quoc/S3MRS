import React from 'react';

export default function Pagination({ currentPage, totalPages, paginate }) {
  const pageNumbers = [];

  // Tạo mảng số trang hiển thị tối đa 5
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* Nút Prev */}
      <button
        className="page-button"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>

      {/* Nếu currentPage > 3 thì hiển thị nút đầu */}
      {startPage > 1 && (
        <>
          <button className="page-button" onClick={() => paginate(1)}>
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {/* Các số trang */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-button ${currentPage === number ? 'active' : ''}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}

      {/* Nếu endPage < totalPages thì hiển thị nút cuối */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button className="page-button" onClick={() => paginate(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      {/* Nút Next */}
      <button
        className="page-button"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
}
