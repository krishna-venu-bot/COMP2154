const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ["To Do", "Doing", "Done"],
    default: "To Do"
  }
});

module.exports = mongoose.model("Task", taskSchema);