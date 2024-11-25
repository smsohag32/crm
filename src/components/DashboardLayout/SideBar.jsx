import { useState } from 'react'


import SidebarItem from './SidebarItem';
import { Users, UserSearchIcon } from 'lucide-react';
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
         icon: <svg width="18" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5C16 4.06812 16 3.60218 16.1522 3.23463C16.3552 2.74458 16.7446 2.35523 17.2346 2.15224C17.6022 2 18.0681 2 19 2C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5V9C22 9.93188 22 10.3978 21.8478 10.7654C21.6448 11.2554 21.2554 11.6448 20.7654 11.8478C20.3978 12 19.9319 12 19 12C18.0681 12 17.6022 12 17.2346 11.8478C16.7446 11.6448 16.3552 11.2554 16.1522 10.7654C16 10.3978 16 9.93188 16 9V5Z" stroke="url(#paint0_linear_809_694)" stroke-width="1.5" />
            <path d="M16 19C16 18.0681 16 17.6022 16.1522 17.2346C16.3552 16.7446 16.7446 16.3552 17.2346 16.1522C17.6022 16 18.0681 16 19 16C19.9319 16 20.3978 16 20.7654 16.1522C21.2554 16.3552 21.6448 16.7446 21.8478 17.2346C22 17.6022 22 18.0681 22 19C22 19.9319 22 20.3978 21.8478 20.7654C21.6448 21.2554 21.2554 21.6448 20.7654 21.8478C20.3978 22 19.9319 22 19 22C18.0681 22 17.6022 22 17.2346 21.8478C16.7446 21.6448 16.3552 21.2554 16.1522 20.7654C16 20.3978 16 19.9319 16 19Z" stroke="url(#paint1_linear_809_694)" stroke-width="1.5" />
            <path d="M2 16C2 14.1144 2 13.1716 2.58579 12.5858C3.17157 12 4.11438 12 6 12H8C9.88562 12 10.8284 12 11.4142 12.5858C12 13.1716 12 14.1144 12 16V18C12 19.8856 12 20.8284 11.4142 21.4142C10.8284 22 9.88562 22 8 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V16Z" stroke="url(#paint2_linear_809_694)" stroke-width="1.5" />
            <path d="M2 5C2 4.06812 2 3.60218 2.15224 3.23463C2.35523 2.74458 2.74458 2.35523 3.23463 2.15224C3.60218 2 4.06812 2 5 2H9C9.93188 2 10.3978 2 10.7654 2.15224C11.2554 2.35523 11.6448 2.74458 11.8478 3.23463C12 3.60218 12 4.06812 12 5C12 5.93188 12 6.39782 11.8478 6.76537C11.6448 7.25542 11.2554 7.64477 10.7654 7.84776C10.3978 8 9.93188 8 9 8H5C4.06812 8 3.60218 8 3.23463 7.84776C2.74458 7.64477 2.35523 7.25542 2.15224 6.76537C2 6.39782 2 5.93188 2 5Z" stroke="url(#paint3_linear_809_694)" stroke-width="1.5" />
            <defs>
               <linearGradient id="paint0_linear_809_694" x1="16" y1="2" x2="24.8235" y2="7.29412" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
               <linearGradient id="paint1_linear_809_694" x1="16" y1="16" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
               <linearGradient id="paint2_linear_809_694" x1="2" y1="12" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
               <linearGradient id="paint3_linear_809_694" x1="2" y1="2" x2="7.29412" y2="10.8235" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6188f1" />
                  <stop offset="1" stopColor="#6188f1" />
               </linearGradient>
            </defs>
         </svg>
         ,
      },
      {
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
      {
         to: "/dashboard/users-list",
         label: "User Management",

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
         icon: <UserSearchIcon />
         ,
      },


   ];





   return (
      <div className='w-[300px]  py-6  bg-white  flex flex-col h-screen border-e overflow-hidden    '>
         <div className='px-5 pb-2 '>
            <Link to={'/'} className=''>CRM</Link>
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



