const {
  getGridDistance,
  logVisitedSquares,
  newHeading,
  parseInstruction,
  computeInstruction,
} = require('./index');

describe('Day 1 utils', () => {

  describe('logVisitedSquare', () => {
    let visited;

    beforeEach(() => {
      visited = new Set(['0,0', '1,0', '2,0', '3,0', '3,1', '3,2', '3,3']);
    });

    test('unvisited coordinate', () => {
      const result1 = logVisitedSquares(visited, 0, 2, -5, 0);
      expect(result1).toBe(-1);
    });

    test('visited coordinate going N/S', () => {
      const result1 = logVisitedSquares(visited, 2, 3, 0, -5);
      expect(result1).toBe(2);
    });

    test('visited coordinate going E/W', () => {
      const result1 = logVisitedSquares(visited, 0, 3, 6, 0);
      expect(result1).toBe(6);
    });
  });

  test('getGridDistance', () => {
    const result1 = getGridDistance(0, 0); // 0
    const result2 = getGridDistance(-4, 8); // 12
    const result3 = getGridDistance(-5, -9); // 14

    expect(result1).toBe(0);
    expect(result2).toBe(12);
    expect(result3).toBe(14);
  });

  describe('newHeading', () => {
    test('R, E to S', () => {
      const result = newHeading(1, 'R');
      expect(result).toBe(2);
    });
    test('R, W to N', () => {
      const result = newHeading(3, 'R');
      expect(result).toBe(0);
    });

    test('L, S to E', () => {
      const result = newHeading(2, 'L');
      expect(result).toBe(1);
    });
    test('R, N to W', () => {
      const result = newHeading(0, 'L');
      expect(result).toBe(3);
    });
  });

  describe('parseInstruction', () => {
    test('L one digit', () => {
      const [direction, distance] = parseInstruction('L3');
      expect(direction).toBe('L');
      expect(distance).toBe(3);
    });
    test('R three digits', () => {
      const [direction, distance] = parseInstruction('R350');
      expect(direction).toBe('R');
      expect(distance).toBe(350);
    });
  });

  describe('computeInstruction', () => {
    const [x1, y1] = computeInstruction(0, 100);
    const [x2, y2] = computeInstruction(1, 100);

    expect(x1).toBe(0);
    expect(y1).toBe(-100);
    expect(x2).toBe(100);
    expect(y2).toBe(0);
  });
});
