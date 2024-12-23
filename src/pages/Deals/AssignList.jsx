import { useState } from 'react'
import { useDealAssignMutation, useDealAssignUpdateMutation, useGetAssignUsersQuery } from '@/redux-store/api/dealsApi'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Plus, UserMinus, Users } from 'lucide-react'
import CmModal from '@/components/modal/CmModal'
import { useGetUsersQuery } from '@/redux-store/api/usersApi'
import { AssignMember } from '@/components/SearchBox/AssignMember'
import { toast } from 'sonner'
import Secure from '@/routes/Secure'

const AssignList = ({ dealId }) => {
   const { data: assignUsers, isLoading, isError, refetch } = useGetAssignUsersQuery(dealId)
   const [isRemoving, setIsRemoving] = useState(false)
   const [isAdd, setIsAdd] = useState(false)
   const [selectedMembers, setSelectedMembers] = useState([])
   const { data: users } = useGetUsersQuery()
   const [dealAssign, { isLoading: assignLoading }] = useDealAssignMutation()
   const [dealAssignUpdate, { isLoading: removeLoading }] = useDealAssignUpdateMutation()

   const handleRemoveUser = async (userId) => {
      setIsRemoving(true)
      try {
         const assignData = { remove_user: [userId] }
         await dealAssignUpdate({ dealId, assignData })
         toast.success("Assign Person Remove successfully.")
         refetch()
         setIsRemoving(false)
      } catch {
         setIsRemoving(false)
         toast.error("Failed to remove assign person")
      }

   }

   const handleAssignNew = async (e) => {
      e.preventDefault()
      if (!(selectedMembers?.length > 0)) {
         toast.error("Please Select User.")
         return
      }
      try {
         const dealData = {
            deal: dealId,
            user: selectedMembers?.map(mem => mem?.id) || []
         }
         await dealAssign({ ...dealData })
         toast.success("User assign successfully.")
         refetch()
         closeModal()
      } catch {
         toast.error("Failed to assign user.")
      }
   }

   if (isLoading) {
      return <LoadingSkeleton />
   }

   if (isError) {
      return <ErrorState onRetry={refetch} />
   }


   const closeModal = () => {
      setIsAdd(false)
   }

   return (

      <div>
         {!assignUsers || assignUsers.length === 0 ?
            <EmptyState onAssignNew={() => setIsAdd(true)} /> :
            <Card className="w-full">
               <div className="flex flex-row items-start justify-between px-5 pt-4 space-y-0 pb-2">
                  <CardTitle className="text-[18px] font-medium text-des">Assigned Users:</CardTitle>
                  <Secure userType={["admin"]}>
                     <Button variant="outline" onClick={() => setIsAdd(true)} size="sm" className="gap-0">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                     </Button>
                  </Secure>
               </div>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {assignUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                           <div className="flex items-center space-x-4">
                              <Avatar className="bg-white">
                                 <AvatarImage src={user.image} alt={user.full_name} />
                                 <AvatarFallback>{user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                 <p className="text-sm font-medium leading-none">{user.full_name}</p>
                                 <p className="text-sm text-muted-foreground">{user.email}</p>
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Assigned {user.created_at}
                                 </p>
                              </div>
                           </div>
                           <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveUser(user.id)}
                              disabled={isRemoving}
                           >
                              <UserMinus className="h-4 w-4" />
                              <span className="sr-only">Remove user</span>
                           </Button>
                        </div>
                     ))}
                  </div>
               </CardContent>

            </Card>

         }

         <CmModal size={"700px"} isOpen={isAdd} handleClose={closeModal} title={"Assign Responsible User"}>
            <form onSubmit={handleAssignNew}>
               <div className="space-y-2">
                  <AssignMember
                     users={users || []}
                     selectedMembers={selectedMembers}
                     setSelectedMembers={setSelectedMembers}
                  />
               </div>
               <div className='mt-6 flex items-center justify-end'> <Button disabled={assignLoading} type="submit" className="">Save</Button></div>
            </form>
         </CmModal>
      </div>
   )
}

const LoadingSkeleton = () => (
   <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
         <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent>
         <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                     <Skeleton className="h-4 w-[200px]" />
                     <Skeleton className="h-4 w-[150px]" />
                  </div>
               </div>
            ))}
         </div>
      </CardContent>
   </Card>
)

const ErrorState = ({ onRetry }) => (
   <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center h-64">
         <AlertCircle className="h-12 w-12 text-destructive mb-4" />
         <h3 className="text-lg font-semibold mb-2">Error Loading Assigned Users</h3>
         <p className="text-muted-foreground mb-4">There was a problem fetching the assigned users. Please try again.</p>
         <Button onClick={onRetry}>Retry</Button>
      </CardContent>
   </Card>
)

const EmptyState = ({ onAssignNew }) => (
   <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center h-64">
         <Users className="h-12 w-12 text-muted-foreground mb-4" />
         <h3 className="text-lg font-semibold mb-2">No Users Assigned</h3>
         <p className="text-muted-foreground mb-4">There are currently no users assigned to this deal.</p>
         <Button onClick={onAssignNew}>Assign New User</Button>
      </CardContent>
   </Card>
)


export default AssignList

