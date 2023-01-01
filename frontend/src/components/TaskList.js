import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false
  });

  const { name } = formData;

  const handleInputChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, name: event.target.value });
  };

  const createTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Input field can't be empty !!");
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      toast.success("Task added successfully!!");
      setFormData({ ...formData, name: "" });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <>
        <div className="flex flex-wrap items-center justify-center place-items-center h-screen">
          {/* card */}
          <div className="shadow-lg rounded-xl w-72 md:w-96 p-4 bg-white relative overflow-hidden">
            <div className="text-3xl text-purple my-2 ">Task Manager</div>
            <TaskForm
              name={name}
              createTask={createTask}
              handleInputChange={handleInputChange}
            />
            <div className="flex items-center border-b-2 mb-2 py-2"></div>
            <Task />

            <div className="flex items-center justify-between my-2">
              <p className="text-gray-300 text-sm">4/6 task completed</p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default TaskList;
