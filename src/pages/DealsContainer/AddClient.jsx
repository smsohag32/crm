import { useState } from "react";
import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { useForm } from "react-hook-form";
import { User2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SpouseSet from "./SpouseSet";
import { usePostClientMutation } from "@/redux-store/api/clientsApi";
import { toast } from "sonner";

// Reusable Input Field Component
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

// Reusable Select Field Component
const SelectField = ({ id, label, options, register, setValue, errors }) => (
   <div className="space-y-2">
      <label htmlFor={id} className="transition-all duration-300 text-base font-medium text-title peer-focus:text-blue-500">{label}</label>
      <Select {...register(id)} onValueChange={(value) => setValue(id, value)}>
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

const AddClient = ({ isOpen, setOpen, refetch }) => {
   const [selectedSpouse, setSelectedSpouse] = useState("");
   const [postClient, { isLoading }] = usePostClientMutation();
   const [step, setStep] = useState(1);
   const totalSteps = 4;

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      setError,
      watch,
   } = useForm({ mode: "onChange" });

   const onSubmit = async (data) => {
      try {
         const res = await postClient({ ...data }).unwrap();
         handleClose()
         refetch()
         toast.success("New Client added successfully.");
      } catch (err) {

         if (err.data) {
            const serverErrors = err.data; // Assuming your server response has the error structure like { email: [...] }

            // Show toast for the first error
            const firstErrorKey = Object.keys(serverErrors)[0]; // Get the first field with an error
            const firstErrorMessage = serverErrors[firstErrorKey].join(", ");
            toast.error(firstErrorMessage);

            // Iterate over the server errors and set them in the form
            Object.keys(serverErrors).forEach((key) => {
               // For each field, set the error on the corresponding field
               setError(key, {
                  type: "server", // Set error type as server
                  message: serverErrors[key].join(", "), // Assuming the error is an array of messages
               });
            });
         } else {
            toast.error("Internal Server Problem, Try again.");
         }
      }
   };

   const handleClose = () => {
      setOpen(false);
      setStep(1);
      reset();
   };

   const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

   const renderStep = () => {
      switch (step) {
         case 1:
            return (
               <>
                  <div className="space-y-4">
                     <div className="flex items-center justify-start mb-6">
                        <div className="rounded-sm p-4 border bg-white">
                           <User2 size={40} className="" />
                        </div>
                     </div>

                     {/* Step 1: Personal Info */}
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
                  </div>
               </>
            );
         case 2:
            return (
               <>
                  <div className="space-y-4">
                     {/* Step 2: Address and Relationship Status */}
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
                     />

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
                     />

                     {/* Spouse Selection */}
                     <div className="space-y-2">
                        <label htmlFor="spouse" className="text-base font-medium text-title">Spouse</label>
                        <SpouseSet setSelectedSpouse={setSelectedSpouse} selectedSpouse={selectedSpouse} />
                     </div>
                  </div>
               </>
            );
         case 3:
            return (
               <>
                  <div className="space-y-4">
                     {/* Step 3: Financial Information */}
                     <InputField
                        id="income"
                        label="Income"
                        type="number"
                        placeholder="Enter income"
                        register={register}
                        validationRules={{ required: "Income is required" }}
                        errors={errors}
                     />

                     <CrmInput
                        id="credit_score"
                        label="Credit Score"
                        type="number"
                        placeholder="Enter score"
                        step="0.01"
                        className={`primary-input ${errors.credit_score ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                        labelClassName={`transition-all duration-300 text-base ${errors.credit_score ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}
                        {...register("credit_score", {
                           required: "Credit score is required",
                           pattern: {
                              value: /^\d{1,3}(\.\d+)?$/,
                              message: "Ensure that there are no more than 3 digits before the decimal point."
                           }
                        })}
                     />
                     {errors.credit_score && <p className="text-red-500 text-xs mt-1">{errors.credit_score.message}</p>}

                  </div>
               </>
            );
         case 4:
            return (
               <>
                  <div className="space-y-4">
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
      <CmModal isOpen={isOpen} handleClose={handleClose} size="700px" title="Add New Client">
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
