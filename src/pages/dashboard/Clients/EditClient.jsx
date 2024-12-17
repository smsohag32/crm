import { useEffect, useState } from "react";
import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useSearchClientQuery, useUpdateClientMutation } from "@/redux-store/api/clientsApi";
import { toast } from "sonner";
import SpouseSet from "@/pages/DealsContainer/SpouseSet";
import { SearchDropdown } from "@/components/dropdown/SearchDropdown";

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

const SelectField = ({ id, label, options, register, setValue, errors, defaultValue }) => (
   <div className="space-y-2">
      <label htmlFor={id} className="transition-all duration-300 text-base font-medium text-title peer-focus:text-blue-500">{label}</label>
      <Select
         defaultValue={defaultValue}
         onValueChange={(value) => setValue(id, value)}
      >
         <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={`Select ${label}`} />
         </SelectTrigger>
         <SelectContent>
            {options.map(option => (
               <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
         </SelectContent>
      </Select>
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]?.message}</p>}
   </div>
);

const EditClient = ({ isOpen, setOpen, refetch, clientDetails }) => {
   const [selectedSpouse, setSelectedSpouse] = useState("");
   const [updateClient, { isLoading }] = useUpdateClientMutation();
   const [searchValue, setSearchValue] = useState("")

   const { data: searchClient, isLoading: clientLoading } = useSearchClientQuery({
      search: searchValue?.toLowerCase(),
   });



   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
   } = useForm({
      mode: "onChange",
   });

   useEffect(() => {
      if (clientDetails) {
         reset({
            name: clientDetails.name || "",
            contact_number: clientDetails.contact_number || "",
            email: clientDetails.email || "",
            address: clientDetails.address || "",
            relationship_status: clientDetails.relationship_status || "",
            employment_status: clientDetails.employment_status || "",
            income: clientDetails.income || "",
            credit_score: clientDetails.credit_score || "",
         });
         setSelectedSpouse(clientDetails.spouse || "");
      }
   }, [clientDetails, reset]);

   const onSubmit = async (data) => {
      const id = clientDetails?.id;
      const newData = { spouse: selectedSpouse?.value, ...data };
      try {
         await updateClient({ newData, id }).unwrap();
         toast.success("Client updated successfully");
         reset()
         refetch();
         handleClose();
      } catch (error) {
         toast.error("Failed to update client");
      }
   };

   const handleClose = () => {
      setOpen(false);
   };
   const optionsData = searchClient?.results?.map(item => ({
      label: item.name,
      value: item?.id,
   })) || []




   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size="700px" title="Edit Client">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <InputField
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Enter full name"
                  register={register}
                  validationRules={{ required: "Name is required" }}
                  errors={errors}
               />

               <InputField
                  id="contact_number"
                  label="Contact Number"
                  type="text"
                  placeholder="Enter phone number"
                  register={register}
                  validationRules={{ required: "Contact number is required" }}
                  errors={errors}
               />

               <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  register={register}
                  validationRules={{
                     required: "Email is required",
                     pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                  }}
                  errors={errors}
               />

               <InputField
                  id="address"
                  label="Address"
                  type="text"
                  placeholder="Enter address"
                  register={register}
                  validationRules={{ required: "Address is required" }}
                  errors={errors}
               />


               <SelectField
                  id="relationship_status"
                  label="Relationship Status"
                  options={[
                     { value: "single", label: "Single" },
                     { value: "married", label: "Married" },
                     { value: "divorced", label: "Divorced" },
                     { value: "widowed", label: "Widowed" },
                     { value: "separated", label: "Separated" },
                     { value: "other", label: "Other" },
                  ]}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  defaultValue={clientDetails?.relationship_status}
               />

               <div className="space-y-2">
                  <label htmlFor="spouse" className="text-base font-medium text-title">Spouse <span className="text-des text-sm">({(clientDetails?.spouse)})</span></label>
                  <div className="w-full">
                     <SearchDropdown
                        placeholder={"Search ..."}
                        className="w-full"
                        value={selectedSpouse}
                        setValue={setSelectedSpouse}
                        optionData={optionsData}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                     />
                  </div>
               </div>

               <SelectField
                  id="employment_status"
                  label="Employment Status"
                  options={[
                     { value: "student", label: "Student" },
                     { value: "businessman", label: "Businessman" },
                     { value: "employee", label: "Employee" },
                     { value: "self_employed", label: "Self-employed" },
                     { value: "unemployed", label: "Unemployed" },
                     { value: "retired", label: "Retired" },
                     { value: "other", label: "Other" },
                  ]}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  defaultValue={clientDetails?.employment_status}
               />

               <InputField
                  id="income"
                  label="Income"
                  type="number"
                  placeholder="Enter income"
                  register={register}
                  validationRules={{ required: "Income is required" }}
                  errors={errors}
               />

               <InputField
                  id="credit_score"
                  label="Credit Score"
                  type="number"
                  placeholder="Enter credit score"
                  register={register}
                  validationRules={{
                     required: "Credit score is required",
                     pattern: {
                        value: /^\d{1,3}(\.\d+)?$/,
                        message: "Ensure that there are no more than 3 digits before the decimal point."
                     }
                  }}
                  errors={errors}
               />
            </div>
            <div className="flex justify-end space-x-4 mt-8">
               <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
               <Button type="submit" disabled={!isValid}>Submit</Button>
            </div>
         </form>
      </CmModal>
   );
};

export default EditClient;
