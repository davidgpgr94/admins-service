const Admin = require('../admin');
const AdminWithoutSensitiveFields = require('../admin-without-sensitive-fields');

class AdminSensitiveFieldsFilter {
  /**
   * @param {Admin} admin
   * @returns {AdminWithoutSensitiveFields}
   */
  filter(admin) {
    const { id, name, surname, email, isEnabled, isSuperAdmin } = admin;

    return new AdminWithoutSensitiveFields({
      id: id.clone(),
      name: name.clone(),
      surname: surname.clone(),
      email: email.clone(),
      isEnabled,
      isSuperAdmin
    });
  }
}

module.exports = AdminSensitiveFieldsFilter;
