const Controller = require('../controller');

const AdminNotFoundById = require('../../api-errors/not-found/admin-not-found-by-id');
const IncorrectPassword = require('../../api-errors/bad-request/incorrect-password');
const IncorrectConfirmationPassword = require('../../api-errors/bad-request/incorrect-confirmation-password');

const ChangePasswordUseCase = require('../../../../contexts/admin/application/change-password/change-password.use-case');
const ChangePasswordCommand = require('../../../../contexts/admin/application/change-password/change-password-command');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');
const AdminPassword = require('../../../../contexts/admin/domain/admin-password');

class ChangeAdminPasswordController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundById(error?.data?.adminId),
    InvalidPasswordError: (_) => new IncorrectPassword(),
    PasswordConfirmationNotMatch: (_) => new IncorrectConfirmationPassword()
  };

  /** @type {ChangePasswordUseCase} */
  #changePasswordUseCase;

  constructor({ changePasswordUseCase }) {
    super(ChangeAdminPasswordController.#errorHandlers);

    this.#changePasswordUseCase = changePasswordUseCase;
  }

  async run(req, res, next) {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { adminId:adminIdString } = req.params;

    try {
      const adminId = new AdminId(adminIdString);

      const changePasswordCommand = new ChangePasswordCommand({
        adminId,
        oldPassword: new AdminPassword(currentPassword),
        newPassword: new AdminPassword(newPassword),
        confirmPassword: new AdminPassword(confirmPassword)
      });

      const { wasChanged } = await this.#changePasswordUseCase.run(changePasswordCommand);

      return res.status(200).json({ passwordChanged: wasChanged });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = ChangeAdminPasswordController;
