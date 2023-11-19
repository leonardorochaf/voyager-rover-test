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

  isOutOfBounds(positionX, positionY) {
    if (!positionX || positionX < 0 || positionX > this.#x || !positionY || positionY < 0 || positionY > this.#y) {
      return true;
    }
    return false;
  }
}

module.exports = Plateau;
