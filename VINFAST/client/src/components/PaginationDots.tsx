import React from "react";

interface PaginationDotsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationDots({ totalPages, currentPage }: PaginationDotsProps) {
  return (
    <div className="flex justify-center mt-6 gap-3">
      {Array.from({ length: totalPages }).map((_, i) => (
        <span
          key={i}
          className={
            "w-4 h-4 rounded-full inline-block transition-all duration-200 " +
            (i === currentPage
              ? "bg-lime-500 scale-125 shadow-lg"
              : "bg-gray-300")
          }
        ></span>
      ))}
    </div>
  );
}
