import { useState } from 'react';
import CallHisCard from "@/components/cards/CallHisCard";

const CallCardHis = () => {

   const [activeTab, setActiveTab] = useState('cashIn');

   return (
      <div className="primary-box-shadow pb-[20px] flex flex-col w-full  rounded-[16px] px-4 pt-4">
         <h3 className="secondary-bg px-4 py-3 text-base font-semibold rounded-[8px] border-s-[3px] border-s-[#431879]">
            Call Card History
         </h3>

         {/* Tab Buttons */}
         <div className="mt-6 mb-6 flex w-full">
            {/* Cash In Button */}
            <button
               onClick={() => setActiveTab('cashIn')}
               className={`w-full border-b-[1px] text-base font-normal flex items-center justify-center px-4 py-[14px] border-b-[#431879] rounded-t-[8px]
               ${activeTab === 'cashIn'
                     ? 'bg-gradient-to-br text-white from-[#8C3493] to-[#431879]'
                     : 'bg-white text-black'}
               transition-all `} // Transition added
            >
               Cash In
            </button>

            {/* Cash Out Button */}
            <button
               onClick={() => setActiveTab('cashOut')}
               className={`w-full border-b-[1px] text-base font-normal flex items-center justify-center px-4 py-[14px] border-b-[#431879] rounded-t-[8px]
               ${activeTab === 'cashOut'
                     ? 'bg-gradient-to-br text-white from-[#8C3493] to-[#431879]'
                     : 'bg-white text-black'}
               transition-all  ease-in-out`} // Transition added
            >
               Cash Out
            </button>
         </div>

         <div className="mt-auto w-full grid gap-6">
            {activeTab === 'cashIn' ? (
               <>
                  <CallHisCard isCashIn={true} />
                  <CallHisCard isCashIn={true} />
                  <CallHisCard isCashIn={true} />
                  <CallHisCard isCashIn={true} />
                  <CallHisCard isCashIn={true} />
               </>
            ) : (
               <>
                  <CallHisCard isCashIn={false} />
                  <CallHisCard isCashIn={false} />
                  <CallHisCard isCashIn={false} />
                  <CallHisCard isCashIn={false} />
                  <CallHisCard isCashIn={false} />
               </>
            )}
         </div>
         <div className="flex items-center justify-end mt-6">
            <button className="flex px-3 py-2 items-center  text-base font-normal transition-all duration-200 hover:underline hover:text-blue-600 gap-2">See more <span className="pt-[2px]"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </span></button>
         </div>
      </div>
   );
};

export default CallCardHis;
