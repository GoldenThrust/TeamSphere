const fs = require('fs');

const readline = require('readline');

const { promisify } = require('util');

const mimeMessage = require('mime-message');

const { gmailV1 as gmailV1, google } = require('googleapis');


// If modifying these scopes, delete token.json.

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];


// File paths (replace with actual locations)

const TOKEN_PATH = 'token.json';

const CREDENTIALS_PATH = 'credentials.json';


const readFileAsync = promisify(fs.readFile);

const writeFileAsync = promisify(fs.writeFile);


/**

 * Function that gets and stores a new token after prompting for user authorization

 * and then executes the given callback with the authorized OAuth2 client.

 * @param {google.auth.OAuth2} oAuth2Client: The OAuth2 client to get token for.

 * @param {getEventsCallback} callback: The callback for the authorized client.

 */

async function getNewToken(oAuth2Client, callback) {

  const authUrl = oAuth2Client.generateAuthUrl({

    access_type: 'offline',

    scope: SCOPES

  });

  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

  });

  rl.question('Enter the code from that page here: ', (code) => {

    rl.close();

    oAuth2Client.getToken(code, (err, token) => {

      if (err) {

        console.error('Error retrieving access token', err);

        return;

      }

      oAuth2Client.setCredentials(token);

      writeFileAsync(TOKEN_PATH, JSON.stringify(token))

        .then(() => {

          console.log('Token stored to', TOKEN_PATH);

          callback(oAuth2Client);

        })

        .catch((writeErr) => console.error(writeErr));

    });

  });

}


/**

 * Function that creates an OAuth2 client with the given credentials

 * and then executes the given callback function.

 * @param {Object} credentials: The authorization client credentials.

 * @param {function} callback: The callback to call with the authorized client.

 */

async function authorize(callback) {

  const clientSecret = await readFileAsync(CREDENTIALS_PATH)

    .then(content => JSON.parse(content).web.client_secret);

  const clientId = await readFileAsync(CREDENTIALS_PATH)

    .then(content => JSON.parse(content).web.client_id);

  const redirectURIs = await readFileAsync(CREDENTIALS_PATH)

    .then(content => JSON.parse(content).web.redirect_uris);

  const oAuth2Client = new google.auth.OAuth2(

    clientId,

    clientSecret,

    redirectURIs[0]

  );

  console.log('Client authorization beginning');

  // Check if we have previously stored a token.

  try {

    const token = JSON.parse(await readFileAsync(TOKEN_PATH));

    oAuth2Client.setCredentials(token);

    callback(oAuth2Client);

  } catch (err) {

    await getNewToken(oAuth2Client, callback);

  }

  console.log('Client authorization done');

}


/**

 * Function that delivers a mail through the user's account.

 */

function sendMailService(auth, mail) {

  const gmail = google.gmail({ version: 'v1', auth });


  gmail.users.messages.send({

    userId: 'me',

    requestBody: mail

  }, (err, _res) => {

    if (err) {

      console.log(`The API returned an error: ${err.message || err.toString()}`);

      return;

    }

    console.log('Message sent successfully');

  });

}


/**

 * Contains routines for mail delivery with GMail.

 */

class Mailer {

  static async checkAuth() {

    try {

      await authorize(auth => {

        console.log('Successfully authorized');

      });

    } catch (err) {

      console.error('Authentication failed:', err);

    }

  }


 static buildMessage (dest, subject, message) {

    const senderEmail = process.env.GMAIL_SENDER;

    const msgData = {

      type: 'text/html',

      encoding: 'UTF-8',

      from: senderEmail,

      to: [dest],

      cc: [],

      bcc: [],

      replyTo: [],

      date: new Date(),

      subject,

      body: message

    };


    if (!senderEmail) {

      throw new Error(`Invalid sender: ${senderEmail}`);

    }

    if (mimeMessage.validMimeMessage(msgData)) {

      const mimeMsg = mimeMessage.createMimeMessage(msgData);

      return { raw: mimeMsg.toBase64SafeString() };

    }

    throw new Error('Invalid MIME message');

  }


  static sendMail (mail) {

    readFileAsync('credentials.json')

      .then(async (content) => {

        await authorize(

          JSON.parse(content),

          (auth) => sendMailService(auth, mail)

        );

      })

      .catch((err) => {

        console.log('Error loading client secret file:', err);

      });

  }

}

