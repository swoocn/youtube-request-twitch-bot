import fs from 'fs'
import tmi from 'tmi.js'
import { google } from 'googleapis'
import { init, addToPlaylist } from './quickstart'
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, YOUTUBE_REGEX, YOUTUBE_VID_ID_REGEX } from './const'

const options = {
  options: { debug: false },
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

// register event handlers
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);
client.on('disconnected', onDisconnectedHandler);

// connect to Twitch server
client.connect();

// invoked every time bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  client.say(options.channels[0], '[youtube-request-twitch-bot initiated]');
  console.log(`[youtube-request-twitch-bot initiated] - connected to ${addr}:${port}`);

  // Authorize a client with the loaded credentials, then call the YouTube API.
  oauth2Client = init();
  console.log('connected to Youtube Data API..');
}

// invoked every time a message is received by the bot
function onMessageHandler (target, context, msg, self) {
  if (self) { return; }

  if (new RegExp(YOUTUBE_REGEX).test(msg)) {
    // extract ID from Youtube link where id[1] is the vid ID
    var id = msg.match(YOUTUBE_VID_ID_REGEX);
    fs.appendFile('output/youtube.list', `@${context.username} - VID ID ${id[0]} | ${id[1]}\n`, (err) => {
      if (err) throw err;
      console.log(`updated -> @${context.username} - ${id[1]}`);
      // invoke Youtube Data API to add item to playlist
      addToPlaylist(oauth2Client, id[1]);
    });
  }
}

// invoked every time the bot disconnects from Twitch chat
function onDisconnectedHandler (reason) {
  console.log(`[youtube-request-twitch-bot disconnected] - ${reason}`);
  process.exit(1)
}
