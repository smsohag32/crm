import CallCardHis from "./CallCardHis";
import CollectionPointHis from "./CollectionPointHis";
import OverviewStat from "./OverviewStat";
import TransactionHistory from "./TransactionHistory";

const SuperAgentOverview = () => {
   return (
      <div className="lg:grid-cols-3 gap-6 grid">
         <div className="lg:col-span-2">
            <OverviewStat />
            <div className="mt-6 grid w-full lg:grid-cols-2 grid-cols-1 gap-6">
               <CollectionPointHis />
               <CallCardHis />
            </div>
         </div>
         <div className="w-full lg:col-span-1">
            <TransactionHistory />
         </div>
      </div>
   );
};

export default SuperAgentOverview;
