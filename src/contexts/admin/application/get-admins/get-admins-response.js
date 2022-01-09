const AdminWithoutSensitiveFields = require('../../domain/admin-without-sensitive-fields');

class GetAdminsResponse {

  /** @type {AdminWithoutSensitiveFields[]} */
  #admins;

  /** @type {Number} */
  #totalAdmins;

  constructor({ admins, totalAdmins }) {
    this.#admins = admins;
    this.#totalAdmins = totalAdmins;
  }

  get admins() {
    return this.#admins;
  }

  get totalAdmins() {
    return this.#totalAdmins;
  }

}

module.exports = GetAdminsResponse;
