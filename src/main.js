const readline = require('node:readline/promises');

const ExplorePlateau = require('./usecases/explore-plateau');
const ApplicationError = require('./errors/application-error');

async function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const upperRightCoordinates = await rl.question('Enter upper-right coordinates of the plateau (e.g., 5 5): ');
    const [plateauX, plateauY] = upperRightCoordinates.split(' ');

    let roverCount = await rl.question('Enter the number of rovers: ');
    while (roverCount < 1) {
      rl.write('The number of rovers must be at least 1\n');
      roverCount = await rl.question('Enter the number of rovers: ');
    }

    while (roverCount > 0) {
      const roverPosition = await rl.question(`Enter landing position for Rover (e.g., 1 2 N): `);
      const commands = await rl.question(`Enter instructions for Rover (e.g., LMLMLMLMM): `);
      const [roverX, roverY, direction] = roverPosition.split(' ');

      const roverPositionAfterMission = new ExplorePlateau().execute({
        plateau: { x: plateauX, y: plateauY },
        rover: { x: roverX, y: roverY, direction, commands: Array.from(commands) },
      });

      roverCount--;
      console.log(`Final Position: ${roverPositionAfterMission}`);
    }
  } catch (err) {
    if (err instanceof ApplicationError) {
      console.log(err.message);
    } else {
      console.log('An unexpected error occurred');
    }
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  run();
}

module.exports = run;
