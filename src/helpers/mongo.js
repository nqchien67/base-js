const mongoose = require("mongoose");
const log = require("$helpers/log");
const logger = log("Mongo connect");

function createMongoConnection() {
  logger.info("Connecting to mongo DB...");
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URI, {});

    mongoose.connection.on("connected", function () {
      logger.info("Mongoose connected");
      return resolve(true);
    });

    mongoose.connection.on("error", function (err) {
      logger.error("Cannot connect to mongodb");
      return reject(err);
    });

    mongoose.connection.on("disconnected", function () {
      logger.info("Mongoose disconnected");
    });
  });
}

module.exports = createMongoConnection;
