import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black/40 z-[100] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
