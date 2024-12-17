import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserPlus, Trash2, FileText } from 'lucide-react'
import AddTeamNote from "./AddTeamNote"
import { useTeamDeleteMutation } from "@/redux-store/api/teamApi"
import { handleBack } from "@/utils/helper"
import { toast } from "sonner"
import CrmAlert from "@/components/ui/alert"

export default function TeamHeader({ name, teamId, refetch, members }) {
   const [isAddNote, setIsAddNote] = useState(false)
   const [teamDelete, { isLoading }] = useTeamDeleteMutation()
   const [isDelete, setIsDelete] = useState(false)
   const handleDeleteConfirm = async () => {
      try {
         await teamDelete(teamId).unwrap()
         toast.success("Team deleted successfully.")
         handleBack()
      } catch {
         toast.error("Failed to delete Team. Try again.")
      }
   }

   const handleClose = () => {
      setIsDelete(false)
   }



   return (
      <div className="flex justify-between flex-col lg:flex-row gap-4 items-start">
         <div>
            <div className="flex  items-start flex-col lg:flex-row gap-2 lg:gap-6">
               <h1 className="lg:text-3xl text-xl font-normal">{name}</h1>
               <Badge variant="outline" className="bg-slate-200 whitespace-nowrap text-title font-normal">
                  Total Members: {members?.length || 0}
               </Badge>
            </div>
            <p className="text-muted-foreground mt-2">Team Details</p>
         </div>
         <div className="flex gap-3">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button onClick={() => setIsAddNote(true)} variant="outline" size="icon" className="rounded-full border-blue-600 text-blue-600">
                        <FileText className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Add Note</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="icon" className="rounded-full border-blue-600 text-blue-600">
                        <UserPlus className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Add Member</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button onClick={() => setIsDelete(true)} variant="destructive" size="icon" className="rounded-full ">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Remove Team</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <AddTeamNote refetch={refetch} id={teamId} isOpen={isAddNote} setOpen={setIsAddNote} />

         <CrmAlert
            isOpen={isDelete}
            message="Delete Client"
            description="Are you sure you want to delete this client? This action cannot be undone."
            handleClose={handleClose}
            handleConfirm={handleDeleteConfirm}
         />

      </div>
   )
}

