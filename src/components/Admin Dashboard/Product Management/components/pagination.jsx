import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  filteredOrdersCount,
  paginatedOrdersCount,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex flex-row-reverse gap-2">
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1 ? "text-gray-400" : "text-gray-700"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-[#EE446E] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages ? "text-gray-400" : "text-gray-700"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>

      <p className="text-gray-500">
        عرض {paginatedOrdersCount} من {filteredOrdersCount}
      </p>
    </div>
  );
};

export default Pagination;