
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Pencil, Trash, Phone, Mail, MapPin, Briefcase, CreditCard, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteClientMutation, useGetClientDealsQuery, useGetClientQuery } from '@/redux-store/api/clientsApi'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import CrmAlert from '@/components/ui/alert'
import EditClient from './EditClient'
import Empty from '@/components/Empty/Empty'

const ClientDetails = () => {
   const { id } = useParams()
   const [isEdit, setIsEdit] = useState(false)
   const { data: client, isLoading, refetch } = useGetClientQuery(id)
   const [isDelete, setIsDelete] = useState(false)
   const [deleteClient, { isLoading: deleteLOading }] = useDeleteClientMutation()
   const { data: deals, isLoading: dealLoading } = useGetClientDealsQuery(id)

   const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard")
   }


   const handleDelete = () => {
      setIsDelete(true)
   }

   const handleDeleteConfirm = async () => {
      await deleteClient(id).unwrap()
      toast.success("Client Deleted Successfully.")
      setIsDelete(false);
      window.history.back()

   };

   const handleDeleteCancel = () => {
      setIsDelete(false);
   };


   return (
      <div className="pb-6 pt-3 space-y-6 ">
         {isLoading ? <Loading /> :

            <Card className="overflow-hidden">
               <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-700 text-white">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20 border-2 border-slate-400">
                           <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client?.name}`} />
                           <AvatarFallback>{client?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                           <CardTitle className="text-3xl font-bold">{client?.name}</CardTitle>
                           <CardDescription className="text-blue-100">Client ID: {client?.id}</CardDescription>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setIsEdit(true)} className="bg-white text-blue-600 hover:bg-blue-50">
                           <Pencil className="h-4 w-4 mr-2" />
                           Edit
                        </Button>
                        <Button disabled={deleteLOading} variant="destructive" size="sm" onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                           <Trash className="h-4 w-4 mr-2" />
                           Delete
                        </Button>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="pt-6">
                  <Tabs defaultValue="details" className="w-full">
                     <TabsList className="grid w-full  grid-cols-2">
                        <TabsTrigger value="details">Client Details</TabsTrigger>
                        <TabsTrigger value="deals">Client Deals</TabsTrigger>
                     </TabsList>
                     <TabsContent value="details">
                        <div className="grid gap-6 md:grid-cols-2">
                           <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Contact Information</h3>
                              <div className="flex items-center space-x-2">
                                 <Phone className="h-5 w-5 text-gray-500" />
                                 <span>{client?.contact_number}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Mail className="h-5 w-5 text-gray-500" />
                                 <span>{client?.email}</span>
                                 <Button variant="ghost" size="sm" onClick={() => copyToClipboard(client?.email)}>
                                    <Copy className="h-4 w-4" />
                                 </Button>
                              </div>
                              <div className="flex items-start space-x-2">
                                 <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                                 <span>{client?.address}</span>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Additional Details</h3>
                              <div className="flex items-center space-x-2">
                                 <Badge variant="outline">{client?.relationship_status}</Badge>
                                 <Badge variant="outline">{client?.employment_status}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Briefcase className="h-5 w-5 text-gray-500" />
                                 <span>Income: ${client?.income}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <CreditCard className="h-5 w-5 text-gray-500" />
                                 <span>Credit Score: {client?.credit_score}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Calendar className="h-5 w-5 text-gray-500" />
                                 <span>Client Since: {client?.created_at}</span>
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="deals">

                        {deals && deals?.length > 0 ?

                           <div className="space-y-4">

                              {deals?.map(deal => (
                                 <Card key={deal?.id}>
                                    <CardContent className="flex items-center justify-between p-4">
                                       <div>
                                          <h4 className="font-semibold">{deal?.lender_name}</h4>
                                          <p className="text-sm text-gray-500">${deal?.amount}</p>
                                       </div>
                                       <div className="flex items-center space-x-2">
                                          <Badge variant="primary">
                                             {deal?.deal_stage}
                                          </Badge>
                                       </div>
                                    </CardContent>
                                 </Card>
                              ))}
                           </div> : <Empty message={"No Data"} />

                        }

                     </TabsContent>
                  </Tabs>
               </CardContent>
            </Card>
         }

         <CrmAlert
            isOpen={isDelete}
            message="Delete Client"
            description="Are you sure you want to delete this client? This action cannot be undone."
            handleClose={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
         />
         <EditClient refetch={refetch} isOpen={isEdit} setOpen={setIsEdit} clientDetails={client} />
      </div>
   )
}

export default ClientDetails

