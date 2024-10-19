import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import Landing from "@/pages/landing/Landing";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/authentication/login",
        element: <Login />,
      },
    ],
  },
]);
