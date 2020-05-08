const { readFileSync } = require('fs');
const {
  executeBotInstructions,
  getProductOfRange,
  parseInstructions,
} = require('./utils');

const INPUT_FILE = __dirname + '/input.txt';
const EXIT_CONDITION = [61, 17];

const [exitCondition, output] = balanceBots(INPUT_FILE, EXIT_CONDITION);

console.log();
console.log('Day 10');
console.log('part 1', exitCondition);
console.log('part 2', output);

function balanceBots(inputFile, exitCondition) {
  exitCondition.sort();

  const instructions = readFileSync(inputFile, 'utf-8')
    .trim()
    .split('\n');

  const [bots, botInstructions] = parseInstructions(instructions);

  const [exitConditionResult, output] = executeBotInstructions(bots, botInstructions, exitCondition);

  return [exitConditionResult, getProductOfRange(output, 0, 3)];
}
