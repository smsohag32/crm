import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
   return (
      <div>
         <DashboardLayout >
            <Outlet />
         </DashboardLayout>
      </div>
   );
};

export default Dashboard;