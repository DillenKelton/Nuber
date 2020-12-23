const axios = require("axios");
const convert = require("convert-units");

const distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/";
const geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/";

const outputFormat = "json";

const { GOOGLE_API_KEY } = require("../config");

// @desc Returns the distance in miles between two locations using their latitude and longitude coordinates
const getDistance = async (
  originLat,
  originLng,
  destinationLat,
  destinationLng
) => {
  const requestUrl = `${
    distanceUrl + outputFormat
  }?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${GOOGLE_API_KEY}`;

  try {
    const resp = await axios.get(requestUrl);
    const data = await resp.data;

    // Google API returns distance value in meters, convert this to miles
    const meterVal = data.rows[0].elements[0].distance.value;
    const mileVal = convert(meterVal).from("m").to("mi");

    return mileVal;
  } catch (error) {
    return error;
  }
};

// @desc Returns a json object with the latitude (lat) and longitude (lng) of a location given its address
const getCoords = async (address) => {
  // replaces all spaces in the address with +
  const addr = address.replace(/ /g, "+");

  const requestUrl = `${
    geocodingUrl + outputFormat
  }?address=${addr}&key=${GOOGLE_API_KEY}`;

  try {
    const resp = await axios.get(requestUrl);
    const data = await resp.data;

    return data.results[0].geometry.location;
  } catch (error) {
    return error;
  }
};

// @desc Returns the fully formatted address of a location, or null if the address is invalid
const verifyAddress = async (address) => {
  // replaces all spaces in the address with +
  const addr = address.replace(/ /g, "+");

  const requestUrl = `${
    geocodingUrl + outputFormat
  }?address=${addr}&key=${GOOGLE_API_KEY}`;

  try {
    const resp = await axios.get(requestUrl);
    const data = await resp.data;

    // If there were no results, the address is invalid
    if (data.results[0] == null) {
      return null;
    }

    return data.results[0].formatted_address;
  } catch (error) {
    return error;
  }
};

module.exports = { getDistance, getCoords, verifyAddress };
