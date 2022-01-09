const AdminId = require('../../shared/domain/admin/admin-id');
const InvalidTypeError = require('../../shared/domain/errors/invalid-type-error');
const AdminEmail = require('./admin-email');
const AdminName = require('./admin-name');
const AdminSurname = require('./admin-surname');

class AdminWithoutSensitiveFields {

  #id;
  #email;
  #name;
  #surname;
  #isEnabled;
  #isSuperAdmin;

  /**
   * @param {Object} o
   * @param {AdminId} o.id
   * @param {AdminEmail} o.email
   * @param {AdminName} o.name
   * @param {AdminSurname} o.surname
   * @param {boolean} o.isEnabled
   * @param {boolean} o.isSuperAdmin
   */
   constructor({ id, email, name, surname, isEnabled, isSuperAdmin }) {
    this.#id = id;
    this.#email = email;
    this.#name = name;
    this.#surname = surname;
    this.#isEnabled = isEnabled;
    this.#isSuperAdmin = isSuperAdmin;
  }

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }

  get isEnabled() {
    return this.#isEnabled;
  }

  get isSuperAdmin() {
    return this.#isSuperAdmin;
  }

  enable() {
    this.#isEnabled = true;
  }

  disable() {
    this.#isEnabled = false;
  }

  /** @param {AdminName} newName */
  changeName(newName) {
    if (!(newName instanceof AdminName)) throw new InvalidTypeError(newName.constructor.name, AdminName.prototype.constructor.name);

    this.#name = newName;
  }

  /** @param {AdminSurname} newSurname */
  changeSurname(newSurname) {
    if (!(newSurname instanceof AdminSurname)) throw new InvalidTypeError(newSurname.constructor.name, AdminSurname.prototype.constructor.name);

    this.#surname = newSurname;
  }

  equal(other) {
    if (!(other instanceof this.constructor)) {
      return false;
    }

    if (this.id.equal(other.id) && this.email.equal(other.email)) {
      return true;
    }

    return false;
  }
}

module.exports = AdminWithoutSensitiveFields;
