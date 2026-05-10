// ── Logger ────────────────────────────────────────────────────
const pino       = require('pino');
const { LOG_LEVEL } = require('../config');

const logger = pino({
  level: LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

module.exports = logger;
