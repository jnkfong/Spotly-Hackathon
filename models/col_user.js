const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  location: { type: String, default: '' },
  password: { type: String, default: '' }
 
});

mongoose.model('User', UserSchema);