## Project
- A lightweight Twitch chat bot application.
- Integrates YouTube link requests from the Twitch chat stream to the desired YouTube playlist.  
- Output YouTube links to a file to allow for additional cross-referencing and verification of Twitch chat stream requests.

## Motivation
Allow for reaction-based Twitch streamers to streamline YouTube requests to his/ her playlist.  The playlist may then be used for shared viewing within his/ her Twitch community or used for personal leisure.

## Technology Stack 
- Node JS/ Javascript
- Google Cloud Platform

## Prerequisites
- Google Cloud Platform account 
- Twitch account
- YouTube account

## Setup
#### Get your Twitch OAuth token to call Twitch API & configure /const.js with Twitch account info.
1. Register and log into [Twitch developer console](https://dev.twitch.tv/console/apps).
2. Select the Applications tab, and click **+ Register Your Application**.
3. Enter desired app name and http://localhost as the OAuth redirect URL.  Then select Chat Bot as the app category.
4. Click **Create**, and the app is created and listed on the dashboard as a registered app.
5. Click **Manage** to see the client ID.
6. Connect to [Twitch Chat Password Generator](https://twitchapps.com/tmi/) to authorize access to desired Twitch account.
7. Copy the generated OAuth login password, and paste it to replace value for `OAUTH_TOKEN` in /const.js.  Also replace value for CHANNEL_NAME with desired Twitch channel alias.  

#### Get and integrate your YouTube OAuth token to call YouTube API & setup necessary scopes for the OAuth consent.
1. Log into [Google Developers Console](https://console.developers.google.com/) and create a new project.
2. Open the Credentials page in the API & Services console and create an OAuth client ID with Desktop app as the Application type, and enter desired Desktop client name.
3. Click **Create**, and the OAuth client is created with the associated Client ID and Client Secret values.
4. Download the associated JSON file for the OAuth client to the project's working directory; preferably under a new /resources folder as client_secret.json.
5. Open the OAuth consent screen in the API & Services console and select External as the User Type, then click **Create**.
6. Provide the desired Application name, then click **Save** to persist the new OAuth consent for editing later.
7. Open the Library page in the API & Services console and search for 'YouTube', and click on the search result YouTube Data API v3.
8. Activate the YouTube API by clicking **Enable**, and verify the API details in the loaded Overview page.
9. Click on the Navigation menu and go back to APIs & Services console -> OAuth consent screen.
10. Edit App to go to the OAuth consent screen details.
11. Under Scopes for Google APIs, click **Add scope** and check the following scopes: 
    - ../auth/youtube.force-ssl
    - ../auth/youtubepartner
    - ../auth/youtube
12. Click **Add**, and then click **Save** to persist the scopes to the current Oauth consent.
