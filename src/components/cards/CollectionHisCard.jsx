
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const CollectionHisCard = () => {
   return (
      <div className="flex items-center justify-between gap-6">

         <div className="flex items-center gap-2">
            <Avatar>
               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
               <p className="text-[#222222] font-semibold text-base">Lays</p>
               <p className="text-xs font-normal text-[#6B6B6B]">26 July, 2024 <span className="ps-3">9:30am</span></p>
            </div>
         </div>


         <div>
            <p className="text-base font-semibold">5000</p>
         </div>
      </div>
   );
};

export default CollectionHisCard;
