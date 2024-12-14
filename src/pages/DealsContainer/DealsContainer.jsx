import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { DollarSign, Filter, List, Plus } from 'lucide-react';
import DealStage from "./DealStage";
import DealCard from "./DealCard";
import { stages } from "@/data/data";
import AddDeals from "./AddDeals";
import { useGetAllDealsQuery, useStageChangeMutation } from "@/redux-store/api/dealsApi";
import Loading from "@/components/Loading/Loading";
import { toast } from "sonner";

const DealsContainer = () => {
   const { data = [], isLoading, refetch } = useGetAllDealsQuery()
   const [stageData, setStageData] = useState(stages);
   const [dealData, setDealData] = useState(data);
   const [stageChange, { isLoading: stageChangeLoading }] = useStageChangeMutation()
   const [activeItem, setActiveItem] = useState(null);
   const [isAdd, setIsAdd] = useState(false)
   useEffect(() => {
      if (data) {
         setDealData(data);
      }
   }, [data]);

   const handleDragStart = (event) => {
      const { active } = event;
      setActiveItem(active.id || null);
   };

   const handleDragOver = (event) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId.startsWith("deal-") && overId.startsWith("stage-")) {
         const activeIndex = dealData.findIndex((deal) => deal.id === activeId);
         const updatedDeals = [...dealData];
         updatedDeals[activeIndex] = { ...updatedDeals[activeIndex], deal_stage: overId.replace("stage-", "") };
         setDealData(updatedDeals);
      }
   };

   const handleDragEnd = async (event) => {
      const { active, over } = event;

      if (!over) {
         setActiveItem(null);
         return;
      }

      if (active.id.startsWith("stage-") && over.id.startsWith("stage-")) {
         const oldIndex = stageData.findIndex((stage) => `stage-${stage.name}` === active.id);
         const newIndex = stageData.findIndex((stage) => `stage-${stage.name}` === over.id);
         setStageData(arrayMove(stageData, oldIndex, newIndex));
      } else if (active.id.startsWith("deal-")) {
         const activeIndex = dealData.findIndex((deal) => `deal-${deal.id}` === active.id);
         const overIndex = dealData.findIndex((deal) => `deal-${deal.id}` === over.id);

         const newStage = dealData[overIndex]?.deal_stage;

         if (dealData[activeIndex]?.deal_stage !== newStage) {
            const updatedDeals = [...dealData];
            updatedDeals[activeIndex] = {
               ...updatedDeals[activeIndex],
               deal_stage: newStage
            };
            setDealData(updatedDeals);


            try {
               const id = dealData[activeIndex]?.id
               const stage = { deal_stage: newStage }
               console.log(stage)
               const response = await stageChange({ id, stage })
               toast.success("Deal stage updated successfully");
            } catch (error) {
               console.error("Error updating deal stage:", error);
            }
         } else {
            setDealData(arrayMove(dealData, activeIndex, overIndex));
         }
      }

      setActiveItem(null);
   };



   const collisionDetectionStrategy = (args) => {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) {
         return pointerCollisions;
      }
      return closestCenter(args);
   };

   return (
      <>
         {isLoading ? <Loading /> : (
            <DndContext
               collisionDetection={collisionDetectionStrategy}
               onDragStart={handleDragStart}
               onDragOver={handleDragOver}
               onDragEnd={handleDragEnd}
            >
               <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
                  <h2 className="flex items-center gap-2">
                     <span className="text-[20px] flex items-center gap-1">Deals</span>
                     <span className="bg-gray-200 flex items-center px-1 text-gray-700">
                        <DollarSign size={16} />1455,00
                     </span>
                     <span className="bg-gray-200 flex items-center px-1 text-gray-700">{dealData?.length || 0}</span>
                  </h2>
                  <div className="flex items-center gap-2">
                     <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                        <List size={16} />List
                     </Button>
                     <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                        <Filter size={16} />Filters
                     </Button>
                     <Button onClick={() => setIsAdd(true)} className="flex items-center text-sm px-2.5 py-2 gap-2">
                        <Plus size={16} /> Add New
                     </Button>
                  </div>
               </div>

               <div className="flex border-s border-s-gray-300 w-full mt-3 flex-nowrap  overflow-x-auto h-[80vh]">
                  <SortableContext items={stageData.map((stage) => `stage-${stage.name}`)} strategy={rectSortingStrategy}>
                     {stageData.map((stage) => (
                        <DealStage
                           key={stage.name}
                           stage={stage}
                           deals={dealData.filter((deal) => deal.deal_stage === stage.name)}
                        />
                     ))}
                  </SortableContext>
               </div>

               <DragOverlay>
                  {activeItem && (
                     activeItem.startsWith("deal-") ? (
                        <DealCard
                           deal={dealData.find((deal) => `deal-${deal.id}` === activeItem)}
                           isOverlay={true}
                        />
                     ) : (
                        <div className="bg-white border border-gray-300 rounded-md p-2 shadow-lg">
                           {stageData.find((stage) => `stage-${stage.name}` === activeItem)?.name}
                        </div>
                     )
                  )}
               </DragOverlay>

               <AddDeals isOpen={isAdd} refetch={refetch} setOpen={setIsAdd} />
            </DndContext>
         )}
      </>
   );
};

export default DealsContainer;
