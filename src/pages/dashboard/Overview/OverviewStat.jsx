import { DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverviewStat = () => {
   const navigate = useNavigate()

   const handleDeals = () => {
      navigate("/deals")
}
   const handleTeams = () => {
      navigate("/dashboard/teams")
   }
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
         <div onClick={handleDeals} className="rounded-[12px] hover:scale-x-105 transition-all duration-300 bg-blue-900 bg-opacity-900 px-6 pt-6 pb-4 text-white primary-shadow">
            <div className="flex justify-between  flex-wrap gap-2">
               <p className="text-[20px] text-[#FDFDFD] flex gap-1 items-center"><DollarSign /> Total Deals</p>
            </div>
            <div className="flex items-center mt-4 justify-between">
               <p className="text-[40px] font-normal text-[#FDFDFD]">8</p>
            </div>
         </div>
         <div onClick={handleTeams} className="rounded-[12px] cursor-pointer hover:scale-x-105 transition-all duration-300  bg-blue-50 border  border-blue-700  border-opacity-40 bg-opacity-80 px-6 pt-6 pb-4 text-white primary-shadow">
            <div className="flex justify-between  flex-wrap gap-2">
               <p className="text-[20px] text-[#0f0f0f] flex items-center gap-2"> <Users />Teams</p>
            </div>
            <div className="flex items-center mt-4 justify-between">
               <p className="text-[40px] font-normal text-des">6</p>
            </div>
         </div>
      </div>
   );
};

export default OverviewStat;
