import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AvatarProfile = ({ photo, name, backgroundColor }) => {
   return (
      <Avatar
         title={name}
         className="cursor-pointer border-4 border-white z-10 w-[48px] h-[48px] flex items-center justify-center"
         style={{ backgroundColor: backgroundColor }}
      >
         {photo ? (
            <AvatarImage
               src={photo}
               alt={name?.slice(0, 2)}
               className="w-full h-full object-cover"
            />
         ) : (
            <AvatarFallback className=" text-base">
               {name?.slice(0, 2)}
            </AvatarFallback>
         )}
      </Avatar>
   );
};

export default AvatarProfile;
