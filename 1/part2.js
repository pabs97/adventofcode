

const input = 'R4, R3, R5, L3, L5, R2, L2, R5, L2, R5, R5, R5, R1, R3, L2, L2, L1, R5, L3, R1, L2, R1, L3, L5, L1, R3, L4, R2, R4, L3, L1, R4, L4, R3, L5, L3, R188, R4, L1, R48, L5, R4, R71, R3, L2, R188, L3, R2, L3, R3, L5, L1, R1, L2, L4, L2, R5, L3, R3, R3, R4, L3, L4, R5, L4, L4, R3, R4, L4, R1, L3, L1, L1, R4, R1, L4, R1, L1, L3, R2, L2, R2, L1, R5, R3, R4, L5, R2, R5, L5, R1, R2, L1, L3, R3, R1, R3, L4, R4, L4, L1, R1, L2, L2, L4, R1, L3, R4, L2, R3, L1, L5, R4, R5, R2, R5, R1, R5, R1, R3, L3, L2, L2, L5, R2, L2, R5, R5, L2, R3, L5, R5, L2, R4, R2, L1, R3, L5, R3, R2, R5, L1, R3, L2, R2, R1';


// const input = 'R5, L5, R5, R3';
// const input = 'R8, R4, R4, R8';

const result = trace(input);
console.log(result);

// 0, 1, 2, 3
// const headings = ['N', 'E', 'S', 'W'];


function trace(instructionsString) {
  const instructions = instructionsString
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

function logVisitedSquares(visited, prevX, prevY, pathX, pathY) {
  // East/West
  if (pathX !== 0) {
    const incr = pathX > 0 ? 1 : -1;
    const nextX = prevX + pathX;
    while (prevX !== nextX) {
      prevX += incr;
      const coord = prevX + ',' + prevY;
      if (visited.has(coord)) return getGridDistance(prevX, prevY);
      visited.add(coord);
    }
  }
  // North/South
  else {
    // const incr = prevY < nextY ? 1 : -1;
    const incr = pathY > 0 ? 1 : -1;
    const nextY = prevY + pathY;
    while (prevY !== nextY) {
      prevY += incr;
      const coord = prevX + ',' + prevY;
      if (visited.has(coord)) return getGridDistance(prevX, prevY);
      visited.add(coord);
    }
  }

  return -1;
}

function getGridDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function newHeading(facing, direction) {
  if (direction === 'R') {
    return (facing + 1) % 4;
  } else if (direction === 'L') {
    return (facing + 3) % 4;
  }
}

function parseInstruction(instruction) {
  const direction = instruction.match(/[LR]/)[0];
  const distance = instruction.match(/\d+/)[0];
  return [direction, +distance];
}

function computeInstruction(facing, distance, x, y) {
  switch (facing) {
    case 0:
      return [0, -distance];
    case 1:
      return [distance, 0];
    case 2:
      return [0, distance];
    case 3:
      return [-distance, 0];
    default:
      break;
  }
}