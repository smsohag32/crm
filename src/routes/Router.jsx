
import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import ListOfContacts from "@/pages/Contacts/ListOfContacts";
import Overview from "@/pages/dashboard/Overview/Overview";
import Teams from "@/pages/dashboard/Teams/Teams";
import UserManagement from "@/pages/dashboard/UserManagement/UserManagement";
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
      element: <Dashboard />,
      children: [
         {
            path: "/dashboard",
            element: <Overview />
         },
         {
            path: "/dashboard/teams",
            element: <Teams />
         },
         {
            path: "/dashboard/user-management",
            element: <UserManagement />
         }
      ]
   },
]);
