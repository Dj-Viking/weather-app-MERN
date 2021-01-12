const mongoose = require('mongoose');
const {Schema} = mongoose;

const fiveDaySchema = new Schema
(
  {
    cityName: {
      type: String,
      trim: true
    },
    temp: {
      type: String,
      trim: true
    },
    humid: {
      type: Number,
      trim: true
    },
    wind: {
      type: Number,
      trim: true
    },
    desc: {
      type: String,
      trim: true
    },
    _icon: {
      type: String,
      trim: true
    },
    date: {
      type: String,
      trim: true
    }
  }
);

const CityFiveDayForecast = mongoose.model('CityFiveDayForecast', fiveDaySchema);

module.exports = CityFiveDayForecast;