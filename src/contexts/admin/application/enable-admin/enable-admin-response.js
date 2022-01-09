class EnableAdminResponse {

  /** @type {boolean} */
  #enabled;

  constructor({ enabled }) {
    this.#enabled = enabled;
  }

  get enabled() {
    return this.#enabled;
  }
}

module.exports = EnableAdminResponse;
