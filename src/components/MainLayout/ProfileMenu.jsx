
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { logoutUser } from '@/redux-store/slice/authSlice';
import { UserCircle, Settings, LogOut } from 'lucide-react';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../user-avatar/UserAvatar';
import { formatName } from '@/utils/helper';

const ProfileMenu = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useAuth();

   const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/authentication/login');
   };

   const handleProfileClick = () => {
      navigate('/dashboard/profile');
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative border border-blue-800 h-8 w-8 rounded-full">
               <UserAvatar className="bg-blue-200 text-title" name={formatName(user?.full_name)} />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56  p-3" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{formatName(user?.full_name)}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
               <UserCircle className="mr-2 h-4 w-4" />
               <span>Profile</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={handleSettingsClick}>
               <Settings className="mr-2 h-4 w-4" />
               <span>Settings</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
               <LogOut className="mr-2 h-4 w-4" />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ProfileMenu;

