import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { EllipsisVertical } from "lucide-react";

const ClientCard = ({ client, isOverlay = false }) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: client.id.toString(),
   });

   const style = !isOverlay
      ? {
         transform: CSS.Transform.toString(transform),
         transition,
      }
      : {};

   const handleMenu = (e) => {
      e.stopPropagation(); // Prevent triggering drag events
      console.log("Menu button clicked");
   };

   return (
      <div
         ref={!isOverlay ? setNodeRef : undefined}
         style={style}
         {...(!isOverlay ? { ...attributes, ...listeners } : {})}
         className={`border-s-4 rounded-[2px] shadow-sm items-start px-2 py-2 w-full ${client.isHold ? "bg-orange-100" : "bg-white"
            } ${isOverlay ? "opacity-90 scale-105" : ""}`}
      >
         <div className="flex items-start gap-1">
            <UserAvatar className="border bg-gray-100 text-des" />
            <div className="flex items-start flex-1 gap-2">
               <UserAvatar className="border bg-gray-100 text-des" />
               <div>
                  <p className="line-clamp-1 text-title text-base font-medium">{client.name}</p>
                  <p className="text-des text-sm">{client.status}</p>
               </div>
            </div>
            <div>
               <button
                  onClick={handleMenu}
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag when interacting with button
               >
                  <EllipsisVertical size={16} />
               </button>
               <p className="text-des text-sm font-medium">{client.amount}</p>
            </div>
         </div>
         <div className="flex items-center gap-4 mt-4 w-full">
            <p className="bg-gray-200 text-xs font-medium text-des w-full rounded-md px-2 py-0.5">
               {client.status}
            </p>
         </div>
      </div>
   );
};

export default ClientCard;
