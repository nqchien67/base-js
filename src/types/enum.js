const ErrorCode = {
  Unknown_Error: "Unknown_Error",
  Invalid_Input: "Invalid_Input",
  Missing_Access_Token_In_Header: "Missing_Access_Token_In_Header",
  Token_Expired: "Token_Expired",
  Refresh_Token_Expired: "Refresh_Token_Expired",
  Email_Address_Not_Exist: "Email_Address_Not_Exist",
  Email_Address_Already_Exist: "Email_Address_Already_Exist",
  User_Blocked: "User_Blocked",
  Password_Incorrect: "Password_Incorrect",
  User_Not_Found: "User_Not_Found",
};
const TokenType = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};
const UserStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
const IsPublicProfile = {
  PUBLIC: 1,
  NOT_PUBLIC: 0,
};

module.exports = {
  ErrorCode,
  TokenType,
  UserStatus,
  IsPublicProfile,
};
