import "./App.css";
import { ToastContainer } from "react-toastify";

import TaskList from "./components/TaskList";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <>
      <TaskList />
      <ToastContainer />
    </>
  );
}

export default App;
