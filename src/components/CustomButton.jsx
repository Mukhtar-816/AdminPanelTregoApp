import React from "react";

const CustomButton = ({ ...props }) => {
  return (
    <button
      {...props}
      onClick={props?.onClick}
      className="min-h-10 min-w-30 hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-3xl border-white/30 border-1 rounded-md justify-center items-center"
    >
      <label className="text-white font-semibold">{props?.title}</label>
    </button>
  );
};

export default CustomButton;
