const { stop } = require("$helpers/response");
const { ErrorCode } = require("$types/enum");
const UserModel = require("$models/UserModel");

async function login(params) {
  const { email, password } = params;
  const User = await UserModel.findOne({ email: email }, [
    "_id",
    "email",
    "password",
  ]);

  if (!User) {
    throw stop("Email not exist", ErrorCode.Email_Address_Not_Exist);
  }

  if (User.password !== password) {
    throw stop("Sai", ErrorCode.Password_Incorrect);
  }

  return email;
}

async function register(params) {
  const { email, password } = params;
  console.log(email);
  const oldUser = await UserModel.findOne({ email: email }, ["_id"]);

  if (oldUser) {
    throw stop("Email already exist", ErrorCode.Email_Address_Already_Exist);
  }

  const User = new UserModel({ email, password });
  User.save();

  return "success";
}

module.exports = { login, register };
