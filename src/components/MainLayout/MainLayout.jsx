import { useState } from "react";
import TopBar from "./TopBar";

const MainLayout = ({ children }) => {
   const [toggle, setToggle] = useState(false);


   return (
      <div className="w-full relative overflow-hidden ">
         <TopBar />
         <div className="min-h-[80vh]  px-5 pt-[73px]">{children}</div>
      </div>
   );
};

export default MainLayout;
