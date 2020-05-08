const {
  executeBotInstructions,
  getProductOfRange,
  parseInstructions,
} = require('./utils');


describe('Day 10 utils', () => {

  describe('executeBotInstructions', () => {
    const bots = [, , [10, 3], , [4],];
    const botInstructions = [
      , ,
      {
        low: ['bot', 1],
        high: ['bot', 4],
      },
      , {
        low: ['output', 1],
        high: ['output', 3],
      }
    ];
    const exitCondition = [4, 10];

    test('bot 2 gives correct chips', () => {
      const [exitConditionResult, output] = executeBotInstructions(bots, botInstructions, exitCondition);

      expect(bots[1]).toMatchObject([3]);
      expect(bots[2]).toBeUndefined();
      expect(exitConditionResult).toBe(4);
      expect(output).toMatchObject([, 4, , 10]);
    });
  });

  test('parseInstructions', () => {
    const instructions = [
      'bot 2 gives low to bot 30 and high to output 40',
      'bot 4 gives low to bot 31 and high to bot 41',
      'value 10 goes to bot 1',
      'value 20 goes to bot 2',
      'value 30 goes to bot 1',
    ];

    const expBot1 = [10, 30];
    const expBot2 = [20];
    const expInstr2 = {
      low: ['bot', 30],
      high: ['output', 40],
    };
    const expInstr4 = {
      low: ['bot', 31],
      high: ['bot', 41],
    };

    const [bots, botInstructions] = parseInstructions(instructions);

    expect(bots[0]).toBeUndefined();
    expect(bots[1]).toMatchObject(expBot1);
    expect(bots[2]).toMatchObject(expBot2);

    expect(botInstructions[0]).toBeUndefined();
    expect(botInstructions[2]).toMatchObject(expInstr2);
    expect(botInstructions[4]).toMatchObject(expInstr4);
  });

  test('getProductOfRange', () => {
    const result = getProductOfRange([3, 4, 5, 6, 7], 1, 4);
    expect(result).toBe(120); // 4 * 5 * 6 === 120
  });

});