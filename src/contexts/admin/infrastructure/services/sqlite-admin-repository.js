const Criteria = require('../../../shared/domain/criteria/criteria');
const UnexpectedError = require('../../../shared/domain/errors/unexpected-error');
const Admin = require('../../domain/admin');
const AdminEmail = require('../../domain/admin-email');
const AdminId = require('../../domain/admin-id');
const AdminNotFound = require('../../domain/errors/admin-not-found');
const EmailAlreadyUsed = require('../../domain/errors/email-already-used');
const AdminRepository = require('../../domain/services/admin-repository');

class SqliteAdminRepository extends AdminRepository {

  #sqliteDbHandler;
  #sqliteAdminParser;
  #logger;

  constructor({ sqliteDbHandler, sqliteAdminParser, logger }) {
    super();
    this.#sqliteDbHandler = sqliteDbHandler;
    this.#sqliteAdminParser = sqliteAdminParser;
    this.#logger = logger;
  }

  /**
   * @param {AdminId} adminId
   * @returns {Promise<Admin|null>}
   */
  async findById(adminId) {
    const db = this.#sqliteDbHandler.getInstance();
    try {
      const query = db.prepare('SELECT A.* FROM admins A WHERE A.id = :adminId');
      const sqliteAdmin = query.get({
        adminId: adminId.value
      });

      if (!sqliteAdmin) {
        return null;
      }

      return this.#sqliteAdminParser.toAdmin(sqliteAdmin);
    } catch (err) {
      this.#logger.error(err.message, {error: err});
      throw new AdminNotFound(adminId);
    }
  }

  /**
   * @param {AdminEmail} email
   * @returns {Promise<Admin|null>}
   */
  async findByEmail(email) {
    const db = this.#sqliteDbHandler.getInstance();
    try {
      const query = db.prepare('SELECT A.* FROM admins A WHERE A.email = :adminEmail');
      const sqliteAdmin = query.get({
        adminEmail: email.value
      });

      if (!sqliteAdmin) {
        return null;
      }

      return this.#sqliteAdminParser.toAdmin(sqliteAdmin);
    } catch (err) {
      this.#logger.error(err.message, {error: err});
      throw new AdminNotFound(email);
    }
  }

  /**
   * @param {Criteria} criteria
   * @returns {Promise<Admin[]>}
   */
  async findAll(criteria) {
    const { page:{limit, offset} } = criteria;
    const db = this.#sqliteDbHandler.getInstance();

    try {
      const query = db.prepare('SELECT A.* FROM admins A LIMIT :limit OFFSET :offset');
      const sqliteAdmins = query.all({
        limit: limit.value,
        offset: offset.value
      });

      return sqliteAdmins.map(sqliteAdmin => this.#sqliteAdminParser.toAdmin(sqliteAdmin));
    } catch (err) {
      this.#logger.error(err.message, {error: err});
      throw new UnexpectedError();
    }
  }

  /**
   * @returns {Promise<Number>}
   */
  async countAll() {
    const db = this.#sqliteDbHandler.getInstance();

    try {
      const query = db.prepare('SELECT COUNT(*) as totalAdmins FROM admins');
      const { totalAdmins } = query.get();

      return totalAdmins;
    } catch (err) {
      this.#logger.error(err.message, {error: err});
      throw new UnexpectedError();
    }
  }

  /** @param {Admin} admin */
  async save(admin) {
    try {
      if (this.#checkIfAdminIdExists(admin.id)) {
        return this.#updateAdmin(admin);
      }

      return this.#insertNewAdmin(admin);
    } catch (err) {
      if (err instanceof DomainError) throw err;

      this.#logger.error(err.message, {error: err});
      throw new AdminNotFound(admin.id);
    }
  }

  /**
   * @param {AdminId} adminId
   * @returns {boolean}
   */
  #checkIfAdminIdExists(adminId) {
    const db = this.#sqliteDbHandler.getInstance();
    const queryCheckIfAdminExists = db.prepare('SELECT A.* FROM admins A WHERE A.id = :adminId');
    const sqliteAdmin = queryCheckIfAdminExists.get({
      adminId: adminId.value
    });

    return !!sqliteAdmin;
  }

  /**
   * @param {Admin} admin
   * @throws {AdminNotFound}
   */
  #updateAdmin(admin) {
    const db = this.#sqliteDbHandler.getInstance();
    const statement = db.prepare('UPDATE admins SET name = :name, surname = :surname, password = :password, is_enabled = :isEnabled, is_super_admin = :isSuperAdmin WHERE id = :adminId');
    const statementResultInfo = statement.run({
      name: admin.name.value,
      surname: admin.surname.value,
      password: admin.password.value,
      isEnabled: (admin.isEnabled === false) ? 0 : 1,
      isSuperAdmin: (admin.isSuperAdmin === false) ? 0 : 1,
      adminId: admin.id.value
    });

    if (statementResultInfo.changes === 0) {
      throw new AdminNotFound(admin.id);
    }
  }

  /**
   * @param {Admin} admin
   * @throws {EmailAlreadyUsed}
   */
  #insertNewAdmin(admin) {
    const db = this.sqliteDbHandler.getInstance();
    const statement = db.prepare('INSERT INTO admins (id, email, name, surname, password, is_enabled, is_super_admin) VALUES (:adminId, :adminEmail, :name, :surname, :password, :isEnabled, :isSuperAdmin)');
    const statementResultInfo = statement.run({
      adminId: admin.id.value,
      adminEmail: admin.email.value,
      name: admin.name.value,
      surname: admin.surname.value,
      password: admin.password.value,
      isEnabled: (admin.isEnabled === false) ? 0 : 1,
      isSuperAdmin: (admin.isSuperAdmin === false) ? 0 : 1
    });

    if (statementResultInfo.changes === 0) {
      throw new EmailAlreadyUsed(admin.email);
    }
  }
}

module.exports = SqliteAdminRepository;
