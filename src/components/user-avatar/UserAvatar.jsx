import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ photo, name, ...props }) => {
   return (
      <Avatar   {...props}>
         <AvatarImage {...props} src={photo} alt={name || "View Stat"} />
         <AvatarFallback>{name ? name?.slice(0, 2) : "VS"}</AvatarFallback>
      </Avatar>
   );
};

export default UserAvatar;
