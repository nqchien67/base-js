require("module-alias/register");
require("dotenv").config();
const express = require("express");
const config = require("$config");
const limiter = require("$middlewares/limiter");
const authController = require("$controller/auth");
const taskController = require("$controller/task");
const { errorHandler } = require("$helpers/response");
const createMongoConnection = require("$helpers/mongo");
const http = require("http");

const app = express();
const server = http.createServer(app);

createMongoConnection()
  .then(() => {
    app.use(limiter());

    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    taskController(app);
    authController(app);

    app.use(errorHandler);

    server.listen(config.SERVER.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
