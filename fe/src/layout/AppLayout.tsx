import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar luôn bên trái */}
      <AppSidebar />
  
      {/* Wrapper chứa Header + Content + Footer */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {/* Header */}
        <AppHeader />
  
        {/* Main content + footer */}
        <main className="flex flex-col flex-1">
          <div className="flex-grow p-4 mx-auto w-full max-w-screen-xl md:p-6">
            <Outlet />
          </div>
  
          {/* Footer */}
          <AppFooter />
        </main>
      </div>
  
      {/* Backdrop cho mobile */}
      <Backdrop />
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
