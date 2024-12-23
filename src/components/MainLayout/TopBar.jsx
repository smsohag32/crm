import { Link, NavLink } from "react-router-dom"; // Import NavLink
import { CircleDollarSign, SquareCheckBig, LayoutDashboard, AlignJustify, Contact, Mails } from "lucide-react";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import SearchInput from "../SearchBox/SearchInput";
import logo from "@/assets/icons/logo.png"
import ProfileMenu from "./ProfileMenu";
const TopBar = () => {
   const [isOpen, setOpen] = useState(false);
   const isDesktop = useMediaQuery("(min-width: 1024px)");

   const activeClass = 'text-[#0e51e0]';

   return (
      <div className="w-full fixed top-0 left-0 right-0  z-50 flex px-5 lg:px-6 h-[65px] items-center border-b border-b-gray-200 bg-white gap-4 justify-between">
         <div className="lg:w-full flex-1 lg:flex-auto flex items-center justify-between gap-14 ">
            <div>
               <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                  <img className="w-8 grayscale-1" src={logo} alt="crm" />  CRM
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
            <div className="w-full flex items-center text-des justify-end  gap-8">
               <NavLink
                  to="/"
                  className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <CircleDollarSign size={18} /> Deals
               </NavLink>

               <NavLink
                  to="/tasks"
                  className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <SquareCheckBig size={18} /> Tasks
               </NavLink>
               <NavLink
                  to="/contacts"
                  className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <Contact size={18} /> Contacts
               </NavLink>


               <NavLink
                  to="/emails"
                  className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <Mails size={18} /> Email
               </NavLink>
               <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                  <LayoutDashboard size={18} /> Dashboard
               </NavLink>

               <ProfileMenu />
            </div>
         ) : (
            <Sheet key={"left"} open={isOpen} onOpenChange={setOpen}>
               <SheetContent side="left">
                  <div>
                     <Link to={"/"} className="flex items-center text-[20px] font-medium gap-2">
                        <img className="w-12" src={logo} alt="crm" />
                        CRM
                     </Link>
                  </div>
                  <div className="w-full flex flex-col mt-6 gap-3 h-full">
                     <NavLink
                        to="/"
                        className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                        <CircleDollarSign size={18} /> Deals
                     </NavLink>

                     <NavLink
                        to="/tasks"
                        className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                        <SquareCheckBig size={18} /> Tasks
                     </NavLink>
                     <NavLink
                        to="/contacts"
                        className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                        <Contact size={18} /> Contacts
                     </NavLink>


                     <NavLink
                        to="/emails"
                        className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                        <Mails size={18} /> Email
                     </NavLink>
                     <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `text-base font-medium gap-1.5 flex items-center justify-center ${isActive ? activeClass : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                     </NavLink>

                     <ProfileMenu />
                  </div>
               </SheetContent>
            </Sheet>
         )}
      </div>
   );
};

export default TopBar;
