import React from 'react'


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


  function handleSubmit(event) {
    event.preventDefault();
    console.log('submitted');
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
            autofocus="true"
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
    </>
  );
};

export default CitySearch;