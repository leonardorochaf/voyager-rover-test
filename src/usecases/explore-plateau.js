const Plateau = require('../entities/plateau');
const Rover = require('../entities/rover');
const InvalidCommandError = require('../errors/invalid-command-error');
const { MOVE, LEFT, RIGHT } = require('../utils/constants');

class ExplorePlateau {
  execute(input) {
    const plateau = new Plateau(input.plateau.x, input.plateau.y);
    const rover = new Rover(plateau, {x: input.rover.x, y: input.rover.y}, input.rover.direction);

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
