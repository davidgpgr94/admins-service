const AdminId = require('../../../shared/domain/admin/admin-id');
const AdminName = require('../../domain/admin-name');
const AdminSurname = require('../../domain/admin-surname');

class EditAdminCommand {
  #adminId;
  #name;
  #surname;

  /**
   * @param {Object} o
   * @param {AdminId} o.adminId
   * @param {AdminName|undefined} o.name
   * @param {AdminSurname|undefined} o.surname
   */
  constructor({ adminId, name, surname }) {
    this.#adminId = adminId;
    this.#name = name;
    this.#surname = surname;
  }

  get adminId() {
    return this.#adminId;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }
}

module.exports = EditAdminCommand;
