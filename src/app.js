import fs from 'fs'
import tmi from 'tmi.js'

import { google } from 'googleapis'
import { formatDate } from './utils'
import { init, addToPlaylist } from './quickstart'
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, YOUTUBE_REGEX, YOUTUBE_VID_ID_REGEX } from './constants'

const options = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [ CHANNEL_NAME ]
}

// initialize a client w/ options to connect to Twitch server
const client = new tmi.Client(options);
let oauth2Client = null;

// connect to Twitch server
client.connect();

// invoked every time bot connects to Twitch chat
client.on("connected", (addr, port) => {
    try {
      client.say(options.channels[0], 'swoocn override - [youtube-request-twitch-bot] initiated for testing..');
      // client.ws.on('message', data => console.log(data));
      console.log(`[youtube-request-twitch-bot initiated] - connected to ${addr}:${port}`);
      // authorize a client with the loaded credentials, then call the YouTube API.
      //oauth2Client = init();
      //console.log('connected to YouTube Data API..');
    } catch (err) {
        console.log(`unable to process connect; -> ${err}`);
    }
});

// invoked every time a message is received by the bot
client.on("message", (target, context, msg, self) => {
  if (self) { return; }

  if (new RegExp(YOUTUBE_REGEX).test(msg)) {
    try {
      // extract ID from YouTube link where id[1] is the vid ID
      var id = msg.match(YOUTUBE_VID_ID_REGEX);
      fs.appendFile('output/youtube_delim.list', `[${formatDate(new Date())}] | @${context.username} | ${id[0]}\n`, (err) => {
        if (err) throw err;
        console.log(`updated -> @${context.username} - ${id[1]}`);
        // invoke YouTube Data API to add item to playlist
        //addToPlaylist(oauth2Client, id[1]);
      });
    } catch (err) {
        console.log(`unable to process message: ${msg}; -> ${err}`);
    }
  }
});

// invoked every time the bot disconnects from Twitch chat
client.on("disconnected", (reason) => {
  console.log(`[youtube-request-twitch-bot disconnected] - ${reason}`);
  process.exit(1);
});
