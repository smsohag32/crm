import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import Landing from "@/pages/landing/Landing";
import WorkflowContainer from "@/pages/OverviewWorkflow/WorkflowContainer";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <WorkflowContainer />,
         },

      ],
   },
   {
      path: "/authentication/login",
      element: <Login />,
   },
]);
