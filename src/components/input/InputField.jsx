import { CrmInput } from "../ui/floatin-input";

export const InputField = ({ id, label, type, placeholder, register, validationRules, errors }) => (
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
