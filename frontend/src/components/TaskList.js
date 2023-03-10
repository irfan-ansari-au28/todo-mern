import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../App";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { BiLoader } from "react-icons/bi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [completedTask, setCompletedTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

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
      const { data } = await axios.post(`${URL}/api/tasks`, formData);
      setTasks([...tasks, data]);
      toast.success("Task added successfully!!");
      setFormData({ ...formData, name: "" });
      //   getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load Task");
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success("Task Deleted");
      getTasks();
    } catch (error) {
      toast.error("Failed to load Task");
      console.log(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false
    });
    setIsEditing(true);
    setTaskId(task._id);
  };

  const editTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field can't be empty !!");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      toast.success("Task edited successfully!!");
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setTaskToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true
    };

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error("Failed to load Task");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const cTask = tasks.filter((task) => task.completed === true);
    setCompletedTask(cTask);
  }, [tasks]);

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
              isEditing={isEditing}
              editTask={editTask}
            />
            <div className="flex items-center border-b-2 mb-2 py-2"></div>
            {isLoading && (
              <span className="animate-spin flex flex-wrap items-center justify-center ">
                <BiLoader color="red" />
              </span>
            )}
            {!isLoading && tasks.length === 0 ? (
              <h1>No tasks found !!</h1>
            ) : (
              tasks.map((task, index) => {
                return (
                  <Task
                    key={task._id}
                    task={task}
                    deleteTask={deleteTask}
                    getSingleTask={getSingleTask}
                    setTaskToComplete={setTaskToComplete}
                  />
                );
              })
            )}
            {tasks.length > 0 && (
              <div className="flex items-center justify-between my-2">
                <p className="text-gray-400 text-sm">
                  {completedTask.length}/{tasks.length} task completed
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default TaskList;
