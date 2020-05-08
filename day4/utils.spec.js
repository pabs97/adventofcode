const {
  decodeEncryptedName,
  reduceSectorIds,
  filterByChecksum,
  parseEntry,
  calculateChecksum,
} = require('./utils');

describe('Day 4 utils', () => {

  test('decodeEncryptedName', () => {
    const result1 = decodeEncryptedName(['abc-abc', null, 5]);
    const result2 = decodeEncryptedName(['abc-abc', null, 57]);

    expect(result1).toBe('fgh fgh 5');
    expect(result2).toBe('fgh fgh 57'); // 57 % 26 === 5
  });

  test('reduceSectorIds', () => {
    const result = reduceSectorIds(2, [null, null, 3]);
    expect(result).toBe(5);
  });

  test('filterByChecksum', () => {
    const result1 = filterByChecksum(['aaa-bb-ccc-dddd-e-fff', 'dacfb']);
    const result2 = filterByChecksum(['aaa-bb-ccc-dddd-e-fff', 'dacfx']);
    expect(result1).toBeTruthy();
    expect(result2).toBeFalsy();
  });

  test('parseEntry', () => {
    const [encryptedName, checksum, sectorId] = parseEntry('pwcvonofrcig-suu-rsgwub-740[baiys]');
    expect(encryptedName).toBe('pwcvonofrcig-suu-rsgwub-');
    expect(checksum).toBe('baiys');
    expect(sectorId).toBe(740);
  });

  test('calculateCheckSum', () => {
    const result1 = calculateChecksum('aaabbcccddddefff');
    expect(result1).toBe('dacfb');
  });

});