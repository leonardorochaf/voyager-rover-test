const Rover = require('../../src/entities/rover');
const InvalidDirectionError = require('../../src/errors/invalid-direction-error');
const OutOfBoundsError = require('../../src/errors/out-of-bounds-error');

describe('Rover tests', () => {
  it('should throw OutOfBoundsError if the rover innitial position is out of bounds', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => true),
    };

    try {
      new Rover(plateau, { x: 1, y: 1 }, 'N');
    } catch (error) {
      expect(plateau.isOutOfBounds).toHaveBeenCalledTimes(1);
      expect(plateau.isOutOfBounds).toHaveBeenCalledWith(1, 1);
      expect(error).toBeInstanceOf(OutOfBoundsError);
      expect(error.message).toBe('Your rover went out of plateau boundaries -> x: 1, y: 1');
    }
  });

  it('should throw InvalidDirectionError if the rover innitial direction is invalid', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => false),
    };

    expect(() => new Rover(plateau, { x: 1, y: 1 }, 'A')).toThrow(
      new InvalidDirectionError('The direction A is not valid}'),
    );
  });

  it('should move the rover correctly', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => false),
    };

    const rover1 = new Rover(plateau, { x: 1, y: 1 }, 'N');
    rover1.move();
    expect(rover1.getPosition()).toBe('1 2 N');

    const rover2 = new Rover(plateau, { x: 1, y: 1 }, 'E');
    rover2.move();
    expect(rover2.getPosition()).toBe('2 1 E');

    const rover3 = new Rover(plateau, { x: 1, y: 1 }, 'S');
    rover3.move();
    expect(rover3.getPosition()).toBe('1 0 S');

    const rover4 = new Rover(plateau, { x: 1, y: 1 }, 'W');
    rover4.move();
    expect(rover4.getPosition()).toBe('0 1 W');
  });

  it('should throw OutOfBoundsError if the rover goes out of bounds', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => false),
    };

    try {
      const rover = new Rover(plateau, { x: 1, y: 1 }, 'N');
      plateau.isOutOfBounds.mockReturnValueOnce(true);
      rover.move();
    } catch (error) {
      expect(plateau.isOutOfBounds).toHaveBeenCalledTimes(2);
      expect(error).toBeInstanceOf(OutOfBoundsError);
      expect(error.message).toBe('Your rover went out of plateau boundaries -> x: 1, y: 2');
    }
  });

  it('should throw InvalidDirectionError if the rover is given an invalid direction to turn', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => false),
    };

    const rover = new Rover(plateau, { x: 1, y: 1 }, 'N');

    expect(() => rover.turn('X')).toThrow(new InvalidDirectionError('The direction X is not valid'));
  });

  it('should turn the rover correctly', () => {
    const plateau = {
      isOutOfBounds: jest.fn(() => false),
    };

    const rover = new Rover(plateau, { x: 1, y: 1 }, 'N');

    rover.turn('L');
    expect(rover.getPosition()).toBe('1 1 W');

    rover.turn('L');
    expect(rover.getPosition()).toBe('1 1 S');

    rover.turn('L');
    expect(rover.getPosition()).toBe('1 1 E');

    rover.turn('L');
    expect(rover.getPosition()).toBe('1 1 N');

    rover.turn('R');
    expect(rover.getPosition()).toBe('1 1 E');

    rover.turn('R');
    expect(rover.getPosition()).toBe('1 1 S');

    rover.turn('R');
    expect(rover.getPosition()).toBe('1 1 W');

    rover.turn('R');
    expect(rover.getPosition()).toBe('1 1 N');
  });
});
