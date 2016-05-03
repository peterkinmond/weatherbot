## weatherbot

Slack bot to tell current weather conditions based on [Botkit](https://github.com/howdyai/botkit) and powered by [Weather Underground](https://www.wunderground.com).

### Getting Started instructions

1. Fork this repo
1. Create an `.env` file and add tokens (see [Handling Tokens](#handling-tokens) section below)
1. Run `npm install` to get all dependencies.
1. Run `node lib/bot.js`. This will run your bot on your local machine and it will appear in Slack.

### Handling Tokens

The `.env` file is used to store sensitive config data such as tokens and will be ignored by Git. Create an `.env` file and add the following to it:

```
token=REPLACE_WITH_SLACK_TOKEN
wutoken=REPLACE_WITH_WEATHER_UNDERGROUND_API_TOKEN
```
*** IMPORTANT: Never include your Slack token in Git. Always bring it in as a config variable. Access to a Slack token gives someone access to all chat/files on that Slack account! ***

###  What Else Can Botkit Do?

[https://github.com/howdyai/botkit#getting-started](https://github.com/howdyai/botkit#getting-started)


### Usage in Slack

Type `weather` + city name to get current weather conditions (for example `weather Boston, MA` or `weather Ottawa, Canada`)