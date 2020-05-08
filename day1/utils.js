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

function computeInstruction(facing, distance) {
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

module.exports = {
  logVisitedSquares,
  getGridDistance,
  newHeading,
  parseInstruction,
  computeInstruction,
};
