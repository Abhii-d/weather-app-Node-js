// const exp = require("constants");
const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3f633128f1533fe140e9fdeaccb288e6&query=" +
    latitude +
    "," +
    longitude;
  //   console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (body.error) {
      //   console.log(response.body);
      callback("Unable to find location!", undefined);
    } else {
      // console.log(response.body);
      callback(undefined, {
        condition: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
      });
    }
  });
};

module.exports = forecast;
