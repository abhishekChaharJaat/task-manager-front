import React from "react";
import loader from "../loader.gif";
const Loading = () => {
  return (
    <div className="fixed t-0  w-40 z-5   flex items-center justify-center">
      <img src={loader} alt="loader" className="w-20" />
    </div>
  );
};

export default Loading;
