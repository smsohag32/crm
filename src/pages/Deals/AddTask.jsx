import CmModal from '@/components/modal/CmModal';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useGetTaskByDealQuery, usePostTaskMutation } from '@/redux-store/api/taskApi';
import { AssignMember } from '@/components/SearchBox/AssignMember';

import { useState } from 'react';
import { useGetUsersQuery } from '@/redux-store/api/usersApi';

const AddTask = ({ isOpen, setOpen, dealId }) => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const [postTask, { isLoading }] = usePostTaskMutation();
   const { refetch } = useGetTaskByDealQuery(dealId, { skip: !dealId });

   // const { data: users, isLoading: userLoading } = useGetTaskByDealQuery(dealId);
   const { data: users, isLoading: userLoading } = useGetUsersQuery();
   const [selectedMembers, setSelectedMembers] = useState([]);
   const handleClose = () => {
      setOpen(false);
      reset();
   };

   const onSubmit = async (data) => {
      try {
         await postTask({ dealId, task: { ...data, users: selectedMembers?.map(mem => mem?.id) } }).unwrap();
         await refetch();
         handleClose();
         toast.success("Task added successfully.");
         return
      } catch (err) {
         console.log()
         toast.error(err?.data?.users[0] || "Failed to add task.");
      }
   };

   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"700px"} title={"Create New Task"}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
               <label className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText size={20} />
                  Task Description
               </label>
               <Textarea
                  {...register("task_note", { required: "Task description is required" })}
                  placeholder="Enter task details"
                  className=" bg-[#ffffff]"
                  rows={6}
               />
               {errors.task_note && <p className="text-red-600 text-xs">{errors.task_note.message}</p>}
            </div>

            <div className="space-y-2 mt-6">
               <p>Assign Responsible Person</p>
               <AssignMember
                  users={users || []}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
               />
               {errors.assignedMembers && <p className="text-red-600 text-xs">{errors.assignedMembers.message}</p>}
            </div>

            <div className="mt-4 flex justify-end gap-4">
               <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                  Add Task
               </button>
            </div>
         </form>
      </CmModal>
   );
};

export default AddTask;
