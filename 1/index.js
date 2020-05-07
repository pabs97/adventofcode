const { readFileSync } = require('fs');

const {
  getGridDistance,
  logVisitedSquares,
  newHeading,
  parseInstruction,
  computeInstruction,
} = require('./utils');

const FILE_PATH = __dirname + '/input.txt';

const result1 = part1(FILE_PATH);
const result2 = part2(FILE_PATH);
console.log('part 1', result1);
console.log('part 2', result2);

function part1(filepath) {
  const instructions = readFileSync(filepath, 'utf-8')
    .split(',')
    .map(d => d.trim());

  let facing = 0;
  let prevX = 0;
  let prevY = 0;

  for (let instruction of instructions) {
    const [direction, distance] = parseInstruction(instruction);
    facing = newHeading(facing, direction);

    const [pathX, pathY] = computeInstruction(facing, distance);

    prevX += pathX;
    prevY += pathY;
  }

  return getGridDistance(prevX, prevY);
}

function part2(filepath) {
  const instructions = readFileSync(filepath, 'utf-8')
    .split(',')
    .map(d => d.trim());

  const visited = new Set();
  let facing = 0;
  let prevX = 0;
  let prevY = 0;

  for (let instruction of instructions) {
    const [direction, distance] = parseInstruction(instruction);
    facing = newHeading(facing, direction);

    const [pathX, pathY] = computeInstruction(facing, distance, prevX, prevY);
    const result = logVisitedSquares(visited, prevX, prevY, pathX, pathY);

    if (result !== -1) return result;

    prevX += pathX;
    prevY += pathY;
  }

  return getGridDistance(prevX, pathY);
}