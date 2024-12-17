import { Button } from "@/components/ui/button";
import { Group, Users2 } from "lucide-react";
import TeamCard from "./TeamCard";
import { useGetAllTeamQuery } from "@/redux-store/api/teamApi";
import Loading from "@/components/Loading/Loading";
import Empty from "@/components/Empty/Empty";
import { useState } from "react";
import AddTeam from "./AddTeam";

const Teams = () => {
   const { data: teamsData, isLoading, refetch } = useGetAllTeamQuery();
   const [isAdd, setIsAdd] = useState(false);


   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <Users2 className="text-des" /> Teams
            </h2>
            <div className="flex items-center gap-2">

               <Button onClick={() => setIsAdd(true)} size="sm" className="flex items-center text-sm px-2.5 !py-1.5 gap-2">
                  <Group size={16} /> Add New Team
               </Button>
            </div>
         </div>

         {isLoading ? <Loading /> : teamsData?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {teamsData?.map((team) => (
               <TeamCard key={team.id} team={team} />
            ))}
         </div> : <Empty message={"No team found."} />}
         <AddTeam isOpen={isAdd} setOpen={setIsAdd} refetch={refetch} />
      </div>
   );
};

export default Teams;
