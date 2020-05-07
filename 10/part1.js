const { readFileSync } = require('fs');
const Bot = require('./Bot');

const INPUT_FILE = __dirname + '/instructions.txt';
const EXIT_CONDITION = [61, 17];
const logs = [];
const result = balanceBots(INPUT_FILE, EXIT_CONDITION);
// console.log(result);

function balanceBots(inputFile, exitCondition) {
  exitCondition.sort();

  const instructions = readFileSync(inputFile, 'utf-8')
    .trim()
    .split('\n');

  const [bots, botInstructions] = parseInstructions(instructions);

  const exitCode = executeBotInstructions(bots, botInstructions);

  // console.log(JSON.stringify(logs));

}

function executeBotInstructions(bots, botInstructions) {

  let stop = false;

  while (!stop) {
    stop = true;
    for (let i = 0; i < bots.length; i++) {
      const bot = bots[i];

      if (!bot || bot.length < 2) continue;
      stop = false;
      logs.push(i);

      // bot.sort((x, y) => {
      //   // DARNIT
      //   if (x < y) return -1;
      //   if (x > y) return 1;
      //   return 0;
      // });
      // bot.sort();
      bot.sort((a, b) => a - b);

      if (bot[0] === 17 && bot[1] === 61) console.log('part 1 solution', i);

      const [lowType, lowNum] = botInstructions[i].low;
      const [highType, highNum] = botInstructions[i].high;

      if (lowType === 'bot') {
        if (!bots[lowNum]) bots[lowNum] = [];
        bots[lowNum].push(bot[0]);
      }

      if (highType === 'bot') {
        if (!bots[highNum]) bots[highNum] = [];
        bots[highNum].push(bot[1]);
      }

      bots[i] = [];
    }
  }

}



function executeInstruction(instruction, botsList, exitCondition) {
  let { botNumber, instructionType } = instruction;
  let bot = botsList[botNumber];

  if (instructionType === 'input') {
    const { chipValue } = instruction;

    if (bot === undefined) {
      bot = botsList[botNumber] = new Bot();
    }

    bot.add(chipValue);
    return [1, null];



  } else if (instructionType === 'bot') {
    const { lowAction, highAction } = instruction;

    if (bot === undefined || !bot.full) return [0, null];
    logs.push(instruction.botNumber);

    const chips = bot.compare();
    const actions = [lowAction, highAction];

    // Check global exit condition
    if (chips[0] === exitCondition[0] && chips[1] === exitCondition[1]) {
      return [2, botNumber];
    }

    for (let i = 0; i < actions.length; i++) {
      const { type, value } = actions[i];

      if (type === 'bot') {
        let destinationBot = botsList[value];

        if (destinationBot === undefined) {
          botsList[value] = destinationBot = new Bot();
        }

        destinationBot.add(chips[i]);
      }
    }

    return [1, null];

  } else {
    return [0, null];
  }


  /*
    exit codes:
    0 - cannot complete instruction
    1 - complete instruction, remove from instructions list
    2 - complete instruction, exit condition found
  */
}







function parseInstructions(instructions) {
  const bots = [];
  const botInstructions = [];
  // const botRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;
  // const inputRegex = /value (\d+) goes to bot (\d+)/;

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

/*
  Do the values instructions first
  Then do the bot instructions
  do something if the target is output
*/



// My answer 38
// Correct answer 141