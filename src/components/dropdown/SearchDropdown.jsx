import React, { useState, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";

export const SearchDropdown = ({ optionData, placeholder, value, setValue, searchValue, setSearchValue }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   // Handle option selection
   const handleSelect = (selectedOption) => {
      setValue(selectedOption);
      setIsOpen(false);
      setSearchValue("");
   };

   const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // Filter options based on search value
   const filteredOptions =
      searchValue?.length >= 2
         ? optionData.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
         )
         : optionData;

   return (
      <div ref={dropdownRef} className="relative w-64">
         {/* Input Box */}
         <input
            type="text"
            value={searchValue}
            placeholder={placeholder}
            onClick={() => setIsOpen((prev) => !prev)}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
         />

         {/* Dropdown Options */}
         {isOpen && (
            <div className="absolute z-[999999] w-full bg-white h-[200px] border rounded-md shadow-md   mt-1">
               {/* Display message if no options */}
               <ScrollArea className="h-[200px] ">
                  {filteredOptions?.length === 0 ? (
                     <div className="px-3 py-2 text-gray-500">
                        Not found
                     </div>
                  ) : (
                     filteredOptions?.map((option) => (
                        <div
                           key={option.value}
                           onClick={() => handleSelect(option)}
                           className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                           {option.label}
                        </div>
                     ))
                  )}
               </ScrollArea>
            </div>
         )}
      </div>
   );
};
