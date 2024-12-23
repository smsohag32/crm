import { useState } from 'react';
import { useGetDealClientsQuery } from "@/redux-store/api/dealsApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus, Users } from 'lucide-react';
import UserAvatar from "@/components/user-avatar/UserAvatar";

const DealClients = ({ dealId }) => {
   const [isAddClientOpen, setIsAddClientOpen] = useState(false);
   const { data: dealClients, isLoading, isError, refetch } = useGetDealClientsQuery(dealId);

   if (isLoading) {
      return <DealClientsLoading />;
   }

   if (isError) {
      return <DealClientsError onRetry={refetch} />;
   }

   const hasClients = dealClients && dealClients.length > 0;

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Deal Clients</h2>
            <Button onClick={() => setIsAddClientOpen(true)} variant="outline" size="sm">
               <UserPlus className="mr-2 h-4 w-4" />
               Add Client
            </Button>
         </div>

         {hasClients ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {dealClients.map(({ id, client }) => (
                  <ClientCard key={id} client={client} />
               ))}
            </div>
         ) : (
            <DealClientsEmpty />
         )}


      </div>
   );
};

const ClientCard = ({ client }) => (
   <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <UserAvatar name={client.name} className="w-12 h-12" />
      <div>
         <p className="text-lg font-medium text-gray-800">{client.name}</p>
         <p className="text-sm text-gray-500">{client.email}</p>
      </div>
   </div>
);

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

