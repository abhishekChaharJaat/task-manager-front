import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Login = () => {
  const appContext = useAppContext();
  const { loginUser, loading } = appContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "" || password === "") {
      return alert("Enter credentials");
    }
    loginUser({ email, password });
  };
  return (
    <>
      {loading && <Loading />}
      {true && (
        <div className="w-full py-20 flex justify-center items-center min-h-screen box-border  bg-[#f4f9fa] px-6 ">
          {/* Heading */}

          <div className="box-border flex flex-col items-center justify-center px-4 md:px-6 lg:px-10 py-6  lg:py-10 bg-white shadow-lg rounded-2xl w-[500px]">
            <div>
              <p className="text-2xl font-bold text-gray-700 uppercase lg:text-3xl ">
                Login
              </p>
            </div>
            {/* form */}
            <div className="box-border flex flex-col items-start justify-center w-full py-2">
              <Input
                label={"Email"}
                placeholder={"Enter your email"}
                wrapperClassName="mt-6"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label={"Password"}
                type="password"
                placeholder={"Enter your password"}
                wrapperClassName="mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button title="Login" className="my-8 md:mt-10" onClick={login} />
            </div>

            <p className="mt-2 text-sm">
              Don't have an account?{" "}
              <Link className="underline text-primary" to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
