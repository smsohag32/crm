import { useState } from 'react'

import logo from "@/assets/icons/logo.png"
import SidebarItem from './SidebarItem';
import { LayoutDashboard, Users, UserSearchIcon, UserSquare, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar({ toggle, setToggle }) {
   const [openItems, setOpenItems] = useState({});

   const handleToggle = (label) => {
      setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
   };


   const items = [
      {
         to: "/dashboard",
         label: "Dashboard",
         hoverIcon: <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke="url(#paint0_linear_809_773)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_773" x1="1" y1="1" x2="13" y2="13" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon2: <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="url(#paint0_linear_809_155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_155" x1="1" y1="1" x2="10.6" y2="5.8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon: <LayoutDashboard size={18} />
         ,
      },
      {
         to: "/dashboard/clients",
         label: "Clients",
         icon: <UserSquare />
         ,
      },

      {
         to: "/dashboard/user-management",
         label: "User Management",

         icon: <UserSearchIcon />
         ,
      }, {
         to: "/dashboard/teams",
         label: "Teams",

         icon2: <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="url(#paint0_linear_809_155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_155" x1="1" y1="1" x2="10.6" y2="5.8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon: <Users />
         ,
      },


   ];





   return (
      <div className='w-[280px]  pb-6 pt-4  bg-white  flex flex-col h-screen border-e overflow-hidden    '>
         <div className='px-5  '>
            <Link to={"/"} className="flex items-center text-[20px]  text-des font-medium gap-2">
               <img className="w-8 grayscale-1" src={logo} alt="crm" />  CRM
            </Link>
         </div>
         <div className=' px-3 space-y-1 overflow-auto custom-scrollbar pb-10 mt-6'>
            {items.map((item, index) => (
               <SidebarItem
                  key={index}
                  to={item.to}
                  label={item.label}
                  subItems={item.subItems}
                  isOpen={!!openItems[item.label]}
                  onToggle={() => handleToggle(item.label)}
                  icon2={item.icon2}
                  icon={item.icon}
                  hoverIcon={item.hoverIcon}
               />
            ))}
         </div>

      </div>
   )
}



