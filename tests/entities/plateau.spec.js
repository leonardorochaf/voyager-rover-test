const Plateau = require('../../src/entities/plateau');
const InvalidPlateauSizeError = require('../../src/errors/invalid-plateau-size-error');

describe('Plateau tests', () => {
  it('should throw InvalidPlateauSizeError if the given plateau size is invalid', () => {
    try {
      new Plateau(-1, -1);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPlateauSizeError);
      expect(error.message).toBe('Plateau size must be at least 1x1');
    }
  });

  it('should return true when given position is out of plateau boundaries', () => {
    const plateau = new Plateau(4, 4);

    const result = plateau.isOutOfBounds(5, 5);

    expect(result).toBe(true);
  });

  it('should return false when given position is not out of plateau boundaries', () => {
    const plateau = new Plateau(4, 4);

    const result = plateau.isOutOfBounds(3, 3);

    expect(result).toBe(false);
  });
});
