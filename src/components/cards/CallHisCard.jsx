import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CallHisCard = ({ isCashIn }) => {
   return (
      <div className="flex items-center justify-between gap-6">
         <div className="flex items-center gap-2 ">
            <Avatar>
               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
               <p className="text-[#6B6B6B] font-normal text-base">Abdul Wahid</p>
               <p className="text-xs font-normal text-[#222222]">+88012365554</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="space-y-1 text-end">
               <p className="text-[#6B6B6B] font-normal text-xs ps-1">26 July, 2024</p>
               <p className="text-[#222222] text-base font-semibold">5000</p>
            </div>

            {isCashIn ? <button className="py-2 bg-[#D2FFD7] rounded-[19px] px-1">
               <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3L6 10M6 10L9.5 6.5M6 10L2.5 6.5" stroke="#00CF15" strokeLinecap="round" strokeLinejoin="round" />
               </svg>

            </button> : <button className="py-2 bg-[#FFD3D3] rounded-[19px] px-1">
               <span><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10V3M6 3L2.5 6.5M6 3L9.5 6.5" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
               </span>
            </button>}
         </div>

      </div>
   );
};

export default CallHisCard;
