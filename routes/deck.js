const express = require('express');
const router = express.Router();
const DeckController = require('../controller/deckC.js');

const {
  validateBody,
  validateParam,
  schemas,
} = require('../validations/validation.js');

router.get('/', DeckController.index);
router.post('/', validateBody(schemas.newDeckSchema), DeckController.newDeck);

module.exports = router; //=> khai bao
