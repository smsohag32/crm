import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Member = ({ member }) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: member.id,
      data: {
         type: "Member",
         columnId: member.columnId,
      },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div
         ref={setNodeRef}
         {...attributes}
         {...listeners}
         style={style}
         className="border rounded-[8px] p-4 bg-gray-100"
      >
         {member.content}
      </div>
   );
};

export default Member;
