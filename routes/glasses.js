const express = require('express');
const router = express.Router();

//Data handeler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();

const glassData = './data/glasses.json';

//Get all Glasses
router.get('/', (req, res) => {
  const allGlasses = dataHandle.get(glassData);
  res.status(200).send(allGlasses);
});

//Creating a new Glasses
router.post('/', (req, res) => {
  const allGlasses = dataHandle.get(glassData);
  const foundGlas = allGlasses.find(glass => glass.type == req.body.type);
  if (!foundGlas) {
    const { type, volume, image } = req.body;
    const newGlass = {
      id: Date.now(),
      type,
      volume,
      image,
    };
    dataHandle.add(newGlass, glassData);
    res.status(201).send({
      success: true,
      msg: 'New Glass Created.',
    });
    res.end();
  } else {
    res.status(400).send({
      success: false,
      msg: 'Glass already exist.',
    });
    res.end();
  }
});

//Getting Glass to Edit
router.get('/:id/edit', (req, res) => {
  const foundGlas = dataHandle.getOne(req.params.id, glassData);
  if (!foundGlas) {
    res.status(404).send({
      success: false,
      msg: 'Glass not found.',
    });
    res.end();
  } else {
    res.status(200).send(foundGlas);
    res.end();
  }
});

//Updating Glass
router.put('/:id', (req, res) => {
  const foundGlas = dataHandle.getOne(req.params.id, glassData);
  if (!foundGlas) {
    res.status(404).send({
      success: false,
      msg: 'No Glass found.',
    });
  } else {
    const { type, volume, image } = req.body;
    const updateGlass = {
      id: foundGlas.id,
      type,
      volume,
      image,
    };
    dataHandle.update(updateGlass, glassData);
    res.status(201).send({
      success: true,
      msg: 'Glass Updated.',
    });
    res.end();
  }
});

//Deleting Glasses
router.delete('/:id', (req, res) => {
  const foundGlas = dataHandle.getOne(req.params.id, glassData);
  if (foundGlas) {
    dataHandle.delete(foundGlas, glassData);
    res.status(200).send({
      success: true,
      msg: 'Glass is Deleted.',
    });
    res.end();
  } else {
    res.status(404).send({
      success: false,
      msg: 'Glass not found.',
    });
  }
});

module.exports = router;
