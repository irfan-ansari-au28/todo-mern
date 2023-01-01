import React from "react";
import { VscCheckAll } from "react-icons/vsc";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Task = () => {
  return (
    <div className="shadow-md rounded-md px-2 py-2 my-2  bg-white relative overflow-hidden border-l-4 border-indigo-500">
      <div className="flex items-center justify-between">
        <div className="text-gray-600 text-sm ">
          <p className="break-all">
            1. Task NO
            1kjhkjkljkljkljklkljjkjcolor="green"color="green"color="green"color="green"color="green"color="green"color="green"color="green"color="green"
          </p>
        </div>
        <div className="flex items-center justify-start">
          <div className="ml-2 ">
            <VscCheckAll color="green" />
          </div>
          <div className="ml-2 ">
            <FaPencilAlt color="blue" />
          </div>
          <div className="ml-2 ">
            <FaTrashAlt color="red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
