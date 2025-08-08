import React, { useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import CustomButton from "./CustomButton";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const CustomHeader = ({ ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {logout} = useAuth();

  const handleLogout = () => {
    console.log("Logout triggered");
    logout();
    // TODO: Replace with real logout logic
  };

  return (
    <header className="md:pl-20 w-full px-4 min-h-16 flex items-center justify-between bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] backdrop-blur-md shadow-md border-b border-blue-500/20">
      {/* Left: App Name & Menu Icon */}
      <div className="flex items-center gap-5">
        <RiMenu4Fill
          className={`md:hidden text-blue-500 cursor-pointer transition-transform duration-300 ${
            menuOpen ? "rotate-90" : ""
          }`}
          size={30}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <h1 className="text-blue-500 text-2xl font-semibold tracking-wide">
          {props?.appName}
        </h1>
      </div>

      {/* Right: Admin + Logout */}
      <div className="flex items-center gap-5">
        <span className="text-white text-md font-semibold">{`Hello, ${props?.adminName}`}</span>

        {/* Desktop Logout */}
        <div className="hidden md:flex">
          <CustomButton title="Logout" onClick={handleLogout} />
        </div>

        {/* Mobile Logout */}
        <div
          onClick={handleLogout}
          className="md:hidden p-2 rounded-md border border-white/10 bg-blue-200/10 active:scale-95 transition-transform duration-300 cursor-pointer"
        >
          <CiLogout color="red" size={25} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-16 left-0 z-50 md:hidden"
          >
            <Sidebar style={{ borderRadius: 0 }}/>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CustomHeader;
