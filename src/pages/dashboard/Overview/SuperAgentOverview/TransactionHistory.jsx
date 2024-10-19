import TransactionHistoryCard from "@/components/cards/TransactionHistoryCard";

const TransactionHistory = () => {
   return (
      <div style={{ boxShadow: "0px 4px 15.8px 0px #00000014" }} className="rounded-[24px] h-full bg-[#FEF6FF] p-4">
         <button className="bg-gradient-to-br w-full from-[#8C3493] to-[#431879] text-base font-normal gap-3 text-white rounded-[8px] flex py-[14px] px-4 justify-between items-center">Transaction History <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 13L7.5 7L1.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
         </button>

         <div className="mt-6 grid gap-6">
            <TransactionHistoryCard isReceived={true} />
            <TransactionHistoryCard isReceived={true} />
            <TransactionHistoryCard isReceived={false} />
            <TransactionHistoryCard isReceived={false} />
            <TransactionHistoryCard isReceived={true} />
            <TransactionHistoryCard isReceived={true} />
            <TransactionHistoryCard isReceived={false} />
            <TransactionHistoryCard isReceived={true} />
            <TransactionHistoryCard isReceived={false} />
            <TransactionHistoryCard isReceived={true} />
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

export default TransactionHistory;
