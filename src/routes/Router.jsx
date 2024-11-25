import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import ListOfContacts from "@/pages/Contacts/ListOfContacts";
import Overview from "@/pages/dashboard/Overview/Overview";
import Deals from "@/pages/Deals/Deals";
import DealsContainer from "@/pages/DealsContainer/DealsContainer";
import TasksContainer from "@/pages/Tasks/TasksContainer";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <DealsContainer />,
         },
         {
            path: "/deals",
            element: <Deals />,
         },
         {
            path: "/tasks",
            element: <TasksContainer />,
         },
         {
            path: "/contacts",
            element: <ListOfContacts />,
         },

      ],
   },
   {
      path: "/authentication/login",
      element: <Login />,
   },
   {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
         {
            path: "/dashboard",
            element: <Overview />
         }
      ]
   },
]);
