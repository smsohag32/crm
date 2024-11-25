import { Button } from "@/components/ui/button";
import { DollarSign, Filter, List, Plus } from "lucide-react";
import DealStage from "./DealStage";

const DealsContainer = () => {
   return (
      <div>
         <div className="flex items-center justify-between gap-6 w-full">
            <h2 className="flex items-center gap-2"><span className="text-[20px] flex items-center gap-1">FBD : New Deals</span> <span className="bg-gray-200 flex items-center px-1  text-gray-700"><DollarSign size={16} />1455,00 </span> <span className="bg-gray-200 flex items-center px-1  text-gray-700">5</span></h2>
            <div className="flex items-center gap-2">

               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2"> <List size={16} />List</Button>
               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2"> <Filter size={16} />Filters</Button>
               <Button className="flex items-center text-sm px-2.5 py-2 gap-2"> <Plus size={16} /> Add New</Button>
            </div>
         </div>

         <div className="flex border-s border-s-gray-300  w-full mt-3 flex-nowrap overflow-x-auto h-[90vh]">
            <DealStage />
            <DealStage />
            <DealStage />
         </div>
      </div>
   );
};

export default DealsContainer;
