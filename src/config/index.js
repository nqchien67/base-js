module.exports = {
  SERVER: {
    PORT: process.env.PORT,
  },
  LIMITER: {
    max: process.env.MAX_REQUEST,
    windowMs: process.env.WINDOW_MS,
  },
  AUTH: {
    SECRET: process.env.AUTH_SECRET,
    SALT_ROUND: Number(process.env.SALT_ROUND),
    TOKEN_TTL: process.env.TOKEN_TTL,
    REFRES_TOKEN_TTL: process.env.REFRES_TOKEN_TTL,
  },
};
