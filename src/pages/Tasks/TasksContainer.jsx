import CustomPagination from "@/components/pagination/CustomPagination";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { BadgePlus, ClipboardCheck, Filter, Plus } from "lucide-react";
import { useState } from "react";
import AddTask from "./AddTask";
import { SearchDropdown } from "@/components/dropdown/SearchDropdown";

const TasksContainer = () => {
   const [isAdd, setIsAdd] = useState(false)
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage] = useState(2);
   const [searchValue, setSearchValue] = useState("");
   const [selectedOption, setSelectedOption] = useState(null);
   

   const handleSelect = (value) => {
      setSelectedOption(value);
      console.log("Selected:", value);
   };


   const [taskData, setTaskData] = useState([
      {
         id: 1,
         taskName: "Follow up with client",
         comments: "Discuss project requirements and deadlines.",
         date: "2024-12-01",
         assignedTo: "Marketing Team",
         deals: "Website Redesign",
         user: "John Doe",
         status: "Pending",
      },
      {
         id: 2,
         taskName: "Prepare sales presentation",
         comments: "Focus on Q4 performance and upcoming targets.",
         date: "2024-11-30",
         assignedTo: "Sales Team",
         deals: "E-commerce Platform",
         user: "Jane Smith",
         status: "In Progress",
      },
      {
         id: 3,
         taskName: "Submit budget report",
         comments: "Highlight increased expenditure on advertising.",
         date: "2024-12-05",
         assignedTo: "Finance Team",
         deals: "Ad Campaign",
         user: "Emily White",
         status: "Completed",
      },
      {
         id: 4,
         taskName: "Review client feedback",
         comments: "Compile responses from the survey.",
         date: "2024-12-03",
         assignedTo: "Support Team",
         deals: "Customer Retention",
         user: "Michael Brown",
         status: "Pending",
      },
      {
         id: 5,
         taskName: "Draft contract proposal",
         comments: "Include terms discussed in the last meeting.",
         date: "2024-12-10",
         assignedTo: "Legal Team",
         deals: "Enterprise Solution",
         user: "Sophia Green",
         status: "In Progress",
      },
   ]);

   const totalPages = Math.ceil(taskData.length / itemsPerPage);

   // Calculate the paginated data
   const paginatedTasks = taskData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };


   const optionsData = []
   return (
      <div>
         <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
            <h2 className="flex text-des text-[20px] items-center font-medium gap-2">
               <ClipboardCheck className="text-des" /> Tasks
            </h2>
            <div className="flex items-center gap-2">
               <div className="w-full">
                  <SearchDropdown
                     placeHolder={"Search deals..."}
                     className="w-full"
                     value={searchValue}
                     setValue={setSearchValue}
                     optionData={optionsData}
                  />
               </div>
               <Button onClick={() => setIsAdd(true)} className="flex items-center text-sm px-2.5 !py-2.5 gap-2">
                  <BadgePlus size={16} /> Add New
               </Button>
            </div>
         </div>
         <div className="w-full mt-4 flex flex-col">
            <div className=" h-[68vh] min-w-full relative overflow-y-auto overflow-x-auto">
               <table className="overflow-auto border-0 m-0 w-full min-w-full">
                  <thead className="rounded-md border-none uppercase font-[500] text-center">
                     <tr className="border-none bg-[#4980ce23] shadow-sm backdrop-blur   rounded-md text-[14px] font-[400]">
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Name</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Comments</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Due Date</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41] whitespace-nowrap">Assigned to Deal</th>
                        <th className="px-6 py-2 text-center font-medium text-[#3b3d41] whitespace-nowrap">Assigned to User</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Status</th>
                        <th className="px-6 py-2 text-center font-medium text-[#3b3d41]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="bg-white">
                     {paginatedTasks && paginatedTasks?.map((data, index) => (
                        <tr
                           key={data.id}
                           className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]"
                        >

                           <td className="px-6 py-3 text-base whitespace-nowrap font-medium text-[#6B6B6B] text-start">
                              {data?.taskName}
                           </td>
                           <td className="px-6 py-3 text-base max-w-sm font-medium text-[#6B6B6B] text-start">
                              <p className="line-clamp-1 "> {data?.comments || "Not Set"}</p>
                           </td>
                           <td className="px-6 py-3 text-sm font-medium   text-des text-start">
                              <div className="flex items-center justify-center gap-2  h-full">
                                 <p className="whitespace-nowrap">{data?.date}</p> <p className="text-des bg-des bg-opacity-20 px-2 rounded-sm p"> {data?.labels || "Overdue"}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <div className="flex items-center gap-2">
                                 <UserAvatar className="h-8 w-8 border border-title border-opacity-50" name={data?.user} photo={data?.imagePath} />
                                 <p className="whitespace-nowrap line-clamp-1">{data?.user}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <div className="flex items-center gap-2">
                                 <UserAvatar className="h-8 w-8 border border-title border-opacity-50" name={data?.user} photo={data?.imagePath} />
                                 <p className="whitespace-nowrap line-clamp-1">{data?.user}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <p
                                 className={`whitespace-nowrap text-sm px-2 rounded-sm ${data?.status === "Pending"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : data?.status === "In Progress"
                                       ? "bg-blue-200 text-blue-800"
                                       : data?.status === "Completed"
                                          ? "bg-green-200 text-green-800"
                                          : "bg-gray-200 text-gray-800"
                                    }`}
                              >
                                 {data?.status || "Ongoing"}
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
               totalData={taskData?.length || 0}
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
            />
         </div>
         <AddTask isOpen={isAdd} setOpen={setIsAdd} />
      </div>
   );
};

export default TasksContainer;
