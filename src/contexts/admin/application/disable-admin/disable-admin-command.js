const AdminId = require('../../../shared/domain/admin/admin-id');

class DisableAdminCommand {

  /** @type {AdminId} */
  #adminId;

  constructor({ adminId }) {
    this.#adminId = adminId;
  }

  get adminId() {
    return this.#adminId;
  }
}

module.exports = DisableAdminCommand;
