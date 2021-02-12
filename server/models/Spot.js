const mongoose = require('mongoose');
const { Schema } = mongoose;

const spotSchema = new Schema({
  body: String,
  longitude: Number,
  latitude: Number,
  description: String,
  bustability: Number,
  username: String,
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
