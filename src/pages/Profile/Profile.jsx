import React, { useRef, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux-store/api/usersApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Profile = () => {
   const { data: user, isLoading, isError } = useGetProfileQuery();
   const [isEditing, setIsEditing] = useState(false);
   const [editedUser, setEditedUser] = useState({});
   const imageInputRef = useRef(null);
   const [profile, setProfile] = useState(null);
   const [updateProfile, { isLoading: profileLoading }] = useUpdateProfileMutation()
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setProfile(file);
      }
   };

   const handleProfileClick = () => {
      if (imageInputRef.current) {
         imageInputRef.current.click();
      }
   };


   const uploadPhoto = async () => {
      try {
         if (profile) {
            const formData = new FormData();
            formData.append("user_id", user?.id)
            formData.append("image", profile);
            await updateProfile(formData).unwrap();
            toast.success("Profile photo changed.")
         }
      } catch {
         toast.error("Failed to update profile photo.")
      }
   }

   if (isLoading) return <div>Loading...</div>;
   if (isError) return <div>Error loading profile</div>;

   const handleEdit = () => {
      setIsEditing(true);
      setEditedUser(user);
   };

   const handleSave = () => {
      setIsEditing(false);
   };

   const handleChange = (e) => {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
   };

   return (
      <div className=" pt-2 pb-6">
         <Card className="max-w-4xl">
            <CardHeader className="text-start">
               <div className='flex items-center justify-between gap-3'>
                  <CardTitle className="text-3xl font-normal">User Profile</CardTitle>
                  {isEditing ? (
                     <Button onClick={handleSave}>Save Changes</Button>
                  ) : (
                     <Button onClick={handleEdit}> <Edit2 /> Edit Profile</Button>
                  )}
               </div>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 relative flex items-center flex-col gap-4">

                     <div className="flex flex-col items-center mb-6">
                        <div onClick={handleProfileClick} className="cursor-pointer hover:bg-gray-400 hover:bg-opacity-25 transition-all w-32 h-32 rounded-full border border-primary flex items-center justify-center overflow-hidden">
                           {profile ? (
                              <img className="object-cover w-full h-full" src={URL.createObjectURL(profile)} />
                           ) : (
                              <User className="h-8 w-8 text-gray-400" />
                           )}
                        </div>
                        <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={handleImageChange} />
                        <Button onClick={uploadPhoto} type="button" variant="outline" className="mt-4 bg-white">Upload Photo</Button>
                     </div>
                     <Badge className="absolute right-0 opacity-55">{user?.user_type}</Badge>
                  </div>
                  <div className="flex-grow">
                     <div className="space-y-4">
                        <div className='bg-white rounded-[8px] space-y-1.5 p-3'>
                           <label className="text-base font-normal text-title">Full Name</label>
                           <Input
                              name="full_name"
                              value={isEditing ? editedUser.full_name : user.full_name}
                              onChange={handleChange}
                              disabled={!isEditing}
                           />
                        </div>
                        <div className='bg-white rounded-[8px] space-y-1.5 p-3'>
                           <label className="text-base font-normal text-title">Email</label>
                           <Input
                              name="email"
                              value={isEditing ? editedUser.email : user.email}
                              onChange={handleChange}
                              disabled={!isEditing}
                           />
                        </div>
                        <div className='bg-white rounded-[8px] space-y-1.5 p-3'>
                           <label className="text-base font-normal text-title">User Type</label>
                           <Input value={user.user_type} disabled />
                        </div>

                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Profile;

