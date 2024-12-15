import React, { useState } from 'react';
import { useGetProfileQuery } from "@/redux-store/api/usersApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
   const { data: user, isLoading, isError } = useGetProfileQuery();
   const [isEditing, setIsEditing] = useState(false);
   const [editedUser, setEditedUser] = useState({});

   if (isLoading) return <div>Loading...</div>;
   if (isError) return <div>Error loading profile</div>;

   const handleEdit = () => {
      setIsEditing(true);
      setEditedUser(user);
   };

   const handleSave = () => {
      // Implement save logic here
      setIsEditing(false);
   };

   const handleChange = (e) => {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
   };

   return (
      <div className=" pt-2 pb-6">
         <Card className="bg-transparent">
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
                     <Avatar className="w-32 h-32 bg-blue-100 rounded-sm mx-auto">
                        <AvatarImage src={user.image || '/placeholder.svg?height=128&width=128'} alt={user.full_name} />
                        <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <Badge className="absolute right-0 opacity-55">{user?.user_type}</Badge>
                  </div>
                  <div className="flex-grow">
                     <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full bg-transparent max-w-sm grid-cols-2">
                           <TabsTrigger className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none" value="profile">Profile</TabsTrigger>
                           <TabsTrigger className="flex shadow-none items-center gap-2 py-5 text-black border-transparent hover:text-blue-600 hover:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:rounded-none" value="security">Security</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
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
                        </TabsContent>
                        <TabsContent value="security">
                           <div className="space-y-4">
                              <div>
                                 <label className="text-base font-normal text-title">Current Password</label>
                                 <Input type="password" name="currentPassword" />
                              </div>
                              <div>
                                 <label className="text-base font-normal text-title">New Password</label>
                                 <Input type="password" name="newPassword" />
                              </div>
                              <div>
                                 <label className="text-base font-normal text-title">Confirm New Password</label>
                                 <Input type="password" name="confirmNewPassword" />
                              </div>
                              <Button>Change Password</Button>
                           </div>
                        </TabsContent>
                     </Tabs>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Profile;

