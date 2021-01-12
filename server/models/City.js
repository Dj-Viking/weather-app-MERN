const mongoose = require('mongoose');
const CityFiveDayForecast = require('./CityFiveDayForecast.js');
const {Schema} = mongoose;

const citySchema = new Schema
(
  {
    cityName: {
      type: String,
      trim: true
    },
    humidity: {
      type: Number,
      trim: true
    },
    windSpeed: {
      type: Number,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    countryName: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      trim: true
    },
    temperature: {
      type: String,
      trim: true
    },
    UVIndex: {
      type: Number,
      trim: true
    }
  }
);

const City = mongoose.model('City', citySchema);

module.exports = City;