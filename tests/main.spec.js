const readline = require('node:readline/promises');

const ExplorePlateau = require('../src/usecases/explore-plateau');
const ApplicationError = require('../src/errors/application-error');
const run = require('../src/main');

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn(),
    close: jest.fn(),
  }),
}));
jest.mock('../src/usecases/explore-plateau');

describe('Main', () => {
  beforeEach(() => {
    console.log = jest.fn();
    readline
      .createInterface()
      .question.mockResolvedValueOnce('5 5')
      .mockResolvedValueOnce('1')
      .mockResolvedValueOnce('1 2 N')
      .mockResolvedValueOnce('LMLMLMLMM');
  });

  it('should call ExplorePlateau.execute with correct values', async () => {
    await run();

    expect(ExplorePlateau.prototype.execute).toHaveBeenCalledTimes(1);
    expect(ExplorePlateau.prototype.execute).toHaveBeenCalledWith({
      plateau: { x: '5', y: '5' },
      rover: { x: '1', y: '2', direction: 'N', commands: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'] },
    });
  });

  it('should print to the console the error message when ExplorePlateau.execute throws a ApplicationError', async () => {
    ExplorePlateau.prototype.execute.mockImplementationOnce(() => {
      throw new ApplicationError('Application error');
    });

    await run();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Application error');
  });

  it('should print to the console a default message when ExplorePlateau.execute throws a unexpected error', async () => {
    ExplorePlateau.prototype.execute.mockImplementationOnce(() => {
      throw new Error();
    });

    await run();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('An unexpected error occurred');
  });

  it('should print to the console the new rover position on success', async () => {
    ExplorePlateau.prototype.execute.mockReturnValueOnce('1 3 N');

    await run();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Final Position: 1 3 N');
  });
});
