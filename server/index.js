const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Expo = require('expo-server-sdk').Expo;

const expo = new Expo();
const app = express();
const http = require('http').Server(app);

storage.init({
  dir: 'persist',
  
  stringify: JSON.stringify,
 
  parse: JSON.parse,

  encoding: 'utf8',

  logging: false,  // can also be custom logging function

  ttl: false,

  expiredInterval: 2 * 60 * 1000,

  forgiveParseErrors: false

});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users/push-token', (req, res) => {
  const { token } = req.body; 

  storage.setItem(token, {});

  return res.json({ status: 'ok' });
});

app.post('/webhook', (req, res) => {
  const { post_title, post_content } = req.body.post

  storage.keys().then((tokens) => {
    const messages = tokens
      .filter(Expo.isExpoPushToken)
      .map(token => ({
          to: token,
          sound: 'default',
          title: post_title,
          body: post_content,
        })
      );
    const chunks = expo.chunkPushNotifications(messages);
    chunks.map(async chunk =>
      await expo.sendPushNotificationsAsync(chunk)
    );
  });

  return res.json({ status: 'ok' });
});

http.listen(3005, () => {
  console.log("Server started!");
});