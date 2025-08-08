// components/Loader.jsx
import React from "react";

const Loader = ({ show, ...props }) => {
  if (!show) return null;
  return (
    <div
      {...props}
      className="top-0 absolute h-full w-full bg-white/20 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <div className="h-10 w-10 border-t-blue-500 border-l-blue-500 border-t-4 border-l-4 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
