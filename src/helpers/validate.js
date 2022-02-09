const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { stop } = require("$helpers/response");
const log = require("$helpers/log");

const logger = log("Validate");

const ajv = new Ajv();
addFormats(ajv);

function validate(schemaKeyRef, data) {
  const validate = ajv.validate(schemaKeyRef, data);
  if (validate) return;
  logger.error(ajv.errors);
  throw stop(ajv.errors, "Invalid_Input", 442, {});
}

module.exports = validate;
