import React, { useState } from "react";
import { FiMail, FiLock, FiX } from "react-icons/fi";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Login = () => {
  const { loginUser, loading, setShowLogin, setShowSignup } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      return alert("Please enter both email and password");
    }
    loginUser({ email, password });
  };

  return (
    <>
      {loading && <Loading />}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="relative w-full bg-white shadow-2xl rounded-xl p-6 md:p-10 animate-fade-in-down md:w-[550px]">
          {/* Close Button */}
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-[26px] font-bold focus:outline-none"
            aria-label="Close"
          >
            <FiX />
          </button>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back
          </h2>

          {/* Form */}
          <div className="flex flex-col space-y-5">
            {/* Email Field with Icon */}
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

            {/* Password Field with Icon */}
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

            <Button title="Log In" className="w-full mt-4" onClick={login} />
          </div>

          {/* Switch to Signup */}
          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
