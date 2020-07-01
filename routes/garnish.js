const express = require('express');
const router = express.Router();

//Data handeler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();

const garnishData = './data/garnish.json';

//Get all Garnish
router.get('/', (req, res) => {
  const allGarnish = dataHandle.get(garnishData);
  res.status(200).send(allGarnish);
});

//Creating a new Garnish
router.post('/', (req, res) => {
  const allGarnish = dataHandle.get(garnishData);
  const foundGarnish = allGarnish.find(garnish => garnish.type == req.body.type);
  if (!foundGarnish) {
    const newGarnish = {
      id: Date.now(),
      type: req.body.type,
    };
    dataHandle.add(newGarnish, garnishData);
    res.status(201).send({
      success: true,
      msg: 'New Garnish Created.',
    });
    res.end();
  } else {
    res.status(400).send({
      success: false,
      msg: 'Garnish already exist.',
    });
    res.end();
  }
});

//Getting Garnish to Edit
router.get('/:id/edit', (req, res) => {
  const foundGarnish = dataHandle.getOne(req.params.id, garnishData);
  if (!foundGarnish) {
    res.status(404).send({
      success: false,
      msg: 'Garnish not found.',
    });
    res.end();
  } else {
    res.status(200).send(foundGarnish);
    res.end();
  }
});

//Updating Garnish
router.put('/:id', (req, res) => {
  const foundGarnish = dataHandle.getOne(req.params.id, garnishData);
  if (!foundGarnish) {
    res.status(404).send({
      success: false,
      msg: 'No Garnish found.',
    });
  } else {
    const { type } = req.body;
    const updateGarnish = {
      id: foundGarnish.id,
      type,
    };
    dataHandle.update(updateGarnish, garnishData);
    res.status(201).send({
      success: true,
      msg: 'Garnish Updated.',
    });
    res.end();
  }
});

//Deleting Garnish
router.delete('/:id', (req, res) => {
  const foundGarnish = dataHandle.getOne(req.params.id, garnishData);
  if (foundGarnish) {
    dataHandle.delete(foundGarnish, garnishData);
    res.status(200).send({
      success: true,
      msg: 'Garnish is Deleted.',
    });
    res.end();
  } else {
    res.status(404).send({
      success: false,
      msg: 'Garnish not found.',
    });
  }
});

module.exports = router;
