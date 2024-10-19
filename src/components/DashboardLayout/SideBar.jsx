import React, { useState } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import userImage from "@/assets/dashboard/image.png"

export default function Sidebar({ toggle, setToggle }) {
   const [openItems, setOpenItems] = useState({});
   const navigate = useNavigate();

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
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon2: <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="url(#paint0_linear_809_155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_155" x1="1" y1="1" x2="10.6" y2="5.8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
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
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
               <linearGradient id="paint1_linear_809_694" x1="16" y1="16" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
               <linearGradient id="paint2_linear_809_694" x1="2" y1="12" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
               <linearGradient id="paint3_linear_809_694" x1="2" y1="2" x2="7.29412" y2="10.8235" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
            </defs>
         </svg>
         ,
      },
      {
         to: "/dashboard/dsr",
         label: <span>DSR <span className='text-[#6B6B6B] ps-6'>23</span></span>,
         hoverIcon: <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke="url(#paint0_linear_809_773)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_773" x1="1" y1="1" x2="13" y2="13" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon2: <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="url(#paint0_linear_809_155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_155" x1="1" y1="1" x2="10.6" y2="5.8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
            </defs>
         </svg>
         ,
         icon: <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="url(#paint0_linear_809_50)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_809_50" x1="1" y1="1" x2="18.8759" y2="16.8897" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8C3493" />
                  <stop offset="1" stopColor="#431879" />
               </linearGradient>
            </defs>
         </svg>

         ,
      },

   ];





   const handleLogout = () => {
      navigate("/", { replace: true })
   }
   return (
      <div className='w-[300px]  py-6  flex flex-col h-screen border-e rounded-t-[16px] overflow-hidden  bg-white '>
         <button onClick={() => setToggle(!toggle)} className='absolute lg:hidden bg-red-600 text-white rounded-s-full p-3 text-bold right-0 top-5' ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg></button>
         <div className='flex items-center flex-col py-2 justify-center pe-4  -mt-1'>
            <div className='w-20 h-20 overflow-hidden rounded-[8px]'>
               <img src={userImage} alt="" className='w-full rounded-[8px] h-full object-cover ' />
            </div>
            <div className='mt-4 flex items-center flex-col justify-center'>
               <h3 className='font-normal text-[24px]'>Aladin Bhutan</h3>
               <p className='text-[#6B6B6B] font-normal text-base'>Super Agent</p>
            </div>
         </div>

         <div className='mt-[56px] flex  px-4 items-center  justify-center'>
            <button className='bg-gradient-to-br w-full from-[#8C3493] to-[#431879] text-base font-normal gap-3 text-white rounded-[8px] flex py-[14px] px-8 justify-center items-center'>Enter Total Amount <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clipPath="url(#clip0_809_689)">
                  <path d="M9.16663 3.33332H5.66663C4.26649 3.33332 3.56643 3.33332 3.03165 3.6058C2.56124 3.84549 2.17879 4.22794 1.93911 4.69834C1.66663 5.23312 1.66663 5.93319 1.66663 7.33332V14.3333C1.66663 15.7335 1.66663 16.4335 1.93911 16.9683C2.17879 17.4387 2.56124 17.8212 3.03165 18.0608C3.56643 18.3333 4.26649 18.3333 5.66663 18.3333H12.6666C14.0668 18.3333 14.7668 18.3333 15.3016 18.0608C15.772 17.8212 16.1545 17.4387 16.3941 16.9683C16.6666 16.4335 16.6666 15.7335 16.6666 14.3333V10.8333M6.6666 13.3333H8.06206C8.46971 13.3333 8.67353 13.3333 8.86535 13.2873C9.03541 13.2464 9.19798 13.1791 9.3471 13.0877C9.5153 12.9847 9.65942 12.8405 9.94767 12.5523L17.9166 4.58332C18.607 3.89296 18.607 2.77368 17.9166 2.08332C17.2263 1.39296 16.107 1.39296 15.4166 2.08332L7.44765 10.0523C7.1594 10.3405 7.01527 10.4847 6.9122 10.6528C6.82082 10.802 6.75348 10.9645 6.71265 11.1346C6.6666 11.3264 6.6666 11.5302 6.6666 11.9379V13.3333Z" stroke="#FEF7FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               </g>
               <defs>
                  <clipPath id="clip0_809_689">
                     <rect width="20" height="20" fill="white" />
                  </clipPath>
               </defs>
            </svg>
            </button>
         </div>


         <div className='px-4  space-y-1 overflow-auto custom-scrollbar pb-10 mt-6'>
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

         <div className='mt-auto ps-[18px] pe-[12px] w-full'>
            <button onClick={handleLogout} className="flex items-center group gap-4 w-full">
               {/* Main span with hover and focus transition */}
               <span
                  className="secondary-bg transition-all  ease-in-out bg-gradient-to-br from-[#FEF6FF] to-[#FEF6FF]
    group-hover:from-[#8C3493] group-hover:to-[#431879] focus:from-[#8C3493] focus:to-[#431879] active:from-[#431879]
    active:to-[#8C3493] bg-[length:200%_200%] hover:bg-[length:100%_100%] focus:bg-[length:100%_100%]
    active:bg-[length:100%_100%] group-hover:text-white focus:text-white active:text-white flex gap-4 items-center flex-1 w-full justify-start px-[14px] py-3 rounded-[16px]"
               >
                  <span>
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M14 15.0001L19 10.0001M19 10.0001L14 5.00006M19 10.0001H7M10 15.0001C10 15.2956 10 15.4434 9.98901 15.5715C9.87482 16.902 8.89486 17.9969 7.58503 18.2573C7.45903 18.2824 7.31202 18.2987 7.01835 18.3314L5.99694 18.4448C4.46248 18.6153 3.69521 18.7006 3.08566 18.5055C2.27293 18.2455 1.60942 17.6516 1.26118 16.8725C1 16.2883 1 15.5163 1 13.9724V6.02776C1 4.48383 1 3.71186 1.26118 3.12758C1.60942 2.34854 2.27293 1.75467 3.08566 1.49459C3.69521 1.29953 4.46246 1.38478 5.99694 1.55528L7.01835 1.66877C7.31212 1.70141 7.45901 1.71773 7.58503 1.74279C8.89486 2.00322 9.87482 3.0981 9.98901 4.42867C10 4.5567 10 4.70449 10 5.00006"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <defs>
                           <linearGradient
                              id="paint0_linear_809_55"
                              x1="1"
                              y1="1.38257"
                              x2="18.2187"
                              y2="19.3656"
                              gradientUnits="userSpaceOnUse"
                           >
                              <stop stopColor="#8C3493" />
                              <stop offset="1" stopColor="#431879" />
                           </linearGradient>
                        </defs>
                     </svg>
                  </span>

                  <span>Logout</span>
               </span>

               {/* Secondary span with hover and focus transition */}
               <span
                  className="flex items-center justify-start px-[14px] py-3.5 transition-all duration-300 ease-in-out bg-gradient-to-br from-[#FEF6FF] to-[#FEF6FF]
    group-hover:from-[#8C3493] group-hover:to-[#431879] focus:from-[#8C3493] focus:to-[#431879] active:from-[#431879]
    active:to-[#8C3493] bg-[length:200%_200%] hover:bg-[length:100%_100%] focus:bg-[length:100%_100%]
    active:bg-[length:100%_100%] group-hover:text-white focus:text-white active:text-white secondary-bg rounded-[16px]"
               >
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 20 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M13.0505 7H3.5C2.11929 7 1 5.88071 1 4.5C1 3.11929 2.11929 2 3.5 2H13.0505M6.94949 18H16.5C17.8807 18 19 16.8807 19 15.5C19 14.1193 17.8807 13 16.5 13H6.94949M1 15.5C1 17.433 2.567 19 4.5 19C6.433 19 8 17.433 8 15.5C8 13.567 6.433 12 4.5 12C2.567 12 1 13.567 1 15.5ZM19 4.5C19 6.433 17.433 8 15.5 8C13.567 8 12 6.433 12 4.5C12 2.567 13.567 1 15.5 1C17.433 1 19 2.567 19 4.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <defs>
                        <linearGradient
                           id="paint0_linear_809_29"
                           x1="1"
                           y1="1"
                           x2="19"
                           y2="19"
                           gradientUnits="userSpaceOnUse"
                        >
                           <stop stopColor="#8C3493" />
                           <stop offset="1" stopColor="#431879" />
                        </linearGradient>
                     </defs>
                  </svg>
               </span>
            </button>



         </div>

      </div>
   )
}



