const AdminId = require('../../../shared/domain/admin/admin-id');

class CreateAdminResponse {

  #adminId;

  /**
   * @param {Object} o
   * @param {AdminId} o.adminId
   */
  constructor({adminId}) {
    this.#adminId = adminId;
  }

  get adminId() {
    return this.#adminId;
  }
}

module.exports = CreateAdminResponse;
