const mongoose = require("mongoose");
const { Schema } = mongoose;
const { UserStatus } = require("$types/enum");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number, default: UserStatus.ACTIVE, required: true },
    refreshToken: { type: String },
    name: { type: String },
    avatar: { type: String },
    tasks: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
