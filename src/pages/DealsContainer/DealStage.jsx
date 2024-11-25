import UserAvatar from "@/components/user-avatar/UserAvatar";
import { EllipsisVertical } from "lucide-react";

const DealStage = () => {
   return (
      <div className="flex-shrink-0 w-[300px] h-[90vh] overflow-y-auto border-e border-e-gray-300">
         <div className="py-1 px-1 mb-1  bg-gray-50 shadow-sm flex items-center">
            <p className="text-base font-medium line-clamp-1 flex-1  ">Stage One.</p>
            <div><p>20</p></div>
         </div>

         <div className="px-1.5">
            <div className="border-s-4  border-s-[#3f241ca8] rounded-[2px]  shadow-sm items-start px-2 py-2 w-full bg-white">
               <div className="flex  items-start gap-2">
                  <UserAvatar className="border" />
                  <div className="flex items-start flex-1 gap-2">
                     <UserAvatar className="border" />
                     <div>
                        <p className="line-clamp-1">Sohag sheik</p>
                        <p>STALE</p>
                     </div>
                  </div>
                  <div>
                     <button> <EllipsisVertical size={16} /></button>
                     <p>2</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 mt-4 w-full">
                  <p className="bg-gray-300 text-xs font-normal w-full rounded-md px-2 py-0.5">On Hold</p>
                  <p className="bg-gray-300 text-xs font-normal w-full rounded-md px-2 py-0.5">On Hold</p>
               </div>
            </div>
         </div>

      </div>
   );
};

export default DealStage;
