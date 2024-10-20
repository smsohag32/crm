import { useState } from "react";
import TopBar from "./TopBar";

const MainLayout = ({ children }) => {
   const [toggle, setToggle] = useState(false);


   return (
      <div className="w-full relative overflow-hidden ">
         <TopBar />
         <div className="min-h-[80vh]">{children}</div>
      </div>
   );
};

export default MainLayout;
