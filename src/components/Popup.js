import React, { useState, useRef } from "react";
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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);

  const addNewTask = () => {
    let newErrors = { title: "", description: "", dueDate: "" };
    let hasError = false;

    if (!title.trim()) {
      newErrors.title = "Please enter a title.";
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = "Please enter a description.";
      hasError = true;
    }
    if (!dueDate) {
      newErrors.dueDate = "Please select a due date.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      if (newErrors.title) titleRef.current.focus();
      else if (newErrors.description) descriptionRef.current.focus();
      else if (newErrors.dueDate) dueDateRef.current.focus();
      return;
    }

    addTask({ title, description, dueDate });
    setShowPopup(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full px-2 bg-black/40">
      <div className="bg-white px-3 md:px-10 w-full md:w-[600px] border py-6 rounded-lg flex flex-col justify-center items-center relative">
        <button
          onClick={() => setShowPopup(false)}
          aria-label="Close"
          className="absolute top-1 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <p className="text-2xl font-semibold">Create New Task</p>
        <div className="w-full mt-10">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
            error={errors.title}
          />
          <Input
            wrapperClassName="mt-6"
            type="textarea"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={descriptionRef}
            error={errors.description}
          />
          <Input
            wrapperClassName="mt-6"
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            ref={dueDateRef}
            error={errors.dueDate}
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
