import { Skeleton } from "../ui/skeleton";

const Loading = () => {
   return (
      <div className="py-4 space-y-4">
         <Skeleton className="w-full h-5 rounded-full" />
         <Skeleton className=" h-5 w-3/4 rounded-full" />
         <Skeleton className="w-full h-5 rounded-full" />
         <Skeleton className="w-full h-5 rounded-full" />
         <Skeleton className="w-5/6 h-5  rounded-full" />
         <Skeleton className="w-full h-5 rounded-full" />
         <Skeleton className="w-full h-5 rounded-full" />
         <Skeleton className="w-5/6 h-5  rounded-full" />
         <Skeleton className="w-full h-5  rounded-full" />
      </div>
   );
};

export default Loading;
