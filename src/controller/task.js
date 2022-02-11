const { addTask, getTasks } = require("$service/task");
const validate = require("$helpers/validate");
const addTaskSchema = require("$validators/task");
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
}

module.exports = taskController;
