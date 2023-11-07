import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onPageChange: (newPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1)

  return (
    <nav className="mt-2">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            &lsaquo;
          </a>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            &rsaquo;
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
