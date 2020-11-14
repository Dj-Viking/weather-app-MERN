const mongoose = require('mongoose');
const {Schema} = mongoose;

const citySchema = new Schema
(
  {
    cityName: {
      type: String,
      trim: true
    }
  }
);

const City = mongoose.model('City', citySchema);

module.exports = City;