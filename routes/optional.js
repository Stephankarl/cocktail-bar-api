const express = require('express');
const router = express.Router();

//Data handeler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();

const optionalData = './data/optional.json';

//Get all Options
router.get('/', (req, res) => {
  const allOptions = dataHandle.get(optionalData);
  res.status(200).send(allOptions);
});

//Creating a new Options
router.post('/', (req, res) => {
  const allOptions = dataHandle.get(optionalData);
  const foundOption = allOptions.find(Option => Option.type == req.body.type);
  if (!foundOption) {
    const newOption = {
      id: Date.now(),
      type: req.body.type,
    };
    dataHandle.add(newOption, optionalData);
    res.status(201).send({
      success: true,
      msg: 'New Option Created.',
    });
    res.end();
  } else {
    res.status(400).send({
      success: false,
      msg: 'Option already exist.',
    });
    res.end();
  }
});

//Getting Option to Edit
router.get('/:id/edit', (req, res) => {
  const foundOption = dataHandle.getOne(req.params.id, optionalData);
  if (!foundOption) {
    res.status(404).send({
      success: false,
      msg: 'Option not found.',
    });
    res.end();
  } else {
    res.status(200).send(foundOption);
    res.end();
  }
});

//Updating Option
router.put('/:id', (req, res) => {
  const foundOption = dataHandle.getOne(req.params.id, optionalData);
  if (!foundOption) {
    res.status(404).send({
      success: false,
      msg: 'No Option found.',
    });
  } else {
    const { type } = req.body;
    const updateOption = {
      id: foundOption.id,
      type,
    };
    dataHandle.update(updateOption, optionalData);
    res.status(201).send({
      success: true,
      msg: 'Option Updated.',
    });
    res.end();
  }
});

//Deleting Options
router.delete('/:id', (req, res) => {
  const foundOption = dataHandle.getOne(req.params.id, optionalData);
  if (foundOption) {
    dataHandle.delete(foundOption, optionalData);
    res.status(200).send({
      success: true,
      msg: 'Option is Deleted.',
    });
    res.end();
  } else {
    res.status(404).send({
      success: false,
      msg: 'Optionsnot found.',
    });
  }
});

module.exports = router;
