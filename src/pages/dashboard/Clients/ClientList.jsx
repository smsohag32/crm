import CustomPagination from "@/components/pagination/CustomPagination";
import SearchInput from "@/components/SearchBox/SearchInput";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import AddClient from "@/pages/DealsContainer/AddClient";
import { Filter, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";

const ClientList = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(3);
   const [isAdd, setIsAdd] = useState(false)
   const clients = [
      {
         id: 10,
         name: "Asib",
         contact_number: "4653445",
         email: "asib@gmail.com",
         address: "Bashundhara Residential Area, Block -D, Road-4, House - 58,Flat - 6A",
         relationship_status: "single",
         employment_status: "Student",
         income: "5000.00",
         credit_score: "12.50",
         spouse: null,
         created_at: "11-12-2024 11:35AM",
      },
      {
         id: 3,
         name: "Talha Anik",
         contact_number: "01710737985",
         email: "aniktalha@gmail.com",
         address: "Bashundhara Residential Area, Block -D, Road-4, House - 58,Flat - 6A",
         relationship_status: "married",
         employment_status: "Job",
         income: "5000.00",
         credit_score: "110.00",
         spouse: "Mikasa Ackerman",
         created_at: "11-12-2024 11:27AM",
      },
      // Add all other clients here...
   ];

   const totalPages = Math.ceil(clients.length / itemsPerPage);

   // Calculate the paginated data
   const paginatedUsers = clients.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   const handleSearch = (e) => {
      console.log(e)
   }
   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <UserCheck className="text-des" /> Client List
            </h2>
            <div className="flex items-center gap-2">
               <div className="w-full lg:max-w-sm">
                  <SearchInput handleSearch={handleSearch} />
               </div>
               <Button onClick={() => setIsAdd(true)} size="" className="flex items-center text-sm px-2.5 !py-1.5 gap-2">
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
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Contact Number</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Address</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Income</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Credit Score</th>
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
                              <div className="flex items-center gap-3">
                                 <UserAvatar
                                    className="h-8 w-8 border border-title border-opacity-50"
                                    name={user.user}
                                    photo={user.photo}
                                 />
                                 <div>
                                    <p className="whitespace-nowrap line-clamp-1 text-title text-base">{user?.name}</p>
                                    <p className="whitespace-nowrap text-des text-sm line-clamp-1">{user?.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              {user?.contact_number}
                           </td>
                           <td className="px-6 py-3  text-base font-medium text-[#6B6B6B] text-start">
                              <div className="max-w-[280px]">
                                 <p className="line-clamp-2">  {user?.address}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              ${user?.income}
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              {user?.credit_score}
                           </td>
                           <td className="px-6 py-3 text-center">
                              <Button
                                 variant="ghost"
                                 type="button"
                                 className="px-3 py-2 rounded-[8px]"
                              >
                                 View
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <CustomPagination
               totalData={clients.length}
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
            />
         </div>
         <AddClient isOpen={isAdd} setOpen={setIsAdd} />

      </div>
   );
};

export default ClientList;
