class DisableAdminResponse {

  /** @type {boolean} */
  #disabled;

  constructor({ disabled }) {
    this.#disabled = disabled;
  }

  get disabled() {
    return this.#disabled;
  }
}

module.exports = DisableAdminResponse;
