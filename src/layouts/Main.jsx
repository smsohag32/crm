import MainLayout from "@/components/MainLayout/MainLayout";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Main = () => {
   const user = true;
   const navigate = useNavigate();
   useEffect(() => {
      if (user) {
         navigate("/");
      } else {
         navigate("/authentication/login");
      }
   }, [user, navigate]);

   return (
      <div>
         <MainLayout >
            <Outlet />
         </MainLayout>
      </div>
   );
};

export default Main;
