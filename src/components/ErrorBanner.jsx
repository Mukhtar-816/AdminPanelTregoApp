// components/ErrorBanner.jsx
import React from "react";

const ErrorBanner = ({ message }) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        message
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      } absolute top-10`}
    >
      <p className="text-white font-semibold md:text-lg text-sm bg-red-500 px-6 py-2 rounded-md shadow-lg">
        {message}
      </p>
    </div>
  );
};

export default ErrorBanner;
