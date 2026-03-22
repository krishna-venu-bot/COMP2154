const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
});

// Update task
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;