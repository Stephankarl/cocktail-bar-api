const express = require('express');
const router = express.Router();

const barDataPath = './data/bar.json';
const BarData = require('../helpers/barDataHelper');
const barData = new BarData();

router.get('/', (req, res) => {
  const dispensers = barData.get(barDataPath);
  res.status(200).send(dispensers);
  res.end();
});

module.exports = router;
