const Controller = require('../controller');

const RequestRestorePassword = require('../../../../contexts/admin/application/request-restore-password/request-restore-password');
const RequestRestorePasswordCommand = require('../../../../contexts/admin/application/request-restore-password/request-restore-password-command');
const AdminEmail = require('../../../../contexts/admin/domain/admin-email');
const AdminNotFoundByEmail = require('../../api-errors/not-found/admin-not-found-by-email');

class RequestRestorePasswordController extends Controller {
  static #errorHandlers = {
    AdminNotFound: (error) => new AdminNotFoundByEmail(error?.data?.adminEmail)
  };

  /** @type {RequestRestorePassword} */
  #requestRestorePasswordUseCase;

  constructor({ requestRestorePasswordUseCase }) {
    super(RequestRestorePasswordController.#errorHandlers);

    this.#requestRestorePasswordUseCase = requestRestorePasswordUseCase;
  }

  async run(req, res, next) {
    const { email } = req.body;

    try {
      const requestRestorePasswordCommnad = new RequestRestorePasswordCommand({
        adminEmail: new AdminEmail(email)
      });

      const { token } = await this.#requestRestorePasswordUseCase.run(requestRestorePasswordCommnad);

      return res.status(200).json({ token: token.toString() });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = RequestRestorePasswordController;
