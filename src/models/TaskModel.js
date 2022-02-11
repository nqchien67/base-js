const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    userId: { type: String, required: true },
    note: { type: String, required: true },
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Tasks", taskSchema);

module.exports = TaskModel;
