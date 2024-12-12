import Loading from "@/components/Loading/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux-store/slice/authSlice";

const AuthRoute = ({ userTypes, children }) => {
   const { user, isLoading } = useAuth();
   const location = useLocation();
   const dispatch = useDispatch();

   if (isLoading) {
      return <Loading />;
   }

   if (!user && user?.userType && !userTypes?.includes(user.userType)) {
      return children;
   }

   dispatch(logoutUser());
   return <Navigate to="/authentication/login" state={{ from: location }} />;
};

export default AuthRoute;
