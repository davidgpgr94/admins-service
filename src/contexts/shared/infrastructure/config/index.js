const path = require('path');
const env = process.env.NODE_ENV || 'dev';

const dev = Object.freeze({
  jwt: {
    certAlgorithm: process.env.JWT_CERT_ALGORITHM || 'HS256'
  },
  sqlite: {
    dbFile: process.env.SQLITE_DB_FILE || path.join(__dirname, '..', '..', '..', '..', '..', '.data', 'serviceDatabase.sqlite'),
    timeout: process.env.SQLITE_TIMEOUT || 5000
  },
  logger: {
    maxLevel: 'debug',
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    },
    levelColors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'magenta'
    }
  }
});

const prod = Object.freeze({
  jwt: {
    certAlgorithm: process.env.JWT_CERT_ALGORITHM || 'HS256'
  },
  sqlite: {
    dbFile: process.env.SQLITE_DB_FILE || path.join(__dirname, '..', '..', '..', '..', '..', '.data', 'serviceDatabase.sqlite'),
    timeout: process.env.SQLITE_TIMEOUT || 5000
  },
  logger: {
    maxLevel: 'http',
    levels: {
      error: 0,
      warn: 1,
      info: 2
    },
    levelColors: {
      error: 'red',
      warn: 'yellow',
      info: 'green'
    }
  }
});

const config = Object.freeze({
  dev,
  prod
});

module.exports = config[env];
