const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All routes below require login
router.use(protect);

// @route   GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, date, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      date,
      priority,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
