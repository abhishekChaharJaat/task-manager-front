import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Login from "./Login";
import Signup from "./Signup";

// React Icons import
import { FaTasks, FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

function Home() {
  const appContext = useAppContext();
  const { userInfo, isLogin, isSignup, setShowSignup } = appContext;

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-gradient-to-b from-gray-100 to-gray-200">
      {isLogin && <Login />}
      {isSignup && <Signup />}

      <section
        className="flex items-center justify-center flex-grow text-white bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full py-20 px-4 md:px-16 bg-black bg-opacity-70 rounded-lg shadow-lg max-w-5xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold md:text-5xl tracking-tight leading-tight">
            Stay Organized, Stay Productive
          </h2>
          <p className="mb-12 max-w-xl mx-auto text-lg md:text-xl text-gray-300">
            Effortlessly manage your tasks and achieve your goals with
            TaskManager.
          </p>

          {userInfo?.isLoggedIn ? (
            <Link
              to="/tasks"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-semibold transition"
            >
              <FaTasks className="mr-3 text-xl" />
              View Tasks
            </Link>
          ) : (
            <button
              onClick={() => setShowSignup(true)}
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-semibold transition text-white"
            >
              <FaPlusCircle className="mr-3 text-xl" />
              Get Started
            </button>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-6 mx-auto text-center max-w-6xl">
          <h3 className="mb-12 text-3xl font-extrabold text-gray-800 flex justify-center items-center gap-3">
            <FaTasks className="text-blue-600" />
            Features Available
          </h3>
          <div className="flex flex-col gap-10 md:flex-row md:gap-6 justify-center">
            <div className="flex-1 p-8 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition cursor-default">
              <FaPlusCircle className="mx-auto mb-5 text-5xl text-blue-600" />
              <h4 className="mb-3 text-xl font-semibold text-gray-900">
                Add Task
              </h4>
              <p className="text-gray-700">
                Create new tasks effortlessly and stay on top of your work.
              </p>
            </div>
            <div className="flex-1 p-8 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition cursor-default">
              <FaEdit className="mx-auto mb-5 text-5xl text-blue-600" />
              <h4 className="mb-3 text-xl font-semibold text-gray-900">
                Update Task
              </h4>
              <p className="text-gray-700">
                Keep your tasks up to date and track your progress seamlessly.
              </p>
            </div>
            <div className="flex-1 p-8 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition cursor-default">
              <FaTrashAlt className="mx-auto mb-5 text-5xl text-blue-600" />
              <h4 className="mb-3 text-xl font-semibold text-gray-900">
                Delete Task
              </h4>
              <p className="text-gray-700">
                Remove tasks anytime to stay organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 text-gray-400 bg-gray-900">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 TaskManager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
