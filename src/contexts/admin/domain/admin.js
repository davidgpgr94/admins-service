const AdminId = require('../../shared/domain/admin/admin-id');
const AdminEmail = require('./admin-email');
const AdminName = require('./admin-name');
const AdminSurname = require('./admin-surname');
const AdminPassword = require('./admin-password');
const AdminWithoutSensitiveFields = require('./admin-without-sensitive-fields');

class Admin extends AdminWithoutSensitiveFields {

  #password;

  /**
   * @param {Object} o
   * @param {AdminId} o.id
   * @param {AdminEmail} o.email
   * @param {AdminName} o.name
   * @param {AdminSurname} o.surname
   * @param {AdminPassword} o.password
   * @param {boolean} o.isEnabled
   * @param {boolean} o.isSuperAdmin
   */
  constructor({ id, email, name, surname, password, isEnabled, isSuperAdmin }) {
    super({ id, email, name, surname, isEnabled, isSuperAdmin });
    this.#password = password;
  }

  get password() {
    return this.#password;
  }

  /** @param {AdminPassword} newHashedPassword */
  changePassword(newHashedPassword) {
    this.#password = newHashedPassword;
  }

  clone() {
    const { id, email, password, name, surname, isEnabled, isSuperAdmin } = this;

    return new Admin({
      id: id.clone(),
      email: email.clone(),
      name: name.clone(),
      surname: surname.clone(),
      password: password.clone(),
      isEnabled: isEnabled,
      isSuperAdmin: isSuperAdmin
    });
  }
}

module.exports = Admin;
