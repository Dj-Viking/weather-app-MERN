const { gql } = require('apollo-server-express');

const typeDefs = gql`

  directive @constraint(
    pattern: String
  ) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION

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

  input CityInput {
    cityName: String!
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