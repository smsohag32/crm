
const SearchInput = ({ handleSearch }) => {
   return (
      <div className="relative w-full max-w-sm ">
         <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
            className="py-[6px] ps-[40px] primary-input pe-5 w-full outline-none border border-[#006837] rounded-[4px]"
         />
         <span className="absolute left-4 transform -translate-y-1/2 top-1/2 ">
            <svg
               width="16"
               height="16"
               viewBox="0 0 20 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                  stroke="#B4B4B4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
         </span>
      </div>
   );
};

export default SearchInput;
