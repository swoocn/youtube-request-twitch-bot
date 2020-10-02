## Project
- A lightweight Twitch chat bot application.
- Integrates Youtube link requests from the Twitch chat stream to the desired Youtube playlist.  
- Output Youtube links to a file to allow for additional cross-referencing and verification of Twitch chat stream requests.

## Motivation
Allow for reaction-based Twitch streamers to streamline Youtube requests to his/ her playlist.  The playlist may then be used for shared viewing within his/ her Twitch community or used for personal leisure.

## Technology Stack 
- Node JS/ Javascript
- Google Cloud Platform

## Prerequisites
- Google Cloud Platform account 
- Twitch account
- Youtube account

## Setup
##### Get your Twitch oAuth token to call Twitch API & configure /const.js with Twitch account info.
1. Register and log into [Twitch developer console](https://dev.twitch.tv/console/apps).
2. Select the **Applications** tab, and click **+ Register Your Application**.
3. Enter desired app name and http://localhost as the OAuth redirect URL.  Then select Chat Bot as the app category.
4. Click **Create**, and the app is created and listed on the dashboard as a registered app.
5. Click **Manage** to see the client ID.
6. Connect to [Twitch Chat Password Generator](https://twitchapps.com/tmi/) to authorize access to desired Twitch account.
7. Copy the generated oAuth login password, and paste it to replace value for `OAUTH_TOKEN` in /const.js.  Also replace value for CHANNEL_NAME with desired Twitch channel alias.  

