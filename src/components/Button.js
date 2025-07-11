import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  title = "Click me",
  onClick,
  className = "",
  href,
  icon,
  type = "button",
  isLoading = false,
}) => {
  const baseStyles = `
    inline-flex items-center justify-center 
    px-6 py-2 rounded-lg font-semibold 
    bg-white text-blue-600 
    border border-blue-500 
    shadow-md 
    transition duration-300 ease-in-out 
    transform hover:scale-105 hover:shadow-xl 
    hover:border-indigo-500 hover:text-indigo-600 
    active:scale-95
  `;

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <>
          {title}
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </>
  );

  return href ? (
    <Link to={href} className={`${baseStyles} ${className}`}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
