const { login, register } = require("$service/auth");
const validate = require("$helpers/validate");
const { loginSchema, registerSchema } = require("$validators/auth");

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
}
module.exports = authController;
