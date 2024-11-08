import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
function Home() {
  const appContext = useAppContext();
  const { userInfo } = appContext;
  return (
    <div className="flex flex-col min-h-screen pt-16 bg-gray-100">
      <section
        className="flex items-center justify-center flex-grow text-white bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full py-16 bg-black bg-opacity-60">
          <h2 className="mb-4 text-4xl font-bold text-center md:text-5xl">
            Stay Organized, Stay Productive
          </h2>
          <p className="mb-8 text-lg text-center">
            Effortlessly manage your tasks and achieve your goals with
            TaskManager.
          </p>
          {userInfo?.isLoggedIn ? (
            <Link
              to="/tasks"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              View Tasks
            </Link>
          ) : (
            <Link
              to="/signup"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h3 className="mb-8 text-3xl font-bold">Features Available</h3>
          <div className="flex flex-col items-stretch justify-around gap-8 md:flex-row">
            <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg">
              <h4 className="mb-4 text-xl font-semibold">Add Task</h4>
              <p>Create new tasks effortlessly</p>
            </div>
            <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg">
              <h4 className="mb-4 text-xl font-semibold">Update Task</h4>
              <p>
                Update your tasks and keep track of the progress you've made.
              </p>
            </div>
            <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg">
              <h4 className="mb-4 text-xl font-semibold">Delete Task</h4>
              <p>Delete tasks antime </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-4 text-gray-400 bg-gray-900">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 TaskManager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
