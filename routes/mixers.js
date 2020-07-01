const express = require('express');
const router = express.Router();

//Data handeler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();

const mixerData = './data/mixers.json';

//Get all mixers
router.get('/', (req, res) => {
  const allMixers = dataHandle.get(mixerData);
  res.status(200).send(allMixers);
});

//Creating a new mixer
router.post('/', (req, res) => {
  const allMixers = dataHandle.get(mixerData);
  const { type, category, quantity, image } = req.body;
  const foundMixer = allMixers.find(mixer => mixer.type == type);
  if (foundMixer) {
    res.status(400).send({
      success: false,
      msg: 'Mixer already exist.',
    });
    res.end();
  } else {
    const newMixer = {
      id: Date.now(),
      type,
      category,
      quantity,
      image,
      used: 0,
    };
    dataHandle.add(newMixer, mixerData);
    res.status(201).send({
      success: true,
      msg: 'New Mixer created.',
    });
    res.end();
  }
});

//Getting Mixer to Edit
router.get('/:id/edit', (req, res) => {
  const foundMixer = dataHandle.getOne(req.params.id, mixerData);
  if (!foundMixer) {
    res.status(404).send({
      success: false,
      msg: 'Mixer not found.',
    });
    res.end();
  } else {
    res.status(200).send(foundMixer);
    res.end();
  }
});

//Updating Mixer
router.put('/:id', (req, res) => {
  const foundMixer = dataHandle.getOne(req.params.id, mixerData);
  if (!foundMixer) {
    res.status(404).send({
      success: false,
      msg: 'No Mixer found.',
    });
  } else {
    const { type, category, quantity, image } = req.body;
    const updateMixer = {
      id: foundMixer.id,
      type,
      category,
      quantity,
      image,
      used: foundMixer.used,
    };
    dataHandle.update(updateMixer, mixerData);
    res.status(201).send({
      success: true,
      msg: 'Mixer Updated.',
    });
    res.end();
  }
});

//Deleting Mixer
router.delete('/:id', (req, res) => {
  const foundMixer = dataHandle.getOne(req.params.id, mixerData);
  if (foundMixer) {
    dataHandle.delete(foundMixer, mixerData);
    res.status(200).send({
      success: true,
      msg: 'Mixer is Deleted.',
    });
    res.end();
  } else {
    res.status(404).send({
      success: false,
      msg: 'Mixer not found.',
    });
  }
});

module.exports = router;
