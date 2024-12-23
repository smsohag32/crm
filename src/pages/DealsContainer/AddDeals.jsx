import { useState, useCallback } from "react";
import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAddDealClientMutation, useDealAssignMutation, usePostDealMutation } from "@/redux-store/api/dealsApi";
import { useGetUsersQuery } from "@/redux-store/api/usersApi";
import { useGetAllClientsQuery, useSearchClientQuery } from "@/redux-store/api/clientsApi";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { formatName } from "@/utils/helper";
import { Checkbox } from "@/components/ui/checkbox";
import NextButton from "@/components/ui/next-button";

// Reusable Input Field Component (unchanged)
const InputField = ({ id, label, type, placeholder, register, validationRules, errors }) => (
   <div className="space-y-2">
      <CrmInput
         id={id}
         placeholder={placeholder}
         label={label}
         type={type}
         className={`primary-input ${errors[id] ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
         labelClassName={`transition-all duration-300 text-base ${errors[id] ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
         {...register(id, validationRules)}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]?.message}</p>}
   </div>
);

// Reusable Select Field Component (unchanged)
const SelectField = ({ id, label, options, register, setValue, errors }) => (
   <div className="space-y-2">
      <label htmlFor={id} className="transition-all duration-300 text-base font-medium text-title peer-focus:text-blue-500">
         {label}
      </label>
      <Select {...register(id)} onValueChange={(value) => setValue(id, value)}>
         <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={`Select ${label}`} />
         </SelectTrigger>
         <SelectContent>
            {options.map((option) => (
               <SelectItem key={option.value} value={option.value}>
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]?.message}</p>}
   </div>
);

export const AssignMember = ({ users = [], selectedMembers, setSelectedMembers }) => {
   const [open, setOpen] = useState(false);
   const [searchValue, setSearchValue] = useState("");

   const filteredUsers = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchValue.toLowerCase())
   );

   return (
      <div className="space-y-0.5">
         <Input
            type="text"
            placeholder="Search User..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-2 bg-white  border rounded"
         />
         <ScrollArea className="h-[200px] py-1  bg-white">
            {filteredUsers?.map((user) => (
               <div key={user.id} className="flex hover: items-center space-x-2 p-2 hover:bg-slate-100">
                  <Checkbox
                     type="button"
                     className="h-5 w-5"
                     id={`user-${user.id}`}
                     checked={selectedMembers.includes(user)}
                     onCheckedChange={() => {
                        if (selectedMembers.includes(user)) {
                           setSelectedMembers(selectedMembers.filter((c) => c.id !== user.id));
                        } else {
                           setSelectedMembers([...selectedMembers, user]);
                        }
                     }}
                  />
                  <label htmlFor={`user-${user?.id}`} className="flex  w-full items-center gap-3 cursor-pointer">{user?.full_name}</label>
               </div>
            ))
            }
         </ScrollArea >
      </div >
   );
};

// New ClientSelector component
const ClientSelector = ({ clients, clientsData: allClients, selectedClients, setSearchText, searchText, setSelectedClients }) => {
   return (
      <div className="space-y-0.5">
         <Input
            type="text"
            placeholder="Search clients..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 bg-white  border rounded"
         />
         <ScrollArea className="h-[200px] py-1  bg-white">
            {clients?.map((client) => (
               <div key={client.id} className="flex hover: items-center space-x-2 p-2 hover:bg-slate-100">
                  <Checkbox
                     type="button"
                     className="h-5 w-5"
                     id={`client-${client.id}`}
                     checked={selectedClients.includes(client)}
                     onCheckedChange={() => {
                        if (selectedClients.includes(client)) {
                           setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
                        } else {
                           setSelectedClients([...selectedClients, client]);
                        }
                     }}
                  />
                  <label htmlFor={`client-${client.id}`} className="flex  w-full items-center gap-3 cursor-pointer">{client.name}</label>
               </div>
            ))
            }
         </ScrollArea >
      </div >
   );
};

// Stepper component
const Stepper = ({ currentStep, steps }) => (
   <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
         <div key={index} className="flex flex-col items-center">
            <div
               className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? "bg-blue-800 shadow-xl text-white" : "bg-gray-300"
                  }`}
            >
               {index + 1}
            </div>
            <span className="text-sm mt-2">{step}</span>
         </div>
      ))}
   </div>
);

const AddDeals = ({ isOpen, setOpen, refetch }) => {
   const [postDeal, { isLoading }] = usePostDealMutation();
   const { data: users, isLoading: userLoading } = useGetUsersQuery();
   const [searchText, setSearchText] = useState("")
   const { data: clients, isLoading: clientLoading } = useSearchClientQuery({
      search: searchText,
   });
   const [dealAssign, { isLoading: assignLoading }] = useDealAssignMutation()
   const [addDealClient] = useAddDealClientMutation()


   const { data: clientData } = useGetAllClientsQuery()
   const [currentStep, setCurrentStep] = useState(0);
   const [selectedMembers, setSelectedMembers] = useState([]);
   const [selectedClients, setSelectedClients] = useState([]);

   console.log(clientData?.results)
   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
   } = useForm({ mode: "onChange" });

   const steps = ["Deal Information", "Assign Members", "Add Clients"];

   const onSubmit = async (data) => {
      try {
         const res = await postDeal(data).unwrap();
         if (res?.id) {
            toast.success("Deal added successfully.");
            handleClose();
            refetch();

            const dealData = {
               deal: res.id,
               user: selectedMembers?.map(mem => mem?.id) || []
            };
            const clientData = {
               clients: selectedClients?.map(c => c?.id) || []
            };

            try {
               await dealAssign({ ...dealData });
               toast.info("Deal assigned successfully.");
            } catch (assignError) {
               console.warn("Deal assign failed", assignError);
               toast.error("Deal assignment failed.");
            }

            try {
               await addDealClient({ dealId: res.id, clientData });
               toast.info("Clients added to deal successfully.");
            } catch (clientError) {
               console.warn("Add client to deal failed", clientError);
               toast.error("Failed to add clients to deal.");
            }
         }
      } catch (err) {
         console.error(err);
         toast.error("Failed to add deal.");
      }
   };

   const handleClose = () => {
      setOpen(false);
      reset();
      setCurrentStep(0);
      setSelectedMembers([]);
      setSelectedClients([]);
   };

   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

   const isStepValid = () => {
      if (currentStep === 0) {
         return isValid;
      }
      if (currentStep === 1) {
         return selectedMembers.length > 0;
      }
      if (currentStep === 2) {
         return selectedClients.length > 0;
      }
      return true;
   };



   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size="800px" title="Add New Deal">
         <Stepper currentStep={currentStep} steps={steps} />
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 0 && (
               <div className="space-y-4 pb-4">
                  <InputField
                     id="lender_name"
                     label="Lender Name"
                     type="text"
                     placeholder="Enter lender name"
                     register={register}
                     validationRules={{ required: "Lender name is required" }}
                     errors={errors}
                  />
                  <InputField
                     id="security_property_add"
                     label="Security Property Address"
                     type="text"
                     placeholder="Enter property address"
                     register={register}
                     validationRules={{ required: "Property address is required" }}
                     errors={errors}
                  />
                  <InputField
                     id="loan_amount"
                     label="Loan Amount"
                     type="number"
                     placeholder="Enter loan amount"
                     register={register}
                     validationRules={{ required: "Loan amount is required" }}
                     errors={errors}
                  />
                  <SelectField
                     id="deal_type"
                     label="Deal Type"
                     options={[
                        { value: "Purchase", label: "Purchase" },
                        { value: "Refine", label: "Refine" },
                        { value: "Construction", label: "Construction" },
                     ]}
                     register={register}
                     setValue={setValue}
                     errors={errors}
                  />
                  <SelectField
                     id="deal_stage"
                     label="Deal Stage"
                     options={[
                        { value: "Initial Application", label: "Initial Application" },
                        { value: "Submitted To Lender", label: "Submitted To Lender" },
                        { value: "Conditional Approval", label: "Conditional Approval" },
                        { value: "Final Approval", label: "Final Approval" },
                        { value: "Settlement", label: "Settlement" },
                        { value: "Post Settlement", label: "Post Settlement" },
                     ]}
                     register={register}
                     setValue={setValue}
                     errors={errors}
                  />
               </div>
            )}
            {currentStep === 1 && (
               <div className="space-y-4">
                  <h3 className="text-[24px] font-semibold">Assign Members</h3>
                  <AssignMember
                     users={users || []}
                     selectedMembers={selectedMembers}
                     setSelectedMembers={setSelectedMembers}
                  />
                  <div className="flex flex-wrap gap-2 mt-4">
                     {selectedMembers.map((member) => (
                        <Badge key={member.id} variant="secondary" className="bg-white text-des hover:bg-slate-50 py-2 gap-2 px-3">
                           <UserAvatar name={formatName(member?.full_name)} className="bg-slate-200" />
                           {member.full_name}
                           <button
                              type="button"
                              className="ml-2 text-lg text-red-600 flex items-center justify-center  rounded-full h-6 w-6  hover:text-white transition-all duration-100  hover:bg-red-500 p-1"
                              onClick={() => setSelectedMembers(selectedMembers.filter((c) => c.id !== member.id))}
                           >
                              ×
                           </button>
                        </Badge>
                     ))}
                  </div>
               </div>
            )}
            {currentStep === 2 && (
               <div className="space-y-4">
                  <h3 className="text-[24px] font-medium text-title">Add Clients</h3>
                  <ClientSelector
                     clientsData={clientData?.results}
                     searchText={searchText}
                     setSearchText={setSearchText}
                     clients={clients?.results || clientData?.results || []}
                     selectedClients={selectedClients}
                     setSelectedClients={setSelectedClients}
                  />
                  <div className="flex flex-wrap gap-2 mt-4">
                     {selectedClients.map((client) => (
                        <Badge key={client.id} variant="secondary" className="bg-white text-des hover:bg-slate-50 py-2 gap-2 px-3">
                           <UserAvatar name={formatName(client?.name)} className="bg-slate-200" />
                           {client.name}
                           <button
                              type="button"
                              className="ml-2 text-lg text-red-600 flex items-center justify-center  rounded-full h-6 w-6  hover:text-white transition-all duration-100  hover:bg-red-500 p-1"
                              onClick={() => setSelectedClients(selectedClients.filter((c) => c.id !== client.id))}
                           >
                              ×
                           </button>
                        </Badge>
                     ))}
                  </div>
               </div>
            )}
            <div className="flex justify-between space-x-4 mt-12">
               <Button type="button" variant="outline" className="bg-white" onClick={currentStep === 0 ? handleClose : prevStep}>
                  {currentStep === 0 ? "Cancel" : "Previous"}
               </Button>
               {currentStep < steps.length - 1 ? (
                  <NextButton
                     onClick={nextStep}
                     isLoading={false}
                     isDisabled={!isStepValid()}
                  />
               ) : (
                  <Button className="!px-6" disabled={!isValid || assignLoading || isLoading} type="submit">
                     Submit
                  </Button>
               )}
            </div>
         </form>
      </CmModal>
   );
};

export default AddDeals;

