const awilix = require('awilix');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Domain services/helpers
const AdminSensitiveFieldsFilter = require('../../contexts/admin/domain/services/admin-sensitive-fields-filter');

// Use Cases
const CheckCredentials = require('../../contexts/admin/application/check-credentials/check-credentials');
const CreateAdmin = require('../../contexts/admin/application/create-admin/create-admin');
const GetAdmins = require('../../contexts/admin/application/get-admins/get-admins');
const GetAdmin = require('../../contexts/admin/application/get-admin/get-admin');

const SqliteAdminRepository = require('../../contexts/admin/infrastructure/services/sqlite-admin-repository');
const sqliteDbHandler = require('../../contexts/shared/infrastructure/persistence/sqlite-db-handler');
const SqliteAdminParser = require('../../contexts/admin/infrastructure/services/sqlite-admin-parser');
const BcryptPasswordEncryptor = require('../../contexts/admin/infrastructure/services/bcrypt-password-encryptor');
const EnableAdmin = require('../../contexts/admin/application/enable-admin/enable-admin');
const DisableAdmin = require('../../contexts/admin/application/disable-admin/disable-admin');

async function createContainer() {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    logger: awilix.asClass(WinstonLogger).singleton(),

    // use cases
    checkCredentialsUseCase: awilix.asClass(CheckCredentials),
    createAdminUseCase: awilix.asClass(CreateAdmin),
    getAdminsUseCase: awilix.asClass(GetAdmins),
    getAdminUseCase: awilix.asClass(GetAdmin),
    enableAdminUseCase: awilix.asClass(EnableAdmin),
    disableAdminUseCase: awilix.asClass(DisableAdmin),

    // admin-services
    passwordEncryptor: awilix.asClass(BcryptPasswordEncryptor),
    adminSensitiveFieldsFilter: awilix.asClass(AdminSensitiveFieldsFilter),

    // admin-persistence
    adminRepository: awilix.asClass(SqliteAdminRepository),
    sqliteAdminParser: awilix.asClass(SqliteAdminParser),

    // shared-persistence
    sqliteDbHandler: awilix.asFunction(sqliteDbHandler).singleton(),
  });

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
