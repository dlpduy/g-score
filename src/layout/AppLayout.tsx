import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // return (
  //   <div className="min-h-screen xl:flex flex-col">
  //     <div>
  //       <AppSidebar />
  //       <Backdrop />
  //     </div>
  //     <div
  //       className={`flex-1 transition-all duration-300 ease-in-out ${
  //         isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
  //       } ${isMobileOpen ? "ml-0" : ""}`}
  //     >
  //       <AppHeader />
  //       <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
  //         <Outlet />
  //       </div>
        
  //       {/* Footer with light background and dark text */}
  //       <AppFooter />
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <AppSidebar />
        <Backdrop />
      </div>
      
      {/* Nội dung chính */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-xl md:p-6">
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <AppFooter />
    </div>
  );
  
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
