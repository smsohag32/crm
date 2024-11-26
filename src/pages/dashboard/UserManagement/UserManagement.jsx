import CustomPagination from "@/components/pagination/CustomPagination";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { BadgePlus, ClipboardCheck, Filter, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";

const UserManagement = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(3);

   const usersData = [
      {
         id: 1,
         user: "John Doe",
         type: "Admin",
         status: "Active",
         permission: ["Full Access", "Manage Users", "Edit Settings"],
         photo: "https://via.placeholder.com/150",
      },
      {
         id: 2,
         user: "Jane Smith",
         type: "Editor",
         status: "Inactive",
         permission: ["Content Editing", "Manage Posts"],
         photo: "https://via.placeholder.com/150",
      },
      {
         id: 3,
         user: "Emily White",
         type: "Viewer",
         status: "Active",
         permission: ["Read-Only"],
         photo: "https://via.placeholder.com/150",
      },
      {
         id: 4,
         user: "Michael Brown",
         type: "Contributor",
         status: "Pending",
         permission: ["Limited Access", "Submit Content"],
         photo: "https://via.placeholder.com/150",
      },
      {
         id: 5,
         user: "Sophia Green",
         type: "Admin",
         status: "Active",
         permission: ["Full Access", "Manage Users"],
         photo: "https://via.placeholder.com/150",
      },
   ];


   const totalPages = Math.ceil(usersData.length / itemsPerPage);

   // Calculate the paginated data
   const paginatedUsers = usersData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <UserCheck className="text-des" /> User Management
            </h2>
            <div className="flex items-center gap-2">
               <Button variant="outline" className="flex items-center text-sm px-2.5 gap-2">
                  <Filter size={16} />Filters
               </Button>
               <Button size="sm" className="flex items-center text-sm px-2.5 !py-1.5 gap-2">
                  <UserPlus size={16} /> Add New
               </Button>
            </div>
         </div>
         <div className="w-full mt-4 flex flex-col">
            <div className="h-[68vh] min-w-full relative overflow-y-auto overflow-x-auto">
               <table className="overflow-auto border-0 m-0 w-full min-w-full">
                  <thead className="rounded-md border-none uppercase font-[500] text-center">
                     <tr className="border-none bg-[#4980ce23] shadow-sm backdrop-blur text-[14px] font-[400]">
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Name</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">User Type</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Permission</th>
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
                                    name={user.user}
                                    photo={user.photo}
                                 />
                                 <p className="whitespace-nowrap line-clamp-1">{user.user}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <p className="whitespace-nowrap">{user.type}</p>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-center">
                              <HoverCard>
                                 <HoverCardTrigger asChild>
                                    <div className="flex flex-wrap gap-2 justify-start">
                                       {user.permission.slice(0, 2).map((perm, index) => (
                                          <span
                                             key={index}
                                             className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300"
                                          >
                                             {perm}
                                          </span>
                                       ))}
                                       {user.permission.length > 2 && (
                                          <span
                                             className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-300"
                                          >
                                             +{user.permission.length - 2} more
                                          </span>
                                       )}
                                    </div>
                                 </HoverCardTrigger>
                                 <HoverCardContent className="w-80 p-4 bg-white shadow-md rounded-md">
                                    <h4 className="text-sm text-start font-medium text-title mb-3">Permissions</h4>
                                    <div className="flex flex-wrap gap-2">
                                       {user.permission.map((perm, index) => (
                                          <span
                                             key={index}
                                             className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300"
                                          >
                                             {perm}
                                          </span>
                                       ))}
                                    </div>
                                 </HoverCardContent>
                              </HoverCard>
                           </td>


                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <p
                                 className={`whitespace-nowrap text-sm px-2 rounded-sm ${user.status === "Active"
                                    ? "bg-green-200 text-green-800"
                                    : user.status === "Inactive"
                                       ? "bg-red-200 text-red-800"
                                       : user.status === "Pending"
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-gray-200 text-gray-800"
                                    }`}
                              >
                                 {user.status}
                              </p>
                           </td>
                           <td className="px-6 py-3 text-center">
                              <Button
                                 variant="ghost"
                                 type="button"
                                 className="px-3 py-2 rounded-[8px]"
                              >
                                 <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <CustomPagination
               totalData={usersData.length}
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
            />
         </div>
      </div>
   );
};

export default UserManagement;
