const AdminEmail = require('../../admin-email');
const Filter = require('../../../../shared/domain/criteria/filter/filter');

class EmailFilter extends Filter {
  /**
   * @param {AdminEmail} email
   */
  constructor(email) {
    super('email', email);
  }
}

module.exports = EmailFilter;
