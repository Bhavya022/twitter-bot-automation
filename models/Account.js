const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Add password field
  accessToken: { type: String, required: true },
  accessTokenSecret: { type: String, required: true }
});

module.exports = mongoose.model('Account', accountSchema);
