const rateLimit = require("express-rate-limit");
const config = require("$config");

function limiter(
  max = config.LIMITER.max || 100,
  ms = config.LIMITER.windowMs || 90000
) {
  return rateLimit({
    windowMs: ms,
    max: max,
    messeage: `{
        "success": false,
        "errorCode": -1,
        "errorMessage": "Maxinum_Request",
        "data": null
    }`,
  });
}

module.exports = limiter;
