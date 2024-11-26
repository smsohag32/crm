import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import ClientCard from "./ClientCard";

const DealStage = ({ stage, clients }) => {
   const { setNodeRef } = useDroppable({ id: stage.id });

   return (
      <div
         ref={setNodeRef}
         className="flex-shrink-0 w-[300px] h-[90vh] overflow-y-auto border-e border-e-gray-300"
      >
         <div className="py-1 px-2 mb-2 bg-des bg-opacity-5 shadow-sm flex items-center">
            <p className="text-base font-medium line-clamp-1 flex-1">{stage.name}</p>
            <div className="flex items-center text-des gap-1">
               <p>{stage.clients.length}</p>
               <span className="w-4 h-4 bg-des bg-opacity-30 rounded-e-full"></span>
            </div>
         </div>

         <SortableContext items={stage.clients}>
            <div className="px-1.5 grid gap-2">
               {stage.clients.map((clientId) => {
                  const client = clients.find((c) => c.id === clientId);
                  return <ClientCard key={client.id} client={client} />;
               })}
            </div>
         </SortableContext>
      </div>
   );
};

export default DealStage;
