const AdminWithoutSensitiveFields = require('../../domain/admin-without-sensitive-fields');

class EditAdminResponse {

  #adminEdited;

  /**
   * @param {Object} o
   * @param {AdminWithoutSensitiveFields} o.adminEdited
   */
   constructor({ adminEdited }) {
    this.#adminEdited = adminEdited;
  }

  get adminEdited() {
    return this.#adminEdited;
  }
}

module.exports = EditAdminResponse;
