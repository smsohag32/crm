import { useState } from "react";
import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useGetUsersQuery } from "@/redux-store/api/usersApi";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { formatName } from "@/utils/helper";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddTeamMutation } from "@/redux-store/api/teamApi";

// Reusable Input Field Component (unchanged)
const InputField = ({ id, label, type, placeholder, register, validationRules, errors }) => (
   <div className="space-y-2">
      <CrmInput
         id={id}
         placeholder={placeholder}
         label={label}
         type={type}
         className={`primary-input ${errors[id] ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
         labelClassName={`transition-all duration-300 text-base ${errors[id] ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
         {...register(id, validationRules)}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]?.message}</p>}
   </div>
);

export const AssignMember = ({ users = [], selectedMembers, setSelectedMembers }) => {
   const [searchValue, setSearchValue] = useState("");

   const filteredUsers = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchValue.toLowerCase())
   );

   return (
      <div className="space-y-0.5">
         <Input
            type="text"
            placeholder="Search User..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-2 bg-white  border rounded"
         />
         <ScrollArea className="h-[200px] py-1  bg-white">
            {filteredUsers?.map((user) => (
               <div key={user.id} className="flex hover: items-center space-x-2 p-2 hover:bg-slate-100">
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
                  <label htmlFor={`user-${user?.id}`} className="flex  w-full items-center gap-3 cursor-pointer">{user?.full_name}</label>
               </div>
            ))
            }
         </ScrollArea >
      </div >
   );
};



const AddTeam = ({ isOpen, setOpen, refetch }) => {
   const [addTeam, { isLoading }] = useAddTeamMutation();
   const { data: users, isLoading: userLoading } = useGetUsersQuery();
   const [selectedMembers, setSelectedMembers] = useState([]);
   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
   } = useForm({ mode: "onChange" });


   const onSubmit = async (data) => {
      try {
         const team = {
            name: data.name,
            user: selectedMembers?.map(mem => mem?.id) || []
         }
         await addTeam({ ...team }).unwrap();
         toast.success("Team added successfully.");
         handleClose();
         refetch();
      } catch (err) {
         console.log(err);
         toast.error("Failed to add team.");
      }
   };

   const handleClose = () => {
      setOpen(false);
      reset();
      setSelectedMembers([])
   };




   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size="800px" title="Add New Team">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <InputField
                  id="name"
                  label="Team Name"
                  type="text"
                  placeholder="Enter team name"
                  register={register}
                  validationRules={{ required: "Team name is required" }}
                  errors={errors}
               />
               <h3 className="text-[24px] font-semibold">Add Team Member</h3>
               <AssignMember
                  users={users || []}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
               />
               <div className="flex flex-wrap gap-2 mt-4">
                  {selectedMembers.map((member) => (
                     <Badge key={member.id} variant="secondary" className="bg-white text-des hover:bg-slate-50 py-2 gap-2 px-3">
                        <UserAvatar name={formatName(member?.full_name)} className="bg-slate-200" />
                        {member.full_name}
                        <button
                           type="button"
                           className="ml-2 text-lg text-red-600 flex items-center justify-center  rounded-full h-6 w-6  hover:text-white transition-all duration-100  hover:bg-red-500 p-1"
                           onClick={() => setSelectedMembers(selectedMembers.filter((c) => c.id !== member.id))}
                        >
                           ×
                        </button>
                     </Badge>
                  ))}
               </div>
            </div>
            <div className="flex justify-end space-x-4 mt-12">
               <Button className="!px-6" disabled={!isValid || isLoading} type="submit">
                  Submit
               </Button>
            </div>
         </form>
      </CmModal>
   );
};

export default AddTeam;

