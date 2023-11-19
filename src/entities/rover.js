const InvalidDirectionError = require('../errors/invalid-direction-error');
const OutOfBoundsError = require('../errors/out-of-bounds-error');
const { NORTH, SOUTH, EAST, WEST, DIRECTIONS } = require('../utils/constants');

class Rover {
  #plateau;
  #coordinates;
  #direction;

  constructor(plateau, coordinates, direction) {
    this.#plateau = plateau;
    this.#coordinates = coordinates;
    this.#direction = direction;

    this.#isValid();
  }

  #isValid() {
    if (this.#plateau.isOutOfBounds(this.#coordinates[0], this.#coordinates[1])) {
      throw new OutOfBoundsError(
        `Your rover went out of plateau boundaries -> x: ${this.#coordinates[0]}, y: ${this.#coordinates[1]}`,
      );
    }

    if (!DIRECTIONS.includes(this.#direction)) {
      throw new InvalidDirectionError(`The direction ${this.#direction} is not valid}`);
    }
  }

  move() {
    switch (this.#direction) {
      case NORTH:
        this.#coordinates[1]++;
        break;
      case SOUTH:
        this.#coordinates[1]--;
        break;
      case EAST:
        this.#coordinates[0]++;
        break;
      case WEST:
        this.#coordinates[0]--;
        break;
    }

    if (this.#plateau.isOutOfBounds(this.#coordinates[0], this.#coordinates[1])) {
      throw new OutOfBoundsError(
        `Your rover went out of plateau boundaries -> x: ${this.#coordinates[0]}, y: ${this.#coordinates[1]}`,
      );
    }
  }
}

module.exports = Rover;
