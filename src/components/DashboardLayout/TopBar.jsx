import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../user-avatar/UserAvatar';
import ProfileMenu from '../MainLayout/ProfileMenu';

const FullscreenButton = () => {
   const [isFullscreen, setIsFullscreen] = useState(false);


   const toggleFullscreen = () => {
      if (document.fullscreenElement) {
         document.exitFullscreen();
         setIsFullscreen(false);
      } else {
         document.documentElement.requestFullscreen();
         setIsFullscreen(true);
      }
   };

   return (
      <button
         className=""
         onClick={toggleFullscreen}>
         {isFullscreen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
         ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
         )}
      </button>
   );
};

export default function TopBar({ toggle, setToggle }) {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-menu')) {
         setDropdownOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dropdownOpen]);

   return (
      <div
         className='flex relative w-full transition-all duration-300 items-center bg-gradient-to-bl   top-0 justify-between px-4 lg:px-5 border-b border-b-gray-200 z-50 bg-white py-3'
         style={{

            height: '65px',

         }}
      >
         <div className='flex items-center gap-8'>
            <button onClick={() => setToggle(!toggle)} className='text-[#1d1d1d]'>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
            <Link to={'/'} className='text-[20px] text-title uppercase opacity-75 font-medium'>Dashboard</Link>
         </div>
         <div className='text-[#1d1d1d] pe-1'>
            <ProfileMenu />
         </div>
      </div>
   );
}
