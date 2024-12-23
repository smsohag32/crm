import { useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "lucide-react";
import UserAvatar from "../user-avatar/UserAvatar";
import { formatName } from "@/utils/helper";

export const AssignMember = ({ users = [], selectedMembers, setSelectedMembers }) => {
   const [searchValue, setSearchValue] = useState("");
   const filteredUsers = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchValue.toLowerCase())
   );
   return (
      <div className="w-full">
         <div className="space-y-0.5">
            <Input
               type="text"
               placeholder="Search User..."
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className="w-full p-2 bg-white  border rounded"
            />
            <ScrollArea className="h-[250px] py-1 border border-slate-300 bg-white">
               {filteredUsers?.map((user) => (
                  <div key={user.id} className="flex  border-b border-b-stone-300 items-center space-x-2 p-2 hover:bg-slate-100">
                     <Checkbox
                        type="button"
                        className="h-5 w-5"
                        id={`user-${user.id}`}
                        checked={selectedMembers.includes(user)}
                        onCheckedChange={() => {
                           if (selectedMembers.includes(user)) {
                              setSelectedMembers(selectedMembers.filter((c) => c.id !== user.id));
                           } else {
                              setSelectedMembers([...selectedMembers, user]);
                           }
                        }}
                     />
                     <label htmlFor={`user-${user?.id}`} className="flex  w-full items-center gap-3 cursor-pointer">
                        <UserAvatar name={formatName(user?.full_name)} photo={user?.image} className="bg-slate-200" />
                        {user?.full_name}
                     </label>
                  </div>
               ))
               }
            </ScrollArea >
         </div >
         <div className="flex flex-wrap w-full gap-2 mt-4">
            {selectedMembers?.map((member) => (
               <div key={member.id} className="bg-white flex items-center rounded-[8px] text-des hover:bg-slate-50 py-2 gap-2 px-3">
                  <UserAvatar name={formatName(member?.full_name)} className="bg-slate-200" />
                  {member.full_name}
                  <button
                     type="button"
                     className="ml-2 text-lg text-red-600 flex items-center justify-center  rounded-full h-6 w-6  hover:text-white transition-all duration-100  hover:bg-red-500 p-1"
                     onClick={() => setSelectedMembers(selectedMembers.filter((c) => c.id !== member.id))}
                  >
                     ×
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};


