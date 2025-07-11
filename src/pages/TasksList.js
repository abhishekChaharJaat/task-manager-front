import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import Button from "../components/Button";
import Popup from "../components/Popup";
import UpdatePopup from "../components/UpdatePopup";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";

const TaskList = () => {
  const { tasks, loading, deleteTask } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [curTask, setCurTask] = useState(null);

  const handleUpdate = (task) => {
    setCurTask(task);
    setUpdatePopup(true);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <>
      {loading && <Loading />}

      <div className="container px-6 py-20 mx-auto md:px-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📋 Your Tasks</h1>
          <Button
            onClick={() => setShowPopup(true)}
            title={"Create Task"}
            className="!w-fit hidden md:flex"
            icon={<MdAddTask size={20} />}
          />
        </div>

        {/* No Tasks Message */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-gray-500">
            <BiTaskX size={50} />
            <p className="mt-2 text-lg">No tasks available</p>
          </div>
        )}

        {/* Task List */}
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg border hover:border-blue-500 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">
                    {task.title}
                  </h2>
                  <p className="mt-1 text-gray-600 text-sm">
                    {task.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleUpdate(task)}
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTask(task._id)}
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>

              {/* Task Details */}
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>
                  <strong>Due:</strong>{" "}
                  <span className="text-gray-700">
                    {formatDate(task.dueDate)}
                  </span>
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  <span className="text-gray-700">{formatDate(task.date)}</span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Button for Mobile */}
      {!showPopup && (
        <button
          onClick={() => setShowPopup(true)}
          className="md:hidden fixed bottom-5 right-5 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          title="Add Task"
        >
          <MdAddTask size={28} />
        </button>
      )}

      {showPopup && <Popup setShowPopup={setShowPopup} />}
      {updatePopup && (
        <UpdatePopup task={curTask} setUpdatePopup={setUpdatePopup} />
      )}
    </>
  );
};

export default TaskList;
