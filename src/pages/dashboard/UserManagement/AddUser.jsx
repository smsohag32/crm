import CmModal from "@/components/modal/CmModal";
import { Button } from "@/components/ui/button";
import { CrmInput } from "@/components/ui/floatin-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePostUserMutation } from "@/redux-store/api/usersApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddUser = ({ isOpen, setOpen }) => {
   const [postUser, { isLoading }] = usePostUserMutation()
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      watch,
   } = useForm();

   const onSubmit = async (data) => {
      const newUser = {
         first_name: data.first_name,
         last_name: data.last_name,
         email: data.email,
         password: data.password,
         user_type: data.user_type,

      };
      try {
         await postUser(newUser).unwrap()
         handleClose()

      } catch (err) {
         console.log(err)
         toast.error("Please try again.")
      }

   };

   const handleClose = () => {
      setOpen(false);
      reset();
   };


   const password = watch("password", "");

   const isMinLength = password.length >= 8;
   const hasUpperCase = /[A-Z]/.test(password);
   const hasLowerCase = /[a-z]/.test(password);
   const hasSpecialChar = /[\W_]/.test(password);

   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"700px"} title={"Add New User"}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="space-y-2">
               {/* First Name */}
               <label htmlFor="first_name" className={`transition-all duration-300 text-base font-medium ${errors.first_name ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}>
                  First Name
               </label>
               <CrmInput
                  id="first_name"
                  type="text"
                  placeholder="Enter first name"
                  className={`primary-input ${errors.first_name ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                  {...register("first_name", {
                     required: "First name is required",
                  })}
               />
               {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
            </div>

            <div className="space-y-2">
               {/* Last Name */}
               <label htmlFor="last_name" className={`transition-all duration-300 text-base font-medium ${errors.last_name ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}>
                  Last Name
               </label>
               <CrmInput
                  id="last_name"
                  type="text"
                  placeholder="Enter last name"
                  className={`primary-input ${errors.last_name ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
                  {...register("last_name", {
                     required: "Last name is required",
                  })}
               />
               {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
            </div>

            <div className="space-y-2">
               {/* Email */}
               <label htmlFor="email" className={`transition-all duration-300 text-base font-medium ${errors.email ? "text-red-500" : "text-title peer-focus:text-blue-500"}`}>
                  Email
               </label>
               <CrmInput
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className={`primary-input ${errors.email ? "ring-red-500 focus:ring-red-500 border-red-500" : "ring-blue-500 focus:ring-blue-400 border-blue-300"}`}
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

            <div className="space-y-2">
               {/* Password */}
               <label
                  htmlFor="password"
                  className={`transition-all duration-300 text-base font-medium ${errors.password ? "text-red-500" : "text-title peer-focus:text-blue-500"
                     }`}
               >
                  Password
               </label>
               <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className={`primary-input ${errors.password
                     ? "ring-red-500 focus:ring-red-500 border-red-500"
                     : "ring-blue-500 focus:ring-blue-400 border-blue-300"
                     }`}
                  {...register("password", {
                     required: "Password is required",
                     minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                     },
                     pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).*$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
                     },
                  })}
               />

               {/* Validation Notes */}
               <ul className="text-sm mt-2 space-y-1">
                  <li className={isMinLength ? "text-green-500" : "text-gray-500"}>
                     - Password must be at least 8 characters long.
                  </li>
                  <li className={hasUpperCase ? "text-green-500" : "text-gray-500"}>
                     - Password must contain at least one uppercase letter.
                  </li>
                  <li className={hasLowerCase ? "text-green-500" : "text-gray-500"}>
                     - Password must contain at least one lowercase letter.
                  </li>
                  <li className={hasSpecialChar ? "text-green-500" : "text-gray-500"}>
                     - Password must include at least one special character (e.g., !, @, #).
                  </li>
               </ul>

               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
               {/* User Type Dropdown */}
               <label htmlFor="user_type" className="transition-all duration-300 text-base font-medium text-title peer-focus:text-blue-500">
                  User Type
               </label>
               <Select
                  onValueChange={(value) => setValue("user_type", value)}
               >
                  <SelectTrigger className="w-full bg-white">
                     <SelectValue placeholder="Select User Type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="admin">Admin</SelectItem>
                     <SelectItem value="manager">Manager</SelectItem>
                     <SelectItem value="user">User</SelectItem>
                  </SelectContent>
               </Select>
               {errors.user_type && <p className="text-red-500 text-xs mt-1">{errors.user_type.message}</p>}

            </div>
            <div className="flex items-center gap-6 justify-end">
               <Button disabled={isLoading} type="button" onClick={handleClose} className="bg-white" variant="outline">Cancel</Button>
               <Button type="submit" className="px-8" >Save</Button>
            </div>
         </form>
      </CmModal>
   );
};

export default AddUser;
