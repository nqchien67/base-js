const mongoose = require("mongoose");

function createMongoConnection() {
  console.log("Connecting to mongo DB...");
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URI, {});

    mongoose.connection.on("connected", function () {
      console.log("Mongoose connected");
      return resolve(true);
    });

    mongoose.connection.on("error", function (err) {
      console.log("Cannot connect to mongodb");
      return reject(err);
    });

    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose disconnected");
    });
  });
}

module.exports = createMongoConnection;
