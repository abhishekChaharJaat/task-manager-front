import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { FaRegSave } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";

const UpdatePopup = (props) => {
  const { task, setUpdatePopup } = props;
  const appContext = useAppContext();
  const { editTask } = appContext;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
  }, [task]);

  const editOldTask = () => {
    const id = task._id;
    const updateTask = { title, description, dueDate, status };
    editTask(id, updateTask);
    setUpdatePopup(false);
  };
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full px-6 bg-black/40">
      <div className="bg-white px-6 w-[450px] border py-3  rounded-lg flex flex-col justify-center items-center">
        <span
          className="flex justify-end w-full "
          onClick={() => setUpdatePopup(false)}
        >
          <FaSquareXmark className="text-3xl text-red-700 cursor-pointer active:scale-90 " />
        </span>
        <p className="my-0 text-2xl font-semibold">Edit Your Task</p>
        <div className="w-full mt-5">
          <Input
            wrapperClassName={"mt-2"}
            classLabel="!text-sm"
            label="Title"
            value={title}
            className="!py-1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            wrapperClassName={"mt-2"}
            classLabel="!text-sm"
            type="textarea"
            label="Description"
            value={description}
            className="!py-1"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            wrapperClassName={"mt-2"}
            classLabel="!text-sm"
            type="date"
            label="Due Date"
            value={dueDate}
            className="!py-1"
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            wrapperClassName={"mt-2"}
            classLabel="!text-sm"
            label="Status"
            value={status}
            className="!py-1"
            onChange={(e) => setStatus(e.target.value)}
          />
          <Button
            className="my-6 "
            title="Save"
            onClick={editOldTask}
            icon={<FaRegSave size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
