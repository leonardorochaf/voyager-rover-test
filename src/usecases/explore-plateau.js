const Plateau = require('../entities/plateau');
const Rover = require('../entities/rover');
const InvalidCommandError = require('../errors/invalid-command-error');
const { MOVE, LEFT, RIGHT } = require('../utils/constants');

class ExplorePlateau {
  /**
   * @param {Object} input - input object
   * @param {Object} input.plateau - plateau object
   * @param {number} input.plateau.x - plateau x coordinate
   * @param {number} input.plateau.y - plateau y coordinate
   * @param {Object} input.rover - rover object
   * @param {number} input.rover.x - rover x coordinate
   * @param {number} input.rover.y - rover y coordinate
   * @param {string} input.rover.direction - N, S, E or W
   * @param {string[]} input.rover.commands - L, R or M
   * @returns {string} rover position
   * @example 1 2 N
   */
  execute(input) {
    const plateau = new Plateau(input.plateau.x, input.plateau.y);
    const rover = new Rover(plateau, { x: input.rover.x, y: input.rover.y }, input.rover.direction);

    for (const command of input.rover.commands) {
      if (command === MOVE) {
        rover.move();
      } else if (command === LEFT || command === RIGHT) {
        rover.turn(command);
      } else {
        throw new InvalidCommandError(`The command ${command} is not valid`);
      }
    }

    return rover.getPosition();
  }
}

module.exports = ExplorePlateau;
