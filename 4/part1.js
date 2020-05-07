// aaaaa-bbb-z-y-x-123[abxyz]

const fs = require('fs');
const FILE_PATH = __dirname + '/input.txt'
const result = main(FILE_PATH);

console.log(result);

function main(filepath) {
  return fs.readFileSync(filepath, 'utf-8')
    .split('\n')
    .map(parseEntry)
    .filter(filterByChecksum)
    .reduce(reduceSectorIds, 0);
}

function reduceSectorIds(total, [, , sectorId]) {
  return total + sectorId;
}

function filterByChecksum([encryptedName, providedChecksum]) {
  const calculatedChecksum = calculateChecksum(encryptedName);
  return providedChecksum === calculatedChecksum;
}

function parseEntry(entry) {
  const encryptedName = entry.match(/[a-z-]+/g)[0].replace(/-/g, '');
  const checksum = entry.split(/[\[\]]/g)[1];
  const sectorId = +entry.match(/\d+/)[0];
  return [encryptedName, checksum, sectorId];
}

function calculateChecksum(encryptedName) {
  const charCounts = {};

  encryptedName
    .split('')
    .forEach((char) => {
      const count = charCounts[char] || 0;
      charCounts[char] = count + 1;
    });

  const counts = Object
    .entries(charCounts)
    .sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else if (a[1] < b[1]) {
        return 1;
      } else if (a[0] > b[0]) {
        return 1;
      } else {
        return -1;
      }
    });


  counts.splice(5);

  return counts
    .map(([k, v]) => k)
    .join('');
}