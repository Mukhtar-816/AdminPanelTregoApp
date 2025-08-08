import React from "react";
import CustomButton from "./CustomButton";
import { BottomText, navItems } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <aside
        style={props?.style}
        className="min-h-full h-full md:max-w-[250px] lg:max-w-[300px] md:min-w-[200px] lg:min-w-[300px] transition-all duration-300 border-white/10 border rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] backdrop-blur-xl p-4 text-white flex flex-col justify-between"
      >
        <nav className="flex flex-col space-y-5">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              onClick={() => navigate(`${href}`)}
              className={`${
                location.pathname == href
                  ? "bg-blue-500 transition-colors duration-300"
                  : "bg-white/10"
              } shadow-inner border-l-4 border-blue-500 flex items-center gap-3 px-5 py-4 active:scale-95 rounded-md hover:bg-blue-500 transition-all duration-300`}
            >
              <span className="text-lg font-semibold">{label}</span>
            </a>
          ))}
        </nav>
        <div className="text-sm text-white/50 mt-5">{BottomText}</div>
      </aside>
    </>
  );
};

export default Sidebar;
