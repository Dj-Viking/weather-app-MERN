import gql from 'graphql-tag';

export const GET_CITY_INFO = gql`
  mutation APIgetCityCurrentDayForecast(
    $cityName: String!
  ){
    APIgetCityCurrentDayForecast(
      cityName: $cityName
    ){
      _id
      cityName
      humidity
      windSpeed
      description
      countryName
      icon
      temperature
      UVIndex
    }
  }
`;

export const LOGIN = gql`
  mutation login(
    $email: String!,
    $password: String!
  ){
    login(
      email: $email,
      password: $password
    ){
      token
      user{
        _id
        username
        email
        personalApiKey
        favoriteCities{
          _id
          cityName
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!
  ){
    addUser(
      username: $username,
      email: $email,
      password: $password
    ){
      token
      user{
        _id
        username
        email
        personalApiKey
        favoriteCities{
          _id
          cityName
        }
      }
    }
  }
`;