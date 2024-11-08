import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";
const Signup = () => {
  const appContext = useAppContext();
  const { signupUser, loading } = appContext;

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
      {true && (
        <div className="w-full px-6 pt-20 flex justify-center items-center min-h-screen box-border bg-[#f4f9fa] ">
          <div className="box-border flex flex-col items-center justify-center px-4 md:px-6 lg:px-10 py-6  lg:py-10 bg-white shadow-lg rounded-2xl w-[500px]">
            <p className="text-2xl font-bold text-gray-700 uppercase lg:text-3xl ">
              Signup
            </p>

            {/* form */}
            <div className="box-border flex flex-col items-start justify-center w-full py-2">
              <Input
                label={"Name"}
                placeholder={"Enter your full name"}
                wrapperClassName="mt-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label={"Email"}
                placeholder={"Enter your email"}
                wrapperClassName="mt-4"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label={"Password"}
                placeholder={"Enter your password"}
                type={"password"}
                wrapperClassName="mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label={"Confirm Password"}
                placeholder={"Re-enter your password"}
                type={"password"}
                wrapperClassName="mt-4 !md:text-xl"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />

              <Button
                onClick={signup}
                title="Signup"
                className="my-8 md:mt-10"
              />
            </div>

            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link className="underline text-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
