const { stop } = require("$helpers/response");
const { ErrorCode, TokenType } = require("$types/enum");
const UserModel = require("$models/UserModel");
const { compareSync, hashSync } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const config = require("$config");

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

  const isCorrectPassword = compareSync(password, User.password);
  if (!isCorrectPassword) {
    throw stop(ErrorCode.Password_Incorrect, "Sai mk");
  }

  const token = generateToken({
    _id: String(User._id),
    refreshToken: User.refreshToken,
  });
  User.refreshToken = token.refreshToken;
  await User.save();

  return token;
}

async function register(params) {
  const { email, password } = params;
  const oldUser = await UserModel.findOne({ email: email }, ["_id"]);

  if (oldUser) {
    throw stop("Email already exist", ErrorCode.Email_Address_Already_Exist);
  }

  const passwordHash = hashSync(password, config.AUTH.SALT_ROUND);
  const User = new UserModel({ email, password: passwordHash });
  const result = await User.save();

  const token = generateToken({
    _id: String(result._id),
    refreshToken: "",
  });

  User.refreshToken = token.refreshToken;
  await User.save();

  return token;
}

async function changePassword(params, userId) {
  const { newPassword, oldPassword } = params;
  const User = await UserModel.findOne({ _id: userId }, ["_id", "password"]);

  if (!User) {
    throw stop(ErrorCode.User_Not_Found, "Đéo thấy User");
  }

  const isCorrectPassword = compareSync(oldPassword, User.password);

  if (!isCorrectPassword) {
    throw stop(ErrorCode.Password_Incorrect);
  }

  const newPasswordHash = hashSync(newPassword, config.AUTH.SALT_ROUND);
  User.password = newPasswordHash;

  await User.save();

  return newPassword;
}

function generateToken({ _id, refreshToken }) {
  const result = {};

  Object.assign(result, { token: generateAccessToken({ _id }) });

  try {
    const payload = verify(refreshToken, config.ACCESS_TOKEN, {
      algorithms: "HS256",
    });
    if (payload.type !== TokenType.REFRESH_TOKEN)
      throw stop(ErrorCode.Refresh_Token_Expired);

    Object.assign(result, { refreshToken });
  } catch (error) {
    Object.assign(result, { refreshToken: createCmsRefreshToken({ _id }) });
  }

  return result;
}

function generateAccessToken({ _id }) {
  return sign({ _id, type: TokenType.ACCESS_TOKEN }, config.AUTH.SECRET, {
    algorithm: "HS256",
    expiresIn: config.AUTH.TOKEN_TTL,
  });
}

function createCmsRefreshToken({ _id }) {
  return sign({ _id, type: TokenType.REFRESH_TOKEN }, config.AUTH.SECRET, {
    algorithm: "HS256",
    expiresIn: config.AUTH.REFRES_TOKEN_TTL,
  });
}

async function getUsers() {
  const users = await UserModel.find({}, {});

  return users;
}

async function getUserByEmail(email) {
  const user = await UserModel.findOne({ email: email }, ["_id"]);
  if (!user) {
    throw stop("Không có", "Đéo có");
  }
  return user;
}

module.exports = { login, register, changePassword, getUsers, getUserByEmail };
