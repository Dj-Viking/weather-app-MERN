const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    personalApiKey: String
    favoriteCities: [City]
  }

  type City {
    _id: ID
    cityName: String
    humidity: Float
    windSpeed: Float
    description: String
    countryName: String
    icon: String
    temperature: String
    UVIndex: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getSignedInUser: User

    getUserFavoriteCities: [City]

    getCity: [City]

  }
  
  type Mutation {
    APIgetCityCurrentDayForecast(
      cityName: String!
    ): City

    addUser(
      username: String!
      email: String!
      password: String!
      personalApiKey: String
    ): Auth
    
    login(
      email: String!
      password: String!
    ): Auth

    userAddFavoriteCity(
      cityName: String!
    ): User

    updateUserFavoritedCities(
      _id: ID!
    ): User

  }
`;

module.exports = typeDefs;