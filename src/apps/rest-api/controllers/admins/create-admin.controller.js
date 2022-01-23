const Controller = require('../controller');

const ValidationError = require('../../api-errors/bad-request/validation-error');

const CreateAdminUseCase = require('../../../../contexts/admin/application/create-admin/create-admin.use-case');
const CreateAdminCommand = require('../../../../contexts/admin/application/create-admin/create-admin-command');

const AdminName = require('../../../../contexts/admin/domain/admin-name');
const AdminSurname = require('../../../../contexts/admin/domain/admin-surname');
const AdminPassword = require('../../../../contexts/admin/domain/admin-password');
const EmailAlreadyUsedError = require('../../api-errors/conflict/email-already-used-error');
const AdminEmail = require('../../../../contexts/admin/domain/admin-email');

class CreateAdminController extends Controller {

  static #errorHandlers = {
    InvalidArgumentError: (error) => new ValidationError(undefined, error.message),
    PasswordTooShort: (error) => new ValidationError('password', error.message),
    EmailAlreadyUsed: (error) => new EmailAlreadyUsedError(error.data.emailInUse)
  };

  /** @type {CreateAdminUseCase} */
  #createAdminUseCase;

  constructor({ createAdminUseCase }) {
    super(CreateAdminController.#errorHandlers);

    this.#createAdminUseCase = createAdminUseCase;
  }

  async run(req, res, next) {
    const { name, surname, email, password, isSuperAdmin } = req.body;

    try {
      const createAdminCommand = new CreateAdminCommand({
        name: new AdminName(name),
        surname: new AdminSurname(surname),
        email: new AdminEmail(email),
        rawPassword: new AdminPassword(password),
        isSuperAdmin
      });

      const { adminId } = await this.#createAdminUseCase.run(createAdminCommand);

      return res.status(201).json({
        id: adminId.value
      });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = CreateAdminController;
