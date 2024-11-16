import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import GroupItem from "./GroupItem";

const Column = ({ index }) => {
   const [groupItems, setGroupItems] = useState([])
   const handleAddGroupItem = () => {
      const newGroupItem = {
         id: `group-${Date.now()}`,
         content: `Group Item ${groupItems.length + 1}` // Default content
      };
      setGroupItems((prev) => [...prev, newGroupItem]);
   };

   return (
      <div className="w-[390px] rounded-sm h-[70vh] overflow-y-auto p-2 border border-gray-300 bg-white">
         <div className="flex items-center border-b pb-2 gap-4 justify-between">
            <p className="w-full">Column - {index + 1}</p>
            <Button onClick={handleAddGroupItem} variant="ghost"><Plus size={20} /></Button>
         </div>
         <div className="grid gap-4 mt-4 overflow-y-auto">
            {groupItems && groupItems?.length > 0 && groupItems.map((item, index) => <GroupItem key={index} index={index} item={item} />)}
         </div>
      </div>
   );
};

export default Column;
