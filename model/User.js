const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,
  },
  deck: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Deck'
    }
  ]
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
