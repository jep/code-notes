/*jshint esversion: 6 */

// Weather app example using DarkSky.net/dev API.

const chalk = require('chalk');
const request = require('request');

const DARKSKY_API_TOKEN = '<YOUR_API_TOKEN>';
const MAPBOX_API_TOKEN = '<YOUR_API_TOKEN>';

const yargs = require('yargs')
  .scriptName("wx.js")
  .version('1.0.0')
  .usage('$0 <cmd> [location]')
  .epilog('Powered by DarkSky.net')
  .command('weather', 'Get weather for a location.', (yargs) => {
    yargs
      .positional('location', {
        type: 'string',
        demandOption: true,
        describe: 'The city name or zip code to lookup'
      });
    })
  .argv;

if(yargs.location && yargs.location != "") {
  const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${yargs.location}.json?access_token=${MAPBOX_API_TOKEN}&limit=1`;
  
  // Get location by passing the positional argument 'location' to 
  // the MapBox Geocoding API
  const location = (url, done) => {
    request(url, (error, response, body) => {
      const latlong = JSON.parse(body).features[0].center;
      done(latlong);
    });
  };

  // Get weather of location by passing lat/long to BadSky Weather API
  location(mapbox_url, (latlong) => {
    const darksky_url = `https://api.darksky.net/forecast/${DARKSKY_API_TOKEN}/${latlong[1]},${latlong[0]}?units=us`;
    const result = request({ url: darksky_url, json: true }, (err, resp, body) =>  {
      const current = body.currently;
      console.log(`Current temp for ${yargs.location} is ${chalk.greenBright(current.temperature)}°. Current weather is ${chalk.greenBright(current.summary)} 🌥`);
    });
  });
} else {
  console.log('Location not found. Please enter a valid location.');
}


