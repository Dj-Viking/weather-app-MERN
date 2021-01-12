import React, {useState} from 'react'

import CityInfo from '../../components/CityInfo';

//USE MUTATION and QUERY
import {useMutation} from '@apollo/react-hooks'

//mutation
import {
  GET_CITY_INFO
} from '../../utils/mutations.js';

//moment
import moment from 'moment';


//SVG ICONS
import SearchIcon from './svgs/search.svg';

const CitySearch = () => {

  const labelStyles = {
    fontSize: '3vw',
    width: '50%',
    height: '50%',
    color: 'white',
    marginLeft: '0',
    marginRight: '0',
    marginTop: '5%'
  }

  const formStyles = {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#333'
  }

  const inputStyles = {
    fontSize: '2vw',
    height: '50%',
    width: '20vw',
    margin: 'auto 0',
    borderRadius: '10px'
  }

  const buttonStyles = {
    height: '54.5%',
    width: '10vw',
    alignItems: 'center',
    margin: 'auto',
    borderRadius: '10px',
    cursor: 'pointer'
  }
  const svgStyles = {
    height: '80%',
    margin: 'auto 0'
  }

  const innerFormContainer = {
    display: 'flex',
    justifyContent: 'center'
  };


  const [cityNameValue, setCityValue] = useState('');
  function onCityNameChange(event) {
    //console.log(event.target.value);
    setCityValue(event.target.value);
  }

  //GRAPHQL QUERY and MUTATION
  //const cityQueryResponse = useQuery(GET_CITY_SEARCHED);
  const [getCityInfo] = useMutation(GET_CITY_INFO);

  const [theCityInfo, setTheCityInfo] = useState({});

  const today = new Date();
  const formattedDate = moment(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
  ).format('MMM DD, YYYY');
  
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('submitted');
    try {
      const cityInfo = await getCityInfo
      (
        {
          variables: {
            cityName: cityNameValue
          }
        }
      );
      if (cityInfo.data) {
        console.log('checking data from mutation', cityInfo.data);
        setTheCityInfo(cityInfo.data.APIgetCityCurrentDayForecast);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        style={formStyles}
        onSubmit={handleSubmit}
      >
        <div
          style={innerFormContainer}
        >

          <label
            htmlFor="city-search"
            style={labelStyles}
          > 
            City Name Search:
          </label>
          <input
            style={inputStyles}
            type="text"
            name="city-search"
            value={cityNameValue}
            onChange={onCityNameChange}
            autoFocus={true}
            placeholder="City Name"
            autoComplete="off"
          />
          <button
            type="submit"
            style={buttonStyles}
          >
            <img 
              style={svgStyles}
              src={SearchIcon}
              alt="search glass"
            />
          </button>
        </div>
      </form>
      <CityInfo cityInfo={theCityInfo} formattedDate={formattedDate}/>
    </>
  );
};

export default CitySearch;