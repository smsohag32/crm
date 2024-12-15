import { Badge } from "@/components/ui/badge";
import TaskCard from "./TaskCard";
import { Eye } from "lucide-react";

const TaskList = ({ dealId }) => {
   return (
      <div className="w-full space-y-2 pt-6 pb-6 px-4 relative ">
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
         <TaskCard task={dealId} />
      </div>
   );
};

export default TaskList;
