import React from "react";

const LineGraph = ({ ...props }) => {
  return (
    <div className="flex h-2 bg-white/10 backdrop-blur-3xl w-full rounded-3xl">
      <div
        style={{
          width: `${props?.filled}%` || `20%`,
          backgroundColor: props?.backgroundColor,
        }}
        className={`flex h-full rounded-3xl bg-blue-500`}
      ></div>
    </div>
  );
};

export default LineGraph;
