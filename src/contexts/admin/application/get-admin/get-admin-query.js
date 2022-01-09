const AdminId = require('../../../shared/domain/admin/admin-id');
const AdminEmail = require('../../domain/admin-email');

class GetAdminQuery {

  /** @type {AdminId} */
  #adminId;

  /** @type {AdminEmail} */
  #adminEmail;

  constructor({ adminId, adminEmail }) {
    this.#adminId = adminId;
    this.#adminEmail = adminEmail;
  }

  get adminId() {
    return this.#adminId;
  }

  get adminEmail() {
    return this.#adminEmail;
  }
}

module.exports = GetAdminQuery;
