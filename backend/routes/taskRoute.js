const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/api/tasks", createTask);
router.get("/api/tasks", getTasks);
router.get("/api/tasks/:id", getTask);
router.delete("/api/tasks/:id", deleteTask);

module.exports = router;
