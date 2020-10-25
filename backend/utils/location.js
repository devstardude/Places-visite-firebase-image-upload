// ------------------------arcgis geocoding------------------------------

const HttpError = require("../models/http-error");

const axios = require("axios");

async function getCoordsForAddress(address) {
  const url = encodeURIComponent(address);
  let coords;
  let response;
  await axios
    .get(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${address}&outFields=Match_addr,Addr_type`
    )
    .then((res) => {
      response = res;
      coords = res.data.candidates[0].location;
    })
    .catch((err) => console.log(err));

  if (!response || response.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  return { lat: coords.y, lng: coords.x };
}

module.exports = getCoordsForAddress;
