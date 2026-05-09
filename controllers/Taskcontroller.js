const Task = require("../models/Task");

// ➕ CREATE TASK
const createTask = async (req, res) => {
  try {
    console.log("ROUTE HIT");
    console.log("TASK BODY:", req.body);

    // ✅ ADD THIS SAFETY CHECK
    if (!req.body) {
      return res.status(400).json({ message: "No data sent" });
    }

    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      user: req.user._id
    });

    res.status(201).json(task);

  } catch (error) {
    console.log("ERROR:", error.message); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};

// 📄 GET ALL TASKS (only user's tasks)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 ensure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};