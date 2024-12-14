import TaskCard from "./TaskCard";

const TaskList = ({ dealId }) => {
   return (
      <div className="w-full space-y-2  px-4">
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
