import CustomPagination from "@/components/pagination/CustomPagination";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { BadgePlus, Pencil, Trash, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import AddUser from "./AddUser";
import { useGetUsersQuery } from "@/redux-store/api/usersApi";
import { Badge } from "@/components/ui/badge";
import SearchInput from "@/components/SearchBox/SearchInput";

const UserManagement = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(3);
   const [isAdd, setIsAdd] = useState(false);
   const { data: usersData = [], isLoading } = useGetUsersQuery();
   const [searchText, setSearchText] = useState("");

   // Filter users based on search text
   const filteredUsers = usersData.filter((user) =>
      user.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.user_type?.toLowerCase().includes(searchText.toLowerCase())
   );

   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

   // Paginate filtered users
   const paginatedUsers = filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   const handleSearch = (value) => {
      setSearchText(value);
      setCurrentPage(1); // Reset to first page when searching
   };

   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <UserCheck className="text-des" /> User Management
            </h2>
            <div className="flex items-center gap-2">
               <div className="w-full lg:max-w-sm">
                  <SearchInput handleSearch={handleSearch} />
               </div>
               <Button
                  onClick={() => setIsAdd(true)}

                  className="flex items-center  !text-sm px-2.5 !py-2.5 gap-2"
               >
                  <UserPlus size={16} /> Add New
               </Button>
            </div>
         </div>

         <div className="w-full mt-4 flex flex-col">
            <div className="h-[68vh] min-w-full relative overflow-y-auto overflow-x-auto">
               {isLoading ? (
                  <p className="text-center mt-4">Loading...</p>
               ) : paginatedUsers.length > 0 ? (
                  <table className="overflow-auto border-0 m-0 w-full min-w-full">
                     <thead className="rounded-md border-none uppercase font-[500] text-center">
                        <tr className="border-none bg-[#4980ce23] shadow-sm backdrop-blur text-[14px] font-[400]">
                           <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Name</th>
                           <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Email</th>
                           <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">User Type</th>
                           <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Status</th>
                           <th className="px-6 py-2 text-center font-medium text-[#3b3d41]">Action</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white">
                        {paginatedUsers.map((user) => (
                           <tr
                              key={user.id}
                              className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]"
                           >
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="flex items-center gap-2">
                                    <UserAvatar
                                       className="h-8 w-8 border border-title border-opacity-50"
                                       name={user.full_name}
                                       photo={user?.image}
                                    />
                                    <p className="whitespace-nowrap line-clamp-1">
                                       {user?.full_name}
                                    </p>
                                 </div>
                              </td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <p className="whitespace-nowrap">{user?.email || "No Data"}</p>
                              </td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <Badge className="whitespace-nowrap">{user?.user_type}</Badge>
                              </td>

                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <p
                                    className={`whitespace-nowrap text-sm rounded-sm ${user.status === "Active"
                                       ? " text-green-800"
                                       : user.status === "Inactive"
                                          ? " text-red-800"
                                          : user.status === "Pending"
                                             ? " text-yellow-800"
                                             : " text-green-800"
                                       }`}
                                 >
                                    Active
                                 </p>
                              </td>
                              <td className="px-6 py-3 text-center flex items-center justify-center">
                                 <div className="flex gap-2">
                                    <Button
                                       variant="secondary"
                                       size="sm"
                                       className=" text-blue-600 hover:bg-blue-50"
                                    >
                                       <Pencil className="h-4 w-4 mr-2" />
                                       Edit
                                    </Button>
                                    <Button
                                       variant="destructive"
                                       size="sm"
                                       className="bg-red-500 hover:bg-red-600"
                                    >
                                       <Trash className="h-4 w-4 mr-2" />
                                       Delete
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <p className="text-center mt-4">No users found</p>
               )}
            </div>

            <CustomPagination
               totalData={filteredUsers.length}
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
            />
         </div>

         <AddUser isOpen={isAdd} setOpen={setIsAdd} />
      </div>
   );
};

export default UserManagement;
