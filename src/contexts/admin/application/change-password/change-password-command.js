const AdminId = require('../../../shared/domain/admin/admin-id');
const AdminPassword = require('../../domain/admin-password');

class ChangePasswordCommand {

  /** @type {AdminId} */
  #adminId;
  /** @type {AdminPassword} */
  #oldPassword;
  /** @type {AdminPassword} */
  #newPassword;
  /** @type {AdminPassword} */
  #confirmPassword;

  constructor({ adminId, oldPassword, newPassword, confirmPassword }) {
    this.#adminId = adminId;
    this.#oldPassword = oldPassword;
    this.#newPassword = newPassword;
    this.#confirmPassword = confirmPassword;
  }

  get adminId() {
    return this.#adminId;
  }

  get oldPassword() {
    return this.#oldPassword;
  }

  get newPassword() {
    return this.#newPassword;
  }

  get confirmPassword() {
    return this.#confirmPassword;
  }
}

module.exports = ChangePasswordCommand;
