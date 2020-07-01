const fs = require('fs');

class Data {
  get(path) {
    const rawdata = fs.readFileSync(path);
    const data = JSON.parse(rawdata);
    return data;
  }

  add(data, path) {
    let allData = this.get(path);
    allData.push(data);
    this.store(allData, path);
  }

  getOne(id, path) {
    const allData = this.get(path);
    const item = allData.find(item => item.id == id);
    return !item ? false : item;
  }

  update(data, path) {
    let allData = this.get(path);
    const index = allData.findIndex(item => item.id == data.id);
    allData.splice(index, 1);
    allData.push(data);
    this.store(allData, path);
  }

  store(data, path) {
    data.sort((a, b) => {
      return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
    });
    const rawData = JSON.stringify(data, null, 2);
    fs.writeFile(path, rawData, err => {
      if (err) throw err;
      console.log('Data Saved.');
    });
  }

  delete(data, path) {
    let allData = this.get(path);
    const index = allData.findIndex(item => item.id == data.id);
    allData.splice(index, 1);
    this.store(allData, path);
  }
}

module.exports = Data;
