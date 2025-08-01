import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
