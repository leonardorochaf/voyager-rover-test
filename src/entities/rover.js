/**
 * @typedef {import('./plateau')} Plateau
 */

const InvalidDirectionError = require('../errors/invalid-direction-error');
const OutOfBoundsError = require('../errors/out-of-bounds-error');
const { LEFT, RIGHT, NORTH, SOUTH, EAST, WEST, DIRECTIONS } = require('../utils/constants');

class Rover {
  #plateau;
  #coordinates;
  #direction;

  /**
   * @param {Plateau} plateau - plateau instance
   * @param {Object} coordinates - x and y coordinates
   * @param {number} coordinates.x - x coordinate
   * @param {number} coordinates.y - y coordinate
   * @param {string} direction - N, S, E or W
   */
  constructor(plateau, coordinates, direction) {
    this.#plateau = plateau;
    this.#coordinates = coordinates;
    this.#direction = direction;

    this.#isValid();
  }

  #isValid() {
    if (this.#plateau.isOutOfBounds(this.#coordinates.x, this.#coordinates.y)) {
      throw new OutOfBoundsError(
        `Your rover went out of plateau boundaries -> x: ${this.#coordinates.x}, y: ${this.#coordinates.y}`,
      );
    }

    if (!DIRECTIONS.includes(this.#direction)) {
      throw new InvalidDirectionError(`The direction ${this.#direction} is not valid}`);
    }
  }

  /**
   * @returns {string} rover position
   * @example 1 2 N
   */
  getPosition() {
    return `${this.#coordinates.x} ${this.#coordinates.y} ${this.#direction}`;
  }

  move() {
    switch (this.#direction) {
      case NORTH:
        this.#coordinates.y++;
        break;
      case SOUTH:
        this.#coordinates.y--;
        break;
      case EAST:
        this.#coordinates.x++;
        break;
      case WEST:
        this.#coordinates.x--;
        break;
    }

    if (this.#plateau.isOutOfBounds(this.#coordinates.x, this.#coordinates.y)) {
      throw new OutOfBoundsError(
        `Your rover went out of plateau boundaries -> x: ${this.#coordinates.x}, y: ${this.#coordinates.y}`,
      );
    }
  }

  /**
   * @param {string} turnDirection - L or R
   */
  turn(turnDirection) {
    const currentDirectionIndex = DIRECTIONS.indexOf(this.#direction);

    if (turnDirection === LEFT) {
      this.#direction = DIRECTIONS[(currentDirectionIndex + 3) % 4];
    } else if (turnDirection === RIGHT) {
      this.#direction = DIRECTIONS[(currentDirectionIndex + 1) % 4];
    } else {
      throw new InvalidDirectionError(`The direction ${turnDirection} is not valid`);
    }
  }
}

module.exports = Rover;
