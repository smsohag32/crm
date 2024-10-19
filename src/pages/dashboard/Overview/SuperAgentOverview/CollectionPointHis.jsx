import image1 from "@/assets/icons/collection.png"
import image2 from "@/assets/icons/collection2.png"
import CollectionHisCard from "@/components/cards/CollectionHisCard";
const CollectionPointHis = () => {
   return (
      <div className="primary-box-shadow pb-[20px] rounded-[16px] px-4 pt-4">
         <h3 className="secondary-bg px-4 py-3 text-base font-semibold rounded-[8px] border-s-[3px] border-s-[#431879]">Collection Points History</h3>

         <div className="mt-6 flex items-center font-normal text-base justify-between gap-6">
            <button className="primary-box-shadow rounded-[8px]  py-4 w-full whitespace-nowrap px-4 flex items-center justify-center flex-col"><span><img className="w-8 h-8" src={image1} alt="" />
            </span>Add Collection</button>
            <button className="primary-box-shadow rounded-[8px]  py-4 w-full whitespace-nowrap px-4 flex items-center justify-center flex-col"> <span><img className="w-8 h-8" src={image2} alt="" />
            </span> Collection Points</button>
         </div>

         <div className="mt-6 grid gap-6 w-full">

            <CollectionHisCard />
            <CollectionHisCard />
            <CollectionHisCard />
            <CollectionHisCard />
            <CollectionHisCard />
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

export default CollectionPointHis;
