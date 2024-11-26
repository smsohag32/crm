import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { AlignLeft, ArrowRight } from "lucide-react";
import React from "react";

const TaskCard = ({ task }) => {
   const { taskName, comments, date, assignedTo, deals, user, status } = task;

   const statusColors = {
      Pending: "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700",
   };

   return (
      <div className="  py-4 border-b border-b-gray-300 shadow-sm">
         <div className="flex justify-between items-center gap-3">
            <h2 className="text-lg font-semibold text-title  line-clamp-1 ">{taskName}</h2>
            <span
               className={`px-3 py-1 rounded-full text-sm whitespace-nowrap font-medium ${statusColors[status] || "bg-gray-100 text-gray-600"
                  }`}
            >
               {status}
            </span>
         </div>

         <div className="mt-3  justify-between  text-sm text-des">
            <div className="">
               <p><strong>Due Date:</strong> {date}</p>
            </div>
            <div className="mt-2 flex justify-between gap-2">
               <div className="flex items-center gap-2 line-clamp-1"><strong>Assigned:</strong> <UserAvatar className="bg-white border border-blue-950 border-opacity-40 h-8 w-8" /><span className="line-clamp-1"> {assignedTo}</span></div>
               <Button variant="link" className="gap-1 px-1">Details <ArrowRight size={12} /></Button>
            </div>
         </div>
      </div>
   );
};

export default TaskCard;
