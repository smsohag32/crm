
import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import ListOfContacts from "@/pages/Contacts/ListOfContacts";
import Overview from "@/pages/dashboard/Overview/Overview";
import Teams from "@/pages/dashboard/Teams/Teams";
import UserManagement from "@/pages/dashboard/UserManagement/UserManagement";
import DealsContainer from "@/pages/DealsContainer/DealsContainer";
import TasksContainer from "@/pages/Tasks/TasksContainer";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ClientList from "@/pages/dashboard/Clients/ClientList";
import ClientDetails from "@/pages/dashboard/Clients/ClientDetails";

export const router = createBrowserRouter([
   {
      path: "/",
      element:
         <AuthRoute userTypes={["admin", "user", "manager"]}><Main /></AuthRoute>
      // <Main />
      ,
      children: [
         {
            path: "/",
            element: <DealsContainer />,
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
         },
         {
            path: "/dashboard/clients",
            element: <ClientList />
         },
         {
            path: "/dashboard/client/:id",
            element: <ClientDetails />
         }
      ]
   },
]);
