import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Main = () => {
  const user = false;
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
      <Outlet />
    </div>
  );
};

export default Main;
