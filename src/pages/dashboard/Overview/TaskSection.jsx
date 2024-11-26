import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Empty from "@/components/Empty/Empty";

const TaskSection = () => {
   const [taskData, setTaskData] = useState([
      {
         id: 1,
         taskName: "Follow up with client",
         comments: "Discuss project requirements and deadlines.",
         date: "2024-12-01",
         assignedTo: "Marketing Team",
         deals: "Website Redesign",
         user: "John Doe",
         status: "Pending",
      },
      {
         id: 2,
         taskName: "Prepare sales presentation",
         comments: "Focus on Q4 performance and upcoming targets.",
         date: "2024-11-30",
         assignedTo: "Sales Team",
         deals: "E-commerce Platform",
         user: "Jane Smith",
         status: "In Progress",
      },
      {
         id: 3,
         taskName: "Submit budget report",
         comments: "Highlight increased expenditure on advertising.",
         date: "2024-12-05",
         assignedTo: "Finance Team",
         deals: "Ad Campaign",
         user: "Emily White",
         status: "Completed",
      },
   ]);

   return (
      <div className="bg-white rounded-[12px] shadow-sm px-4 py-5">
         <p className="text-[20px] font-medium text-des mb-1">Recent Tasks</p>

         {taskData.length === 0 ? (
            <Empty message={" No tasks to display."} />
         ) : (
            <div className="grid grid-cols-1 gap-4">
               {taskData.map((task) => (
                  <TaskCard key={task.id} task={task} />
               ))}
            </div>
         )}
      </div>
   );
};

export default TaskSection;
