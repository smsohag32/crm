const OverviewStat = () => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div
            className="rounded-xl px-6 pt-6 pb-2 text-white shadow-lg"
            style={{
               background: 'linear-gradient(135deg, #431879 0.5%, #8C3493 50%, #431879 100%)',
            }}
         >
            <p className="text-base uppercase font-semibold tracking-wide opacity-80">
               Total
            </p>
            <p className="text-base font-medium">Balance Amount</p>

            <h2 className="text-[48px] font-semibold mt-2">9,000</h2>
            <p className="text-base opacity-90 mt-1">Initially 10,000</p>
         </div>
         <div
            style={{
               boxShadow: '0px 4px 15.8px 0px rgba(0, 0, 0, 0.08)',
            }}
            className="rounded-[24px] px-6 pt-6 pb-2 border-[1px] border-[#E00000] "
         >
            <p className="text-base uppercase font-semibold tracking-wide opacity-80">
               Total
            </p>
            <p className="text-base font-medium">Debit</p>

            <h2 className="text-[48px] font-semibold mt-2">9,000</h2>
            <p className="text-base opacity-90 mt-1">Initially 10,000</p>
         </div>
         <div
            style={{
               boxShadow: '0px 4px 15.8px 0px rgba(0, 0, 0, 0.08)',
            }}
            className="rounded-[24px] px-6 pt-6 pb-2 border-[1px] border-[#00940F] "

         >
            <p className="text-base  font-semibold uppercase tracking-wide opacity-80">
               Total
            </p>
            <p className="text-base font-medium">Credit</p>

            <h2 className="text-[48px] font-semibold mt-2">2,000</h2>
            <p className="text-base opacity-90 mt-1"></p>
         </div>
      </div>
   );
};

export default OverviewStat;
