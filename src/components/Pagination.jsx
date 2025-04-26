import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMemo } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage, totalItems, visibleItems }) => {
  const maxPagesToShow = 5; // الحد الأقصى لعدد الصفحات التي نعرضها

  const pagesToShow = useMemo(() => {
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex flex-row-reverse gap-2">
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1 ? "text-gray-400" : "text-gray-700"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>

        {pagesToShow.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-[#EE446E] text-white"
                : "bg-[#F1F2F6] text-[#8B909A]"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages ? "text-gray-400" : "text-gray-700"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>

      <p className="text-gray-500">
        عرض {visibleItems} من {totalItems}
      </p>
    </div>
  );
};

export default Pagination;
