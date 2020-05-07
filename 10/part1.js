const fs = require('fs');
const Bot = require('./Bot');


const INPUT_FILE = __dirname + '/instructions.txt';
const EXIT_CONDITION = [61, 17];

const result = balanceBots(INPUT_FILE, EXIT_CONDITION);
console.log(result);

function balanceBots(inputFile, exitCondition) {

  const botsList = {};
  exitCondition.sort();

  const instructions = fs.readFileSync(inputFile, 'utf-8')
    .split('\n')
    .map(parseInstruction);

  // return instructions;


  // do the instructions one at a time
  // if the instruction can't be done, skip it
  // if it can be done, do it and remove it

  let i = 0;

  while (instructions.length) {
    if (i >= instructions.length) {
      console.log('end is reached');
      i = 0;
    }

    const instruction = instructions[i];

    const [resultCode, resultBot] = executeInstruction(instruction, botsList, exitCondition);

    if (resultCode === 2) return resultBot;
    else if (resultCode === 1) {
      instructions.splice(i, 1);
    } else if (resultCode === 0) {
      i++;
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







function parseInstruction(instruction) {
  const inputRegex = /value (\d+) goes to bot (\d+)/;
  const botRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;

  let output;
  let matches = instruction.match(inputRegex);

  if (matches) {
    const [total, chipValue, botNumber] = matches;
    output = {
      instructionType: 'input',
      botNumber: +botNumber,
      chipValue: +chipValue,
    };
  } else {
    matches = instruction.match(botRegex);
    const [total, botNumber, lowReceiver, lowValue, highReceiver, highValue] = matches;

    output = {
      instructionType: 'bot',
      botNumber: +botNumber,
      lowAction: {
        type: lowReceiver,
        value: +lowValue,
      },
      highAction: {
        type: highReceiver,
        value: +highValue,
      },
    };
  }
  return output;
}

/*
  Do the values instructions first
  Then do the bot instructions
  do something if the target is output
*/
