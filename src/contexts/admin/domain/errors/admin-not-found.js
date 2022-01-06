const DomainError = require('../../../shared/domain/errors/domain-error');
const AdminId = require('../admin-id');
const AdminEmail = require('../admin-email');

class AdminNotFound extends DomainError {

  /** @param {AdminId|AdminEmail} searchBy */
  constructor(searchBy) {
    super(`Admin with ${searchBy.value} not found`);

    if (searchBy instanceof AdminId) this.data = { adminId: searchBy };
    else if (searchBy instanceof AdminEmail) this.data = { adminEmail: searchBy };
  }
}

module.exports = AdminNotFound;
