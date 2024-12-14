import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const DealCard = ({ deal, isOverlay = false }) => {
   const navigate = useNavigate()
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({
      id: `deal-${deal.id}`,
      data: { type: "deal", deal },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      cursor: "grab",
   };

   const handleMenu = (e) => {
      e.stopPropagation();
      console.log("Menu button clicked");
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
         className={`border-s-4 rounded-[2px] shadow-sm items-start px-2 py-2 w-full ${deal.isHold ? "bg-orange-100" : "bg-white"
            } ${isOverlay ? "opacity-90 scale-105 shadow-md" : ""}`}
      >
         <div className="flex items-start gap-2">
            <UserAvatar className="border bg-gray-100 text-des" />
            <div className="flex items-start flex-1 gap-2">
               <div>
                  <p onClick={() => navigate(`/deal/${deal.id}`)} onPointerDown={(e) => e.stopPropagation()} className="line-clamp-1 cursor-pointer hover:underline transition-all duration-200 hover:text-blue-700 text-title text-base font-medium">{deal.lender_name}</p>
                  <p className="text-des text-sm mt-0.5">{deal.security_property_add}</p>
               </div>
            </div>
            <div className=" flex flex-col  items-end justify-end">
               <button
                  onClick={handleMenu}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
               >
                  <EllipsisVertical size={16} />
               </button>
               <p className="text-des text-sm mt-1 font-medium">${deal.loan_amount}</p>
            </div>
         </div>
         <div className="flex items-center gap-4 mt-4 w-full">
            <Badge
               className={`w-full ${deal.deal_type === "Purchase"
                  ? "bg-green-50 text-green-800"
                  : deal.deal_type === "Refine"
                     ? "bg-yellow-50 text-yellow-800"
                     : deal.deal_type === "Construction"
                        ? "bg-blue-50 text-blue-800"
                        : "bg-gray-50 text-gray-800"
                  }`}
               variant="secondary"
            >
               {deal.deal_type}
            </Badge>
         </div>
      </div>
   );
};

export default DealCard;

