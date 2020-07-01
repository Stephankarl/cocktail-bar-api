const express = require('express');
const router = express.Router();
//Data Handler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();

//Data Path
const liquorData = './data/liquor.json';

//Getting Cocktails
router.get('/', (req, res) => {
  const allLiquor = dataHandle.get(liquorData);
  res.status(200).send(allLiquor);
  res.end();
});

//Creating a new Liquor
router.post('/', (req, res) => {
  const { type, name, category, abv, quantity } = req.body;
  category ? category : 'Regular';
  const allLiquor = dataHandle.get(liquorData);
  //Checking if liquor exist.
  const foundLiquor = allLiquor.find(liquor => liquor.name == name);
  if (foundLiquor) {
    res.status(409).send({
      success: false,
      msg: 'Liquor already exists',
      type: type,
      name: name,
    });
    res.end();
  } else {
    //Creating new Liquor
    const newLiquor = {
      id: Date.now(),
      type,
      name,
      category,
      abv,
      quantity,
      used: 0,
    };
    //Pass Data to handler with data and path
    dataHandle.add(newLiquor, liquorData, type);
    res.status(201).send({
      success: true,
      msg: `You successfully added a new Liquor.`,
    });
    res.end();
  }
});

//Edit a Liquor
router.get('/:id/edit', (req, res) => {
  const allLiquor = dataHandle.get(liquorData);
  const foundLiquor = allLiquor.find(liquor => liquor.id == req.params.id);
  if (!foundLiquor) {
    res.status(404).send({
      success: false,
      msg: 'No Liquor found.',
    });
    res.end();
  } else {
    res.status(200).send({
      type: foundLiquor.type,
      name: foundLiquor.name,
      category: foundLiquor.category,
      abv: foundLiquor.abv,
      quantity: foundLiquor.quantity,
    });
    res.end();
  }
});

//Updating a Liquor
router.put('/:id', (req, res) => {
  let allLiquor = dataHandle.get(liquorData);
  const foundLiquor = allLiquor.find(liquor => liquor.id == req.params.id);
  if (!foundLiquor) {
    res.status(404).send({
      success: false,
      msg: 'No Liquor found',
    });
    res.end();
  } else {
    const { type, name, category, abv, quantity } = req.body;
    const updatedLiquor = {
      id: foundLiquor.id,
      type,
      name,
      category,
      abv,
      quantity,
      used: foundLiquor.used,
    };
    dataHandle.update(updatedLiquor, liquorData);
    res.status(202).send({
      success: true,
      msg: 'Liquor has been Updated.',
    });
    res.end();
  }
});

//Deleting a Liquor
router.delete('/:id', (req, res) => {
  const allLiquor = dataHandle.get(liquorData);
  const foundLiquor = allLiquor.find(liquor => liquor.id == req.params.id);
  if (!foundLiquor) {
    res.status(404).send({
      success: false,
      msg: 'No Liquor has been found',
    });
    res.end();
  } else {
    dataHandle.delete(foundLiquor, liquorData);
    res.status(200).send({
      success: true,
      msg: 'Liquor has been deleted.',
    });
  }
});

module.exports = router;
