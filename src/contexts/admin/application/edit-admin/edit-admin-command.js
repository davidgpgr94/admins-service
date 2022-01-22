const AdminId = require('../../../shared/domain/admin/admin-id');
const AdminName = require('../../domain/admin-name');
const AdminSurname = require('../../domain/admin-surname');

class EditAdminCommand {
  #adminId;
  #name;
  #surname;
  #isSuperAdmin;

  /**
   * @param {Object} o
   * @param {AdminId} o.adminId
   * @param {AdminName|undefined} o.name
   * @param {AdminSurname|undefined} o.surname
   * @param {boolean|undefined} o.isSuperAdmin
   */
  constructor({ adminId, name, surname, isSuperAdmin }) {
    this.#adminId = adminId;
    this.#name = name;
    this.#surname = surname;
    this.#isSuperAdmin = isSuperAdmin;
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

  get isSuperAdmin() {
    return this.#isSuperAdmin;
  }
}

module.exports = EditAdminCommand;
