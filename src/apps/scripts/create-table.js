require('dotenv').config();

const { createContainer } = require('./container');

(async () => {
  const container = await createContainer();

  const sqliteDbHandler = container.resolve('sqliteDbHandler');

  const db = sqliteDbHandler.getInstance();

  try {
    const createTableStatement = db.prepare(`
      CREATE TABLE admins (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        password TEXT NOT NULL,
        is_enabled TINYINT NOT NULL DEFAULT 1,
        is_super_admin TINYINT NOT NULL DEFAULT 0
      );
    `);
    createTableStatement.run();
  } catch(err) {
    console.error(err);
  }
  sqliteDbHandler.disconnect();
})();
