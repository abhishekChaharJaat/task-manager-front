import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../components/Button";
import { MdAddTask } from "react-icons/md";
import Popup from "../components/Popup";
import { useAppContext } from "../context/AppContext";
import UpdatePopup from "../components/UpdatePopup";
import { BiTaskX } from "react-icons/bi";
import Loading from "../components/Loading";

const TaskList = () => {
  const appContext = useAppContext();
  const { tasks, loading, deleteTask } = appContext;
  const [showPopup, setShowPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [curTask, setCurTask] = useState();

  const handelUpdate = (task) => {
    setCurTask(task);
    setUpdatePopup(true);
  };
  return (
    <>
      {loading && <Loading />}

      {true && (
        <div className="container px-6 py-20 mx-auto md:px-10">
          <h1 className="mb-4 text-2xl font-bold">Task List </h1>
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setShowPopup(true)}
              title={"Create New Task"}
              className=" !w-fit"
              icon={<MdAddTask size={24} />}
            />
          </div>

          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full pt-20 text-gray-500">
              <BiTaskX size={50} />
              <p className="mt-2">No Task Available</p>
            </div>
          )}
          <ul className="mt-6 space-y-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-between p-4 bg-white border rounded-lg shadow-md hover:border-blue-500 md:flex-row"
              >
                <div className="flex-1 pr-8">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">
                    {task.title}
                  </h2>
                  <p className="mt-1 text-gray-600">{task.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <strong>Due Date:</strong> {task.dueDate}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          task.status === "Completed"
                            ? "text-green-500"
                            : task.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-blue-700"
                        }
                      >
                        {task.status}
                      </span>
                    </p>
                    <p>
                      <strong>Created On:</strong> {task.date}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end w-full gap-3 space-x-2 md:w-auto ">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Update Task"
                    onClick={() => {
                      handelUpdate(task);
                    }}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete Task"
                    onClick={() => {
                      deleteTask(task._id);
                    }}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showPopup && <Popup setShowPopup={setShowPopup} />}
      {updatePopup && (
        <UpdatePopup task={curTask} setUpdatePopup={setUpdatePopup} />
      )}
    </>
  );
};

export default TaskList;
