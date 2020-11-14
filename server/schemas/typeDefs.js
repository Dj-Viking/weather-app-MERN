const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    favoriteCities: [City]
  }

  type City {
    _id: ID
    cityName: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getSignedInUser: User

    getUserFavoriteCities: [City]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
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