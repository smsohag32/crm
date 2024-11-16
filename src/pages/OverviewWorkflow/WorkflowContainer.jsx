import { Button } from "@/components/ui/button";
import { useState } from "react";
import Column from "./Column";

const WorkflowContainer = () => {
   const [columnData, setColumnData] = useState([]);

   // Function to handle adding a new column
   const handleAdd = () => {
      const newColumn = {
         id: `column-${Date.now()}`,
         name: `Column ${columnData.length + 1}`
      };
      setColumnData((prev) => [...prev, newColumn]);
   };

   return (
      <div className="px-5 py-3">
         <div className="flex border-b pb-3 items-center justify-end">
            <Button onClick={handleAdd}>Add New</Button>
         </div>

         <div className="overflow-x-auto w-full h-[79vh] ">
            {columnData && columnData.length > 0 ? (
               <div className="flex flex-nowrap h-fit w-fit">
                  {columnData.map((column, index) => (
                     <Column index={index} column={column} key={column.id} />
                  ))}
               </div>
            ) : (
               <p className="text-center">Empty</p>
            )}
         </div>
      </div>
   );
};

export default WorkflowContainer;
