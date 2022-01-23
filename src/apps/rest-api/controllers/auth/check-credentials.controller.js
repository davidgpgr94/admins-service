const Controller = require('../controller');

const ValidationError = require('../../api-errors/bad-request/validation-error');

const CheckCredentialsUseCase = require('../../../../contexts/admin/application/check-credentials/check-credentials.use-case');
const CheckCredentialsQuery = require('../../../../contexts/admin/application/check-credentials/check-credentials-query');

const AdminEmail = require('../../../../contexts/admin/domain/admin-email');
const AdminPassword = require('../../../../contexts/admin/domain/admin-password');

class CheckCredentialsController extends Controller {

  static #errorHandlers = {
    InvalidArgumentError: (error) => new ValidationError(undefined, error.message)
  };

  /** @type {CheckCredentialsUseCase} */
  #checkCredentialsUseCase;

  constructor({ checkCredentialsUseCase }) {
    super(CheckCredentialsController.#errorHandlers);

    this.#checkCredentialsUseCase = checkCredentialsUseCase;
  }

  async run(req, res, next) {
    const { email, password } = req.body;

    try {
      const checkCredentialsQuery = new CheckCredentialsQuery({
        email: new AdminEmail(email),
        rawPassword: new AdminPassword(password)
      });

      const { areCorrect } = await this.#checkCredentialsUseCase.run(checkCredentialsQuery);

      return res.status(200).json({ areCorrect });
    } catch (error) {
      return next(this.errorHandler(error));
    }
  }
}

module.exports = CheckCredentialsController;
