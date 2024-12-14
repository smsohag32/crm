import { cn } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";

const NextButton = ({ onClick, isLoading, isDisabled }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         disabled={isDisabled || isLoading}
         className={cn(
            "px-6 py-1.5 rounded-lg flex text-base items-center gap-2 transition-all duration-300",
            "text-white bg-gradient-to-r from-blue-500 to-blue-600",
            "hover:from-blue-600 hover:to-blue-700 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-4 focus:ring-blue-300"
         )}
      >
         {isLoading ? (
            <Loader className="animate-spin h-5 w-5 mx-auto" />
         ) : (
            "Next"
         )} <ArrowRight size={16} />
      </button>
   );
};

export default NextButton;
