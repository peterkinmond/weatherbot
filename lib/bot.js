require('dotenv').config();

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

if (!process.env.wutoken) {
  console.log('Error: Specify Weather Underground token in environment');
  process.exit(1);
}

var request = require('request');
var Botkit = require('botkit');
var wunderground_token = process.env.wutoken;

var controller = Botkit.slackbot({
  debug: true,
});

var bot = controller.spawn({
  token: process.env.token
}).startRTM();

controller.hears(['hi'], 'direct_mention', function(bot, message) {
  bot.reply(message, 'Hi');
});

controller.hears('weather (.*)', 'direct_mention', function(bot, message) {
  bot.reply(message, 'Checking...');
  request(getWeatherUndergroundApiUrl(message), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        if (data.current_observation) {
          // Case: single result - show weather
          bot.reply(message, "Current weather conditions for " + data.current_observation.display_location.full);
          bot.reply(message, data.current_observation.weather);
          bot.reply(message, data.current_observation.temperature_string);
        } else if (data.response && data.response.results) {
          // Case: multiple results - add State (US) or country
          bot.reply(message, "Multiple results match that location. Please add the State name for " +
                    "U.S. or country name for international ('Boston, MA' or 'Ottawa, Canada')");
        } else {
          // Case: error returned - fix spelling, add State (US) or country
          bot.reply(message, "No results match that location. Please check your spelling");
        }
      } else {
        bot.reply(message, "Sorry couldn't get weather data");
      }
  });
});

function getWeatherUndergroundApiUrl(message) {
  var matches = message.text.match(/weather (.*)/i);
  var location = matches[1];
  var url = 'https://api.wunderground.com/api/' + wunderground_token + '/conditions/q/';
  if (location.split(',').length > 1) {
    // User has entered US state or country name so use that in request URL
    url += location.split(',')[1] + '/' + location.split(',')[0] + '.json';
  } else {
    // User has entered single location name which works when it's unique (i.e. "Tokyo")
    url += location + '.json';
  }
  return url;
}
