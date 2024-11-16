import { Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Member from "./Member";

const Column = ({ column, handleAddMember, members }) => {
   const { id, name } = column;

   const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
      id,
      data: { type: "Column" },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div
         ref={setNodeRef}
         style={style}

         className="w-[340px] max-w-w-fit rounded-sm h-[70vh] overflow-y-auto p-2 border border-gray-300 bg-white"
      >
         <div  {...attributes}
            {...listeners} className="flex cursor-move items-center border-b pb-2 gap-4 justify-between">
            <p className="w-full">{name}</p>
            <button
               onClick={() => handleAddMember(id)}
               className="p-2 rounded hover:bg-gray-100"
            >
               <Plus size={20} />
            </button>
         </div>
         <SortableContext items={members.map((member) => member.id)} strategy={rectSortingStrategy}>
            <div className="grid gap-4 mt-4">
               {members.map((member) => (
                  <Member key={member.id} member={member} />
               ))}
            </div>
         </SortableContext>
      </div>
   );
};

export default Column;
