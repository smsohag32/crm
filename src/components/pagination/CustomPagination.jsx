import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomPagination = ({ currentPage, totalPages, onPageChange, totalData }) => {
   const handleClick = (page) => {
      onPageChange(page);
   };

   const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPageButtons = 10;
      const sidePages = 2;

      if (totalPages <= maxPageButtons) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         pageNumbers.push(1); // Always show the first page

         if (currentPage > sidePages + 2) {
            pageNumbers.push("...");
         }

         const startPage = Math.max(2, currentPage - sidePages);
         const endPage = Math.min(totalPages - 1, currentPage + sidePages);

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
         }

         if (currentPage < totalPages - sidePages - 1) {
            pageNumbers.push("...");
         }

         pageNumbers.push(totalPages);
      }

      return pageNumbers.map((page, index) =>
         page === "..." ? (
            <span key={index} className="px-4 py-2">
               ...
            </span>
         ) : (
            <button
               key={index}
               onClick={() => handleClick(page)}
               className={`px-2.5 py-1 rounded-[4px] border border-gray-300 ${currentPage === page ? "bg-primary text-white" : ""
                  }`}
            >
               {page}
            </button>
         )
      );
   };

   return (
      <div className="flex mt-auto text-sm items-center flex-wrap  justify-center lg:justify-between px-2">
         <div className="hidden lg:flex items-center gap-2">
            <p><span className="text-des">Shown</span> {totalData}</p>
         </div>
         <div className="flex justify-center gap-1.5 mt-4">
            <button
               disabled={currentPage === 1}
               onClick={() => handleClick(currentPage - 1)}
               className="px-2.5 flex items-center gap-1 py-1 border disabled:opacity-55 disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300 rounded-l-md"
            >
               <ChevronLeft size={14} /> Previous
            </button>
            {renderPageNumbers()}
            <button
               disabled={currentPage === totalPages}
               onClick={() => handleClick(currentPage + 1)}
               className="px-2.5 py-1 flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 rounded-r-md"
            >
               Next <ChevronRight size={14} />
            </button>
         </div>
      </div>
   );
};

export default CustomPagination;
