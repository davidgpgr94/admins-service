const NotFound = require('./not-found');

const { ADMIN_NOT_FOUND_BY_ID } = require('../api-error-codes');

const AdminId = require('../../../../contexts/shared/domain/admin/admin-id');

class AdminNotFoundById extends NotFound {

  /** @param {AdminId} adminId */
  constructor(adminId) {
    super(ADMIN_NOT_FOUND_BY_ID, `Admin with id '${adminId.toString()}' not found`, { id: adminId.value });
  }
}

module.exports = AdminNotFoundById;
