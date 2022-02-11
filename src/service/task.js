const { stop } = require("$helpers/response");
const { ErrorCode } = require("$types/enum");
const TaskModel = require("$models/TaskModel");

async function addTask(params, userId) {
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
  console.log(task);
  const result = await task.save();
  return result;
}

async function getTasks(userId) {
  const taskList = await TaskModel.find({ userId: userId });
  return taskList;
}

module.exports = {
  addTask,
  getTasks,
};
