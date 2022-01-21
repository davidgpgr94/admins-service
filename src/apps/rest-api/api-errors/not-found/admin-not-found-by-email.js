const NotFound = require('./not-found');

const { ADMIN_NOT_FOUND_BY_EMAIL } = require('../api-error-codes');
const AdminEmail = require('../../../../contexts/admin/domain/admin-email');

class AdminNotFoundByEmail extends NotFound {

  /** @param {AdminEmail} adminEmail */
  constructor(adminEmail) {
    super(ADMIN_NOT_FOUND_BY_EMAIL, `Admin with email '${adminEmail.toString()}' not found`, { email: adminEmail.value });
  }
}

module.exports = AdminNotFoundByEmail;
