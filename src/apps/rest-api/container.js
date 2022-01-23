const awilix = require('awilix');

const WinstonLogger = require('../../contexts/shared/infrastructure/logger/winston-logger');

// Domain services/helpers
const AdminSensitiveFieldsFilter = require('../../contexts/admin/domain/services/admin-sensitive-fields-filter');

// Use Cases
const CheckCredentialsUseCase = require('../../contexts/admin/application/check-credentials/check-credentials.use-case');
const CreateAdminUseCase = require('../../contexts/admin/application/create-admin/create-admin.use-case');
const GetAdminsUseCase = require('../../contexts/admin/application/get-admins/get-admins.use-case');
const GetAdminUseCase = require('../../contexts/admin/application/get-admin/get-admin.use-case');
const EnableAdminUseCase = require('../../contexts/admin/application/enable-admin/enable-admin.use-case');
const DisableAdminUseCase = require('../../contexts/admin/application/disable-admin/disable-admin.use-case');
const EditAdminUseCase = require('../../contexts/admin/application/edit-admin/edit-admin.use-case');
const ChangePasswordUseCase = require('../../contexts/admin/application/change-password/change-password.use-case');
const RequestRestorePasswordUseCase = require('../../contexts/admin/application/request-restore-password/request-restore-password.use-case');
const RestorePasswordUseCase = require('../../contexts/admin/application/restore-password/restore-password.use-case');

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

    // use cases
    checkCredentialsUseCase: awilix.asClass(CheckCredentialsUseCase),
    createAdminUseCase: awilix.asClass(CreateAdminUseCase),
    getAdminsUseCase: awilix.asClass(GetAdminsUseCase),
    getAdminUseCase: awilix.asClass(GetAdminUseCase),
    enableAdminUseCase: awilix.asClass(EnableAdminUseCase),
    disableAdminUseCase: awilix.asClass(DisableAdminUseCase),
    editAdminUseCase: awilix.asClass(EditAdminUseCase),
    changePasswordUseCase: awilix.asClass(ChangePasswordUseCase),
    requestRestorePasswordUseCase: awilix.asClass(RequestRestorePasswordUseCase),
    restorePasswordUseCase: awilix.asClass(RestorePasswordUseCase),

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
