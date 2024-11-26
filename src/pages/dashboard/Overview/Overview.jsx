import OverviewStat from "./OverviewStat";
import TaskSection from "./TaskSection";

const Overview = () => {
   return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
         <div className="lg:col-span-2">
            <OverviewStat />
         </div>
         <TaskSection />
      </div>
   );
};

export default Overview;
