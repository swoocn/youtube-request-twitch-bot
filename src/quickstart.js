import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'

export var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

export function init() {
  // Load client secrets from a local file.
  // TODO: may need to make file read async
  const content = fs.readFileSync('./resources/client_secret.json');
  return authorize(JSON.parse(content));
}

/**
 * Create an OAuth2 client with the given credentials.
 */
function authorize(credentials) {
  var clientId = credentials.installed.client_id;
  var clientSecret = credentials.installed.client_secret;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client);
    } else {
      oauth2Client.credentials = JSON.parse(token);
    }
  });
  return oauth2Client;
}

/**
 * Get and store new token after prompting for user authorization.
 */
function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Retrieve a user's playlist.
 * Determine playlistId if unknown to use for addToPlaylist(..).
 */
//function fetchPlaylist(auth) {
//  var service = google.youtube('v3');
//  service.playlists.list({
//    auth: auth,
//    part: 'snippet,contentDetails',
//    mine: true
//  }, function(err, response) {
//    if (err) {
//      console.log('The API returned an error: ' + err);
//      return;
//    } else {
//      const { data } = response;
//      data.items.forEach((item) => {
//        console.log(`Title: ${item.snippet.title}\nDescription:${item.snippet.description}\n`);
//      })
//      console.log(response.data.items[0].id);
//    }
//  });
//}

/**
 * Add playlist item to a user's playlist.
 */
export async function addToPlaylist(auth, id) {
  var service = google.youtube('v3');
  try {
    var response = await service.playlistItems.insert({
      auth: auth,
      part: 'snippet',
      resource: {
        snippet: {
          playlistId: 'PL3Q0ry0qcePG4XAoOf50ZC1T2ekgu6-fO',
          resourceId: {
            kind: 'youtube#video',
            videoId: id
          }
        }
      }
    });
  } catch (err) {
      console.log(`The API returned the response: ${response.status}; -> ${err}`);
  }
}
