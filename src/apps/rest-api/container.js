const awilix = require('awilix');
const path = require('path');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Domain services/helpers
const AdminSensitiveFieldsFilter = require('../../contexts/admin/domain/services/admin-sensitive-fields-filter');

const SqliteAdminRepository = require('../../contexts/admin/infrastructure/services/sqlite-admin-repository');
const sqliteDbHandler = require('../../contexts/shared/infrastructure/persistence/sqlite-db-handler');
const SqliteAdminParser = require('../../contexts/admin/infrastructure/services/sqlite-admin-parser');
const BcryptPasswordEncryptor = require('../../contexts/admin/infrastructure/services/bcrypt-password-encryptor');
const JwtTokenEncryptor = require('../../contexts/shared/infrastructure/token/services/jwt-token-encryptor');

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    logger: awilix.asClass(WinstonLogger).singleton(),

    // admin-services
    passwordEncryptor: awilix.asClass(BcryptPasswordEncryptor),
    adminSensitiveFieldsFilter: awilix.asClass(AdminSensitiveFieldsFilter),
    tokenEncryptor: awilix.asClass(JwtTokenEncryptor),

    // admin-persistence
    adminRepository: awilix.asClass(SqliteAdminRepository),
    sqliteAdminParser: awilix.asClass(SqliteAdminParser),

    // shared-persistence
    sqliteDbHandler: awilix.asFunction(sqliteDbHandler).singleton(),
  });

  // Use cases
  container.loadModules(
    [
      './**/application/**/*.use-case.js'
    ],
    {
      cwd: path.join(__dirname, '..', '..', 'contexts'),
      formatName: 'camelCase',
      resolverOptions: {
        register: awilix.asClass
      }
    }
  );

  // Api controllers and serializers
  container.loadModules(
    [
      './controllers/**/*.controller.js',
      './serializers/**/*.serializer.js'
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
