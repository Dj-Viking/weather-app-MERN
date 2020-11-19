const cityInfoReducer = (
  state = {
    cityNameCurrentForecast: '',
    cityHumidityCurrentForecast: '',
    cityWindSpeedCurrentForecast: '',
    cityWeatherDescriptionCurrentForecast: '',
    cityCountryNameCurrentForecast: '',
    cityIconCurrentForecast: '',
    cityTemperatureCurrentForecast: '',
    cityUVIndexCurrentForecast: '',
    cityDateCurrentForecast: '',
    cityTemperatureFiveDayForecastOfCurrentCity: [],
  },
  action
) => {
  switch(action.type) {
    case 'CITY_FIVE_DAY_FORECAST_CHANGE': 
      return {
        ...state,
        cityTemperatureFiveDayForecastOfCurrentCity: [...action.payload]
      }
    case 'CITY_CURRENT_NAME_CHANGE':
      return {
      ...state,
        cityNameCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_HUMIDITY_CHANGE':
      return {
        ...state,
        cityHumidityCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_WINDSPEED_CHANGE':
      return {
        ...state,
        cityWindSpeedCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_WEATHERDESCRIPTION_CHANGE':
      return {
        ...state,
        cityWeatherDescriptionCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_COUNTRYNAME_CHANGE':
      return {
        ...state,
        cityCountryNameCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_ICON_CHANGE':
      return {
        ...state,
        cityIconCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_TEMPERATURE_CHANGE':
      return {
        ...state,
        cityTemperatureCurrentForecast: action.payload
      }
    case 'CITY_CURRENT_UVINDEX_CHANGE':
      return {
        ...state,
        cityUVIndexForecast: action.payload
      }
    case 'CITY_CURRENT_DATE_CHANGE':
      return {
        ...state,
        cityDateCurrentForecast: action.payload
      }
    default: return state;
  };
};

export default cityInfoReducer;