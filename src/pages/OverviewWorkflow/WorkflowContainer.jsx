import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import Column from "./Column";
import {
   DndContext,
   PointerSensor,
   useSensor,
   useSensors,
   closestCenter,
   DragOverlay,
} from "@dnd-kit/core";
import {
   SortableContext,
   arrayMove,
   rectSortingStrategy,
} from "@dnd-kit/sortable";

const WorkflowContainer = () => {
   const [columnData, setColumnData] = useState([
      { id: "column-1", name: "Happy Group" },
      { id: "column-2", name: "It Group" },
      { id: "column-3", name: "Sky Group" },
   ]);
   const [members, setMembers] = useState([
      { id: "member-1", content: "Sumon 1", columnId: "column-1" },
      { id: "member-2", content: "Member 2", columnId: "column-1" },
      { id: "member-3", content: "Member 3", columnId: "column-2" },
      { id: "member-4", content: "Member 4", columnId: "column-3" },
   ]);
   const [activeDragItem, setActiveDragItem] = useState(null);

   const columnsId = useMemo(() => columnData.map((col) => col.id), [columnData]);

   const handleAdd = () => {
      const newColumn = {
         id: `column-${Date.now()}`,
         name: `Column ${columnData.length + 1}`,
      };
      setColumnData((prev) => [...prev, newColumn]);
   };

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: { distance: 3 },
      })
   );

   const handleAddMember = (columnId) => {
      const newMember = {
         id: `member-${Date.now()}`,
         content: `Member ${members.length + 1}`,
         columnId: columnId,
      };
      setMembers((prev) => [...prev, newMember]);
   };

   const handleDragStart = (event) => {
      const activeId = event.active.id;
      const draggedItem = members.find((member) => member.id === activeId);

      if (draggedItem) {
         setActiveDragItem(draggedItem);
      }
   };

   const handleDragEnd = (event) => {
      const { active, over } = event;
      setActiveDragItem(null);

      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      // Handle column reordering
      if (columnsId.includes(activeId) && columnsId.includes(overId)) {
         const oldIndex = columnsId.indexOf(activeId);
         const newIndex = columnsId.indexOf(overId);

         setColumnData((prev) => arrayMove(prev, oldIndex, newIndex));
      }

      // Handle member movement
      const activeMember = members.find((member) => member.id === activeId);
      const overMember = members.find((member) => member.id === overId);
      const overColumn = columnData.find((column) => column.id === overId);

      if (activeMember && overMember) {
         const activeColumnId = activeMember.columnId;
         const overColumnId = overMember.columnId;

         if (activeColumnId === overColumnId) {
            const columnMembers = members.filter((m) => m.columnId === activeColumnId);
            const oldIndex = columnMembers.findIndex((m) => m.id === activeId);
            const newIndex = columnMembers.findIndex((m) => m.id === overId);

            const reordered = arrayMove(columnMembers, oldIndex, newIndex);

            setMembers((prev) =>
               prev
                  .filter((m) => m.columnId !== activeColumnId) // Remove old members
                  .concat(reordered) // Add reordered members
            );
         } else {
            // Move member between different columns
            setMembers((prev) =>
               prev.map((member) =>
                  member.id === activeId ? { ...member, columnId: overColumnId } : member
               )
            );
         }
      } else if (activeMember && overColumn) {
         // Move member to a new column at the end
         const newColumnId = overColumn.id;
         setMembers((prev) =>
            prev.map((member) =>
               member.id === activeId ? { ...member, columnId: newColumnId } : member
            )
         );
      }
   };

   return (
      <div className="px-5 py-3">
         <div className="flex border-b pb-3  items-center justify-end">
            <Button onClick={handleAdd}>Add New Column</Button>
         </div>

         <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
         >
            <SortableContext items={columnsId} strategy={rectSortingStrategy}>
               <div className="flex flex-nowrap overflow-x-auto h-[79vh]">
                  {columnData.map((column) => (
                     <Column
                        key={column.id}
                        column={column}
                        members={members.filter((member) => member.columnId === column.id)}
                        handleAddMember={handleAddMember}
                     />
                  ))}
               </div>
            </SortableContext>

            {/* DragOverlay rendering */}
            <DragOverlay>
               {activeDragItem && (
                  <div className="border cursor-move rounded-[8px] p-4 bg-gray-100 shadow-lg">
                     {activeDragItem.content}
                  </div>
               )}
            </DragOverlay>
         </DndContext>
      </div>
   );
};

export default WorkflowContainer;
