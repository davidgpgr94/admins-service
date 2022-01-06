const SqliteDb = require('better-sqlite3');

const { sqlite:sqliteConfig } = require('../config');

let instance;

const sqliteDbHandler = (() => {
  const createInstance = () => {
    return new SqliteDb(sqliteConfig.dbFile, { timeout: sqliteConfig.timeout });
  }

  return {
    getInstance: () => {
      if (!instance) instance = createInstance();

      return instance;
    },
    disconnect: () => {
      if (instance) instance.close();

      instance = null;
    }
  }
});

module.exports = sqliteDbHandler;
