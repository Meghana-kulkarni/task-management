const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskcontroller");

const { protect } = require("../middleware/authMiddleware");

// ➕ Create task
router.post("/", protect, createTask);

// 📄 Get all tasks (only logged-in user)
router.get("/", protect, getTasks);

// ✏️ Update task
router.put("/:id", protect, updateTask);

// ❌ Delete task
router.delete("/:id", protect, deleteTask);

module.exports = router;