
import TaskCard from "./TaskCard";
import { useGetTaskByDealQuery } from "@/redux-store/api/taskApi";
import Loading from "@/components/Loading/Loading";
import SmallEmpty from "@/components/Empty/SmallEmpty";

const TaskTab = ({ dealId }) => {
   const { data: taskData, isLoading, refetch, isError } = useGetTaskByDealQuery(dealId);

   if (isLoading) {
      return <Loading />;
   }

   if (isError) {
      return <p className="text-red-500 font-normal text-sm text-center py-6">An error occurred while fetching tasks. Please try again later.</p>;
   }

   return (
      <div className="w-full space-y-4 pt-6 pb-6 px-4 relative">
         {taskData && taskData.length > 0 ? (
            taskData.map((task) => (
               <TaskCard refetch={refetch} key={task.id} task={task} />
            ))
         ) : (
            <SmallEmpty message="No tasks found for this deal. Please create a task to get started." />
         )}
      </div>
   );
};

export default TaskTab;
