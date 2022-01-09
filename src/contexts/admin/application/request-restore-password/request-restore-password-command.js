const AdminEmail = require('../../domain/admin-email');

class RequestRestorePasswordCommand {

  /** @type {AdminEmail} */
  #adminEmail;

  constructor({ adminEmail }) {
    this.#adminEmail = adminEmail;
  }

  get adminEmail() {
    return this.#adminEmail;
  }
}

module.exports = RequestRestorePasswordCommand;
