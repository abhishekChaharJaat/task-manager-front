import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const {
    label = "Input Label",
    value,
    onChange,
    placeholder,
    className,
    wrapperClassName,
    type,
    classLabel,
    error, // new prop for error message
  } = props;

  return (
    <div className={`w-full ${wrapperClassName}`}>
      <label
        className={`py-1 text-sm font-normal text-gray-700 md:text-base ${classLabel}`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full mt-1 text-base md:text-base px-3 py-2 border rounded-md
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:outline-red-500/20"
                : "border-gray-400 focus:border-blue-500 focus:outline-blue-500/10"
            } 
            ${className}`}
        />
      ) : (
        <input
          ref={ref}
          onChange={onChange}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`w-full mt-1 placeholder:capitalize placeholder:text-base text-base md:text-base px-2 py-1.5 border rounded-md
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:outline-red-500/20"
                : "border-gray-400 focus:border-blue-500 focus:outline-blue-500/10"
            } 
            ${className}`}
        />
      )}
      {/* Error message */}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;
