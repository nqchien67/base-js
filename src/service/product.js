const { stop } = require("$helpers/response");
const TaskModel = require("$models/TaskModel");

async function addProduct(params, userId) {
  const { note, date, startTime, endTime } = params;
  if (endTime <= startTime) {
    throw stop("Giờ sai", "Giờ sai");
  }

  const existTask = await TaskModel.findOne({
    userId: userId,
    date: date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (existTask) {
    throw stop("Trùng giờ", "Trùng giờ");
  }

  const task = new TaskModel({ userId, ...params });
  const result = await task.save();
  return result;
}

async function getTasks(userId) {
  const taskList = await TaskModel.find(
    { userId: userId },
    { note: true, _id: true }
  );
  return taskList;
}

async function getDetailTask(taskId) {
  const result = await TaskModel.findOne(
    { _id: taskId },
    { createdAt: false, updatedAt: false, __v: false }
  );
  return result;
}

async function updateTask(update) {
  const { _id, note, date, startTime, endTime } = update;
  const task = await TaskModel.findOne({ _id: _id });

  task._id = _id;
  task.note = note;
  task.date = date;
  task.startTime = startTime;
  task.endTime = endTime;

  task.save();
  return task;
}

module.exports = {
  addTask,
  getTasks,
  getDetailTask,
  updateTask,
};
