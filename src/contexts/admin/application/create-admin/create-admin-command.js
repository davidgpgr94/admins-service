const AdminName = require('../../domain/admin-name');
const AdminSurname = require('../../domain/admin-surname');
const AdminEmail = require('../../domain/admin-email');
const AdminPassword = require('../../domain/admin-password');

class CreateAdminCommand {

  #name;
  #surname;
  #email;
  #rawPassword;
  #isSuperAdmin;

  /**
   * @param {Object} o
   * @param {AdminName} o.name
   * @param {AdminSurname} o.surname
   * @param {AdminEmail} o.email
   * @param {AdminPassword} o.rawPassword
   * @param {boolean} o.isSuperAdmin
   */
  constructor({name, surname, email, rawPassword, isSuperAdmin}) {
    this.#name = name;
    this.#surname = surname;
    this.#email = email;
    this.#rawPassword = rawPassword;
    this.#isSuperAdmin = isSuperAdmin;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }

  get email() {
    return this.#email;
  }

  get rawPassword() {
    return this.#rawPassword;
  }

  get isSuperAdmin() {
    return this.#isSuperAdmin;
  }
}

module.exports = CreateAdminCommand;
