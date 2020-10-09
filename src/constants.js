
// Twitch constants
export const CHANNEL_NAME = '[INSERT TWITCH CHANNEL_NAME]';
export const OAUTH_TOKEN = '[INSERT OAUTH_TOKEN]';
export const BOT_USERNAME = 'youtube-request-twitch-bot';

// Youtube constants
/* https://regexr.com/3a2p0 */
export const YOUTUBE_REGEX = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;
export const YOUTUBE_VID_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
