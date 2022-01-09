const AdminWithoutSensitiveFields = require('../../domain/admin-without-sensitive-fields');

class GetAdminResponse {

  /** @type {AdminWithoutSensitiveFields|null} */
  #admin;

  constructor({ admin }) {
    this.#admin = admin;
  }

  get admin() {
    return this.#admin;
  }
}

module.exports = GetAdminResponse;
