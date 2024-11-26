import Empty from "@/components/Empty/Empty";
import SearchInput from "@/components/SearchBox/SearchInput";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar/UserAvatar";

import { ContactRound, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import AddContact from "./AddContact";

const ListOfContacts = () => {
   const [isOpen, setOpen] = useState(false)
   const [contactData, setContactData] = useState([
      {
         id: 1,
         name: "John Doe",
         email: "johndoe@example.com",
         contact: "+1 234 567 890",
         image: "https://via.placeholder.com/50",
         labels: "CLIENT", // Labels as a string
      },
      {
         id: 2,
         name: "Jane Smith",
         email: "janesmith@example.com",
         contact: "+1 987 654 321",
         image: "https://via.placeholder.com/50",
         labels: "CLIENT",
      },
      {
         id: 3,
         name: "Alice Johnson",
         email: "alicej@example.com",
         contact: "+1 555 123 456",
         image: "https://via.placeholder.com/50",
         labels: "CLIENT",
      },
      {
         id: 4,
         name: "Bob Brown",
         email: "bobbrown@example.com",
         contact: "+1 222 333 444",
         image: "https://via.placeholder.com/50",
         labels: "Loyal Customer",
      },
      {
         id: 5,
         name: "Emma Davis",
         email: "emmadavis@example.com",
         contact: "+1 777 888 999",
         image: "https://via.placeholder.com/50",
         labels: "VIP",
      },
   ]);

   const handleDetail = () => {

   }

   return (
      <div>
         <div className="flex lg:items-center gap-4 flex-col lg:flex-row justify-between w-full">
            <h2 className="text-[24px] text-des flex items-center gap-2">
               <ContactRound /> Contacts List
            </h2>
            <div className="flex lg:items-center flex-col lg:flex-row gap-6">
               <SearchInput />
               <Button onClick={() => setOpen(true)} className="max-w-[140px] gap-1 text-sm">
                  <PlusCircle size={15} /> Add new
               </Button>
            </div>
         </div>

         <div className="w-full mt-4 flex flex-col">
            <div className=" h-[68vh] min-w-full relative overflow-y-auto overflow-x-auto">
               <table className="overflow-auto border-0 m-0 w-full min-w-full">
                  <thead className="rounded-md border-none uppercase font-[500] text-center">
                     <tr className="border-none bg-[#4980ce23] shadow-sm backdrop-blur   rounded-md text-[14px] font-[400]">
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Name</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Phone</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Email</th>
                        <th className="px-6 py-2 text-start font-medium text-[#3b3d41]">Label</th>
                        <th className="px-6 py-2 text-center font-medium text-[#3b3d41]">Action</th>
                     </tr>
                  </thead>
                  <tbody className="bg-white">
                     {contactData?.map((data, index) => (
                        <tr
                           key={data.id}
                           className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]"
                        >
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              <div className="flex items-center gap-2">
                                 <UserAvatar name={data?.name} photo={data?.imagePath} />
                                 <p>{data.name}</p>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-base whitespace-nowrap font-medium text-[#6B6B6B] text-start">
                              {data.contact}
                           </td>
                           <td className="px-6 py-3 text-base font-medium text-[#6B6B6B] text-start">
                              {data?.email || "Not Set"}
                           </td>
                           <td className="px-6 py-3 text-sm font-medium flex items-start text-des text-start">
                              <p className="text-des bg-des bg-opacity-20 px-2 rounded-sm p"> {data?.labels || "Not Set"}</p>
                           </td>

                           <td className="px-6 py-3 text-center">
                              <Button
                                 variant="ghost"
                                 type="button"
                                 onClick={() => handleDetail(data)}
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

         </div>


         <AddContact isOpen={isOpen} setOpen={setOpen} />
      </div>
   );
};

export default ListOfContacts;
