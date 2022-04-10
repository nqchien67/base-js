const { stop } = require("$helpers/response");
const { ErrorCode, TokenType } = require("$types/enum");
const config = require("$config");
const { verify } = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  try {
    const bearerToken = req.header("authorization") || "";

    if (!bearerToken) {
      throw stop(ErrorCode.Token_Not_Exist, "Không có Token");
    }

    const token = bearerToken.replace("Bearer ", "");

    const decoded = verify(token, config.AUTH.SECRET, { algorithms: "HS256" });
    if (decoded.type === TokenType.ACCESS_TOKEN) {
      Object.assign(req, {
        userId: decoded._id,
      });
      return next();
    }
    throw stop(ErrorCode.Token_Expired, "Token expired", 401);
  } catch (error) {
    next(stop(ErrorCode.Token_Expired, "Token expired", 401));
  }
}

module.exports = {
  verifyAccessToken,
};
