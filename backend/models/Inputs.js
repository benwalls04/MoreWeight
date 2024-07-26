const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  exp: {
    type: Number,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const Inputs = mongoose.model('Inputs', inputSchema);

module.exports = Inputs;