function executeBotInstructions(bots, botInstructions, exitCondition) {

  let validBots = true;
  let exitConditionResult;
  let outputs = [];

  while (validBots) {
    validBots = false;
    for (let i = 0; i < bots.length; i++) {
      const bot = bots[i];

      if (!bot || bot.length < 2) continue;

      validBots = true;
      bot.sort((a, b) => a - b);

      if (bot[0] === exitCondition[0] && bot[1] === exitCondition[1]) {
        exitConditionResult = i;
      }

      const [lowType, lowNum] = botInstructions[i].low;
      const [highType, highNum] = botInstructions[i].high;

      if (lowType === 'bot') {
        bots[lowNum] = bots[lowNum] || [];
        bots[lowNum].push(bot[0]);
      } else if (lowType === 'output') {
        outputs[lowNum] = outputs[lowNum] || [];
        outputs[lowNum] = bot[0];
      }

      if (highType === 'bot') {
        bots[highNum] = bots[highNum] || [];
        bots[highNum].push(bot[1]);
      } else if (highType === 'output') {
        outputs[highNum] = outputs[highNum] || [];
        outputs[highNum] = bot[1];
      }

      delete bots[i];
    }
  }

  return [exitConditionResult, outputs];
}

function getProductOfRange(arr, a, b) {
  return arr
    .slice(a, b)
    .reduce((accum, val) => accum * val, 1)
}

function parseInstructions(instructions) {
  const bots = [];
  const botInstructions = [];
  const botRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;
  const inputRegex = /value (\d+) goes to bot (\d+)/;

  for (const instruction of instructions) {
    let matches;

    if ((matches = botRegex.exec(instruction))) {
      const [, botNum, lowType, lowValue, highType, highValue] = matches;
      botInstructions[+botNum] = {
        low: [lowType, +lowValue],
        high: [highType, +highValue],
      };
    } else if ((matches = inputRegex.exec(instruction))) {
      const chipValue = +matches[1];
      const botNum = +matches[2];
      bots[botNum] = bots[botNum] || [];
      bots[botNum].push(chipValue);
    }
  }

  return [bots, botInstructions];
}

module.exports = {
  executeBotInstructions,
  getProductOfRange,
  parseInstructions,
};