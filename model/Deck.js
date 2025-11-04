const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    name:{
        type: String,
    },
    decrpition:{
        type: String,
    },
    total:{
        type: Number,
        default: 0
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

});

const Deck = mongoose.model('Deck', DeckSchema);
module.exports = Deck;
