import React from "react";
import Sidebar from "../components/Sidebar";
import { AppName, navItems } from "../utils/constants";
import Loader from "../components/Loader";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import CustomHeader from "../components/CustomHeader";

const CustomLayout = ({ children }) => {
  const { dataLoading } = useApp();
  const { user, authLoading } = useAuth();
  return (
    <div className="flex flex-col h-screen w-screen bg-[#152238] overflow-hidden">
      {/* Fixed Header */}
      <div className="z-50 shrink-0">
        <CustomHeader
          appName={AppName}
          adminName={user?.email?.replace("@admin.com", "")}
          navItems={navItems}
        />
      </div>
      {/* laoder */}
      <Loader show={dataLoading || authLoading} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex shrink-0 px-5 py-5">
          <Sidebar navItems={navItems} />
        </div>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default CustomLayout;
