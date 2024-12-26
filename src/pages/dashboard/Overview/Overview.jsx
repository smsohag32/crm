import { useGetAllDealsQuery } from "@/redux-store/api/dealsApi";
import OverviewStat from "./OverviewStat";
import ChartDashboard from "./ChartDashboard";
import Loading from "@/components/Loading/Loading";

const Overview = () => {
   const { data: dealsData = [], isLoading } = useGetAllDealsQuery()
   if (isLoading) {
      return <Loading />
   }
   return (
      <div className="w-full grid pt-2 pb-6 gap-4">
         <div className="">
            <OverviewStat />
         </div>
         <ChartDashboard dealsData={dealsData} />
      </div>
   );
};

export default Overview;
