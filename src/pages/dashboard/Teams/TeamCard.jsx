import { Button } from "@/components/ui/button";
import AvatarProfile from "@/components/user-avatar/AvaterProfile";
import { colors } from "@/helpers/helper";
import { ChevronRight, Edit, MoveRight, Notebook, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

const TeamCard = ({ team }) => {
   return (
      <div className="w-full bg-white flex p-5 border-s-2   overflow-hidden rounded-[16px] ">
         <div className="flex flex-col w-full">
            <div className="mb-4 flex items-center gap-5">
               <h3 className="text-lg flex-1 line-clamp-1 font-semibold text-title ">
                  {team.name}
               </h3>
               <div className="">
                  <Button className="text-des px-1" size="sm" variant="ghost"><NotebookPen size={20} /></Button>
               </div>
            </div>
            <div className="flex items-end gap-4 w-full">
               <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">Members</p>
                  <div className="flex -space-x-3 mt-2">
                     {team.participants.slice(0, 3).map((pr, index) => {
                        const backgroundColor = colors[index % colors.length];
                        return (
                           <AvatarProfile
                              key={index}
                              name={pr}
                              backgroundColor={backgroundColor}
                           />
                        );
                     })}
                     {team.members > 3 && (
                        <span className="text-sm flex items-center gap-1 font-semibold text-gray-500 ps-4">
                           +{team.members - 3} more
                        </span>
                     )}
                  </div>

               </div>
               <div className=" flex justify-end pb-2">
                  <Link
                     to={`/team/${team.id}`}
                     className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                     Details <span className="flex items-center justify-center pt-0.5"><ChevronRight size={16} /></span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeamCard;
