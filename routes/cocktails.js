const express = require('express');
const router = express.Router();
//Data Handler
const Data = require('../helpers/dataHandle');
const dataHandle = new Data();
const VolumeCheck = require('../helpers/volumeCheck');
const validate = new VolumeCheck();

//Data Path
const cocktailData = './data/cocktails.json';

//Getting Cocktails
router.get('/', (req, res) => {
  const allCocktails = dataHandle.get(cocktailData);
  res.status(200).send(allCocktails);
});

//Creating a new Cocktail
router.post('/', (req, res) => {
  const allCocktails = dataHandle.get(cocktailData);
  const { name, liquor, mixers, garnish, optional, image, glassType } = req.body;
  const newCocktail = {
    id: Date.now(),
    name,
    liquor,
    mixers,
    garnish,
    optional,
    image,
    glassType,
    made: 0,
  };
  //Checking if cocktail exist
  const foundCocktail = allCocktails.find(cocktail => cocktail.name == req.body.name);
  if (foundCocktail) {
    res.status(400).send({
      success: false,
      msg: 'This Cocktail already exist. Try editing it.',
    });
  } else {
    //Validate Cocktail
    const valid = validate.check(newCocktail);
    if (!valid.success) {
      res.status(400).send({
        success: false,
        msg: `Cocktail quantity too much.`,
        maxQuantity: valid.maxQuantity,
        currentQuantity: valid.currentQuantity,
        solution: `Pick a bigger glass or lessen the quantity`,
      });
      res.end();
    } else {
      //Send cocktail and Save to DB
      dataHandle.add(newCocktail, cocktailData);
      res.status(201).send({
        success: true,
        msg: 'Cocktail has been created successfully.',
      });
      res.end();
    }
  }
});

//Get cocktail to Edit
router.get('/:id/edit', (req, res) => {
  const allCocktails = dataHandle.get(cocktailData);
  const foundCocktail = allCocktails.find(cocktail => cocktail.id == req.params.id);
  if (!foundCocktail) {
    res.status(404).send({
      success: false,
      msg: 'Cocktail was not found.',
    });
    res.end();
  } else {
    res.status(200).send(foundCocktail);
    res.end();
  }
});

//Update Cocktail
router.put('/:id', (req, res) => {
  console.log(req.body);
  const valid = validate.check(req.body);
  if (!valid.success) {
    res.status(400).send({
      success: false,
      msg: `Check your quantities on this cocktail.`,
      maxQuantity: valid.maxQuantity,
      currentQuantity: valid.currentQuantity,
      solution: `Pick a bigger glass or lessen the quantity`,
    });
    res.end();
  } else {
    const allCocktails = dataHandle.get(cocktailData);
    const foundCocktail = allCocktails.find(cocktail => cocktail.id == req.params.id);
    if (!foundCocktail) {
      res.status(404).send({
        success: false,
        msg: 'Cocktail not found',
      });
      res.end();
    } else {
      const { name, liquor, mixers, garnish, optional, image, glassType } = req.body;
      const updatedCocktail = {
        id: foundCocktail.id,
        name,
        liquor,
        mixers,
        garnish,
        optional,
        image,
        glassType,
        made: foundCocktail.made,
      };
      dataHandle.update(updatedCocktail, cocktailData, 'name');
      res.status(201).send({
        success: true,
        msg: 'Cocktail has been updated.',
      });
    }
  }
});

//Deleting a Cocktail
router.delete('/:id', (req, res) => {
  const allCocktails = dataHandle.get(cocktailData);
  const foundCocktail = allCocktails.find(cocktail => cocktail.id == req.params.id);
  if (!foundCocktail) {
    res.status(404).send({
      success: false,
      msg: 'No Cocktail has been found',
    });
    res.end();
  } else {
    dataHandle.delete(foundCocktail, cocktailData);
    res.status(200).send({
      success: true,
      msg: 'Cocktail has been deleted.',
    });
  }
});

module.exports = router;
