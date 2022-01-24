function errorHandler(errorObject, req, res, next) {
  const { errorMessage, devMessage, status, payload } = errorObject;
  res.status(status || 500).send({ errorMessage, devMessage, payload });
}

function stop(errorMessage, devMessage, payload = {}, status = 400) {
  return { errorMessage, devMessage, status, payload };
}

module.exports = {
  errorHandler,
  stop,
};
