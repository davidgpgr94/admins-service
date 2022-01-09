const AdminEmail = require('../../domain/admin-email');
const AdminPassword = require('../../domain/admin-password');

class CheckCredentialsQuery {

  /** @type {AdminEmail} */
  #email;

  /** @type {AdminPassword} */
  #rawPassword;

  constructor({ email, rawPassword }) {
    this.#email = email;
    this.#rawPassword = rawPassword;
  }

  get email() {
    return this.#email;
  }

  get rawPassword() {
    return this.#rawPassword;
  }
}

module.exports = CheckCredentialsQuery;
