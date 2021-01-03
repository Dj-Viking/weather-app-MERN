const { AuthenticationError } = require('apollo-server-express');
const { User, City } = require('../models');
const { signToken } = require('../utils/auth.js');
require('dotenv').config();
const fetch = require('node-fetch');
const utf8 = require('utf8');
const {
  temperatureConversion,
  getWeatherIcon
} = require('../utils/helpers.js');

const resolvers = {
  Query: {

    getCity: async (parent, args, context) => {
      //find the city (should only be one)
      const cityInfo = await City.find();
      console.log(cityInfo);
      return cityInfo;
    },

    getSignedInUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        console.log(user);

        //sort cities by name?

        return user;
      } else {
        throw new AuthenticationError('must be logged in to do that');
      }
    },

    getUserFavoriteCities: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      } else {
        throw new AuthenticationError('must be logged in to do that');
      }
    },

  },
  Mutation: {
    
    APIgetCityCurrentDayForecast: async (parent, args, context) => {
      console.log('\x1b[33m', 'checking the argument sent into this function', '\x1b[00m');
      console.log(args);
      // api fetch to weather app server using API key stored in env variable
      //current weather api fetch
      try {
        const cityCurrentDayForecastInfo = 
        await fetch(
          utf8.encode(`https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.WEATHER_KEY}&q=${args.cityName}`)
        );
        const json = await cityCurrentDayForecastInfo.json();
        console.log('\x1b[33m', 'checking the json', '\x1b[00m');
        console.log(json);

        //get UV index separate fetch using longitude and latitude from previous api call
        const cityCurrentUVIndexInfo = 
        await fetch(
          utf8.encode(`https://api.openweathermap.org/data/2.5/uvi?APPID=${process.env.WEATHER_KEY}&lat=${json.coord.lat}&lon=${json.coord.lon}`)
        );
        const UVjson = await cityCurrentUVIndexInfo.json();
        console.log(UVjson);
  
        //set the values of the City model and return it back to wherever the query was made
        
        //find if a city exists and if so update, if not create
        const cityInfo = await City.find();
        console.log('\x1b[33m', 'checking if a city exists', '\x1b[00m');
        console.log(cityInfo);
        if (cityInfo[0] === undefined) {
          const newCity =  await City.create
          (
            {
              cityName: json.name,
              humidity: json.main.humidity,
              windSpeed: json.wind.speed,
              description: json.weather[0].description,
              countryName: json.sys.country,
              icon: getWeatherIcon(json.weather[0].icon),
              temperature: temperatureConversion(json.main.temp),
              UVIndex: UVjson.value
            }
          );
          console.log('\x1b[33m', 'creating brand new city', '\x1b[00m');
          console.log(newCity);
          return newCity;
        } else {
          console.log('\x1b[33m', 'city already exists, updating current city', '\x1b[00m');
          // if it exists already update the city
          const updatedCity = await City.findByIdAndUpdate
          (
            cityInfo[0]._id,
            {
              cityName: json.name,
              humidity: json.main.humidity,
              windSpeed: json.wind.speed,
              description: json.weather[0].description,
              countryName: json.sys.country,
              icon: getWeatherIcon(json.weather[0].icon),
              temperature: temperatureConversion(json.main.temp),
              UVIndex: UVjson.value
            },
            {new: true}
          );
          console.log(updatedCity);
          return updatedCity;
        }
      } catch(error) {
        console.log('\x1b[33m', 'fetch failed', '\x1b[00m');
        console.log(error);
        return error;
      }
    },

    addUser: async (parent, args, context) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return{token, user};
      } catch (error) {
        console.log(error);
      }
    },

    updateUserFavoritedCities: async (
      parent, 
      args, 
      context
    ) => {
      if (context.user) { 
        try {//check for dupes later...
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $push: {
                favoriteCities: {
                  cityName: args.cityName
                }
              }
            },
            {new: true}
          );
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      } else {  
        throw new AuthenticationError('must be logged in to do that');
      }
    },

    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return {token, user};
    }
  }
};

module.exports = resolvers;