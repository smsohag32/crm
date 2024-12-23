import { Database } from "lucide-react";

const SmallEmpty = ({ message }) => {
   return (
      <div className='flex items-center justify-center h-[20vh]'>
         <div className="flex items-center justify-center flex-col">
            <span className="text-des"><Database size={40} /></span>
            <p className="text-[24px] font-normal text-title mt-3">{message}</p>
         </div>
      </div>
   );
};

export default SmallEmpty;
