// Import một hàm (không dùng trong file này) từ mongoose
const { get } = require('mongoose');
// Import model User từ thư mục model
const User = require('../model/User');
// Import model Deck từ thư mục model
const Deck = require('../model/Deck');

const deleteDeck = async (req, res, next) => {
  try {
    const { deckID } = req.value.params;

    // Get a deck
    const deck = await Deck.findById(deckID);
    const ownerID = deck.owner;

    // Get a owner
    const owner = await User.findById(ownerID);

    // Remove the deck
    await deck.remove();

    // Remove deck from owner's decks list
    owner.decks.pull(deck);
    await owner.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const decks = await Deck.find({});
    return res.status(200).json({ decks });
  } catch (error) {
    next(error);
  }
};

const newDeck = async (req, res, next) => {
  try {
    const owner = await User.findById(req.value.body.owner);

    const deck = req.value.body; // không khai báo lại
    deck.owner = owner._id;

    const createdDeck = new Deck(deck);

    await createdDeck.save();

    // đẩy id deck vào trong mảng decks của user và lưu user
    owner.decks.push(createdDeck._id);
    await owner.save();

    return res.status(201).json({ deck: createdDeck });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const replaceDeck = async (req, res, next) => {
  try {
    const { deckID } = req.value.params;
    const newDeck = req.value.body;
    const result = await Deck.findByIdAndUpdate(deckID, newDeck);
    // Check if put user, remove deck in user's model
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const updateDeck = async (req, res, next) => {
  try {
    const { deckID } = req.value.params;
    const newDeck = req.value.body;
    const result = await Deck.findByIdAndUpdate(deckID, newDeck);
    // Check if put user, remove deck in user's model
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.value.params.deckID);
    if (!deck) {
      throw new Error('Deck not found');
    }
    return res.status(200).json({ deck });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  newDeck,
  getDeck,
  replaceDeck,
  updateDeck,
  deleteDeck,
};
