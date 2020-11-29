import React from 'react'

//REDUX
import { useSelector, useDispatch } from 'react-redux';

//graphQL queries
import {useQuery} from '@apollo/react-hooks';

//ACTIONS
import {
  cityCurrentNameChange,
  cityCurrentHumidityChange,
  cityCurrentWindSpeedChange,
  cityCurrentWeatherDescriptionChange,
  cityCurrentCountryNameChange,
  cityFiveDayForecastChange,
  cityCurrentIconChange,
  cityCurrentTemperatureChange,
  cityCurrentUVIndexChange,
  cityCurrentDateChange
} from '../../actions/city-info-actions.js';

const CityInfo = () => {
  //OBSERVE GLOBAL REDUX STORE
  const cityInfoState = useSelector(state => state.cityInfo);

  //GLOBAL PIECE OF STATE
  const {
    cityNameCurrentForecast,
    cityHumidityCurrentforecast,
    cityWindSpeedCurrentForecast,
    cityWeatherDescriptionCurrentForecast,
    cityCountryNameCurrentForecast,
    cityIconCurrentForecast,
    cityTemperatureCurrentForecast,
    cityUVIndexCurrentForecast,
    cityDateCurrentForecast,
    cityTemperatureFiveDayForecastOfCurrentCity,
  } = cityInfoState;

  //GRAPHQL QUERY
  

  return (
    <>
      <div>
        CityInfo
      </div>
    </>
  );
};

export default CityInfo;