const {
  addTask,
  getTasks,
  getDetailTask,
  updateTask,
} = require("$service/task");
const validate = require("$helpers/validate");
const { addTaskSchema, updateTaskSchema } = require("$validators/task");
const { verifyAccessToken } = require("$middlewares/auth");
const { done } = require("$helpers/response");

function taskController(app) {
  app.post("/tasks/addtask", [verifyAccessToken], async (req, res, next) => {
    try {
      const body = req.body;
      validate(addTaskSchema, body);

      const data = await addTask(body, req.userId);
      done(res, data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/tasks/list", [verifyAccessToken], async (req, res, next) => {
    try {
      const taskList = await getTasks(req.userId);
      done(res, taskList);
    } catch (error) {
      next(error);
    }
  });

  app.get("/tasks/getdetail", [verifyAccessToken], async (req, res, next) => {
    try {
      const taskId = req.query.taskId;
      const taskDetail = await getDetailTask(taskId);
      done(res, taskDetail);
    } catch (error) {
      next(error);
    }
  });

  app.put("/tasks/update", [verifyAccessToken], async (req, res, next) => {
    try {
      const task = req.body;
      validate(updateTaskSchema, task);
      const data = await updateTask(task);
      done(res, data);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = taskController;
