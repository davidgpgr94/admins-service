const Controller = require('../controller');

const RestorePassword = require('../../../../contexts/admin/application/restore-password/restore-password');
const RestorePasswordCommand = require('../../../../contexts/admin/application/restore-password/restore-password-command');
const NotEmptyStringValueObject = require('../../../../contexts/shared/domain/value-objects/not-empty-string-value-object');
const AdminPassword = require('../../../../contexts/admin/domain/admin-password');
const InvalidRestorePasswordToken = require('../../api-errors/bad-request/invalid-restore-password-token');

class RestorePasswordController extends Controller {
  static #errorHandlers = {
    EncryptedTokenNotValid: (_) => new InvalidRestorePasswordToken(),
    AdminNotFound: (_) => new InvalidRestorePasswordToken()
  };

  /** @type {RestorePassword} */
  #restorePasswordUseCase;

  constructor({ restorePasswordUseCase }) {
    super(RestorePasswordController.#errorHandlers);

    this.#restorePasswordUseCase = restorePasswordUseCase;
  }

  async run(req, res, next) {
    const { token } = req.query;
    const { newPassword, confirmPassword } = req.body;

    try {
      const restorePasswordCommand = new RestorePasswordCommand({
        token: new NotEmptyStringValueObject(token),
        newPassword: new AdminPassword(newPassword),
        confirmPassword: new AdminPassword(confirmPassword)
      });

      const { wasRestored } = await this.#restorePasswordUseCase.run(restorePasswordCommand);

      return res.status(200).json({ wasRestored });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = RestorePasswordController;
