export const cityNameChange = data => {
  return {
    type: 'CITY_NAME_CHANGE',
    payload: data
  };
};

export const searchFieldCompleted = data => {
  return {
    type: 'SEARCH_FIELD_COMPLETED',
    payload: data
  };
};