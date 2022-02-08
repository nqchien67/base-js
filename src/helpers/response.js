function errorHandler(errorObject, req, res, next) {
  const { errorMessage, devMessage, status, payload } = errorObject;
  res.status(status || 500).send({ errorMessage, devMessage, payload });
}

function stop(errorMessage, devMessage, status = 400, payload = {}) {
  return { errorMessage, devMessage, status, payload };
}

module.exports = {
  errorHandler,
  stop,
};
