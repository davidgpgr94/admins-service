const AdminId = require('../../../shared/domain/admin/admin-id');

class EnableAdminCommand {

  /** @type {AdminId} */
  #adminId;

  constructor({ adminId }) {
    this.#adminId = adminId;
  }

  get adminId() {
    return this.#adminId;
  }
}

module.exports = EnableAdminCommand;
