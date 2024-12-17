import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDeleteDealMutation, useGetDealQuery } from "@/redux-store/api/dealsApi";
import Loading from "@/components/Loading/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, FileText, CheckSquare, DollarSign, Briefcase, MapPin, ArrowLeft, MessageSquarePlus, FileCheck, SquareUserRound, Edit3, Trash2, Forward, BookLock, FileSymlink, Eye } from 'lucide-react';
import { handleBack } from '@/utils/helper';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskList from './TaskList';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import AddNote from './AddNote';
import DealNote from './DealNote';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import EditDeal from '../DealsContainer/EditDeal';
import CrmAlert from '@/components/ui/alert';
import { toast } from 'sonner';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"



const DealDetail = () => {
   const { id } = useParams();
   const { data: dealDetails, isLoading, refetch } = useGetDealQuery(id);
   const [isEdit, setIsEdit] = useState(false)
   const notes = dealDetails?.note || []
   const [tasks, setTasks] = useState([]);
   const [deleteDeal, { isLoading: deleteLoading }] = useDeleteDealMutation()
   const [isNote, setIsNote] = useState(false)
   const [isOpen, setIsOpen] = useState(false)

   const handleDeleteConfirm = async () => {

      try {
         await deleteDeal(dealDetails?.id).unwrap()
         toast.success("Deal deleted successfully.")
         handleBack()
         refetch();
      } catch {
         toast.error("Failed to delete deal. Try again.")
      }
   }

   const handleClose = () => {
      setIsOpen(false)
   }

   if (isLoading) return <Loading />;

   return (
      <div className="  pt-1 pb-6 flex gap-6 items-start">
         <div className='ps-7 hidden bg-slate-300 h-screen -ms-5  -mt-3 fixed  py-3    w-[150px] lg:block'>
            <Button onClick={handleBack} variant="outline" className="bg-white"><ArrowLeft /> Back</Button>
         </div>
         <div className='flex-1 space-y-6 lg:ps-[150px]'>
            <Card className=" rounded-b-none   ">
               <CardHeader className="w-full pt-4">
                  <div className="flex items-center flex-col lg:flex-row gap-3  justify-between  w-full">
                     <p className='text-[24px]  w-full font-normal text-title'>{dealDetails?.lender_name}</p>
                     <div className='w-full flex items-center gap-4 lg:justify-end'>

                        <p className='text-xs font-medium  text-des lg: pe-5 hidden lg:block'>Created at : {moment(new Date()).format("LLLL")}</p>


                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger> <Button onClick={() => setIsEdit(true)} variant="outline" className="rounded-full h-10 !p-1 border border-green-600 text-green-600 w-10 "><Edit3 size={20} /></Button></TooltipTrigger>
                              <TooltipContent>
                                 <p>Edit Deal</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger> <Button onClick={() => setIsOpen(true)} variant="outline" className="rounded-full h-10 !p-1 border border-green-600 text-green-600 w-10 "><Trash2 size={20} /></Button></TooltipTrigger>
                              <TooltipContent>
                                 <p>Delete deal </p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>


                     </div>
                  </div>
               </CardHeader>
               <CardContent className="grid grid-cols-1 items-start lg:grid-cols-2 gap-6" >
                  <div className='flex  gap-6'><div className='flex items-center gap-3'>
                     <UserAvatar name={"Client"} className="bg-slate-200 w-14 h-14" />
                     <div>
                        <p className='text-[20px] font-normal text-title'>Alamin A</p>
                        <p className='text-sm text-des'>Client</p>
                     </div>
                  </div>
                     <div className='flex items-center gap-3'>
                        <UserAvatar name={"Client"} className="bg-slate-200 w-14 h-14" />
                        <div>
                           <p className='text-[20px] font-normal text-title'>Sohag Sheik</p>
                           <p className='text-sm text-des'>Client</p>
                        </div>
                     </div></div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                     <DetailItem icon={<Users size={18} />} label="Lender Name" value={dealDetails.lender_name} />
                     <DetailItem icon={<MapPin size={18} />} label="Property Address" value={dealDetails.security_property_add} />
                     <DetailItem icon={<Briefcase size={18} />} label="Deal Type" value={dealDetails.deal_type} />
                     <DetailItem icon={<DollarSign size={18} />} label="Loan Amount" value={`$${dealDetails.loan_amount}`} />
                     <DetailItem icon={<Building2 size={18} />} label="Deal Stage" value={dealDetails.deal_stage} />
                  </div>

               </CardContent>
            </Card>

            <ScrollArea className="h-[280px]  relative bg-white rounded-b-[8px]">
               <div className='flex items-center justify-center w-full'>
                  <Badge className="bg-blue-800  opacity-70 gap-2 text-xs  transform px-6 py-1 z-20  rounded-full"><Eye size={12} /> View Task</Badge>
               </div>
               <TaskList dealId={id} />
            </ScrollArea>


            <div className='bg-white py-3 rounded-[8px] px-3 flex flex-col lg:flex-row gap-4'>
               <Button onClick={() => setIsNote(true)} className="w-full gap-2 text-title hover:bg-transparent hover:text-blue-600" variant="ghost"> <MessageSquarePlus size={16} /> Add Note</Button>
               <Button className="w-full gap-2 text-title hover:bg-transparent hover:text-blue-600" variant="ghost"> <FileCheck size={16} /> Add Task</Button>
               <Button className="w-full gap-2 text-title hover:bg-transparent hover:text-blue-600" variant="ghost"><SquareUserRound size={16} /> Add Contact</Button>
            </div>

            <Tabs defaultValue="notes" className="w-full">
               <TabsList className="grid w-full bg-transparent  grid-cols-4 ">
                  <TabsTrigger
                     value="notes"
                     className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                  >
                     <FileText className="h-4 w-4" />
                     Notes
                  </TabsTrigger>
                  <TabsTrigger
                     value="tasks"
                     className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                  >
                     <CheckSquare className="h-4 w-4" />
                     Tasks
                  </TabsTrigger>
                  <TabsTrigger
                     value="contacts"
                     className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                  >
                     <Users className="h-4 w-4" />
                     Contacts
                  </TabsTrigger>
                  <TabsTrigger
                     value="history"
                     className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                  >
                     <Users className="h-4 w-4" />
                     Activity History
                  </TabsTrigger>


               </TabsList>

               <TabsContent value="notes">
                  <div className=''>
                     <CardHeader className="">
                        <Tabs defaultValue='dealNote'>
                           <TabsList className="bg-transparent gap-6">
                              <TabsTrigger
                                 value="dealNote"
                                 className="flex shadow-none items-center gap-2 pb-4 pt-0 px-0 text-des border-transparent hover:text-gary-600 hover:border-gray-600 data-[state=active]:text-gray-600 data-[state=active]:shadow-sm data-[state=active]:border-b-gray-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                              >

                                 <FileSymlink size={16} />   Deal Note
                              </TabsTrigger>
                              <TabsTrigger
                                 value="privateNote"
                                 className="flex shadow-none items-center gap-2 pb-4 pt-0 px-0 text-des border-transparent hover:text-gary-600 hover:border-gray-600 data-[state=active]:text-gray-600 data-[state=active]:shadow-sm data-[state=active]:border-b-gray-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none"
                              >

                                 <BookLock size={16} />  Private Note
                              </TabsTrigger>
                           </TabsList>
                           <TabsContent value="dealNote">
                              <DealNote dealId={id} notes={notes} refetch={refetch} />
                           </TabsContent>
                           <TabsContent value="privateNote">
                              <DealNote notes={notes} />
                           </TabsContent>
                        </Tabs>


                     </CardHeader>
                     <CardContent className="space-y-4">
                     </CardContent>
                  </div>
               </TabsContent>

               <TabsContent value="tasks">
                  <Card>
                     <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Tasks</CardTitle>

                     </CardHeader>
                     <CardContent className="space-y-4">
                        {tasks.length === 0 ? (
                           <p className="text-muted-foreground text-center py-4">No tasks yet</p>
                        ) : (
                           tasks.map(task => (
                              <Card key={task.id}>
                                 <CardContent className="p-4 flex items-center gap-4">
                                    <input
                                       type="checkbox"
                                       checked={task.completed}
                                       onChange={() => {
                                          const updatedTasks = tasks.map(t =>
                                             t.id === task.id ? { ...t, completed: !t.completed } : t
                                          );
                                          setTasks(updatedTasks);
                                       }}
                                       className="h-4 w-4"
                                    />
                                    <div className="flex-1">
                                       <p className={task.completed ? 'line-through' : ''}>
                                          {task.content}
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          {new Date(task.date).toLocaleDateString()}
                                       </p>
                                    </div>
                                 </CardContent>
                              </Card>
                           ))
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="contacts">
                  <Card>
                     <CardHeader>
                        <CardTitle>Related Contacts</CardTitle>
                     </CardHeader>
                     <CardContent>
                        {dealDetails.related_contact.length === 0 ? (
                           <p className="text-muted-foreground text-center py-4">No contacts assigned</p>
                        ) : (
                           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {dealDetails.related_contact.map(contact => (
                                 <Card key={contact.id}>
                                    <CardContent className="p-4">
                                       <h3 className="font-semibold">{contact.name}</h3>
                                       <p className="text-sm text-muted-foreground">{contact.role}</p>
                                    </CardContent>
                                 </Card>
                              ))}
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="document">
                  <Card>
                     <CardHeader>
                        <CardTitle>Document</CardTitle>
                     </CardHeader>
                     <CardContent>
                        {dealDetails.related_contact.length === 0 ? (
                           <p className="text-muted-foreground text-center py-4">No document assigned</p>
                        ) : (
                           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {dealDetails.related_contact.map(contact => (
                                 <Card key={contact.id}>
                                    <CardContent className="p-4">
                                       <h3 className="font-semibold">{contact.name}</h3>
                                       <p className="text-sm text-muted-foreground">{contact.role}</p>
                                    </CardContent>
                                 </Card>
                              ))}
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>

         <AddNote id={id} isOpen={isNote} setOpen={setIsNote} refetch={refetch} />
         <EditDeal refetch={refetch} isOpen={isEdit} setOpen={setIsEdit} dealDetails={dealDetails} />
         <CrmAlert
            isOpen={isOpen}
            message="Delete Client"
            description="Are you sure you want to delete this client? This action cannot be undone."
            handleClose={handleClose}
            handleConfirm={handleDeleteConfirm}
         />
      </div>
   );
};

const DetailItem = ({ icon, label, value }) => (
   <div className="flex items-start space-x-3">
      <span className='text-des text-base pt-1'> {icon}</span>
      <div >
         <p className="text-sm text-des ">{label}</p>
         <p className="font-normal text-[18px]  text-title">{value}</p>
      </div>
   </div>
);



export default DealDetail;

