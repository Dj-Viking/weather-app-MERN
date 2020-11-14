const { AuthenticationError } = require('apollo-server-express');
const { User, City } = require('../models');
const { signToken } = require('../utils/auth.js');
require('dotenv').config();
const fetch = require('node-fetch');

const resolvers = {
  Query: {
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
      }
    }
  },
  Mutation: {
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