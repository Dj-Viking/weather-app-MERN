//REDUX IMPORTS
import { combineReducers } from 'redux';

import cityInfoReducer from './city-info-reducer.js';
import citySearchFormReducer from './city-search-form-reducer.js';

const allReducers = combineReducers(
  {
    cityInfo: cityInfoReducer,
    citySearchForm: citySearchFormReducer
  }
);

export default allReducers;