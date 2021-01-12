import gql from 'graphql-tag';

export const USER_QUERY = gql`
  {
    getSignedInUser
    {
      _id
      username
      email
      favoritedCities{
        _id
        cityName
      }
    }
  }
`;

export const GET_CITY_SEARCHED = gql`
  {
    getCity{
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