const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  username: {
    type: String, 
    required: true
  }, 
  options: {
    type: [Number],
    required: false
  }, 
  text: {
    type: String, 
    required: false
  }
})

const Features = mongoose.model('Features', FeatureSchema);

module.exports = Features;