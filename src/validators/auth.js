const loginSchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
  },
};

const registerSchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
  },
};

const changePasswordSchema = {
  type: "object",
  required: ["oldPassword", "newPassword"],
  additionalProperties: false,
  properties: {
    oldPassword: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
    newPassword: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
  },
};

const getUserByEmailSchema = {
  type: "string",
  format: "email",
};

module.exports = {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  getUserByEmailSchema,
};
