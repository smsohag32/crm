import { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { DollarSign, Filter, List, Plus } from "lucide-react";
import DealStage from "./DealStage";
import ClientCard from "./ClientCard";
import { clients, stages } from "@/data/data";

const DealsContainer = () => {
   const [stageData, setStageData] = useState(stages);
   const [activeCard, setActiveCard] = useState(null); // Track the currently dragged card

   const handleDragStart = (event) => {
      const { active } = event;
      const clientId = parseInt(active.id);
      const client = clients.find((c) => c.id === clientId);
      setActiveCard(client);
   };

   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (!over) {
         setActiveCard(null);
         return;
      }

      const activeId = parseInt(active.id);
      const overId = parseInt(over.id);

      const fromStageIndex = stageData.findIndex((stage) =>
         stage.clients.includes(activeId)
      );
      const toStageIndex = stageData.findIndex((stage) =>
         stage.clients.includes(overId) || stage.id === over.id
      );

      if (fromStageIndex === -1) {
         setActiveCard(null);
         return;
      }

      const fromStage = { ...stageData[fromStageIndex] };
      const toStage = { ...stageData[toStageIndex] };

      if (fromStageIndex === toStageIndex) {
         // Reorder within the same stage
         const oldIndex = fromStage.clients.indexOf(activeId);
         const newIndex = fromStage.clients.indexOf(overId);
         fromStage.clients = arrayMove(fromStage.clients, oldIndex, newIndex);

         const newStages = [...stageData];
         newStages[fromStageIndex] = fromStage;

         setStageData(newStages);
      } else {
         // Move between stages
         fromStage.clients = fromStage.clients.filter((clientId) => clientId !== activeId);
         toStage.clients = [...toStage.clients, activeId];

         const newStages = [...stageData];
         newStages[fromStageIndex] = fromStage;
         newStages[toStageIndex] = toStage;

         setStageData(newStages);
      }

      setActiveCard(null);
   };

   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex items-center gap-2">
               <span className="text-[20px] flex items-center gap-1">FBD : New Deals</span>
               <span className="bg-gray-200 flex items-center px-1 text-gray-700">
                  <DollarSign size={16} />1455,00
               </span>
               <span className="bg-gray-200 flex items-center px-1 text-gray-700">5</span>
            </h2>
            <div className="flex items-center gap-2">
               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                  <List size={16} />List
               </Button>
               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                  <Filter size={16} />Filters
               </Button>
               <Button className="flex items-center text-sm px-2.5 py-2 gap-2">
                  <Plus size={16} /> Add New
               </Button>
            </div>
         </div>

         <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
         >
            <div className="flex border-s border-s-gray-300 w-full mt-3 flex-nowrap overflow-x-auto h-[90vh]">
               {stageData.map((stage) => (
                  <SortableContext
                     key={stage.id}
                     items={stage.clients}
                     strategy={rectSortingStrategy}
                  >
                     <DealStage stage={stage} clients={clients} />
                  </SortableContext>
               ))}
            </div>

            <DragOverlay>
               {activeCard ? (
                  <div className="w-[300px]">
                     <ClientCard client={activeCard} isOverlay={true} />
                  </div>
               ) : null}
            </DragOverlay>
         </DndContext>
      </div>
   );
};

export default DealsContainer;
