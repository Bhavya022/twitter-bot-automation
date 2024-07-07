const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tweetId: { type: String, required: true },
  action: { type: String, required: true },
  message: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
