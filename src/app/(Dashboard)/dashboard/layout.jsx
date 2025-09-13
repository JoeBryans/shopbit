// import SideBar from "@/components/dashboard/SideBar";
import { Suspense } from "react";
const Layout = ({ children }) => {
  return (
    <Suspense>
      <div className=" flex w-full gap-4 relative"> 
       <div className="relative">
          {/* <SideBar /> */}
       </div>
        <main className="relative flex-6 overflow-hidden">{children}</main>
      </div>
    </Suspense>
  );
};
export default Layout;
