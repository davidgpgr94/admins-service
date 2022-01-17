const awilix = require('awilix');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Use Cases
const CheckCredentials = require('../../contexts/admin/application/check-credentials/check-credentials');
const CreateAdmin = require('../../contexts/admin/application/create-admin/create-admin');

const SqliteAdminRepository = require('../../contexts/admin/infrastructure/services/sqlite-admin-repository');
const sqliteDbHandler = require('../../contexts/shared/infrastructure/persistence/sqlite-db-handler');
const SqliteAdminParser = require('../../contexts/admin/infrastructure/services/sqlite-admin-parser');
const BcryptPasswordEncryptor = require('../../contexts/admin/infrastructure/services/bcrypt-password-encryptor');

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    logger: awilix.asClass(WinstonLogger).singleton(),

    // use cases
    checkCredentialsUseCase: awilix.asClass(CheckCredentials),
    createAdminUseCase: awilix.asClass(CreateAdmin),

    // admin-services
    passwordEncryptor: awilix.asClass(BcryptPasswordEncryptor),

    // admin-persistence
    adminRepository: awilix.asClass(SqliteAdminRepository),
    sqliteAdminParser: awilix.asClass(SqliteAdminParser),

    // shared-persistence
    sqliteDbHandler: awilix.asFunction(sqliteDbHandler).singleton(),
  });

  container.loadModules(
    [
      './controllers/**/*.controller.js'
    ],
    {
      cwd: __dirname,
      formatName: 'camelCase',
      resolverOptions: {
        register: awilix.asClass
      }
    }
  );

  return container;
}

module.exports = {
  createContainer
}
