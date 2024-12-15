

import { useState } from "react";
import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { useForm } from "react-hook-form";
import { User2, Phone, Mail, Home, DollarSign, PieChart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import { useSearchClientQuery } from "@/redux-store/api/clientsApi";
import { SearchDropdown } from "@/components/dropdown/SearchDropdown";

const AddClient = ({ isOpen, setOpen, refetch }) => {
   const [selectedSpouse, setSelectedSpouse] = useState("")
   const [spouseData, setSpouseData] = useState([])
   const [step, setStep] = useState(1);
   const totalSteps = 4;
   const [searchValue, setSearchValue] = useState("")

   const { data: searchClient, isLoading: clientLoading } = useSearchClientQuery({
      search: searchValue,
   });

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      watch,
   } = useForm({ mode: "onChange" });

   const onSubmit = (data) => {
      console.log(data);
      reset();
      setOpen(false);
   };

   const handleClose = () => {
      setOpen(false);
      setStep(1);
      reset();
   };

   const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


   const optionsData = searchClient?.results?.map(item => ({
      label: item.name,
      value: item.name,
   })) || [];




   const renderStep = () => {
      switch (step) {
         case 1:
            return (
               <>
                  <div className="space-y-4">
                     <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-100 rounded-full p-4">
                           <User2 size={40} className="text-blue-600" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <CrmInput
                           id="name"
                           placeholder="Enter full name"
                           label="Name"
                           type="text"
                           className={`primary-input ${errors.name ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all duration-300 text-base ${errors.name ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("name", { required: "Name is required" })}
                        />

                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <CrmInput
                           id="contact_number"
                           label="Contact Number"
                           type="text"
                           placeholder="Enter phone number"
                           className={`primary-input ${errors.contact_number ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all  duration-300 text-base ${errors.contact_number ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("contact_number", { required: "Contact number is required" })}
                        />
                        {errors.contact_number && <p className="text-red-500 text-xs mt-1">{errors.contact_number.message}</p>}
                     </div>

                     <div className="space-y-2">
                        <CrmInput
                           id="email"
                           label="Email"
                           type="email"
                           placeholder="Enter email address"
                           className={`primary-input ${errors.email ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all  duration-300 text-base ${errors.email ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("email", {
                              required: "Email is required",
                              pattern: {
                                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                 message: "Invalid email",
                              },
                           })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                     </div>
                  </div>
               </>
            );
         case 2:
            return (
               <>
                  <div className="space-y-4">

                     <div className="space-y-2">
                        <CrmInput
                           id="address"
                           label="Address"
                           placeholder="Enter address"
                           type="text"
                           className={`primary-input ${errors.address ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all  duration-300 text-base ${errors.address ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("address", { required: "Address is required" })}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                     </div>

                     <div className="space-y-2">
                        <p className="text-base font-medium text-title">Relationship Status</p>
                        <CustomDropdown
                           title={"Select"}
                           options={spouseData}
                           selectedValue={selectedSpouse}
                           onSelect={setSelectedSpouse}
                        />
                     </div>

                     <div className="space-y-2">
                        <p className="text-base font-medium text-title">Spouse</p>
                        <div className="w-full">
                           <SearchDropdown
                              placeHolder={"Search client..."}
                              className="w-full"
                              value={searchValue}
                              setValue={setSearchValue}
                              optionData={optionsData}
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-base font-medium text-title">Employment Status</p>
                        <CustomDropdown
                           title={"Select"}
                           options={spouseData}
                           selectedValue={selectedSpouse}
                           onSelect={setSelectedSpouse}
                        />
                     </div>
                  </div>
               </>
            );
         case 3:
            return (
               <>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <CrmInput
                           id="income"
                           label="Income"
                           type="number"
                           placeholder="Enter income"
                           step="0.01"
                           className={`primary-input ${errors.income ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all  duration-300 text-base ${errors.income ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("income", { required: "Income is required" })}
                        />
                        {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <CrmInput
                           id="credit_score"
                           label="Credit Score"
                           type="number"
                           placeholder="Enter score"
                           step="0.01"
                           className={`primary-input ${errors.credit_score ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                           labelClassName={`transition-all  duration-300 text-base ${errors.credit_score ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                           {...register("credit_score", { required: "Credit score is required" })}
                        />
                        {errors.credit_score && <p className="text-red-500 text-xs mt-1">{errors.credit_score.message}</p>}
                     </div>
                  </div>
               </>
            );
         case 4:
            return (
               <>
                  <div className="space-y-4">
                     <div className="flex items-center justify-center mb-6">
                        <div className="bg-purple-100 rounded-full p-4">
                           <User2 size={40} className="text-purple-600" />
                        </div>
                     </div>
                     <h3 className="text-lg font-medium text-start mb-4">Review Your Information</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {Object.entries(watch()).map(([key, value]) => (
                           <div key={key} className="flex flex-col">
                              <span className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                              <span className="font-medium">{value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </>
            );
         default:
            return null;
      }
   };

   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"700px"} title={"Add New Client"}>
         <Progress value={(step / totalSteps) * 100} className="w-full -mt-6 h-2" />
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">


            {renderStep()}

            <div className="flex justify-between space-x-4 mt-8">
               {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                     <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
               )}
               {step < totalSteps && (
                  <Button type="button" onClick={nextStep} disabled={!isValid}>
                     Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
               )}
               {step === totalSteps && <Button type="submit">Submit</Button>}
            </div>
         </form>
      </CmModal>
   );
};

export default AddClient;



