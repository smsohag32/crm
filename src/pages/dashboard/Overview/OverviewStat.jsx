import { DollarSign, Users, CheckSquare, Briefcase, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverviewStat = () => {
   const navigate = useNavigate();

   const handleDeals = () => {
      navigate("/");
   };

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
         <div
            onClick={handleDeals}
            className="rounded-[12px]  transition-all duration-300 bg-blue-900 bg-opacity-900 px-6 pt-6 pb-4 text-white primary-shadow"
         >  <p className="text-[#FDFDFD] ">Total</p>
            <div className="flex justify-between mt-1.5 flex-wrap gap-2">
               <p className="text-[20px] text-[#fdfdfdd5] flex gap-1 items-center">
                  <DollarSign className="opacity-75" />  Deals
               </p>
            </div>
            <div className="flex items-center mt-4 justify-between">
               <p className="text-[40px] font-normal text-[#FDFDFD]">20</p>
            </div>
         </div>
         <div
            className="rounded-[12px] border border-orange-100  transition-all duration-300 bg-[#FDFDFD] bg-opacity-90 px-6 pt-6 pb-4 primary-shadow"
         >
            <p className="text-des ">This Month</p>
            <div className="flex justify-between mt-2 bg-white flex-wrap gap-2">
               <p className="text-[20px]  text-title  flex gap-1 items-center">
                  <Briefcase className="text-des" /> Total Settle
               </p>
            </div>
            <div className="flex items-center mt-4 ps-1 justify-between">
               <p className="text-[40px] font-normal ">3</p>
            </div>
         </div>

         <div
            className="rounded-[12px]  border border-blue-100 transition-all duration-300 bg-[#FDFDFD] bg-opacity-90 px-6 pt-6 pb-4 primary-shadow"
         >
            <p className="text-des ">This Month</p>
            <div className="flex justify-between mt-2 bg-white flex-wrap gap-2">
               <p className="text-[20px]  text-title  flex gap-1 items-center">
                  <Banknote className="text-des" /> Total Lender
               </p>
            </div>
            <div className="flex items-center mt-4 ps-1 justify-between">
               <p className="text-[40px] font-normal ">10</p>
            </div>
         </div>

         <div
            className="rounded-[12px] border border-green-100 transition-all duration-300 bg-[#FDFDFD] bg-opacity-90 px-6 pt-6 pb-4 primary-shadow"
         >
            <p className="text-des ">This Month</p>
            <div className="flex justify-between mt-2 bg-white flex-wrap gap-2">
               <p className="text-[20px] text-title   flex gap-1 items-center">
                  <CheckSquare className="text-des" />  Approval
               </p>
            </div>
            <div className="flex items-center mt-4 ps-1 justify-between">
               <p className="text-[40px] font-normal ">7</p>
            </div>
         </div>
      </div>
   );
};

export default OverviewStat;
