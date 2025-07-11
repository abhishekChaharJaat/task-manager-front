import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiCheck, FiX } from "react-icons/fi";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Signup = () => {
  const { signupUser, loading, setShowSignup, setShowLogin } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const signup = () => {
    if (password !== cpassword) {
      return alert("Confirm password does not match");
    }
    signupUser({ name, email, password });
  };

  return (
    <>
      {loading && <Loading />}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="relative w-full bg-white shadow-2xl rounded-xl p-6 md:py-8 md:px-10 animate-fade-in-down md:w-[600px]">
          {/* ❌ Close Button */}
          <button
            onClick={() => setShowSignup(false)}
            className="absolute top-1 right-4 text-gray-400 hover:text-gray-600 text-[30px] font-bold focus:outline-none"
            aria-label="Close"
          >
            <FiX />
          </button>

          <h2 className="text-[16px] md:text-2xl font-bold text-center text-gray-800 font-sans mb-6">
            Create Your Task Manager Account
          </h2>

          {/* Form */}
          <div className="flex flex-col space-y-4">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiCheck className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Re-enter your password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button onClick={signup} title="Sign Up" className="w-full mt-4" />
          </div>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
