import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { MdAddTask } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const Popup = (props) => {
  const { setShowPopup } = props;
  const appContext = useAppContext();
  const { addTask } = appContext;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addNewTask = () => {
    setShowPopup(false);
    addTask({ title, description, dueDate });
  };
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full px-6 bg-black/40">
      <div className="bg-white px-6 w-[500px] border py-6  rounded-lg flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold">Create New Task</p>
        <div className="w-full mt-10">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            wrapperClassName={"mt-6"}
            type="textarea"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            wrapperClassName={"mt-6"}
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button
            className="mt-6"
            title="Create"
            onClick={addNewTask}
            icon={<MdAddTask size={24} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
