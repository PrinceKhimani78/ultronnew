'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export type BlogPaginationProps = {
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
};

export function BlogPagination({
  totalPages = 4,
  initialPage = 1,
  onPageChange,
}: BlogPaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex items-center justify-center gap-2 sm:mt-20"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FAF8F5] text-[#1A1A1A] transition-all duration-200 hover:border-[#035551] hover:bg-[#035551]/10 hover:text-[#035551] focus:ring-2 focus:ring-[#035551] focus:outline-none disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={`flex h-11 min-w-[44px] items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-[#035551] focus:outline-none ${
                isActive
                  ? 'bg-[#035551] text-white shadow-md'
                  : 'border border-[#E5E7EB] bg-[#FAF8F5] text-[#1A1A1A] hover:border-[#035551] hover:bg-[#035551]/10 hover:text-[#035551]'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FAF8F5] text-[#1A1A1A] transition-all duration-200 hover:border-[#035551] hover:bg-[#035551]/10 hover:text-[#035551] focus:ring-2 focus:ring-[#035551] focus:outline-none disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
