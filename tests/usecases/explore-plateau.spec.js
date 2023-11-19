const InvalidCommandError = require('../../src/errors/invalid-command-error');
const ExplorePlateau = require('../../src/usecases/explore-plateau');
const Rover = require('../../src/entities/rover');

jest.mock('../../src/entities/rover');

describe('Explore Plateau tests', () => {
  it('should throw InvalidCommandError if the given command is invalid', () => {
    const input = {
      plateau: { x: 5, y: 5 },
      rover: { x: 1, y: 2, direction: 'N', commands: ['A'] },
    };

    try {
      new ExplorePlateau().execute(input);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCommandError);
      expect(error.message).toBe('The command A is not valid');
    }
  });

  it('should call the method move when the command is M', () => {
    const input = {
      plateau: { x: 5, y: 5 },
      rover: { x: 1, y: 2, direction: 'N', commands: ['M'] },
    };

    new ExplorePlateau().execute(input);

    expect(Rover).toHaveBeenCalledTimes(1);
    expect(Rover).toHaveBeenCalledWith(expect.any(Object), expect.any(Array), expect.any(String));
    expect(Rover.prototype.move).toHaveBeenCalledTimes(1);
  });

  it('shoud call the method turn when the command is L', () => {
    const input = {
      plateau: { x: 5, y: 5 },
      rover: { x: 1, y: 2, direction: 'N', commands: ['L'] },
    };

    new ExplorePlateau().execute(input);

    expect(Rover).toHaveBeenCalledTimes(1);
    expect(Rover).toHaveBeenCalledWith(expect.any(Object), expect.any(Array), expect.any(String));
    expect(Rover.prototype.turn).toHaveBeenCalledTimes(1);
    expect(Rover.prototype.turn).toHaveBeenCalledWith('L');
  });

  it('should return the rover final position', () => {
    Rover.prototype.getPosition.mockReturnValueOnce('1 3 N');
    const input = {
      plateau: { x: 5, y: 5 },
      rover: { x: 1, y: 2, direction: 'N', commands: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'] },
    };

    const result = new ExplorePlateau().execute(input);

    expect(result).toBe('1 3 N');
  });
});
