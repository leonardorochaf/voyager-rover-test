const InvalidPlateauSizeError = require('../errors/invalid-plateau-size-error');

class Plateau {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;

    this.#isValid();
  }

  #isValid() {
    if (this.#x < 1 || this.#y < 1) {
      throw new InvalidPlateauSizeError('Plateau size must be at least 1x1');
    }
  }
}

module.exports = Plateau;
