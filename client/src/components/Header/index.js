import React from 'react';

//CITY SEARCH COMPONENT
import CitySearch from '../../components/CitySearch';

const Header = () => {

  const headerStyles = {
    textAlign: 'center',
    backgroundColor: '#333',
    paddingLeft: '10px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '5vw',
    flexWrap: 'wrap'
  };

  return (
    <>
      <h1
        style={headerStyles}
      >
        Weather Dashboard
      </h1>
        <CitySearch />
    </>

  );
};

export default Header;