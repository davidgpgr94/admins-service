const winston = require('winston');
const Logger = require('../../domain/logger/logger');

const { logger:loggerConfig } = require('../config');

class WinstonLogger extends Logger {
  #logger;

  constructor() {
    super();
    this.#logger = winston.createLogger({
      levels: loggerConfig.levels,
      level: loggerConfig.maxLevel,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
            winston.format.colorize({ colors: loggerConfig.levelColors }),
            winston.format.printf( (info) => `${info.timestamp} ${info.level}: ${info.message}${info.metadata ? ` ${JSON.stringify(info.metadata)}` : ''}` )
          )
        })
      ],
      exitOnError: false
    });
  }

  info(message, metadata) {
    this.#logger.info({message, metadata});
  }

  debug(message, metadata) {
    this.#logger.debug({message, metadata});
  }

  error(message, metadata) {
    this.#logger.error({message, metadata});
  }

  warn(message, metadata) {
    this.#logger.warn({message, metadata});
  }
}

module.exports = WinstonLogger;
