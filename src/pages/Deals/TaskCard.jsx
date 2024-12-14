import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2 } from "lucide-react";

const TaskCard = ({ task, index = 0 }) => {

   const handleDelete = () => {

   }

   const handleEdit = () => {

   }
   return (
      <div className="flex py-2 flex-col  lg:flex-row w-full lg:gap-10 gap-4 justify-between">
         <div className="flex-1 w-full max-w-3xl justify-between  flex items-center flex-col gap-8 lg:flex-row ">
            <p className="text-base font-medium w-full max-w-sm text-title"><span>{index + 1}. </span> Book meeting with Client</p>
            <p className="flex items-center gap-2"><span className="text-des text-sm font-normal flex items-center whitespace-nowrap">Assigned to</span> <span className="text-base text-title font-medium">Sohag Sheik</span></p>
            <Badge className="bg-red-500 hover:bg-red-600 text-white">Overdue</Badge>
         </div>
         <div className="flex items-center gap-2">
            <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-md" type="button">
               <Edit3 size={16} className="text-green-500" />
               <span>Edit</span>
            </button>
            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-md" type="button">
               <Trash2 size={16} className="text-red-500" />
               <span>Delete</span>
            </button>
         </div>
      </div>
   );
};

export default TaskCard;
