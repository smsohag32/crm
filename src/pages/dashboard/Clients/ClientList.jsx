import SearchInput from "@/components/SearchBox/SearchInput";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar/UserAvatar";

import { ChevronLeft, ChevronRight, Edit3, EllipsisVertical, Eye, Trash2, UserCheck, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/Loading/Loading";
import { useDeleteClientMutation, useGetAllClientsQuery, useLazyGetClientsByPageQuery, useSearchClientQuery } from "@/redux-store/api/clientsApi";
import CrmAlert from "@/components/ui/alert";
import { toast } from "sonner";
import { SearchDropdown } from "@/components/dropdown/SearchDropdown";
import AddClient from "./AddClient";
import Empty from "@/components/Empty/Empty";

const ClientList = () => {
   const navigate = useNavigate()
   const [deleteClient, { isLoading: deleteLoading }] = useDeleteClientMutation()
   // State to toggle Add Client modal
   const [isAdd, setIsAdd] = useState(false);
   const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
   const [clientToDelete, setClientToDelete] = useState(null);
   // Pagination state to track next and previous URLs
   const [searchValue, setSearchValue] = useState("")

   const { data: searchClient, isLoading: clientLoading } = useSearchClientQuery({
      search: searchValue,
   });

   const [paginationUrls, setPaginationUrls] = useState({
      next: null,
      prev: null,
   });

   // Lazy query for paginated data fetching
   const [getClients, { isLoading: isFetching }] = useLazyGetClientsByPageQuery();

   // Current page data
   const [currentPageData, setCurrentPageData] = useState([]);

   // Fetch initial client data
   const { data: clients, isLoading: isInitialLoading, refetch } = useGetAllClientsQuery();

   useEffect(() => {
      if (searchValue.trim() === "") {
         setCurrentPageData(clients?.results || []);
      } else if (searchClient) {
         setCurrentPageData(searchClient.results || []);
      }
   }, [searchValue, searchClient, clients]);




   // Initialize state on initial load
   useEffect(() => {
      if (clients) {
         setCurrentPageData(clients.results);
         setPaginationUrls({
            next: clients.next,
            prev: clients.previous,
         });
      }
   }, [clients]);



   const handleNextPage = async () => {
      if (!paginationUrls.next) return;
      try {
         const data = await getClients(paginationUrls.next).unwrap();
         setCurrentPageData(data.results);
         setPaginationUrls({
            next: data.next,
            prev: data.previous,
         });
      } catch (error) {
         console.error("Error fetching next page:", error);
      }
   };

   const handleDeleteClick = (clientId) => {
      setClientToDelete(clientId);
      setIsDeleteAlertOpen(true);
   };



   // Fetch previous page
   const handlePrevPage = async () => {
      if (!paginationUrls.prev) return;
      try {
         const data = await getClients(paginationUrls.prev).unwrap();
         setCurrentPageData(data.results);
         setPaginationUrls({
            next: data.next,
            prev: data.previous,
         });
      } catch (error) {
         console.error("Error fetching previous page:", error);
      }
   };


   const handleEdit = () => console.log("Edit action triggered");
   const handleDeleteConfirm = async () => {
      try {
         console.log(`Deleting client with ID: ${clientToDelete}`);
         await deleteClient(clientToDelete).unwrap()
         toast.success("Client Deleted Successfully.")
         refetch()
         setIsDeleteAlertOpen(false);
         setClientToDelete(null);
      } catch {
         toast.error("Failed to Client Delete.")
      }

   };

   const handleDeleteCancel = () => {
      setIsDeleteAlertOpen(false);
      setClientToDelete(null);
   };


   const handleSearch = (e) => {
      setSearchValue(e)
   }
   return (
      <div>
         {/* Header Section */}
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <UserCheck className="text-des" /> Client List
            </h2>
            <div className="flex items-center gap-2">
               <div className="w-full">
                  <SearchInput handleSearch={handleSearch} />
               </div>
               <Button onClick={() => setIsAdd(true)} size="" className="flex items-center text-sm px-2.5 !py-1.5 gap-2">
                  <UserPlus size={16} /> Add New
               </Button>
            </div>
         </div>

         {/* Main Content */}
         <div className="w-full mt-4 flex flex-col">
            {isInitialLoading || isFetching || clientLoading ? (
               <Loading />
            ) : (
               currentPageData?.length > 0 ? <div className="min-w-full relative overflow-y-auto overflow-x-auto">
                  {/* Table */}
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
                        {currentPageData.map((user) => (
                           <tr key={user.id} className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]">
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="flex items-center gap-3">
                                    <UserAvatar className="h-8 w-8 border border-title border-opacity-50" name={user.user} photo={user.photo} />
                                    <div>
                                       <Link
                                          className="hover:underline transition-all text-title hover:!text-blue-800 duration-200"
                                          to={`/dashboard/client/${user?.id}`}
                                       >
                                          <p className="whitespace-nowrap line-clamp-1 text-base">{user?.name}</p>
                                       </Link>
                                       <p className="whitespace-nowrap text-des text-sm line-clamp-1">{user?.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">{user?.contact_number}</td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="max-w-[280px]">
                                    <p className="line-clamp-2">{user?.address}</p>
                                 </div>
                              </td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">${user?.income}</td>
                              <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">{user?.credit_score}</td>
                              <td className="px-6 py-3 text-center">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger className="active:border-none outline-none">
                                       <Button
                                          variant="outline"
                                          type="button"
                                          className="flex items-center justify-center px-3 py-2 rounded-[8px] hover:bg-gray-100 transition-colors"
                                       >
                                          <EllipsisVertical size={18} className="text-gray-600" />
                                       </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                       <DropdownMenuItem
                                          type="button"

                                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-md"
                                          onClick={() => navigate(`/dashboard/client/${user?.id}`)}
                                       >
                                          <Eye size={16} className="text-blue-500" />
                                          <span>View</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          type="button"
                                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-md"
                                          onClick={handleEdit}
                                       >
                                          <Edit3 size={16} className="text-green-500" />
                                          <span>Edit</span>
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          type="button"
                                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-md"
                                          onClick={() => handleDeleteClick(user.id)}
                                       >
                                          <Trash2 size={16} className="text-red-500" />
                                          <span>Delete</span>
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>

                                 </DropdownMenu>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  {/* Pagination Buttons */}
                  <div className="flex gap-6 justify-end p-7">
                     <Button
                        variant="outline"
                        onClick={handlePrevPage}
                        disabled={!paginationUrls.prev}
                        style={{ opacity: paginationUrls.prev ? 1 : 0.5 }}
                        className="flex items-center gap-2"
                     >
                        <ChevronLeft size={16} />
                        Previous
                     </Button>
                     <Button
                        variant="outline"
                        onClick={handleNextPage}
                        disabled={!paginationUrls.next}
                        style={{ opacity: paginationUrls.next ? 1 : 0.5 }}
                        className="flex items-center gap-2"
                     >
                        Next
                        <ChevronRight size={16} />
                     </Button>
                  </div>
               </div> : <Empty message={"Not found any data."} />
            )}
         </div>

         {/* Add Client Modal */}
         <AddClient isOpen={isAdd} clients={clients?.results} setOpen={setIsAdd} refetch={refetch} />
         <CrmAlert
            isOpen={isDeleteAlertOpen}
            message="Delete Client"
            description="Are you sure you want to delete this client? This action cannot be undone."
            handleClose={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
         />
      </div>
   );
};

export default ClientList;
