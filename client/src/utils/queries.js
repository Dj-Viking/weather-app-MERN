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