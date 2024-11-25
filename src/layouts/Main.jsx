import MainLayout from "@/components/MainLayout/MainLayout";

import { Outlet } from "react-router-dom";

const Main = () => {


   return (
      <div>
         <MainLayout >
            <Outlet />
         </MainLayout>
      </div>
   );
};

export default Main;
