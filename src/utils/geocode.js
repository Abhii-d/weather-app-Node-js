const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=78ad02bb477fe155e080c6aafe05c18a&query=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location service!", undefined);
    } else if (body.error || body.data.length === 0) {
      callback(
        "Unable to get location! Try again with different location",
        undefined
      );
    } else {
      const resp = body.data[0];
      //   console.log(resp);
      const latitude = resp.latitude;
      const longitude = resp.longitude;
      const location = resp.name + " " + resp.country;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
