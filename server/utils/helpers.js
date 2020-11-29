/**
 * 
 * contains closures for conversions within this function to simplify the process
 * 
 * converts kelvin into both F and C temperatures
 * 
 * @param {Number} num temperature input in units Kelvin
 * @returns {String} output the temperature formatted as 
 */
function temperatureConversion(num) {

  //convert the kelvin units to Celsius and Fahrenheit
  function tempConvKtoF(valNum) {
    valNum = parseFloat(valNum);
    var newTempF = Math.floor(((valNum-273.15)*1.8)+32);
    return newTempF;
  }

  function tempConvKtoC(valNum) {
    valNum = parseFloat(valNum);
    var newTempC = Math.floor(valNum-273.15);
    return newTempC;
  }

  //return the entire string of both temperatures
  return `${tempConvKtoC(num)}°F / ${tempConvKtoF(num)}°C`;
};

/**
 * 
 * @param {String} iconString string returned from the open weather app api call
 * @returns {String} link to set as the source of the img for use on an img tag element 
 */
function getWeatherIcon(iconString){
  return `https://openweathermap.org/img/wn/${iconString}@2x.png`;
}

module.exports = {
  temperatureConversion,
  getWeatherIcon
};