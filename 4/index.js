const {
  decodeEncryptedName,
  reduceSectorIds,
  filterByChecksum,
  parseEntry,
} = require('./utils');

const { readFileSync } = require('fs');
const FILE_PATH = __dirname + '/input.txt'

const result1 = part1(FILE_PATH);
const result2 = part2(FILE_PATH);

console.log('part 1', result1);
console.log('part 2', result2);

function part1(filepath) {
  return readFileSync(filepath, 'utf-8')
    .split('\n')
    .map(parseEntry)
    .filter(filterByChecksum)
    .reduce(reduceSectorIds, 0);
}

function part2(filepath) {
  return readFileSync(filepath, 'utf-8')
    .split('\n')
    .map(parseEntry)
    .map(decodeEncryptedName)
    .find(decodedName => /^northpole object storage/.test(decodedName));
}
