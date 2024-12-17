
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Pencil, Trash, Phone, Mail, MapPin, Briefcase, CreditCard, Calendar, DollarSign, TrendingUp, AlertCircle, User, Users, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteClientMutation, useGetClientDealsQuery, useGetClientQuery } from '@/redux-store/api/clientsApi'

import Loading from '@/components/Loading/Loading'
import CrmAlert from '@/components/ui/alert'
import EditClient from './EditClient'
import Empty from '@/components/Empty/Empty'
import { Progress } from "@/components/ui/progress"
import { useNavigate, useParams } from 'react-router-dom'

const ClientDetails = () => {
   const { id } = useParams()
   const [isEdit, setIsEdit] = useState(false)
   const { data: client, isLoading, refetch } = useGetClientQuery(id)
   const [isDelete, setIsDelete] = useState(false)
   const [deleteClient, { isLoading: deleteLoading }] = useDeleteClientMutation()
   const { data: deals, isLoading: dealLoading } = useGetClientDealsQuery(id)
   const navigate = useNavigate()
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
      setIsDelete(false)
      window.history.back()
   }

   const handleDeleteCancel = () => {
      setIsDelete(false)
   }

   const calculateCreditScoreColor = (score) => {
      if (score >= 80) return 'text-green-500'
      if (score >= 60) return 'text-yellow-500'
      return 'text-red-500'
   }
   const calculateScoreBg = (score) => {
      if (score >= 80) return 'bg-green-500'
      if (score >= 60) return 'bg-yellow-500'
      return 'bg-red-500'
   }

   const calculateTotalDealValue = () => {
      return deals?.reduce((total, deal) => total + deal.amount, 0) || 0
   }

   if (isLoading) return <Loading />

   return (
      <div className="pb-6 pt-3 space-y-6">
         <Card className="overflow-hidden bg-slate-100">
            <CardHeader className="">
               <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                     <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client?.name}`} />
                        <AvatarFallback>{client?.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div>
                        <CardTitle className="text-[28px] font-normal">{client?.name}</CardTitle>
                        <p className='text-base font-medium pt-0.5'> <span>{client?.email}</span></p>
                        <CardDescription className="mt-1">Client ID: {client?.id}</CardDescription>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="secondary" size="sm" onClick={() => setIsEdit(true)} className="bg-white hover:bg-white hover:text-green-500">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                     </Button>
                     <Button disabled={deleteLoading} variant="destructive" size="sm" onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                     </Button>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="pt-6">
               <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 border text-white bg-slate-500 !py-3 !px-3">
                     <TabsTrigger value="details">Client Details</TabsTrigger>
                     <TabsTrigger value="financial">Financial Overview</TabsTrigger>
                     <TabsTrigger value="deals">Client Deals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                     <div className='grid gap-4 pt-4 pb-6 lg:grid-cols-3 '>
                        <div className="flex border bg-white border-slate-300 p-3 rounded-[8px] items-center space-x-2">
                           <Users className="h-5 w-5 text-blue-500" />
                           <span>Marital Status : {client?.marital_status || "Unmarried"}</span>
                        </div>
                        <div className="flex border bg-white border-slate-300 p-3 rounded-[8px] items-center space-x-2">
                           <Users className="h-5 w-5 text-blue-500" />
                           <span>Spouse: {client?.spouse || "Unmarried"}</span>
                        </div>
                        <div className="flex border bg-white border-slate-300 p-3 rounded-[8px] items-center space-x-2">
                           <Briefcase className="h-5 w-5 text-blue-500" />
                           <span>Employment Status: {client?.employment_status}</span>
                        </div>
                     </div>

                     <div className="grid gap-6 md:grid-cols-2">

                        <Card>
                           <CardHeader>
                              <CardTitle>Contact Information</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">

                              <div className="flex items-center space-x-2">
                                 <Phone className="h-5 w-5 text-blue-500" />
                                 <span>{client?.contact_number}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Mail className="h-5 w-5 text-blue-500" />
                                 <span>{client?.email}</span>
                                 <Button variant="ghost" size="sm" onClick={() => copyToClipboard(client?.email)}>
                                    <Copy className="h-4 w-4" />
                                 </Button>
                              </div>
                              <div className="flex items-start space-x-2">
                                 <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                                 <span>{client?.address}</span>
                              </div>
                           </CardContent>
                        </Card>
                        <Card>
                           <CardHeader>
                              <CardTitle>Additional Details</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">

                              <div className="flex items-center space-x-2">
                                 <Briefcase className="h-5 w-5 text-blue-500" />
                                 <span>Income: ${client?.income}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <CreditCard className="h-5 w-5 text-blue-500" />
                                 <span>Credit Score: </span>
                                 <span className={`font-bold ${calculateCreditScoreColor(client?.credit_score)}`}>
                                    {client?.credit_score}
                                 </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Calendar className="h-5 w-5 text-blue-500" />
                                 <span>
                                    Client Since: {client?.created_at}
                                 </span>

                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </TabsContent>
                  <TabsContent value="financial">
                     <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                           <CardHeader>
                              <CardTitle>Financial Information</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className="space-y-4">
                                 <div>
                                    <div className="flex justify-between mb-2">
                                       <span>Credit Score</span>
                                       <span className={`font-bold ${calculateCreditScoreColor(client?.credit_score)}`}>
                                          {client?.credit_score}
                                       </span>
                                    </div>
                                    <Progress value={(client?.credit_score / 100) * 100} activeClassName={calculateScoreBg(client?.credit_score)} className="w-full" />
                                 </div>
                                 <div className="flex items-center justify-between">
                                    <span>Annual Income</span>
                                    <span className="font-bold text-green-500">${client?.income}</span>
                                 </div>
                                 <div className="flex items-center justify-between">
                                    <span>Total Deal Value</span>
                                    <span className="font-bold text-blue-500">${calculateTotalDealValue()?.toLocaleString()}</span>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                        <Card>
                           <CardHeader>
                              <CardTitle>Risk Assessment</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className="space-y-4">
                                 <div className="flex items-center space-x-2">
                                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                                    <span>Overall Risk: Medium</span>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <span>Growth Potential: High</span>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <DollarSign className="h-5 w-5 text-blue-500" />
                                    <span>Investment Recommendation: Moderate</span>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </TabsContent>
                  <TabsContent value="deals">
                     {deals && deals.length > 0 ? (
                        <div className="space-y-4 mt-6">
                           {deals.map((deal) => (
                              <Card key={deal.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                                 <CardContent className="p-0">
                                    <div
                                       className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"

                                    >
                                       <div className="space-y-2">
                                          <h4 onClick={() => navigate(`/deal/${deal?.id}`)} className="font-semibold text-lg text-primary hover:underline">
                                             {deal.lender_name}
                                          </h4>
                                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                             <div className="flex items-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{deal.security_property_add}</span>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                                <Building2 className="w-4 h-4" />
                                                <span>{deal.deal_type}</span>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                                <DollarSign className="w-4 h-4" />
                                                <span>${deal.loan_amount}</span>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4" />
                                                <span>{deal.clients?.length || 0} client(s)</span>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="flex items-center mt-4">
                                          <Badge
                                             variant={deal.deal_stage === 'Completed' ? 'success' : 'secondary'}
                                          >
                                             {deal.deal_stage}
                                          </Badge>
                                       </div>
                                    </div>
                                 </CardContent>
                              </Card>
                           ))}
                        </div>
                     ) : (
                        <Empty message="No Deals Found" />
                     )}

                  </TabsContent>
               </Tabs>
            </CardContent>
         </Card>

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

