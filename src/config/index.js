module.exports = {
  SERVER: {
    PORT: process.env.PORT,
  },
  LIMITER: {
    max: process.env.MAX_REQUEST,
    windowMs: process.env.WINDOW_MS,
  },
};
