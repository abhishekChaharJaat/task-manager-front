import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const { title = "Click me", onClick, className, href, icon } = props;
  return href ? (
    <Link
      className={`px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 ${className}`}
      to={href}
    >
      {title}
    </Link>
  ) : (
    <button
      onClick={onClick}
      type="button"
      className={`px-6 py-3 flex items-center text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 ${className}`}
    >
      {title} {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
