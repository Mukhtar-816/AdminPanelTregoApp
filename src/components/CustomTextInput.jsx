import React from "react";

const CustomTextInput = ({
  title,
  value,
  onChange,
  type = "text",
  placeholder,
  ...rest 
}) => {
  return (
    <div className="py-1 flex flex-col gap-2 w-full">
      {title && (
        <label className="text-white text-lg font-semibold">{title}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || (title ? `Enter ${title}` : "")}
        className={`px-5 p-3 text-white bg-white/20 rounded-md outline-0 transition-all
          ${value?.length > 0 ? "outline-1 outline-blue-500" : ""}`}
        {...rest} 
      />
    </div>
  );
};

export default CustomTextInput;
