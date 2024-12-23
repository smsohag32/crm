import React, { useState } from 'react'
import { Pencil, Trash2, ChevronDown, ChevronUp, Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import { useDeleteTaskMutation } from '@/redux-store/api/taskApi'
import { toast } from 'sonner'
import Secure from '@/routes/Secure'

const TaskCard = ({ task, onEdit, onDelete, index, refetch }) => {
   const [isOpen, setIsOpen] = useState(true)
   const [deleteTask, { isLoading }] = useDeleteTaskMutation()
   const handleDelete = async () => {
      try {
         await deleteTask({ dealId: task?.deal, taskId: task?.id })
         toast.success("Task deleted successfully.")
         refetch()
      } catch {
         toast.error("Failed to delete Task.")
      }

   }

   
   const handleEdit = () => {

   }

   return (
      <div className="w-full border bg-[#ffffff] border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start p-4 gap-4">
            <div className="flex-1 w-full max-w-3xl flex flex-col lg:flex-row items-start lg:items-center gap-4">
               <div className="flex-1">
                  <h3 className="text-sm uppercase font-normal text-des mb-1">Task #{task.id}</h3>
                  <p className="text-base font-medium text-title ">{task.task_note}</p>
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
               <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                  {task.status_display}
               </span>
               <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {task.created_at}
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Secure userType={["admin"]}>
                  <button
                     className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors duration-200"
                     onClick={handleEdit}
                  >
                     <Pencil className="w-4 h-4 inline mr-1" />
                     Edit
                  </button>
                  <button
                     className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors duration-200"
                     onClick={handleDelete}
                  >
                     <Trash2 className="w-4 h-4 inline mr-1" />
                     Delete
                  </button>
               </Secure>
               <button
                  className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors duration-200"
                  onClick={() => setIsOpen(!isOpen)}
               >
                  {isOpen ? (
                     <ChevronUp className="w-5 h-5" />
                  ) : (
                     <ChevronDown className="w-5 h-5" />
                  )}
               </button>
            </div>
         </div>
         {isOpen && (
            <div className="px-4 pb-4 pt-2 border-t border-slate-200">
               <h4 className="text-base font-medium text-title mb-4">Assigned Users:</h4>
               <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {task.task_users.map((taskUser) => (
                     <div key={taskUser.id} className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                           {taskUser.user.image ? (
                              <img src={taskUser.user.image} alt={taskUser.user.full_name} className="w-8 h-8 rounded-full" />
                           ) : (
                              <span className="text-sm font-semibold">{taskUser.user.full_name.charAt(0)}</span>
                           )}
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-700">{taskUser.user.full_name}</p>
                           <p className="text-xs text-gray-500">{taskUser.user.email}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-4 text-sm text-gray-600">
                  <p className="flex items-center">
                     <Clock className="w-4 h-4 mr-1" />
                     Last updated: {task?.last_update}
                  </p>
               </div>
            </div>
         )}
      </div>
   )
}

export default TaskCard
