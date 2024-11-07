import React from "react";

const Input = (props) => {
  const {
    label = "Input Label",
    value,
    onChange,
    placeholder,
    className,
    wrapperClassName,
    type,
    classLabel,
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full mt-1 text-sm md:text-base px-3 py-2 border border-gray-400 rounded-md  focus:border-blue-500 focus:outline-4 focus:outline  focus:outline-blue-500/10 ${className}`}
        ></textarea>
      ) : (
        <input
          onChange={onChange}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`w-full mt-1 placeholder:capitalize placeholder:text-sm text-sm md:text-base px-2 py-1.5 border border-gray-400 rounded-md  focus:border-blue-500 focus:outline-4 focus:outline  focus:outline-blue-500/10 ${className}`}
        />
      )}
    </div>
  );
};

export default Input;
