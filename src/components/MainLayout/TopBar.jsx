import logo from "@/assets/icons/logo.png"
import { Link } from "react-router-dom";

import SearchBox from "./SearchBox";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar/UserAvatar";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"




import { AlignJustify, CircleDollarSign, LayoutDashboard, Ratio, SquareCheckBig } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
const TopBar = () => {
   const [isOpen, setOpen] = useState(false)
   const isDesktop = useMediaQuery("(min-width: 1024px)");
   return (
      <div className="w-full flex px-5 py-3 items-center border-b border-b-gray-200 bg-white gap-4 justify-between">

         <div className="lg:w-full flex-1 lg:flex-auto flex items-center justify-between gap-14 ">
            <div>
               <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                  <img className="w-12" src={logo} alt="crm" />
                  CRM
               </Link>
            </div>
            <div className="w-full lg:max-w-sm">
               <SearchBox />
            </div>
         </div>

         <Button className="lg:hidden" variant="ghost" onClick={() => setOpen(!isOpen)}>
            <AlignJustify />
         </Button>
         {isDesktop ? <div className="w-full flex items-center justify-end gap-2">
            <Button variant="ghost" className="text-base font-medium gap-1 flex items-center justify-center"> <CircleDollarSign /> Deals</Button>
            <Button variant="ghost" className="text-base font-medium gap-1 flex items-center justify-center"> <SquareCheckBig /> Task</Button>
            <Button variant="ghost" className="text-base font-medium gap-1 flex items-center justify-center">  <Ratio /> Reports</Button>
            <Button variant="ghost" className="text-base font-medium gap-1 flex items-center justify-center"> <LayoutDashboard /> Dashboard</Button>
            <div className="flex items-center cursor-pointer  gap-2">
               <div>
                  <UserAvatar size="8px" className="w-8 h-8" name={"Sohag"} />
               </div>
               <span>
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
               </span>

            </div>
         </div> : <>
            <Sheet key={"left"} open={isOpen} onOpenChange={setOpen}>
               <SheetContent side="left">
                  <div className="">
                     <div>
                        <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                           <img className="w-12" src={logo} alt="crm" />
                           CRM
                        </Link>
                     </div>
                  </div>
                  <div className="w-full  flex flex-col mt-6 gap-2 h-full">
                     <button className="text-base text-start font-medium gap-1 flex items-start lg:justify-start lg:items-center  py-2 px-3 border border-gray-200"> <CircleDollarSign /> Deals</button>
                     <button className="text-base text-start font-medium gap-1 flex items-start lg:justify-start lg:items-center  py-2 px-3 border border-gray-200"> <SquareCheckBig /> Task</button>
                     <button className="text-base text-start font-medium gap-1 flex items-start lg:justify-start lg:items-center  py-2 px-3 border border-gray-200">  <Ratio /> Reports</button>
                     <button className="text-base text-start font-medium gap-1 flex items-start lg:justify-start lg:items-center  py-2 px-3 border border-gray-200"> <LayoutDashboard /> Dashboard</button>
                     <div className="flex items-center px-3 mt-auto cursor-pointer  gap-2">
                        <div>
                           <UserAvatar size="8px" className="w-8 h-8" name={"Sohag"} />
                        </div>
                        <span>
                           <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </span>

                     </div>
                  </div>
               </SheetContent>
            </Sheet>

         </>}

      </div>
   );
};

export default TopBar;
