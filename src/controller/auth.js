const { login, register, changePassword } = require("$service/auth");
const validate = require("$helpers/validate");
const {
  loginSchema,
  registerSchema,
  changePasswordSchema,
} = require("$validators/auth");
const { verifyAccessToken } = require("$middlewares/auth");

function authController(app) {
  app.get("/auth/login", async (req, res, next) => {
    const body = req.body;
    try {
      validate(loginSchema, body);
      res.status(200).send(await login(body));
    } catch (error) {
      next(error);
    }
  });

  app.post("/auth/register", async (req, res, next) => {
    const body = req.body;
    try {
      validate(registerSchema, body);
      res.status(200).send(await register(body));
    } catch (error) {
      next(error);
    }
  });

  app.put(
    "/auth/change-password",
    [verifyAccessToken],
    async (req, res, next) => {
      try {
        const body = req.body;

        validate(changePasswordSchema, body);

        const result = await changePassword(body, req.userId);
        res.status(200).send(result);
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = authController;
