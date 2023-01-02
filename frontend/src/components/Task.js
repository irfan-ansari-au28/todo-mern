import React from "react";
import { VscCheckAll } from "react-icons/vsc";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Task = ({ task, deleteTask, getSingleTask, setTaskToComplete }) => {
  return (
    <div
      className={`shadow-md rounded-md px-2 py-2 my-2  bg-white relative overflow-hidden border-l-4 ${
        task.completed ? "border-indigo-500" : " border-red-800"
      } `}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-600 text-sm ">
          <p className="break-all">{task.name}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="ml-2 cursor-pointer">
            <VscCheckAll
              color="green"
              onClick={() => {
                setTaskToComplete(task);
              }}
            />
          </div>
          <div className="ml-2 cursor-pointer">
            <FaPencilAlt
              color="blue"
              onClick={() => {
                getSingleTask(task);
              }}
            />
          </div>
          <div className="ml-2 cursor-pointer">
            <FaTrashAlt color="red" onClick={() => deleteTask(task._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
