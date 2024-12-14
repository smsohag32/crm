import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DealCard from "./DealCard";

const DealStage = ({ stage, deals }) => {
   const { setNodeRef: setDroppableRef } = useDroppable({ id: `stage-${stage.name}` });
   const {
      attributes,
      listeners,
      setNodeRef: setSortableRef,
      transform,
      transition,
   } = useSortable({ id: `stage-${stage.name}` });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div
         ref={(node) => {
            setDroppableRef(node);
            setSortableRef(node);
         }}
         style={style}
         {...attributes}
         {...listeners}
         className="flex-shrink-0 w-[300px] h-[76vh] pb-6 bg-slate-300 overflow-y-auto custom-scrollbar border-e border-e-gray-100"
      >
         <div className="py-1 px-2 mb-2 !bg-slate-200 bg-opacity-5 shadow-sm flex items-center sticky top-0 z-10">
            <p className="text-base font-medium line-clamp-1 flex-1">{stage.name}</p>
            <div className="flex items-center text-des gap-1">
               <p>{deals?.length}</p>
               <span className="w-4 h-4 bg-des bg-opacity-30 rounded-e-full"></span>
            </div>
         </div>

         <SortableContext items={deals?.map((deal) => `deal-${deal.id}`)} strategy={verticalListSortingStrategy}>
            <div className="px-1.5 grid gap-2">
               {deals?.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
               ))}
            </div>
         </SortableContext>
      </div>
   );
};

export default DealStage;
