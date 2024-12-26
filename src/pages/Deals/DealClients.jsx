import { useState } from 'react';
import { useAddDealClientMutation, useGetDealClientsQuery } from "@/redux-store/api/dealsApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus, Users, Users2 } from 'lucide-react';
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { AssignMember } from '@/components/SearchBox/AssignMember';
import { useGetUsersQuery } from '@/redux-store/api/usersApi';
import CmModal from '@/components/modal/CmModal';
import { toast } from 'sonner';
import { useGetAllClientsQuery, useSearchClientQuery } from '@/redux-store/api/clientsApi';
import { ClientSelector } from '../DealsContainer/AddDeals';
import { Badge } from '@/components/ui/badge';
import { formatName } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

const DealClients = ({ dealId }) => {
   const [isAddClientOpen, setIsAddClientOpen] = useState(false);
   const { data: dealClients, isLoading, isError, refetch } = useGetDealClientsQuery(dealId);
   const { data: users } = useGetUsersQuery()
   const [addDealClient, { isLoading: assigningLoading }] = useAddDealClientMutation()
   const [searchText, setSearchText] = useState("")
   const { data: clientData } = useGetAllClientsQuery()

   const { data: clients, isLoading: clientLoading } = useSearchClientQuery({
      search: searchText,
   });
   const [selectedMembers, setSelectedMembers] = useState([])
   if (isLoading) {
      return <DealClientsLoading />;
   }

   if (isError) {
      return <DealClientsError onRetry={refetch} />;
   }

   const handleAddClient = async (e) => {
      e.preventDefault();
      try {
         const clientData = {
            clients: selectedMembers?.map(c => c?.id) || []
         };
         const response = await addDealClient({ dealId, clientData });
         console.log(response)
         if (response?.data) {
            toast.info("Clients added to deal successfully.");
            closeModal();
            refetch()
         } else {
            throw response;
         }
      } catch (err) {

         if (err?.error?.data?.clients[0]) {
            toast.error(err?.error?.data?.clients[0]);
         } else {
            toast.error("Failed to add client.");
         }
      }
   };

   const hasClients = dealClients && dealClients.length > 0;

   const closeModal = () => {
      setIsAddClientOpen(false)
      setSelectedMembers([])
   }
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <p className='text-[18px] font-normal flex items-center gap-2 text-title'><Users2 className='text-des' size={18} />Clients</p>
            <Button onClick={() => setIsAddClientOpen(true)} variant="outline" size="sm">
               <UserPlus className="mr-2 h-4 w-4" />
               Add Client
            </Button>
         </div>

         {hasClients ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
               {dealClients.map(({ id, client }) => (
                  <ClientCard key={id} client={client} />
               ))}
            </div>
         ) : (
            <DealClientsEmpty />
         )}

         <CmModal size={"700px"} isOpen={isAddClientOpen} handleClose={closeModal} title={"Add client to deal."}>
            <form onSubmit={handleAddClient}>
               <div className="space-y-4">

                  <ClientSelector
                     clientsData={clientData?.results}
                     searchText={searchText}
                     setSearchText={setSearchText}
                     clients={clients?.results || clientData?.results || []}
                     selectedClients={selectedMembers}
                     setSelectedClients={setSelectedMembers}
                  />
                  <div className="flex flex-wrap gap-2 mt-4">
                     {selectedMembers?.map((client) => (
                        <Badge key={client.id} variant="secondary" className="bg-white text-des hover:bg-slate-50 py-2 gap-2 px-3">
                           <UserAvatar name={formatName(client?.name)} className="bg-slate-200" />
                           {client.name}
                           <button
                              type="button"
                              className="ml-2 text-lg text-red-600 flex items-center justify-center  rounded-full h-6 w-6  hover:text-white transition-all duration-100  hover:bg-red-500 p-1"
                              onClick={() => setSelectedMembers(selectedMembers.filter((c) => c.id !== client.id))}
                           >
                              ×
                           </button>
                        </Badge>
                     ))}
                  </div>
               </div>
               <div className='mt-6 flex items-center justify-end'> <Button disabled={assigningLoading} type="submit" className="">Save</Button></div>
            </form>
         </CmModal>
      </div>
   );
};

const ClientCard = ({ client }) => {
   const navigate = useNavigate()
   return (

      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
         <UserAvatar name={client.name} className="w-12 h-12 !bg-slate-200" />
         <div>
            <p onClick={() => navigate(`/dashboard/client/${client?.id}`)} className="text-lg font-medium hover:underline transition-all cursor-pointer duration-200 hover:text-blue-700 text-title">{client.name}</p>
            <p className="text-sm pb-1 text-gray-500">{client.email}</p>
            <Badge variant={"outline"} className={"text-des text-xs"}>Client</Badge>
         </div>
      </div>
   )
};

const DealClientsLoading = () => (
   <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
         ))}
      </div>
   </div>
);

const DealClientsError = ({ onRetry }) => (
   <div className="text-center py-8">
      <p className="text-lg text-gray-800 mb-4">Failed to load deal clients</p>
      <Button onClick={onRetry} variant="outline">
         Try Again
      </Button>
   </div>
);

const DealClientsEmpty = () => (
   <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <Users className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No clients</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a new client to this deal.</p>
   </div>
);

export default DealClients;

