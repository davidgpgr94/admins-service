const NotEmptyStringValueObject = require('../../../shared/domain/value-objects/not-empty-string-value-object');
const AdminPassword = require('../../domain/admin-password');

class RestorePasswordCommand {

  /** @type {NotEmptyStringValueObject} */
  #token;

  /** @type {AdminPassword} */
  #newPassword;

  /** @type {AdminPassword} */
  #confirmPassword;

  constructor({ token, newPassword, confirmPassword }) {
    this.#token = token;
    this.#newPassword = newPassword;
    this.#confirmPassword = confirmPassword;
  }

  get token() {
    return this.#token;
  }

  get newPassword() {
    return this.#newPassword;
  }

  get confirmPassword() {
    return this.#confirmPassword;
  }
}

module.exports = RestorePasswordCommand;
