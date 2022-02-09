function errorHandler(errorObject, req, res, next) {
  const { errorMessage, devMessage, status, payload } = errorObject;
  res.status(status || 500).send({ errorMessage, devMessage, payload });
}

function stop(errorMessage, devMessage, status = 400, payload = {}) {
  return { errorMessage, devMessage, status, payload };
}

function done(res, data, status = 200) {
  res.status(status).send(data);
}

module.exports = {
  errorHandler,
  stop,
  done,
};
