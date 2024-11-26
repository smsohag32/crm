import { Link, NavLink } from "react-router-dom"; // Import NavLink
import { CircleDollarSign, SquareCheckBig, Ratio, LayoutDashboard, AlignJustify, Contact } from "lucide-react";
import UserAvatar from "../user-avatar/UserAvatar";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import SearchBox from "./SearchBox";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import SearchInput from "../SearchBox/SearchInput";

const TopBar = () => {
   const [isOpen, setOpen] = useState(false);
   const isDesktop = useMediaQuery("(min-width: 1024px)");

   const activeClass = 'text-blue-500';

   return (
      <div className="w-full flex px-5 lg:px-6 py-3 items-center border-b border-b-gray-200 bg-white gap-4 justify-between">
         <div className="lg:w-full flex-1 lg:flex-auto flex items-center justify-between gap-14 ">
            <div>
               <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                  CRM
               </Link>
            </div>
            <div className="w-full lg:max-w-sm">
               <SearchInput />
            </div>
         </div>

         <Button className="lg:hidden" variant="ghost" onClick={() => setOpen(!isOpen)}>
            <AlignJustify />
         </Button>

         {isDesktop ? (
            <div className="w-full flex items-center justify-end  gap-8">
               <NavLink
                  to="/deals"
                  className={({ isActive }) => `text-base font-medium gap-2 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <CircleDollarSign /> Deals
               </NavLink>

               <NavLink
                  to="/tasks"
                  className={({ isActive }) => `text-base font-medium gap-2 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <SquareCheckBig /> Tasks
               </NavLink>
               <NavLink
                  to="/contacts"
                  className={({ isActive }) => `text-base font-medium gap-2 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <Contact /> Contacts
               </NavLink>


               <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `text-base font-medium gap-2 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <LayoutDashboard /> Dashboard
               </NavLink>

               <div className="flex items-center cursor-pointer gap-2">
                  <div className="border rounded-full border-gray-500 ">
                     <UserAvatar size="8px" className="w-8 h-8" name={"Sohag"} />
                  </div>
               </div>
            </div>
         ) : (
            <Sheet key={"left"} open={isOpen} onOpenChange={setOpen}>
               <SheetContent side="left">
                  <div>
                     <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                        {/* <img className="w-12" src={logo} alt="crm" /> */}
                        CRM
                     </Link>
                  </div>
                  <div className="w-full flex flex-col mt-6 gap-3 h-full">
                     <NavLink
                        to="/deals"
                        className={({ isActive }) => `text-base border-b py-3 font-medium gap-2 flex items-center lg:justify-center ${isActive ? activeClass : ''}`}>
                        <CircleDollarSign /> Deals
                     </NavLink>

                     <NavLink
                        to="/tasks"
                        className={({ isActive }) => `text-base border-b py-3 font-medium gap-2 flex items-center lg:justify-center ${isActive ? activeClass : ''}`}>
                        <SquareCheckBig /> Tasks
                     </NavLink>
                     <NavLink
                        to="/contacts"
                        className={({ isActive }) => `text-base border-b py-3 font-medium gap-2 flex items-center lg:justify-center ${isActive ? activeClass : ''}`}>
                        <Contact /> Contacts
                     </NavLink>


                     <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `text-base border-b py-3 font-medium gap-2 flex items-center lg:justify-center ${isActive ? activeClass : ''}`}>
                        <LayoutDashboard /> Dashboard
                     </NavLink>


                     <div className="flex items-center px-3 mt-auto cursor-pointer gap-2">
                        <div className="border rounded-full border-gray-200 ">
                           <UserAvatar size="8px" className="w-8 h-8" name={"Sohag"} />
                        </div>

                     </div>
                  </div>
               </SheetContent>
            </Sheet>
         )}
      </div>
   );
};

export default TopBar;
