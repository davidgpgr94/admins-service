const Admin = require('../../domain/admin');
const AdminEmail = require('../../domain/admin-email');
const AdminId = require('../../domain/admin-id');
const AdminName = require('../../domain/admin-name');
const AdminPassword = require('../../domain/admin-password');
const AdminSurname = require('../../domain/admin-surname');

class SqliteAdminParser {
  /** @param {Admin} admin */
  toSqlite(admin) {
    return {
      id: admin.id.value,
      email: admin.email.value,
      name: admin.name.value,
      surname: admin.surname.value,
      password: admin.password.value,
      is_enabled: (admin.isEnabled === false) ? 0 : 1,
      is_super_admin: (admin.isSuperAdmin === false) ? 0 : 1
    }
  }

  /** @returns {Admin} */
  toAdmin(sqliteAdmin) {
    const { id, email, name, surname, password, is_enabled:isEnabled, is_super_admin:isSuperAdmin } = sqliteAdmin;

    return new Admin({
      id: new AdminId(id),
      email: new AdminEmail(email),
      name: new AdminName(name),
      surname: new AdminSurname(surname),
      password: new AdminPassword(password),
      isEnabled: !!isEnabled,
      isSuperAdmin: !!isSuperAdmin
    });
  }
}

module.exports = SqliteAdminParser;
