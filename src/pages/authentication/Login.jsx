import { useGetTestQuery } from "@/redux-store/api/testApi";
import loginImage from "@/assets/login/login.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const { data, error } = useGetTestQuery();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  return (
    <div className="h-screen overflow-hidden  flex items-center justify-center">
      <div className="w-full p-6 lg:p-0 flex items-center justify-center">
        <div className="w-full max-w-[470px] border border-gray-200  bg-white  p-8 rounded-[8px]">
          <p className="text-center uppercase font-semibold text-[28px]">CRM</p>
          <div className="flex items-start justify-start flex-col mt-6">
            <h1 className="text-[32px]">Sign In</h1>
            <p className="text-[#6B6B6B] text-xs font-normal mt-[6px]">Access your Account</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6">
            <div className="w-full">
              <FloatingLabelInput
                id="email"
                placeholder="Email address"
                label="Enter Your Email"
                type="email"
                className={`primary-input ${
                  errors.email
                    ? "ring-red-500 focus:ring-red-500 border-red-500"
                    : "ring-[#345a93] focus:ring-[#345593] "
                }`}
                labelClassName={`transition-all duration-300 ${
                  errors.email ? "text-red-500" : "text-gray-500 peer-focus:text-[#344d93]"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email format",
                  },
                })}
              />

              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="w-full relative mt-5">
              <FloatingLabelInput
                id="password"
                label="Password"
                type="password"
                placeholder="******"
                className={`primary-input ${
                  errors.password
                    ? "ring-red-500 focus:ring-red-500 border-red-500"
                    : "ring-[#345a93] focus:ring-[#345593] "
                }`}
                labelClassName={`transition-all duration-300 ${
                  errors.password ? "text-red-500" : "text-gray-500 peer-focus:text-[#344d93]"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mt-[14px] flex items-center justify-between">
              <div className="flex items-center cursor-pointer space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-xs font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me.
                </label>
              </div>
              <button
                type="button"
                className="text-xs font-normal text-[#2670DF] hover:underline transition-all duration-300">
                Forget password?
              </button>
            </div>
            <div className="mt-6">
              <Button
                className="w-full text-base  font-medium py-3"
                size="xl">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
