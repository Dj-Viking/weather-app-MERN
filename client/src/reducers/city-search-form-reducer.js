const citySearchFormReducer = (
  state = {
    cityNameToSearch: '',
    searchFieldIsComplete: false
  },
  action
) => {
  switch(action.type) {
    case 'CITY_NAME_CHANGE':
      return {
        ...state,
        cityNameToSearch: action.payload
      }
    case 'SEARCH_FIELD_COMPLETED':
      return {
        ...state,
        searchFieldIsComplete: action.payload
      }
    default: return state
  };
};

export default citySearchFormReducer;