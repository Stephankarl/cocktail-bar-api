const fs = require('fs');

class BarData {
  get(path) {
    const rawData = fs.readFileSync(path);
    const data = JSON.parse(rawData);
    return data;
  }
}

module.exports = BarData;
