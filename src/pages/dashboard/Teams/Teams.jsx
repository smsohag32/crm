import { Button } from "@/components/ui/button";
import { Filter, Group, Users2 } from "lucide-react";
import TeamCard from "./TeamCard";

const Teams = () => {
   const teamsData = [
      {
         id: 1,
         name: "Design Gurus",
         members: 8,
         participants: ["Alice", "Bob", "Carol", "David"],
      },
      {
         id: 2,
         name: "Frontend Warriors",
         members: 6,
         participants: ["Eve", "Frank", "Grace", "Hank"],
      },
      {
         id: 3,
         name: "Backend Titans",
         members: 10,
         participants: ["Ivy", "Jack", "Karen", "Leo"],
      },
      {
         id: 4,
         name: "Full Stack Ninjas",
         members: 7,
         participants: ["Mike", "Nancy", "Oscar", "Paul"],
      },
      {
         id: 5,
         name: "AI Innovators",
         members: 5,
         participants: ["Quinn", "Rachel", "Steve", "Tom"],
      },
   ];

   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <Users2 className="text-des" /> Teams
            </h2>
            <div className="flex items-center gap-2">
               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                  <Filter size={16} />Filters
               </Button>
               <Button size="sm" className="flex items-center text-sm px-2.5 !py-1.5 gap-2">
                  <Group size={16} /> Add New Team
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {teamsData.map((team) => (
               <TeamCard key={team.id} team={team} />
            ))}
         </div>
      </div>
   );
};

export default Teams;
