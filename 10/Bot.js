module.exports = class Bot {
  constructor() {
    this.chips = [];
    this.full = false;
  }

  add(val) {
    this.chips.push(val);
    this.full = this.chips.length === 2;
  }

  compare() {
    if (!this.full) return null;

    this.full = false;

    this.chips.sort();
    const output = [...this.chips];
    this.chips = [];

    // [low, high]
    return output;
  }
}