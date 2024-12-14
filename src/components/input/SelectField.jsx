import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const SelectField = ({ id, label, options, register, setValue, errors, defaultValue }) => (
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
